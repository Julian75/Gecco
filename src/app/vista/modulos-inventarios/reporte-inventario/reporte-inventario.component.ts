import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { SitioVentaService } from 'src/app/servicios/serviciosSiga/sitioVenta.service';
import { SitioVenta } from 'src/app/modelos/modelosSiga/sitioVenta';
import { map, Observable, startWith } from 'rxjs';
import { VisitasSiga } from 'src/app/modelos/modelosSiga/visitasSiga';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import { AsignacionPuntoVentaService } from 'src/app/servicios/asignacionPuntoVenta.service';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { InventarioService } from 'src/app/servicios/inventario.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';

@Component({
  selector: 'app-reporte-inventario',
  templateUrl: './reporte-inventario.component.html',
  styleUrls: ['./reporte-inventario.component.css']
})
export class ReporteInventarioComponent implements OnInit {

  myControl = new FormControl<string | SitioVenta>("");
  options: SitioVenta[] = []
  filteredOptions!: Observable<SitioVenta[]>;
  mensaje: any;

  displayedColumns = ['articulo', 'placa', 'marca', 'serial', 'tipoActivo', 'categoria', 'oficina', 'puntoVenta', 'usuarioAsignado'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaOpciones = ["Sitio Venta", "Serial", "Placa", "Usuario"]

  public formInventario!: FormGroup;
  color = ('primary');
  public listaOficinas: any = [];
  public listaIdOficinas: any = [];
  public listarSitioVentas: any = [];
  public listaSitioVenta: any = [];
  public listaIdSitioVenta: any = [];
  public listaUsuarios: any = [];
  public listaInventario: any = [];

  public lista:any = []

  constructor(
    private fb: FormBuilder,
    private servicioOficina : OficinasService,
    private servicioSitioVenta : SitioVentaService,
    private servicioUsuario : UsuarioService,
    private servicioAsignacionPuntoVenta : AsignacionPuntoVentaService,
    private servicioAsignacionArticulo : AsignacionArticulosService,
    private servicioInventario : InventarioService,
    private servicioConsultasGenerales : ConsultasGeneralesService,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarOficinas();
    this.listarUsuarios();
  }

  private crearFormulario() {
    this.formInventario = this.fb.group({
      id: 0,
      reporte: [null,Validators.required],
      oficina: [null,Validators.required],
      serial: [null,Validators.required],
      placa: [null,Validators.required],
      usuario: [null,Validators.required],
    });
  }

  public listarOficinas() {
    this.servicioOficina.listarTodos().subscribe(res => {
      this.listaOficinas = res
    });
  }

  public listarUsuarios() {
    this.servicioUsuario.listarTodos().subscribe(res => {
      this.listaUsuarios = res
    });
  }

  opcion: any
  reporte(seleccion: any){
    if (seleccion.value == "Sitio Venta") {
      this.lista = [];
      document.getElementById('excelReporte')?.setAttribute('style', 'display: none;')
      document.getElementById('reporteInventario')?.setAttribute('style', 'display: none;')
      document.getElementById('paginatorTabla')?.setAttribute('style', 'display: none;')
      document.getElementById("oficinaDiv").setAttribute("style","display: block;");
      document.getElementById("sitioVentaDiv").setAttribute("style","display: block;");
      document.getElementById("serialDiv").setAttribute("style","display: none;");
      document.getElementById("placaDiv").setAttribute("style","display: none;");
      document.getElementById("usuarioDiv").setAttribute("style","display: none;");
      this.crearFormulario();
    localStorage.removeItem("v");
    }else if(seleccion.value == "Serial"){
      this.lista = [];
      document.getElementById('excelReporte')?.setAttribute('style', 'display: none;')
      document.getElementById('reporteInventario')?.setAttribute('style', 'display: none;')
      document.getElementById('paginatorTabla')?.setAttribute('style', 'display: none;')
      document.getElementById("serialDiv").setAttribute("style","display: block;");
      document.getElementById("oficinaDiv").setAttribute("style","display: none;");
      document.getElementById("sitioVentaDiv").setAttribute("style","display: none;");
      document.getElementById("placaDiv").setAttribute("style","display: none;");
      document.getElementById("usuarioDiv").setAttribute("style","display: none;");
      this.crearFormulario();
    localStorage.removeItem("v");
    }else if(seleccion.value == "Placa"){
      this.lista = [];
      document.getElementById('excelReporte')?.setAttribute('style', 'display: none;')
      document.getElementById('reporteInventario')?.setAttribute('style', 'display: none;')
      document.getElementById('paginatorTabla')?.setAttribute('style', 'display: none;')
      document.getElementById("placaDiv").setAttribute("style","display: block;");
      document.getElementById("oficinaDiv").setAttribute("style","display: none;");
      document.getElementById("sitioVentaDiv").setAttribute("style","display: none;");
      document.getElementById("serialDiv").setAttribute("style","display: none;");
      document.getElementById("usuarioDiv").setAttribute("style","display: none;");
      this.crearFormulario();
    localStorage.removeItem("v");
    }else if(seleccion.value == "Usuario"){
      this.lista = [];
      document.getElementById('excelReporte')?.setAttribute('style', 'display: none;')
      document.getElementById('reporteInventario')?.setAttribute('style', 'display: none;')
      document.getElementById('paginatorTabla')?.setAttribute('style', 'display: none;')
      document.getElementById("usuarioDiv").setAttribute("style","display: block;");
      document.getElementById("oficinaDiv").setAttribute("style","display: none;");
      document.getElementById("sitioVentaDiv").setAttribute("style","display: none;");
      document.getElementById("serialDiv").setAttribute("style","display: none;");
      document.getElementById("placaDiv").setAttribute("style","display: none;");
      this.crearFormulario();
    localStorage.removeItem("v");
    }else{
      this.lista = [];
      document.getElementById('excelReporte')?.setAttribute('style', 'display: none;')
      document.getElementById('reporteInventario')?.setAttribute('style', 'display: none;')
      document.getElementById('paginatorTabla')?.setAttribute('style', 'display: none;')
      document.getElementById("oficinaDiv").setAttribute("style","display: none;");
      document.getElementById("sitioVentaDiv").setAttribute("style","display: none;");
      document.getElementById("serialDiv").setAttribute("style","display: none;");
      document.getElementById("placaDiv").setAttribute("style","display: none;");
      document.getElementById("usuarioDiv").setAttribute("style","display: none;");
      this.crearFormulario();
    localStorage.removeItem("v");
    }
  }

  id: any // Id de la oficina capturado - 18

  idOficina(){
    const listaOficina = this.id
    this.listaIdOficinas.push(listaOficina.ideOficina)

    let ultimo = this.listaIdOficinas[this.listaIdOficinas.length - 1]
    let penultimo = this.listaIdOficinas[this.listaIdOficinas.length - 2]
    if(ultimo != penultimo || penultimo == undefined){
      this.listaSitioVenta = []
      this.servicioSitioVenta.listarPorId(ultimo).subscribe(res=>{
        this.listarSitioVentas = res
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(""),
          map(value => {
            // const num_identificacion = typeof value == 'string' ? value : value?.ideSitioventa;
            const nombres = typeof value == 'string' ? value : value?.nom_sitioventa;
            return nombres ? this._filter(nombres as string, this.listarSitioVentas) : this.listarSitioVentas.slice();
          }),
        );
      })
    }
  }

  textoUsuarioVendedor:any
  displayFn(sitioVenta: SitioVenta): any {
    this.textoUsuarioVendedor = sitioVenta
    if(this.textoUsuarioVendedor == ""){
      this.textoUsuarioVendedor = " "
    }else{
      this.textoUsuarioVendedor = sitioVenta.nom_sitioventa

      return this.textoUsuarioVendedor;
    }
  }

  public _filter(nombres: string, vendedores:any): VisitasSiga[] {

    const filterNom = nombres.toLowerCase();

    return vendedores.filter((vendedores:any) => (vendedores.nom_sitioventa.toLowerCase().includes(filterNom)));
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.idSitiosVentas(event.option.value)
  }

  public idSitiosVentas(idSitioventa:any){
    const listaSitioVenta = idSitioventa
    this.listaIdSitioVenta.push(listaSitioVenta.ideSitioventa)
    let ultimo = this.listaIdSitioVenta[this.listaIdSitioVenta.length - 1]
    localStorage.setItem("v", ultimo)
    let penultimo = this.listaIdSitioVenta[this.listaIdSitioVenta.length - 2]
  }

  public guardar(){
    var oficina = this.formInventario.controls["oficina"].value
    var sitioVent = Number(localStorage.getItem("v"))
    var serial = this.formInventario.controls["serial"].value
    var placa = this.formInventario.controls["placa"].value
    var usua = this.formInventario.controls["usuario"].value
    if(oficina != null && sitioVent != 0 && serial == null && placa == null && usua == null){
      this.reporteSitioVenta();
    }else if(oficina == null && sitioVent == 0 && serial != null && placa == null && usua == null){
      this.reporteSerial();
    }else if(oficina == null && sitioVent == 0 && serial == null && placa != null && usua == null){
      this.reportePlaca();
    }else if(oficina == null && sitioVent == 0 && serial == null && placa == null && usua != null){
      this.reporteUsuario();
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Campos vacios o no ha seleccionado ninguna opcion!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  listaInventarioBaja = []
  reporteSitioVenta(){
    this.lista = []
    this.listaInventarioBaja = []
    this.servicioAsignacionPuntoVenta.listarTodos().subscribe(resAsignacion=>{
      this.servicioInventario.listarTodos().subscribe(resInventario=>{
        this.servicioConsultasGenerales.listarInventariosSinBaja().subscribe(resInventarioSinBaja=>{
          resInventarioSinBaja.forEach(elementInventarioBaja => {
            resInventario.forEach(elementInventario => {
              if(elementInventario.id == elementInventarioBaja.id){
                this.listaInventarioBaja.push(elementInventario)
              }
            });
          });
          resAsignacion.forEach(element => {
            this.listaInventarioBaja.forEach(elementInventario => {
              if(element.idSitioVenta == Number(localStorage.getItem('v'))){
                if(elementInventario.idDetalleArticulo.id == element.idAsignacionesArticulos.idDetalleArticulo.id){
                  var obj = {
                    Articulo: element.idAsignacionesArticulos.idDetalleArticulo.idArticulo.descripcion,
                    CodigoUnico: "",
                    Placa: "",
                    Marca: "",
                    Serial: "",
                    TipoActivo: "",
                    Categoria: element.idAsignacionesArticulos.idDetalleArticulo.idArticulo.idCategoria.descripcion,
                    Oficina: element.nombreOficina,
                    SitioVenta: element.nombreSitioVenta,
                    UsuarioLogueado: element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.nombre + " " + element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.apellido,
                    EstadoAsignacion: element.idAsignacionesArticulos.idEstado.descripcion,
                    Observacion: "",
                  }
                  obj.Placa = elementInventario.idDetalleArticulo.placa
                  obj.Marca = elementInventario.idDetalleArticulo.marca
                  obj.Serial = elementInventario.idDetalleArticulo.serial
                  obj.TipoActivo= elementInventario.idDetalleArticulo.idTipoActivo.descripcion
                  if(element.idAsignacionesArticulos.idEstado.id == 76){
                    obj.Observacion = "La asignacion de este articulo fue aprobada por "+element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.apellido+"."
                  }else{
                    obj.Observacion = "La asignacion de este articulo esta pendiente de ser aprobada por "+element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.apellido+"."
                  }
                  this.lista.push(obj)
                }
              }
            });
          });
          if(this.lista.length > 0){
            this.dataSource = new MatTableDataSource(this.lista);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            document.getElementById('excelReporte')?.setAttribute('style', 'display: block;')
            document.getElementById('reporteInventario')?.setAttribute('style', 'display: block;')
            document.getElementById('paginatorTabla')?.setAttribute('style', 'display: block;')
          }else{
            document.getElementById('excelReporte')?.setAttribute('style', 'display: none;')
            document.getElementById('reporteInventario')?.setAttribute('style', 'display: none;')
            document.getElementById('paginatorTabla')?.setAttribute('style', 'display: none;')
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'No hay datos para mostrar!',
              showConfirmButton: false,
              timer: 2500
            })
          }
        })
      })
    })
  }

  listaAsignacionArticulosBaja = []
  reporteSerial(){
    this.lista = []
    this.listaInventarioBaja = []
    this.listaAsignacionArticulosBaja = []
    var serial = this.formInventario.controls["serial"].value;
    this.servicioConsultasGenerales.listarAsignacionesActivosSinBaja().subscribe(resAignacionesActivosSinBaja=>{
      this.servicioAsignacionArticulo.listarTodos().subscribe(resAsignacionesactivos=>{
        this.servicioAsignacionPuntoVenta.listarTodos().subscribe(resAsignacionPuntoVenta=>{
          this.servicioInventario.listarTodos().subscribe(resInventario=>{
            resAignacionesActivosSinBaja.forEach(elementActivoSinBaja => {
              resAsignacionesactivos.forEach(elementAsignacionActivo => {
                if(elementAsignacionActivo.id == elementActivoSinBaja.id){
                  this.listaAsignacionArticulosBaja.push(elementAsignacionActivo)
                }
              });
            });
            this.listaAsignacionArticulosBaja.forEach(element => {
              resInventario.forEach(elementInventario => {
                if(elementInventario.idDetalleArticulo.serial.toLowerCase() == serial.toLowerCase() && (element.idEstado.id == 76 || element.idEstado.id == 78) && elementInventario.idDetalleArticulo.id == element.idDetalleArticulo.id){
                  this.idPuntoVentaAsign = 0
                  var obj = {
                    Articulo: elementInventario.idDetalleArticulo.idArticulo.descripcion,
                    Placa: elementInventario.idDetalleArticulo.placa,
                    Marca: elementInventario.idDetalleArticulo.marca,
                    Serial: elementInventario.idDetalleArticulo.serial,
                    TipoActivo: elementInventario.idDetalleArticulo.idTipoActivo.descripcion,
                    Categoria: elementInventario.idDetalleArticulo.idArticulo.idCategoria.descripcion,
                    Oficina: "",
                    SitioVenta: "",
                    UsuarioLogueado: element.idAsignacionesProcesos.idUsuario.nombre + " " + element.idAsignacionesProcesos.idUsuario.apellido,
                    EstadoAsignacion: element.idEstado.descripcion,
                    Observacion: "",
                  }
                  resAsignacionPuntoVenta.forEach(elementPuntoVenta => {
                    if(elementPuntoVenta.idAsignacionesArticulos.id == element.id){
                      this.idPuntoVentaAsign = elementPuntoVenta.id
                    }
                  });
                  if(this.idPuntoVentaAsign != 0){
                    this.servicioAsignacionPuntoVenta.listarPorId(this.idPuntoVentaAsign).subscribe(resAsignPuntoVenta=>{
                      obj.Oficina = String(resAsignPuntoVenta.nombreOficina)
                      obj.SitioVenta = String(resAsignPuntoVenta.nombreSitioVenta)
                    })
                  }
                  if(element.idEstado.id == 76){
                    obj.Observacion = "La asignacion de este articulo fue aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
                  }else{
                    obj.Observacion = "La asignacion de este articulo esta pendiente de ser aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
                  }
                  this.lista.push(obj)
                }
              });
            })
            if(this.lista.length > 0){
              this.dataSource = new MatTableDataSource(this.lista);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              document.getElementById('excelReporte')?.setAttribute('style', 'display: block;')
              document.getElementById('reporteInventario')?.setAttribute('style', 'display: block;')
              document.getElementById('paginatorTabla')?.setAttribute('style', 'display: block;')
            }else{
              document.getElementById('excelReporte')?.setAttribute('style', 'display: none;')
              document.getElementById('reporteInventario')?.setAttribute('style', 'display: none;')
              document.getElementById('paginatorTabla')?.setAttribute('style', 'display: none;')
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No hay datos para mostrar!',
                showConfirmButton: false,
                timer: 2500
              })
            }
          })
        })
      })
    })
  }

  reportePlaca(){
    this.lista = []
    this.listaInventarioBaja = []
    this.listaAsignacionArticulosBaja = []
    var placa = this.formInventario.controls["placa"].value
    this.servicioConsultasGenerales.listarAsignacionesActivosSinBaja().subscribe(resAignacionesActivosSinBaja=>{
      this.servicioAsignacionArticulo.listarTodos().subscribe(resAsignacionesactivos=>{
        this.servicioAsignacionPuntoVenta.listarTodos().subscribe(resAsignacionPuntoVenta=>{
          this.servicioInventario.listarTodos().subscribe(resInventario=>{
            resAignacionesActivosSinBaja.forEach(elementActivoSinBaja => {
              resAsignacionesactivos.forEach(elementAsignacionActivo => {
                if(elementAsignacionActivo.id == elementActivoSinBaja.id){
                  this.listaAsignacionArticulosBaja.push(elementAsignacionActivo)
                }
              });
            });
            this.listaAsignacionArticulosBaja.forEach(element => {
              resInventario.forEach(elementInventario => {
              if(elementInventario.idDetalleArticulo.placa.toLowerCase() == placa.toLowerCase() && (element.idEstado.id == 76 || element.idEstado.id == 78) && elementInventario.idDetalleArticulo.id == element.idDetalleArticulo.id){
                this.idPuntoVentaAsign = 0
                var obj = {
                  Articulo: elementInventario.idDetalleArticulo.idArticulo.descripcion,
                  Placa: elementInventario.idDetalleArticulo.placa,
                  Marca: elementInventario.idDetalleArticulo.marca,
                  Serial: elementInventario.idDetalleArticulo.serial,
                  TipoActivo: elementInventario.idDetalleArticulo.idTipoActivo.descripcion,
                  Categoria: elementInventario.idDetalleArticulo.idArticulo.idCategoria.descripcion,
                  Oficina: "",
                  SitioVenta: "",
                  UsuarioLogueado: element.idAsignacionesProcesos.idUsuario.nombre + " " + element.idAsignacionesProcesos.idUsuario.apellido,
                  EstadoAsignacion: element.idEstado.descripcion,
                  Observacion: "",
                }
                resAsignacionPuntoVenta.forEach(elementPuntoVenta => {
                  if(elementPuntoVenta.idAsignacionesArticulos.id == element.id){
                    this.idPuntoVentaAsign = elementPuntoVenta.id
                  }
                });
                if(this.idPuntoVentaAsign != 0){
                  this.servicioAsignacionPuntoVenta.listarPorId(this.idPuntoVentaAsign).subscribe(resAsignPuntoVenta=>{
                    obj.Oficina = String(resAsignPuntoVenta.nombreOficina)
                    obj.SitioVenta = String(resAsignPuntoVenta.nombreSitioVenta)
                  })
                }
                if(element.idEstado.id == 76){
                  obj.Observacion = "La asignacion de este articulo fue aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
                }else{
                  obj.Observacion = "La asignacion de este articulo esta pendiente de ser aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
                }
                this.lista.push(obj)
                }
              })
            });
            if(this.lista.length > 0){
              this.dataSource = new MatTableDataSource(this.lista);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              document.getElementById('excelReporte')?.setAttribute('style', 'display: block;')
              document.getElementById('reporteInventario')?.setAttribute('style', 'display: block;')
              document.getElementById('paginatorTabla')?.setAttribute('style', 'display: block;')
            }else{
              document.getElementById('excelReporte')?.setAttribute('style', 'display: none;')
              document.getElementById('reporteInventario')?.setAttribute('style', 'display: none;')
              document.getElementById('paginatorTabla')?.setAttribute('style', 'display: none;')
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No hay datos para mostrar!',
                showConfirmButton: false,
                timer: 2500
              })
            }
          })
        })
      })
    })
  }

  idPuntoVentaAsign: any;
  reporteUsuario(){
    this.lista = []
    this.listaInventarioBaja = []
    this.listaAsignacionArticulosBaja = []
    var usua = this.formInventario.controls["usuario"].value
    this.servicioConsultasGenerales.listarAsignacionesActivosSinBaja().subscribe(resAignacionesActivosSinBaja=>{
      this.servicioAsignacionArticulo.listarTodos().subscribe(resAsignacionesactivos=>{
        this.servicioAsignacionPuntoVenta.listarTodos().subscribe(resAsignacionPuntoVenta=>{
          this.servicioInventario.listarTodos().subscribe(resInventario=>{
            resAignacionesActivosSinBaja.forEach(elementActivoSinBaja => {
              resAsignacionesactivos.forEach(elementAsignacionActivo => {
                if(elementAsignacionActivo.id == elementActivoSinBaja.id){
                  this.listaAsignacionArticulosBaja.push(elementAsignacionActivo)
                }
              });
            });
            this.listaAsignacionArticulosBaja.forEach(element => {
              resInventario.forEach(elementInventario => {
                if(element.idAsignacionesProcesos.idUsuario.id == usua && (element.idEstado.id == 76 || element.idEstado.id == 78)){
                  if(elementInventario.idDetalleArticulo.id == element.idDetalleArticulo.id){
                    this.idPuntoVentaAsign = 0
                    var obj = {
                      Articulo: element.idDetalleArticulo.idArticulo.descripcion,
                      CodigoUnico: "",
                      Placa: "",
                      Marca: "",
                      Serial: "",
                      TipoActivo: "",
                      Categoria: element.idDetalleArticulo.idArticulo.idCategoria.descripcion,
                      Oficina: "",
                      SitioVenta: "",
                      UsuarioLogueado: element.idAsignacionesProcesos.idUsuario.nombre + " " + element.idAsignacionesProcesos.idUsuario.apellido,
                      EstadoAsignacion: element.idEstado.descripcion,
                      Observacion: "",
                    }
                    resAsignacionPuntoVenta.forEach(elementPuntoVenta => {
                      if(elementPuntoVenta.idAsignacionesArticulos.id == element.id){
                        this.idPuntoVentaAsign = elementPuntoVenta.id
                      }
                    });
                    if(this.idPuntoVentaAsign != 0){
                      this.servicioAsignacionPuntoVenta.listarPorId(this.idPuntoVentaAsign).subscribe(resAsignPuntoVenta=>{
                        obj.Oficina = String(resAsignPuntoVenta.nombreOficina)
                        obj.SitioVenta = String(resAsignPuntoVenta.nombreSitioVenta)
                      })
                    }
                    obj.Placa = elementInventario.idDetalleArticulo.placa
                    obj.Marca = elementInventario.idDetalleArticulo.marca
                    obj.Serial = elementInventario.idDetalleArticulo.serial
                    obj.TipoActivo = elementInventario.idDetalleArticulo.idTipoActivo.descripcion
                    if(element.idEstado.id == 76){
                      obj.Observacion = "La asignacion de este articulo fue aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
                    }else{
                      obj.Observacion = "La asignacion de este articulo esta pendiente de ser aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
                    }
                    this.lista.push(obj)
                  }
                }
              });
            })
            if(this.lista.length > 0){
              this.dataSource = new MatTableDataSource(this.lista);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              document.getElementById('excelReporte')?.setAttribute('style', 'display: block;')
              document.getElementById('reporteInventario')?.setAttribute('style', 'display: block;')
              document.getElementById('paginatorTabla')?.setAttribute('style', 'display: block;')
            }else{
              document.getElementById('excelReporte')?.setAttribute('style', 'display: none;')
              document.getElementById('reporteInventario')?.setAttribute('style', 'display: none;')
              document.getElementById('paginatorTabla')?.setAttribute('style', 'display: none;')
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No hay datos para mostrar!',
                showConfirmButton: false,
                timer: 2500
              })
            }
          })
        })
      })
    })
  }

  listaExcel: any = []
  exportToExcel(){
    this.listaExcel = []
    this.lista.forEach(elementAsignActivo => {
      var obj = {
        Articulo: elementAsignActivo.Articulo,
        'Codigo Unico': elementAsignActivo.CodigoUnico,
        Placa: elementAsignActivo.Placa,
        Marca: elementAsignActivo.Marca,
        Serial: elementAsignActivo.Serial,
        'Tipo de Activo': elementAsignActivo.TipoActivo,
        Categoria: elementAsignActivo.Categoria,
        'Nombre Oficina': elementAsignActivo.Oficina,
        'Nombre Sitio de Venta': elementAsignActivo.SitioVenta,
        'Usuario Asignado': elementAsignActivo.UsuarioLogueado,
        'Estado Asignacion': elementAsignActivo.EstadoAsignacion,
        Observacion: elementAsignActivo.Observacion
      }
      this.listaExcel.push(obj)
    });
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listaExcel);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "ReporteInventarioSitioVenta");
    });

  }

  name = 'ReporteInventario.xlsx';
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
