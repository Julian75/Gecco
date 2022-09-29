import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-reporte-inventario',
  templateUrl: './reporte-inventario.component.html',
  styleUrls: ['./reporte-inventario.component.css']
})
export class ReporteInventarioComponent implements OnInit {

  myControl = new FormControl<string | SitioVenta>("");
  options: SitioVenta[] = []
  filteredOptions!: Observable<SitioVenta[]>;

  public listaOpciones = ["Sitio Venta", "Serial", "Placa", "Usuario"]

  public formInventario!: FormGroup;
  color = ('primary');
  public listaOficinas: any = [];
  public listaIdOficinas: any = [];
  public listarSitioVentas: any = [];
  public listaSitioVenta: any = [];
  public listaIdSitioVenta: any = [];
  public listaUsuarios: any = [];

  public lista:any = []

  constructor(
    private fb: FormBuilder,
    private servicioOficina : OficinasService,
    private servicioSitioVenta : SitioVentaService,
    private servicioUsuario : UsuarioService,
    private servicioAsignacionPuntoVenta : AsignacionPuntoVentaService,
    private servicioAsignacionArticulo : AsignacionArticulosService,
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
  reporte(){
    if (this.opcion == "Sitio Venta") {
      document.getElementById("oficinaDiv").setAttribute("style","display: block;");
      document.getElementById("sitioVentaDiv").setAttribute("style","display: block;");
      document.getElementById("serialDiv").setAttribute("style","display: none;");
      document.getElementById("placaDiv").setAttribute("style","display: none;");
      document.getElementById("usuarioDiv").setAttribute("style","display: none;");
      this.crearFormulario();
    localStorage.removeItem("v");
    }else if(this.opcion == "Serial"){
      document.getElementById("serialDiv").setAttribute("style","display: block;");
      document.getElementById("oficinaDiv").setAttribute("style","display: none;");
      document.getElementById("sitioVentaDiv").setAttribute("style","display: none;");
      document.getElementById("placaDiv").setAttribute("style","display: none;");
      document.getElementById("usuarioDiv").setAttribute("style","display: none;");
      this.crearFormulario();
    localStorage.removeItem("v");
    }else if(this.opcion == "Placa"){
      document.getElementById("placaDiv").setAttribute("style","display: block;");
      document.getElementById("oficinaDiv").setAttribute("style","display: none;");
      document.getElementById("sitioVentaDiv").setAttribute("style","display: none;");
      document.getElementById("serialDiv").setAttribute("style","display: none;");
      document.getElementById("usuarioDiv").setAttribute("style","display: none;");
      this.crearFormulario();
    localStorage.removeItem("v");
    }else if(this.opcion == "Usuario"){
      document.getElementById("usuarioDiv").setAttribute("style","display: block;");
      document.getElementById("oficinaDiv").setAttribute("style","display: none;");
      document.getElementById("sitioVentaDiv").setAttribute("style","display: none;");
      document.getElementById("serialDiv").setAttribute("style","display: none;");
      document.getElementById("placaDiv").setAttribute("style","display: none;");
      this.crearFormulario();
    localStorage.removeItem("v");
    }else{
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

  reporteSitioVenta(){
    this.lista = []
    this.servicioAsignacionPuntoVenta.listarTodos().subscribe(resAsignacion=>{
      resAsignacion.forEach(element => {
        if(element.idSitioVenta == Number(localStorage.getItem('v'))){
          var obj = {
            Articulo: element.idAsignacionesArticulos.idDetalleArticulo.idArticulo.descripcion,
            "Codigo unico": element.idAsignacionesArticulos.idDetalleArticulo.codigoUnico,
            Placa: element.idAsignacionesArticulos.idDetalleArticulo.placa,
            Marca: element.idAsignacionesArticulos.idDetalleArticulo.marca,
            Serial: element.idAsignacionesArticulos.idDetalleArticulo.serial,
            "Tipo de activo": element.idAsignacionesArticulos.idDetalleArticulo.idTipoActivo.descripcion,
            Categoria: element.idAsignacionesArticulos.idDetalleArticulo.idArticulo.idCategoria.descripcion,
            Cantidad: element.cantidad,
            "Nombre oficina": element.nombreOficina,
            "Nombre sitio venta": element.nombreSitioVenta,
            "Usuario asignado para el articulo": element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.nombre + " " + element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.apellido,
            Estado: element.idAsignacionesArticulos.idEstado.descripcion,
            Observacion: "",
          }
          if(element.idAsignacionesArticulos.idEstado.id == 76){
            obj.Observacion = "La asignacion de este articulo fue aprobada por "+element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.apellido+"."
          }else{
            obj.Observacion = "La asignacion de este articulo esta pendiente de ser aprobada por "+element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.apellido+"."
          }
          this.lista.push(obj)
        }
      });
      if(this.lista.length > 0){
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.lista);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "ReporteInventarioSitioVenta");
        });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No hay datos para exportar!',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
        localStorage.removeItem("v");
      }
    })
  }

  reporteSerial(){
    this.lista = []
    var serial = this.formInventario.controls["serial"].value
    this.servicioAsignacionArticulo.listarTodos().subscribe(resAsignacion=>{
      resAsignacion.forEach(element => {
        if(element.idDetalleArticulo.serial == serial && (element.idEstado.id == 76 || element.idEstado.id == 78)){
          var obj = {
            Articulo: element.idDetalleArticulo.idArticulo.descripcion,
            "Codigo unico": element.idDetalleArticulo.codigoUnico,
            Placa: element.idDetalleArticulo.placa,
            Marca: element.idDetalleArticulo.marca,
            Serial: element.idDetalleArticulo.serial,
            "Tipo de activo": element.idDetalleArticulo.idTipoActivo.descripcion,
            Categoria: element.idDetalleArticulo.idArticulo.idCategoria.descripcion,
            "Usuario asignado para el articulo": element.idAsignacionesProcesos.idUsuario.nombre + " " + element.idAsignacionesProcesos.idUsuario.apellido,
            Estado: element.idEstado.descripcion,
            Observacion: "",
          }
          if(element.idEstado.id == 76){
            obj.Observacion = "La asignacion de este articulo fue aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
          }else{
            obj.Observacion = "La asignacion de este articulo esta pendiente de ser aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
          }
          this.lista.push(obj)
        }
      });
      if(this.lista.length > 0){
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.lista);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "ReporteInventarioSerial");
        });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No hay datos para exportar!',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
        localStorage.removeItem("v");
      }
    })
  }

  reportePlaca(){
    this.lista = []
    var placa = this.formInventario.controls["placa"].value
    this.servicioAsignacionArticulo.listarTodos().subscribe(resAsignacion=>{
      resAsignacion.forEach(element => {
        if(element.idDetalleArticulo.placa == placa && (element.idEstado.id == 76 || element.idEstado.id == 78)){
          var obj = {
            Articulo: element.idDetalleArticulo.idArticulo.descripcion,
            "Codigo unico": element.idDetalleArticulo.codigoUnico,
            Placa: element.idDetalleArticulo.placa,
            Marca: element.idDetalleArticulo.marca,
            Serial: element.idDetalleArticulo.serial,
            "Tipo de activo": element.idDetalleArticulo.idTipoActivo.descripcion,
            Categoria: element.idDetalleArticulo.idArticulo.idCategoria.descripcion,
            "Usuario asignado para el articulo": element.idAsignacionesProcesos.idUsuario.nombre + " " + element.idAsignacionesProcesos.idUsuario.apellido,
            Estado: element.idEstado.descripcion,
            Observacion: "",
          }
          if(element.idEstado.id == 76){
            obj.Observacion = "La asignacion de este articulo fue aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
          }else{
            obj.Observacion = "La asignacion de este articulo esta pendiente de ser aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
          }
          this.lista.push(obj)
        }
      });
      if(this.lista.length > 0){
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.lista);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "ReporteInventarioPlaca");
        });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No hay datos para exportar!',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
        localStorage.removeItem("v");
      }
    })
  }

  reporteUsuario(){
    this.lista = []
    var usua = this.formInventario.controls["usuario"].value
    this.servicioAsignacionArticulo.listarTodos().subscribe(resAsignacion=>{
      resAsignacion.forEach(element => {
        console.log(usua)
        if(element.idAsignacionesProcesos.idUsuario.id == usua && (element.idEstado.id == 76 || element.idEstado.id == 78)){
          var obj = {
            Articulo: element.idDetalleArticulo.idArticulo.descripcion,
            "Codigo unico": element.idDetalleArticulo.codigoUnico,
            Placa: element.idDetalleArticulo.placa,
            Marca: element.idDetalleArticulo.marca,
            Serial: element.idDetalleArticulo.serial,
            "Tipo de activo": element.idDetalleArticulo.idTipoActivo.descripcion,
            Categoria: element.idDetalleArticulo.idArticulo.idCategoria.descripcion,
            "Usuario asignado para el articulo": element.idAsignacionesProcesos.idUsuario.nombre + " " + element.idAsignacionesProcesos.idUsuario.apellido,
            Estado: element.idEstado.descripcion,
            Observacion: "",
          }
          if(element.idEstado.id == 76){
            obj.Observacion = "La asignacion de este articulo fue aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
          }else{
            obj.Observacion = "La asignacion de este articulo esta pendiente de ser aprobada por "+element.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionesProcesos.idUsuario.apellido+"."
          }
          this.lista.push(obj)
        }
      });
      if(this.lista.length > 0){
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.lista);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "ReporteInventarioUsuario");
        });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No hay datos para exportar!',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
        localStorage.removeItem("v");
      }
    })
  }

  name = 'ReporteInventario.xlsx';
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    window.location.reload();
    localStorage.removeItem("v");
  }

}
