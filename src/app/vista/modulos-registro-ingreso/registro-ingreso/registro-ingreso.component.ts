import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';
import { IngresoPersonalEmpresa } from 'src/app/modelos/ingresoPersonalEmpresa';
import { IngresoPersonalEmpresaService } from 'src/app/servicios/ingresoPersonalEmpresa.service';
import { AgregarPersonalComponent } from '../agregar-personal/agregar-personal.component';
import { IngresoPersonalEmpresa2 } from 'src/app/modelos/modelos2/ingresoPersonalEmpresa2';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-registro-ingreso',
  templateUrl: './registro-ingreso.component.html',
  styleUrls: ['./registro-ingreso.component.css']
})
export class RegistroIngresoComponent implements OnInit {

  public listaRegistro: any = [];
  public listaRegistro2: any = [];
  public personasRegistradas: any = [];
  public lista: any = [];
  public fecha: Date = new Date();
  public lis: any = [];
  public estados: any = [];
  public validar :any =[]


  myControl = new FormControl<string | IngresoPersonalEmpresa>("");
  options: IngresoPersonalEmpresa[] = [];
  filteredOptions!: Observable<IngresoPersonalEmpresa[]>;

  displayedColumns = ['id', 'nombre','fecha', 'horaIng', 'horaSal', 'area', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  datepipe: any;
  constructor(
    private servicioRegistro : IngresoPersonalEmpresaService,
    private servicioEstado : EstadoService,
    private servicioModificar : ModificarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
    this.listarRegistro();
  }

  abrirModal(valor): void {
      if(typeof(this.document) === "object"){
        if(this.document.idEstado.id == 73){
          const dialogRef = this.dialog.open(AgregarPersonalComponent, {
            width: '400px',
            data: this.document,
            disableClose: true,
            height: '440px',
          });
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ya existe un registro de ingreso!',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload();
        }
        this.document = undefined
      }else{
        const dialogRef = this.dialog.open(AgregarPersonalComponent, {
          width: '850px',
          data: valor,
          disableClose: true,
          height: '440px',
        });
      }

  }

  public listarTodos() {
    this.servicioRegistro.listarTodos().subscribe(res => {
      this.listaRegistro2 = res
      res.forEach(element => {
        if(element.idEstado.id == 72){
          this.listaRegistro.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.listaRegistro);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public listarRegistro(){
    var personasRegistradas2 = []
    this.servicioRegistro.listarTodos().subscribe(res=>{
      this.personasRegistradas = res
      let result = this.personasRegistradas.filter((item: any, index: any) => {
        if (index === this.personasRegistradas.findLastIndex((item2: any) => item2.documento === item.documento)) {
          this.lis.push(item)
        }

      });
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map(value => {
          const num_identificacion = typeof value == 'string' ? value : value?.documento.toString();
          return num_identificacion ? this._filter(num_identificacion as string, this.lis) : this.lis.slice();
        }),
      );
    })
  }

  textoRegistro:any
  displayFn(registro: IngresoPersonalEmpresa): any {
    this.textoRegistro = registro
    if(this.textoRegistro == ""){
      this.textoRegistro = " "
    }else{
      this.textoRegistro = registro.documento.toString()

      return this.textoRegistro;
    }
  }

  num:any
  public _filter(numIdentificacion: string, registro:any): IngresoPersonalEmpresa[] {

    const filterValue = numIdentificacion;

    this.num = (registro.filter((registro:any) => (registro.documento.toString().includes(filterValue)))).length
    return registro.filter((registro:any) => (registro.documento.toString().includes(filterValue)));
  }

  document: any;
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.document = event.option.value
  }

  public eliminarIngreso(id: number){
    let personal : IngresoPersonalEmpresa2 = new IngresoPersonalEmpresa2();
    this.servicioRegistro.listarPorId(id).subscribe(res=>{
      personal.id = res.id
      personal.nombre = res.nombre
      personal.apellido = res.apellido
      personal.documento = res.documento
      var fecha = new Date(res.fecha)
      fecha.setDate(fecha.getDate()+1)
      personal.fecha = fecha
      personal.horaIngreso = res.horaIngreso
      personal.ide_oficina = res.ideOficina
      personal.id_area = res.idArea.id
      personal.id_sede = res.idSedes.id
      personal.idTipoDocumento = res.idTipoDocumento.id
      personal.nombreImagen = res.nombreImagen
      personal.rh = res.rh
      personal.telefono = res.telefono
      personal.eps = res.eps
      personal.arl = res.arl
      this.servicioEstado.listarPorId(73).subscribe(resEstado=>{
        personal.id_estado = resEstado.id
        if(this.fecha.getMinutes() < 10){
          personal.horaSalida = this.fecha.getHours()+":0"+this.fecha.getMinutes()
        }else{
          personal.horaSalida = this.fecha.getHours()+":"+this.fecha.getMinutes()
        }
        this.modificarPersonal(personal);
      });
    })
  }

  public modificarPersonal(personal: IngresoPersonalEmpresa2){
    this.servicioModificar.actualizarIngresoPersonalEmpresa(personal).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se cerro el turno correctamente!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    }, err => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocurrió un error al eliminar!',
        showConfirmButton: false,
        timer: 1500
        })
    })
  }
  fechaInicio: any;
  fechaFin: any;
  star: any;
  end: any;
  noRegistro = false;

  capturar(){
    this.range.valueChanges.subscribe((res:any)=>{
      const fechaInicio = new Date(res.start);
      const fechaFin = new Date(res.end);
      if(fechaInicio.getDate() < 10 && fechaFin.getDate() < 10 && fechaInicio.getMonth() < 10 && fechaFin.getMonth() < 10){
        this.star = fechaInicio.getFullYear()+"-0"+(fechaInicio.getMonth()+1)+"-0"+fechaInicio.getDate()
        this.end = fechaFin.getFullYear()+"-0"+(fechaFin.getMonth()+1)+"-0"+fechaFin.getDate()
      }else if(fechaInicio.getMonth() <= 10 && fechaFin.getMonth() <= 10){
        this.star = fechaInicio.getFullYear()+"-0"+(fechaInicio.getMonth()+1)+"-"+fechaInicio.getDate()
        this.end = fechaFin.getFullYear()+"-0"+(fechaFin.getMonth()+1)+"-"+fechaFin.getDate()
      }else{
        this.star = fechaInicio.getFullYear()+"-"+(fechaInicio.getMonth()+1)+"-"+fechaInicio.getDate()
        this.end = fechaFin.getFullYear()+"-"+(fechaFin.getMonth()+1)+"-"+fechaFin.getDate()
      }
    })
    this.lista = []
    this.validar = []
      const fechaInicio = new Date(this.range.value.start);
      const fechaFin = new Date(this.range.value.end);
      const fechaInicio2 = fechaInicio.getFullYear() + "-" + (fechaInicio.getMonth() + 1) + "-" + fechaInicio.getDate();
      const fechaFin2 = fechaFin.getFullYear() + "-" + (fechaFin.getMonth() + 1) + "-" + fechaFin.getDate();
      if(fechaInicio.getMonth() < 10 && fechaFin.getMonth() < 10){
        this.fechaInicio = fechaInicio.getFullYear() + "-0" + (fechaInicio.getMonth() + 1) + "-" + fechaInicio.getDate();
        this.fechaFin = fechaFin.getFullYear() + "-0" + (fechaFin.getMonth() + 1) + "-" + fechaFin.getDate();
      }else{
        this.fechaInicio = fechaInicio.getFullYear() + "-" + (fechaInicio.getMonth() + 1) + "-" + fechaInicio.getDate();
        this.fechaFin = fechaFin.getFullYear() + "-" + (fechaFin.getMonth() + 1) + "-" + fechaFin.getDate();
      }
      this.listaRegistro2.forEach(element => {
        if(element.fecha <= this.fechaFin){
          var obj = {
            nombre: element.nombre + " " + element.apellido,
            sede: element.idSedes.descripcion,
            documento: element.documento,
            tipoDocumento: element.idTipoDocumento.descripcion,
            oficina: element.ideOficina,
            area: element.idArea.descripcion,
            eps: element.eps,
            rh: element.rh,
            arl: element.arl,
            telefono: element.telefono,
            fecha: element.fecha,
            horaIng: element.horaIngreso,
            horaSal: element.horaSalida,
          }
            this.lista.push(obj)
            console.log(obj)
        }
      });
      if(this.lista.length > 0){
        import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.lista);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, this.name);
        });
      }




  }
  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'listaRegistros.xlsx';
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
