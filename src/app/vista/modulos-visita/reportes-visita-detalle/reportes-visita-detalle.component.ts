import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitaDetalleService } from 'src/app/servicios/visitaDetalle.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { VisitasService } from 'src/app/servicios/visitas.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reportes-visita-detalle',
  templateUrl: './reportes-visita-detalle.component.html',
  styleUrls: ['./reportes-visita-detalle.component.css']
})
export class ReportesVisitaDetalleComponent implements OnInit {
  dtOptions: any = {};
  public formVisitaDetalle!: FormGroup;
  public listarVisitaDetalle: any = [];
  public lista: any = [];
  public listaVisitaDetalleCompleta:any = [];
  public listarExiste : any = [];
  public encontrar = false
  public listaVisita: any = [];
  public content: any;
  color = ('primary');
  displayedColumns = ['id', 'fecha', 'observacion', 'idVendedor', 'tipodeNovedad', 'Usuario'];
  dataSource!:MatTableDataSource<any>;
  constructor(
    private fb: FormBuilder,
    private servicioVisitaDetalle : VisitaDetalleService,
    private servicioUsuario : UsuarioService,
    private servicioVisita : VisitasService
  ) { }

  ngOnInit(): void {
    this.crearFormulario()
  }
  private crearFormulario() {
    this.formVisitaDetalle = this.fb.group({
      id: 0,
      fechaInicio: [null,Validators.required],
      fechaFinal: [null,Validators.required],
    });
  }

  public listarTodo(){
    this.listarVisitaDetalle = []
    this.listaVisita = []
    const fechaI = this.formVisitaDetalle.controls['fechaInicio'].value
    const fechaF = this.formVisitaDetalle.controls['fechaFinal'].value;
    const idUsuario = Number(sessionStorage.getItem('id'));
    this.servicioUsuario.listarPorId(idUsuario).subscribe( (dataUsuario: any) => {
      this.servicioVisita.listarTodos().subscribe( (dataVisita: any) => {
        dataVisita.forEach((element:any) => {
          if(fechaI <= element.fechaRegistro && fechaF == element.fechaRegistro){
            this.listaVisita.push(element)
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se encontraron visitas en ese rango de fechas',
            })
          }
        })
        this.listaVisita.forEach((elementVisi:any) => {
          this.servicioVisitaDetalle.listarTodos().subscribe( (dataVisitaDetalle: any) => {
            dataVisitaDetalle.forEach((elementVisitadetalle:any) => {
              if(elementVisitadetalle.idVisitas.id == elementVisi.id){
                this.listarVisitaDetalle.push(elementVisitadetalle)
              }
            })
            this.listaVisitaDetalleCompleta = this.listarVisitaDetalle
            this.lista = []
            this.listaVisitaDetalleCompleta.forEach((element:any) => {

              var objeto = {
                descripcion: element.descripcion,
                elementoVisita: element.idElementosVisita.descripcion,
                opcionesVisita: element.idOpcionesVisita.descripcion,
                fechaVisita: element.idVisitas.fechaRegistro,
                nombreUsuario: element.idVisitas.idUsuario.nombre+" "+element.idVisitas.idUsuario.apellido,
                idSitioVenta: element.ideSitioventa,
                nombreSitioVenta: element.nomSitioventa

              }
              this.lista.push(objeto)
            })
            if(this.lista.length == 0){
              Swal.fire({
                title: 'No hay registros',
                text: '',
                icon: 'warning',
                confirmButtonText: 'Ok'
              })
            }else{
              this.exportToExcel(this.lista);
            }
          })
        })
      })
    })
  }

  name = 'ReporteVisitaDetalle.xlsx';
  public exportToExcel(listaReporteVisitaDetalle:any): void {
    if (listaReporteVisitaDetalle.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(listaReporteVisitaDetalle);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "ExportExcel");
      });
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
