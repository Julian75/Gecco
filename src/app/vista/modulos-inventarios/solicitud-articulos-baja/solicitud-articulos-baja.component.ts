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
  activo:any;
  listaExiste = [];
  public abrirDetalle(){
    this.validar = false
    this.listaExiste = []
    console.log(this.listaTabla)
    this.servicioInventario.listarTodos().subscribe(resInventario=>{
      this.servicioAsignacionArticulo.listarTodos().subscribe(resAsignacion=>{
        var dato = this.formSolicitud.controls['dato'].value;
        if((dato != null || dato != undefined) && (this.opcion != null || this.opcion != undefined)){
          for (let i = 0; i < resInventario.length; i++) {
            const element = resInventario[i];
            for (let j = 0; j < resAsignacion.length; j++) {
              const element2 = resAsignacion[j];
              if((element.idDetalleArticulo.placa.toLowerCase() == dato.toLowerCase() || element.idDetalleArticulo.serial.toLowerCase() == dato.toLowerCase()) && element.idDetalleArticulo.id == element2.idDetalleArticulo.id && element2.idAsignacionesProcesos.idUsuario.id == Number(sessionStorage.getItem('id')) && element2.idEstado.id == 76){
                this.activo = element
                this.validar = true
              }
              this.listaExiste.push(this.validar)
            }
          };
          var existe = this.listaExiste.includes(true)
          if(existe == true){
            for (let i = 0; i < this.listaTabla.length; i++) {
              const element = this.listaTabla[i];
              console.log(this.activo.idDetalleArticulo.codigoUnico)
              console.log(element.articulo.idDetalleArticulo.codigoUnico)
              if(element.articulo.idDetalleArticulo.codigoUnico != this.activo.idDetalleArticulo.codigoUnico){
                const dialogRef = this.dialog.open(InformacionDetalladaActivosComponent, {
                  width: '900px',
                  height: '440px',
                  data: this.activo
                });
                dialogRef.afterClosed().subscribe(() =>{
                  var valido = localStorage.getItem("valido")
                  if(valido != null){
                    var obj = {
                      opcion : this.opcion,
                      articulo : this.activo,
                      observacion : ""
                    }
                    this.listaTabla.push(obj)
                    this.dataSource = new MatTableDataSource(this.listaTabla);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    localStorage.removeItem("valido")
                  }else{
                    console.log("hola2")
                  }
                  this.formSolicitud.controls['dato'].setValue(null);
                });
                break
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
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'No se encontro ningun activo con esa placa o serial!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          console.log(this.validar)
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
    console.log(this.listaRow)
    if(this.listaRow.length>=1 ){
      for (let index = 0; index < this.listaRow.length; index++) {
        const element = this.listaRow[index];
        console.log(element)
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
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.textoValidado = false;
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
            this.registrarSolicitudBajasArticulos(solicitudBajasArticulos)
          }
        })
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No puede haber ningun campo de observacion vacio!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    }
  }

  public registrarSolicitudBajasArticulos(solicitudBajasArticulos: SolicitudBajasArticulos){
    this.servicioSolicitudBaja.registrar(solicitudBajasArticulos).subscribe(res=>{
      this.registrarArticulosBaja(res);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se genero la solicitud correctamente!',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al generar la Solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public registrarArticulosBaja(datos: any){
    let articulosBaja : ArticulosBaja = new ArticulosBaja();
    for (let i = 0; i < this.listaTabla.length; i++) {
      const element = this.listaTabla[i];
      articulosBaja.observacion = element.observacion
      articulosBaja.idSolicitudBaja = datos
      articulosBaja.idOpcionBaja = element.opcion
      articulosBaja.idDetalleArticulo = element.articulo.idDetalleArticulo
      this.servicioArticulosBaja.registrar(articulosBaja).subscribe(res=>{
      })
    }
    localStorage.removeItem('valido')
    window.location.reload();
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
