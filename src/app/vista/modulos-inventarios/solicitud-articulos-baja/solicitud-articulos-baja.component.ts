import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { OpcionArticuloBajaService } from 'src/app/servicios/opcionArticuloBaja.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InventarioService } from 'src/app/servicios/inventario.service';
import {MatDialog} from '@angular/material/dialog';
import { InformacionDetalladaActivosComponent } from './informacion-detallada-activos/informacion-detallada-activos.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DetalleArticulo } from 'src/app/modelos/detalleArticulo';
import { EstadoService } from 'src/app/servicios/estado.service';
import { SolicitudBajasArticulos } from 'src/app/modelos/solicitudBajasArticulos';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { SolicitudBajasArticulosService } from 'src/app/servicios/solicitudBajasArticulos.service';
import { ArticulosBajaService } from 'src/app/servicios/articulosBaja.service';
import { ArticulosBaja } from 'src/app/modelos/articulosBaja';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';

@Component({
  selector: 'app-solicitud-articulos-baja',
  templateUrl: './solicitud-articulos-baja.component.html',
  styleUrls: ['./solicitud-articulos-baja.component.css']
})
export class SolicitudArticulosBajaComponent implements OnInit {

  displayedColumns = ['select', 'activo', 'placa', 'serial', 'categoria', 'estado', 'observacion'];
  // dataSource2!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaArticulos: any = [];
  public listaOpciones: any = [];
  public listaTabla: any = [];
  public listaRow: any = [];
  public list: any = {};
  public fechaActual: Date = new Date;
  public formSolicitud!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicioAsignacionArticulo: AsignacionArticulosService,
    private servicioOpcionesBajas: OpcionArticuloBajaService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioInventario: InventarioService,
    private servicioEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioSolicitudBaja: SolicitudBajasArticulosService,
    private servicioArticulosBaja: ArticulosBajaService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarOpciones();
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formSolicitud = this.fb.group({
      id: 0,
      dato: [null,Validators.required],
      estado: [null,Validators.required],
      observacion: [null,Validators.required],
    });
  }

  public listarOpciones(){
    this.servicioOpcionesBajas.listarTodos().subscribe(res=>{
      this.listaOpciones = res
    })
  }

  opcion: any;
  capturarOpcion(opcion:any){
    this.opcion=opcion
  }

  validar = false;
  validarArticuloUsuario = false;
  validarEstadoArticulo = false;
  validarEstadoArticulo2 = false;
  activo:any;
  listaExiste = [];
  listaExisteArticuloUsuario = [];
  listaEstadoArticulo = [];
  listaEstadoArticulo2 = [];
  listaInventarioBaja = []
  public abrirDetalle(){
    this.validar = false
    this.listaExiste = []
    this.validarArticuloUsuario = false
    this.listaExisteArticuloUsuario = []
    this.validarEstadoArticulo = false
    this.listaEstadoArticulo = []
    this.validarEstadoArticulo2 = false
    this.listaEstadoArticulo2 = []
    this.listaInventarioBaja = []
    this.opcion = this.formSolicitud.controls['estado'].value
    this.servicioConsultasGenerales.listarArticulosBajaUsuario(Number(sessionStorage.getItem('id'))).subscribe(resInventarioSinBaja=>{
      this.servicioConsultasGenerales.listarInventarioUsuario(Number(sessionStorage.getItem('id'))).subscribe(resInventarioUsuario=>{
        if(resInventarioSinBaja.length == 0){
          resInventarioUsuario.forEach(elementInventarioUsuario => {
            this.listaInventarioBaja.push(elementInventarioUsuario)
          });
        }else{
          resInventarioSinBaja.forEach(elementInventarioSinBaja => {
            this.listaInventarioBaja.push(elementInventarioSinBaja)
          });
        }
        var dato = this.formSolicitud.controls['dato'].value;
        var contador = 0
        if((dato != null || dato != undefined) && (this.opcion != null || this.opcion != undefined)){
          for (let i = 0; i < this.listaInventarioBaja.length; i++) {
            const element = this.listaInventarioBaja[i];
            this.servicioConsultasGenerales.listarAsignArticuloDetArtUsuario(element.id_detalle_articulo, Number(sessionStorage.getItem('id')), dato.toLowerCase()).subscribe(resAsignacionesActivos=>{
              contador = contador + 1
              for (let j = 0; j < resAsignacionesActivos.length; j++) {
                const element2 = resAsignacionesActivos[j];
                this.validar = true
                if(element2.idEstado == 76){
                  this.validarEstadoArticulo = true
                  this.validarArticuloUsuario = true
                  this.activo = element
                }else if(element2.idEstado == 78){
                  this.validarEstadoArticulo2 = true
                }
                this.listaExiste.push(this.validar)
                this.listaExisteArticuloUsuario.push(this.validarArticuloUsuario)
                this.listaEstadoArticulo.push(this.validarEstadoArticulo)
                this.listaEstadoArticulo2.push(this.validarEstadoArticulo2)
              }
              this.comprobar(contador);
            })
          };
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'El campo y la seleccion no pueden estar vacios!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    })
  }

  public comprobar(contador){
    if(contador == this.listaInventarioBaja.length){
      var existe = this.listaExiste.includes(true)
      var existeArticuloUsuario = this.listaExisteArticuloUsuario.includes(true)
      var existeEstadoArticulo = this.listaEstadoArticulo.includes(true)
      var existeEstadoArticulo2 = this.listaEstadoArticulo2.includes(true)
      if(existe == true){
        if(existeEstadoArticulo == true){
          if(existeArticuloUsuario == true){
            this.servicioOpcionesBajas.listarPorId(this.opcion).subscribe(resOpcionElegida=>{
              if(this.listaTabla.length > 0){
                for (let i = 0; i < this.listaTabla.length; i++) {
                  const element = this.listaTabla[i];
                  if(element.articulo.idDetalleArticulo.id != this.activo.id_detalle_articulo || this.listaTabla.length == 0){
                    const dialogRef = this.dialog.open(InformacionDetalladaActivosComponent, {
                      width: '900px',
                      height: '440px',
                      data: this.activo
                    });
                    dialogRef.afterClosed().subscribe(() =>{
                      var valido = localStorage.getItem("valido")
                      if(valido != null){
                        var obj = {
                          opcion : resOpcionElegida,
                          articulo : {},
                          observacion : ""
                        }
                        this.servicioInventario.listarPorId(this.activo.id).subscribe(resInventarioTabla=>{
                          obj.articulo = resInventarioTabla
                          this.listaTabla.push(obj)
                          this.dataSource = new MatTableDataSource(this.listaTabla);
                          this.dataSource.paginator = this.paginator;
                          this.dataSource.sort = this.sort;
                          localStorage.removeItem("valido")
                        })
                      }else{
                      }
                      this.formSolicitud.controls['estado'].setValue(null)
                      this.formSolicitud.controls['dato'].setValue(null);
                    });
                  }else{
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'Ese articulo ya existe en la tabla!',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                }
              }else{
                const dialogRef = this.dialog.open(InformacionDetalladaActivosComponent, {
                  width: '900px',
                  height: '440px',
                  data: this.activo
                });
                dialogRef.afterClosed().subscribe(() =>{
                  var valido = localStorage.getItem("valido")
                  if(valido != null){
                    var obj = {
                      opcion : resOpcionElegida,
                      articulo : {},
                      observacion : ""
                    }
                    this.servicioInventario.listarPorId(this.activo.id).subscribe(resInventarioTabla=>{
                      obj.articulo = resInventarioTabla
                      this.listaTabla.push(obj)
                      this.dataSource = new MatTableDataSource(this.listaTabla);
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.sort = this.sort;
                      localStorage.removeItem("valido")
                    })
                  }else{
                  }
                  this.formSolicitud.controls['estado'].setValue(null)
                  this.formSolicitud.controls['dato'].setValue(null);
                });
              }
            })
          }else{
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Ese articulo no se encuentra en los articulos asignados!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }else{
          if(existeEstadoArticulo2 == true){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Aun no se ha aceptado la asignacion de ese articulo!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'No se encontro ningun activo con esa placa o serial opcion 2222222!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se encontro ningun activo con esa placa o serial!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  dataSource = new MatTableDataSource<DetalleArticulo>();
  selection = new SelectionModel<DetalleArticulo>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  seleccionados:any
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
    this.listaRow = this.listaTabla
  }

  toggle(event:any, row: any) {
    this.list = row
    var obj = {
      articulo: [],
      seleccionado: Boolean
    }
    var encontrado = false
    const listaEncontrado: any = []
    if(this.listaRow.length>=1 ){
      for (let index = 0; index < this.listaRow.length; index++) {
        const element = this.listaRow[index];
        if(element.articulo.articulo.id == this.list.articulo.id){
          if(element.seleccionado == true && event.checked == false){
            var posicion = this.listaRow.indexOf(element)
            this.listaRow.splice(posicion, 1)
            break
          }
        }else if(element.articulo.articulo.id != this.list.articulo.id && event.checked == true){
          obj.articulo = this.list
          obj.seleccionado = event.checked
          this.listaRow.push(obj)
          break
        }
      }
    }else{
      if(event.checked == true){
        obj.articulo = this.list
        obj.seleccionado = event.checked
        this.listaRow.push(obj)
      }
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DetalleArticulo): string {
    var encontrado = false
    const listaEncontrado: any = []
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1},`+this.selection.isSelected(row)+` estas son: `+row;
  }

  public eliminarArticulo(){
    if(this.listaRow.length == this.listaTabla.length){
      this.listaTabla = []
      this.dataSource = new MatTableDataSource( this.listaTabla);
    }else{
      this.listaRow.forEach((element:any) => {
        for (let i in this.listaTabla) {
          if (this.listaTabla[i].articulo.id == element.articulo.articulo.id) {
            this.listaTabla.splice(i, 1)
          }
        }
      });
      this.dataSource = new MatTableDataSource( this.listaTabla);
    }
  }

  public textoObservacion(texto: any, lista:any){
    for (let i = 0; i < this.listaTabla.length; i++) {
      const element = this.listaTabla[i];
      if(element.articulo.idDetalleArticulo.id == lista.articulo.idDetalleArticulo.id){
        this.listaTabla[i].observacion = texto.target.value
      }
    }
  }

  textoValidado = false;
  public crearSolicitud(){
    this.textoValidado = false;
    if(this.listaTabla.length == 0){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Al menos debe seleccionar un activo para generar la solicitud de baja!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      for (let i = 0; i < this.listaTabla.length; i++) {
        const element = this.listaTabla[i];
        if(element.observacion == ""){
          this.textoValidado = true
        }
      }
      if(this.textoValidado == false){
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
          this.servicioEstado.listarPorId(80).subscribe(resEstado=>{
            var observacion = this.formSolicitud.controls['observacion'].value;
            if(observacion != null){
              let solicitudBajasArticulos : SolicitudBajasArticulos = new SolicitudBajasArticulos();
              solicitudBajasArticulos.fecha = this.fechaActual
              solicitudBajasArticulos.idEstado = resEstado
              solicitudBajasArticulos.idUsuario = resUsuario
              solicitudBajasArticulos.usuarioAutorizacion = 0
              solicitudBajasArticulos.usuarioConfirmacion = 0
              solicitudBajasArticulos.estadoContabilidad = "Pendiente"
              this.registrarSolicitudBajasArticulos(solicitudBajasArticulos)
            }
          })
        })
      }else{
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No puede haber ningun campo de observacion vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  public registrarSolicitudBajasArticulos(solicitudBajasArticulos: SolicitudBajasArticulos){
    this.servicioSolicitudBaja.registrar(solicitudBajasArticulos).subscribe(res=>{
      this.registrarArticulosBaja(solicitudBajasArticulos);
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al generar la Solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  listaSolicitudBajas: any = []
  public registrarArticulosBaja(datos: any){
    let articulosBaja : ArticulosBaja = new ArticulosBaja();
    this.listaSolicitudBajas = []
    this.servicioSolicitudBaja.listarTodos().subscribe(resSolicitudBaja=>{
      resSolicitudBaja.forEach(elementSolicitudBaja => {
        var fechaAlmacenada = new Date(elementSolicitudBaja.fecha)
        fechaAlmacenada.setDate(fechaAlmacenada.getDate()+1)
        var fechaAlmacenadaString = fechaAlmacenada.getFullYear()+"-"+fechaAlmacenada.getMonth()+"-"+fechaAlmacenada.getDate()
        var fechaActual = this.fechaActual.getFullYear()+"-"+this.fechaActual.getMonth()+"-"+this.fechaActual.getDate()
        if(fechaAlmacenadaString == fechaActual && elementSolicitudBaja.estadoContabilidad == datos.estadoContabilidad && elementSolicitudBaja.idEstado.id == datos.idEstado.id && elementSolicitudBaja.idUsuario.id == datos.idUsuario.id && elementSolicitudBaja.usuarioAutorizacion == datos.usuarioAutorizacion && elementSolicitudBaja.usuarioConfirmacion == datos.usuarioConfirmacion){
          this.listaSolicitudBajas.push(elementSolicitudBaja.id)
        }
      });
      this.servicioSolicitudBaja.listarPorId(this.listaSolicitudBajas).subscribe(resSolicitudBajas=>{
        for (let i = 0; i < this.listaTabla.length; i++) {
          this.servicioEstado.listarPorId(80).subscribe(resEstado=>{
            const element = this.listaTabla[i];
            articulosBaja.observacion = element.observacion
            articulosBaja.idSolicitudBaja = resSolicitudBajas
            articulosBaja.idOpcionBaja = element.opcion
            articulosBaja.idDetalleArticulo = element.articulo.idDetalleArticulo
            articulosBaja.idEstado = resEstado
            this.servicioArticulosBaja.registrar(articulosBaja).subscribe(res=>{
              if(i+1 == this.listaTabla.length){
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Se genero la solicitud correctamente!',
                  showConfirmButton: false,
                  timer: 1500
                })
                localStorage.removeItem('valido')
                window.location.reload();
              }
            })
          })
        }
      })

    })

  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'listaAsignacionPuntoVentaArticulo.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('asignacionPuntoVenta');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
