import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NovedadService } from 'src/app/servicios/novedad.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  dtOptions: any = {};
  public formNovedad!: FormGroup;
  public listarNovedades: any = [];
  public lista: any = [];
  public fecha: Date = new Date();
  public fechaActual:any
  public listaNovedad:any = [];
  public content: any;
  color = ('primary');
  displayedColumns = ['id', 'fecha', 'observacion', 'idVendedor', 'tipodeNovedad', 'Usuario'];
  dataSource!:MatTableDataSource<any>;
  constructor(
    private fb: FormBuilder,
    private novedadService: NovedadService,
  ) { }




  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formNovedad = this.fb.group({
      id: 0,
      fechaInicio: [null,Validators.required],
      fechaFinal: [null,Validators.required],
    });
  }

  public listarTodo(){
    const fechaI = this.formNovedad.controls['fechaInicio'].value;
    const fechaF = this.formNovedad.controls['fechaFinal'].value;
    this.novedadService.listarTodos().subscribe((data: any) => {
      data.forEach((element:any) => {
        if(element.fecha >= fechaI && element.fecha <= fechaF){
          this.listarNovedades.push(element);
          console.log(this.listarNovedades);
        }
      })
    })
    this.listaNovedad = this.listarNovedades
    this.exportToExcel(this.listaNovedad);
  }



  name = 'listaNovedades.xlsx';
  public exportToExcel(listaNovedad:any): void {
    this.listarTodo();

    this.content = [
      {
        table:{
          headerRows: 1,
          widths: [ '*', '*', '*', '*', '*', '*' ],
          body: [
            [{ text: 'id', style: 'tableHeader' }, { text: 'fecha', style: 'tableHeader' }, { text: 'observacion', style: 'tableHeader' }, { text: 'idVendedor', style: 'tableHeader' }, { text: 'tipodeNovedad', style: 'tableHeader' }, { text: 'Usuario', style: 'tableHeader' }],
            ...listaNovedad.map((item:any) => [item.id, item.fecha, item.observacion, item.idVendedor, item.tipodeNovedad, item.Usuario])
          ]
        }
      }
    ]
    // const workbook = XLSX.utils.book_new();
    // // const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(content:);

    // const book: XLSX.WorkBook = XLSX.utils.book_new();
    // // XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    // XLSX.writeFile(book, this.name);

  }
}
