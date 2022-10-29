import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { AgregarRecordatorioComponent } from './agregar-recordatorio/agregar-recordatorio.component';
import { RecordatorioService } from 'src/app/servicios/recordatorio.service';
import { Recordatorio } from 'src/app/modelos/recordatorio';
import * as FileSaver from 'file-saver';
import { ChatRemitenteService } from 'src/app/servicios/chatRemitente.service';
import * as moment from 'moment';
import { AccesoService } from 'src/app/servicios/Acceso.service';

@Component({
  selector: 'app-lista-recordatorios',
  templateUrl: './lista-recordatorios.component.html',
  styleUrls: ['./lista-recordatorios.component.css']
})
export class ListaRecordatoriosComponent implements OnInit {
  dtOptions: any = {};
  public listarRecordatorio: any = [];
  public fechaActual: Date = new Date();

  displayedColumns = ['id', 'descripcion', 'fecha', 'Hora', 'tipoEnvio', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private recordatorioService: RecordatorioService,
    private chatServicio: ChatRemitenteService,
    private AccesosServicio: AccesoService,
  ) { }

  ngOnInit(): void {
    this.listarTodo();
    this.listaCorreos();
  }

  listarTodo() {
    this.recordatorioService.listarTodos().subscribe( data => {
      data.forEach(elementRecordatorio => {
        var fechaAlmacenada = new Date(elementRecordatorio.fecha)
        fechaAlmacenada.setDate(fechaAlmacenada.getDate()+1)
        var obj = {
          cumplimiento: false,
          recordatorio: elementRecordatorio,
        }
        if((elementRecordatorio.tipoEnvio=='Mensual' && fechaAlmacenada.getDate() == this.fechaActual.getDate() && elementRecordatorio.cumplimiento == 'No') || (elementRecordatorio.tipoEnvio=='Diario' && elementRecordatorio.cumplimiento == 'No') ||(elementRecordatorio.tipoEnvio=='Ninguna' && fechaAlmacenada.getFullYear() == this.fechaActual.getFullYear() && fechaAlmacenada.getMonth() == this.fechaActual.getMonth() && fechaAlmacenada.getDate() == this.fechaActual.getDate() && elementRecordatorio.cumplimiento == 'No')){
          obj.cumplimiento = true
        }else{
          obj.cumplimiento = false
        }
        this.listarRecordatorio.push(obj)
      });
      this.dataSource = new MatTableDataSource(this.listarRecordatorio);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  cumplido(){

  }

  listaCorreosPqrs: any = []
  listaCorreosPqrsCompletos: any = []
  listaAccesos: any = []
  listaCorreos(){
    this.listaCorreosPqrs = []
    this.listaCorreosPqrsCompletos = []
    this.chatServicio.listarTodos().subscribe(resCorreosSOlicitudPQRS=>{
      this.AccesosServicio.listarTodos().subscribe(resAccesos=>{
        resCorreosSOlicitudPQRS.forEach(elementCorreoSolicitudPQRS => {
          var obj = {
            chatCorreos: elementCorreoSolicitudPQRS,
            emisor: false //Para saber si este usuario es quien tiene el modulo 38
          }
          this.listaAccesos = []
          resAccesos.forEach(elementAcesos => {
           if(elementAcesos.idRol.id == elementCorreoSolicitudPQRS.idUsuarioEnvia.idRol.id){
            this.listaAccesos.push(elementAcesos.idModulo.id)
           }
          });
          this.listaAccesos.forEach(elementAcceso => {
            if(elementAcceso == 38){
              obj.emisor = true
            }
          });
          this.listaCorreosPqrs.push(obj)
          this.listaCorreosPqrsCompletos = this.listaCorreosPqrs.sort((a, b) => Number(new Date(a.chatCorreos.fecha)) - Number(new Date(b.chatCorreos.fecha)))
        });
      })
    })
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarRecordatorioComponent, {
      width: '500px',
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarRecordatorio);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: Recordatorio, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      }
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  listadoRecordatorios: any = []; //listar todos los datos del servicio recordatorio
  listaRecordatorios: any = [] //lista que nos sirve para guardar los objetos que se van a mostrar en el excel
  exportToExcel(): void {
    this.listadoRecordatorios = []
    this.recordatorioService.listarTodos().subscribe(resSubProcesos=>{
      this.listaRecordatorios = resSubProcesos
      for (let index = 0; index < this.listaRecordatorios.length; index++) {
        const element = this.listaRecordatorios[index];
        var obj = {
          "Id": element.id,
          "Fecha": element.fecha,
          "Evento": element.descripcion,
        }
        this.listadoRecordatorios.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listadoRecordatorios);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaEventosRecordatorio");
      });
    })
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
