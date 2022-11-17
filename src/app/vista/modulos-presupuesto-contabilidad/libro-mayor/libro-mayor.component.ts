import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { LibroMayorService } from 'src/app/servicios/libroMayor.service';
import { AgregarLibroMayorComponent } from './agregar-libro-mayor/agregar-libro-mayor.component';
import { LibroMayor } from 'src/app/modelos/libroMayor';
import { JerarquiaCuentasService } from 'src/app/servicios/jerarquiaCuentas.service';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { Workbook, Worksheet } from 'exceljs'
import * as fs from 'file-saver'
import {Row, Cell, Column} from 'exceljs'
@Component({
  selector: 'app-libro-mayor',
  templateUrl: './libro-mayor.component.html',
  styleUrls: ['./libro-mayor.component.css']
})
export class LibroMayorComponent implements OnInit {
  dtOptions: any = {};
  public listarLibrosMayor: any = [];
  public exportarE: any = [];
  public formLibroMayor!: FormGroup;
  private _workbook!: Workbook
  color = ('primary');
  displayedColumns = ['id', 'codigo','nombre', 'valor','mes', 'año'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private fb: FormBuilder,
    private servicioLibroMayor: LibroMayorService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioCuentas: CuentasService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formLibroMayor = this.fb.group({
      id: 0,
      fecha: [null,Validators.required],
    });
  }

  section:boolean = false;
  exportar:boolean = false;
  buscador:boolean = false;
  public guardar() {
    if (this.formLibroMayor.valid) {
      const spinner = document.getElementById('snipper');
      const paginator = document.getElementById('paginator');
      paginator?.setAttribute('style', 'display: none;');
      this.section = false;
      this.exportar = false;
      this.buscador = false;
      this.listarLibrosMayor = [];
      let fecha = this.formLibroMayor.value.fecha;
      let mes = fecha.toString().substring(5,7);
      let año = fecha.toString().substring(0,4);
      this.servicioLibroMayor.listarTodos().subscribe( resTodoLibroMayor => {
      spinner?.setAttribute('style', 'display: block;');
      const libroMayor = resTodoLibroMayor as LibroMayor[];
      this.listarLibrosMayor = libroMayor.filter(libroMayor => libroMayor.fecha.toString().substring(5,7) == mes && libroMayor.fecha.toString().substring(0,4) == año);
      if(this.listarLibrosMayor.length > 0){
        setTimeout(() => {
          this.section = true;
          this.exportar = true;
          this.buscador = true;
          spinner?.setAttribute('style', 'display: none;');
          paginator?.setAttribute('style', 'display: block;');
          this.dataSource = new MatTableDataSource(this.listarLibrosMayor);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 1000);
      }else{
        spinner?.setAttribute('style', 'display: none;');
        paginator?.setAttribute('style', 'display: none;');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No hay registros para este mes y año',
          showConfirmButton: false,
          timer: 2500
        });
      }

    });
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Debe seleccionar una fecha!',
      });
    }
  }

  public exportToExcel() {
    this.exportarE = [];
    for (let i = 0; i < this.listarLibrosMayor.length; i++) {
      var obj = {
        'Código': this.listarLibrosMayor[i].idCuenta.codigo,
        'Nombre': this.listarLibrosMayor[i].idCuenta.descripcion,
        'Valor': Math.abs(this.listarLibrosMayor[i].valor),
        'Mes': new Date(this.listarLibrosMayor[i].fecha.toString().substring(0,4),this.listarLibrosMayor[i].fecha.toString().substring(5,7),0).toLocaleString('default', { month: 'long' }).toUpperCase(),
        'Año': this.listarLibrosMayor[i].fecha.toString().substring(0,4)
      }
      this.exportarE.push(obj);
    }
    this._workbook = new Workbook();
    const worksheet = this._workbook.addWorksheet('Libro Mayor');
    const logo = document.getElementById('logo').getAttribute('src');
    const imageId = this.convertBase64ToImage(logo);
    const titleRow = worksheet.addRow(['LIBRO MAYOR']);
    titleRow.font = { name: 'Arial', family: 4, size: 16, bold: true ,color: { argb: 'FFFFFF' } };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
    titleRow.height = 30;
    titleRow.getCell(1).fill = {type: 'pattern', pattern: 'solid', fgColor: { argb: '16365C' },bgColor: { argb: 'FFFFFF' }}
    worksheet.mergeCells(`A1:E1`);
    worksheet.addImage(imageId, {
      tl: { col: 0.2, row: 0.3},
      ext: { width: 80, height: 30 }
    });
    worksheet.addRow([]);
    const subTitleRow = worksheet.addRow(['Fecha: ' + new Date(this.formLibroMayor.value.fecha.toString().substring(0,4), this.formLibroMayor.value.fecha.toString().substring(5,7), 0).toLocaleString('default', { month: 'long' }).toUpperCase() + ' ' + this.formLibroMayor.value.fecha.toString().substring(0,4)]);
    subTitleRow.font = { name: 'Arial', size: 12, bold: true }
    subTitleRow.alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.mergeCells(`A3:E3`);
    worksheet.addRow([]);
    const headerRow = worksheet.addRow(Object.keys(this.exportarE[0]));
    headerRow.font = { name: 'Arial', size: 12, bold: true, color: { argb: 'FFFFFF' } };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' }
    headerRow.eachCell((cell, number) => {
      cell.fill = {type: 'pattern',pattern: 'solid',fgColor: { argb: '16365C' }, bgColor: { argb: 'FFA500' }}
      cell.border = {top: { style: 'thin' },left: { style: 'thin' }, bottom: { style: 'thin' },right: { style: 'thin' } }
    })
    this.exportarE.forEach(dato => {
      const row = worksheet.addRow(Object.values(dato));
      row.alignment = { vertical: 'middle', horizontal: 'center' }
      row.eachCell((cell, number) => {
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }}
      })
    })
    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 50;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;
    worksheet.addRow([]);
    const footerRow = worksheet.addRow(['Este reporte fue generado el ' + new Date().toLocaleString()]);
    footerRow.font = { name: 'Arial', size: 12, bold: true }
    worksheet.mergeCells(`A${footerRow.number}:E${footerRow.number}`);
    footerRow.alignment = { vertical: 'middle', horizontal: 'center' }
    this._workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'Libro Mayor' + '.xlsx');
    })

  }

  convertBase64ToImage(base64: any) {
    const image = new Image();
    image.src = base64;
    console.log(image);
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    console.log(canvas);
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, 0, 0);
    console.log(ctx);
    const ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
    console.log(ext);
    const dataURL = canvas.toDataURL('image/' + ext);
    console.log(dataURL);
    return this._workbook.addImage({
      base64: dataURL,
      extension: 'png',
    });
  }





  // Filtrado
  public applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  if(filterValue == ""){
    this.dataSource = new MatTableDataSource(this.listarLibrosMayor);
  }else{
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: LibroMayor, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1 ;
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
}
