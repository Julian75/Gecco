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
  ) { }

  ngOnInit(): void {
    this.listarTodo();
  }

  listaArchivosExist: any = []
  validar2: boolean = false
  public listarTodo(){
    console.log("holis")
    console.log(this.data)
    this.listaArchivosExist = []
    this.servicioHistorial.listarTodos().subscribe( res => {
      res.forEach((element: any) => {
        if(element.idSolicitudSC.id == this.data){
          var obj = {
            elemento: element,
            validar3: false
          }
          this.servicioSoporte.listarTodos().subscribe(resSopor=>{
            resSopor.forEach(elementSoporte=>{
              if(elementSoporte.idHistorial.id == element.id){
                console.log("yes entro1")
                this.servicioPdf.listarTodos().subscribe(resPdf=>{
                  this.listaPdf.push(resPdf)
                  for (const i in resPdf) {
                    if (elementSoporte.descripcion == resPdf[i].name) {
                      obj.validar3 = true
                    }
                  }
                })
              }
            })
            this.listarComentarios.push(obj);
            console.log(this.listarComentarios)
            this.dataSource = new MatTableDataSource(this.listarComentarios);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        }
      });
    })
  }


  //Descargar Cotizacion Individualmente
  public descargarPdf(id: number){
    this.servicioSoporte.listarPorId(id).subscribe(res=>{
      this.servicioPdf.listarTodos().subscribe(resPdf => {
        for(const i in resPdf){
          if (res.descripcion == resPdf[i].name) {
            window.location.href = this.listaPdf[0][i].url
          }
        }
        console.log(this.validar)
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
  name = 'Historial.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('turnos');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}