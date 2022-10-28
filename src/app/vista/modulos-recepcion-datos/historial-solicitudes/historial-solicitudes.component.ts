import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { Component, OnInit, ViewChild,Inject  } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { HistorialSolicitudesService } from 'src/app/servicios/historialSolicitudes.service';
import { SoporteSCService } from 'src/app/servicios/soporteSC.service';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';
import { DescargasMultiplesComponent } from '../descargas-multiples/descargas-multiples.component';
import { SolicitudSCService } from 'src/app/servicios/solicitudSC.service';
import { HistorialSolicitudes } from 'src/app/modelos/historialSolicitudes';
import { ChatSolicitudesScComponent } from './chat-solicitudes-sc/chat-solicitudes-sc.component';

@Component({
  selector: 'app-historial-solicitudes',
  templateUrl: './historial-solicitudes.component.html',
  styleUrls: ['./historial-solicitudes.component.css']
})
export class HistorialSolicitudesComponent implements OnInit {

  public listarComentarios: any = [];
  public listaPdf: any = []
  public validar: boolean = false
  dtOptions: any = {};
  displayedColumns = ['id', 'observacion','solicitud','usuario','estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialog: MatDialog,
    private servicioSoporte: SoporteSCService,
    private servicioPdf: SubirPdfService,
    private servicioHistorial: HistorialSolicitudesService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioSolicitudPQRS: SolicitudSCService
  ) { }

  ngOnInit(): void {
    this.listarTodo();
  }

  listaArchivosExist: any = []
  validar2: boolean = false
  Cliente: any
  TelefonoCliente: any
  Auxiliar: any
  Escala:any
  Incidente:any
  public listarTodo(){
    this.listaPdf = []
    this.listaArchivosExist = []
    this.servicioSolicitudPQRS.listarPorId(Number(this.data)).subscribe(res=>{
      this.Cliente = res.idClienteSC.nombre+" "+res.idClienteSC.apellido
      this.TelefonoCliente = res.idClienteSC.telefono
      this.Auxiliar = res.auxiliarRadicacion
      this.Escala = res.idEscala.descripcion
      this.Incidente = res.incidente
    })
    this.servicioConsultasGenerales.listarHistorialesSolicitudes(this.data).subscribe(resHistoriales=>{
      var i = 0
      resHistoriales.forEach(element => {
        i++
        this.servicioConsultasGenerales.listarSoporteSC(element.id).subscribe(resSoportes=>{
          this.servicioHistorial.listarPorId(element.id).subscribe(resHistorial=>{
            var obj = {
              elemento: resHistorial,
              validar3: false
            }
            if(resSoportes.length == 0){
              obj.validar3 = false
            }else{
              resSoportes.forEach(elementSoporte=>{
                this.servicioPdf.listarTodosSegunda().subscribe(resPdf=>{
                  this.listaPdf.push(resPdf)
                  for (const i in resPdf) {
                    if (elementSoporte.descripcion == resPdf[i].name) {
                      obj.validar3 = true
                    }
                  }
                })
              })
            }
            this.listarComentarios.push(obj);
            if(i == resHistoriales.length){
              this.listarComentarios.sort(((a, b) => a.elemento.id - b.elemento.id));
              this.dataSource = new MatTableDataSource(this.listarComentarios);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          })
        })
      })
    })
  }


  //Descargar Cotizacion Individualmente
  public descargarPdf(id: number){
    var listaPdf = []
    this.servicioPdf.listarTodosSegunda().subscribe(resPdf => {
      this.servicioConsultasGenerales.listarSoporteSC(id).subscribe(resSoportes=>{
        resSoportes.forEach(elementSoporte => {
          for(const i in resPdf){
            if (elementSoporte.descripcion == resPdf[i].name) {
              listaPdf.push(resPdf[i])
            }
          }
        })
        if(listaPdf.length > 1){
          const dialogRef = this.dialog.open(DescargasMultiplesComponent, {
            width: '500px',
            data: listaPdf
          });
        }else if(listaPdf.length == 1){
          window.location.href = listaPdf[0].url;
        }
      });
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarComentarios);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: HistorialSolicitudes, filter: string) => {
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

  Chat(){
    const dialogRef = this.dialog.open(ChatSolicitudesScComponent, {
      width: '600px',
      height: '430px',
      data: this.data
    });
  }

  name = 'HistorialSolicitud.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('asignarTurnoVendedor2');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
