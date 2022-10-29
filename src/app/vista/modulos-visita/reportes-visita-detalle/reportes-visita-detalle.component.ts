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
  public encontrar : any = [];
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
    this.listaVisitaDetalleCompleta = []
    const fechaI = new Date(this.formVisitaDetalle.controls['fechaInicio'].value)
    fechaI.setDate(fechaI.getDate() + 1)
    const fechaF = new Date(this.formVisitaDetalle.controls['fechaFinal'].value);
    fechaF.setDate(fechaF.getDate() + 1)
    var fechaIn = this.formVisitaDetalle.controls['fechaInicio'].value
    var fechaFn = this.formVisitaDetalle.controls['fechaFinal'].value
    if(fechaIn == null || fechaFn == null){
      Swal.fire({
        icon: 'error',
        title: 'Campos vacios',
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      if(fechaI>fechaF){
        Swal.fire({
          icon: 'error',
          title: 'Por favor seleccione una fecha válida',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        this.servicioVisita.listarTodos().subscribe(dataVisita => {
          dataVisita.forEach(elementVisita => {
            var fechaRegistro = new Date(elementVisita.fechaRegistro)
            fechaRegistro.setDate(fechaRegistro.getDate() + 1)
            if(fechaI <= fechaRegistro && fechaF >= fechaRegistro){
              this.listaVisita.push(elementVisita)
              this.encontrar = true
            }else if(fechaI>fechaF){
              this.encontrar = false
            }
            this.listarExiste.push(this.encontrar)
          })
          const existe = this.listarExiste.includes(true)
          if(existe == true){
            this.servicioVisitaDetalle.listarTodos().subscribe( (dataVisitaDetalle: any) => {
              dataVisitaDetalle.forEach((element:any) => {
                this.listaVisita.forEach((element2:any) => {
                  if(element.idVisitas.id == element2.id){
                    this.listarVisitaDetalle.push(element)
                  }
                }
                )
              }
              )
              this.listarVisitaDetalle.forEach((element:any) => {
                this.listaVisitaDetalleCompleta.push(element)
              }
              )
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
              });
              if( this.lista.length == 0 ){
                Swal.fire({
                  icon: 'error',
                  title: 'Visita registrada pero no hizo el conteo',
                  showConfirmButton: false,
                  timer: 1500
                });
              }else{
                this.exportToExcel(this.lista);
              }
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'No hay registros en la fecha seleccionada',
              showConfirmButton: false,
              timer: 1500
            });
          }

        })
      }
    }
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
