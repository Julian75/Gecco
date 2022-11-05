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
      const paginator = document.getElementById('paginator');
      if(this.listarLibrosMayor.length > 0){
        paginator?.setAttribute('style', 'display: block;');
        this.section = true;
        this.exportar = true;
        this.buscador = true;
        async function sleep(ms: number) {
          try {
            await new Promise(resolve => setTimeout(resolve, ms));
          }
          catch (e) {
            spinner?.setAttribute('style', 'display: none;');
            stop();
          }
        }
        sleep(1000).then(() => {
          spinner?.setAttribute('style', 'display: none;');
          this.dataSource = new MatTableDataSource(this.listarLibrosMayor);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }).catch(() => {
          spinner?.setAttribute('style', 'display: none;');
          stop();
        });
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
    const worksheet: Worksheet = this._workbook.addWorksheet('Libro Mayor');
    worksheet.getCell('A1').value = 'Consulta de Libro Mayor';
    worksheet.getCell('A2').value = 'Código';
    worksheet.getCell('B2').value = 'Nombre';
    worksheet.getCell('C2').value = 'Valor';
    worksheet.getCell('D2').value = 'Mes';
    worksheet.getCell('E2').value = 'Año';
    worksheet.mergeCells('A1:E1');
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet.getCell('A1').font = { size: 16, bold: true, color: { argb: 'FFFFFF' } };
    worksheet.getCell('A2').font = { bold: true };
    worksheet.getCell('B2').font = { bold: true };
    worksheet.getCell('C2').font = { bold: true };
    worksheet.getCell('D2').font = { bold: true };
    worksheet.getCell('E2').font = { bold: true };
    worksheet.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '16365C' },
    };
    worksheet.getCell('A1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getCell('B1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getCell('C1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getCell('D1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getCell('E1').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getCell('A2').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getCell('B2').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getCell('C2').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getCell('D2').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getCell('E2').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    for (let i = 3; i < this.exportarE.length + 3; i++) {
      worksheet.getCell('A' + i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell('B' + i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell('C' + i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell('D' + i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      worksheet.getCell('E' + i).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    }
    //centrar header de la tabla
    worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet.getCell('B2').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet.getCell('C2').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet.getCell('D2').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet.getCell('E2').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };

    //poner los datos en cada celda
    this.exportarE.forEach((element, index) => {
      worksheet.getCell('A' + (index + 3)).value = element.Código;
      worksheet.getCell('B' + (index + 3)).value = element.Nombre;
      worksheet.getCell('C' + (index + 3)).value = element.Valor;
      worksheet.getCell('D' + (index + 3)).value = element.Mes;
      worksheet.getCell('E' + (index + 3)).value = element.Año;
    });
    //centrar los datos de la celdas
    for (let i = 3; i < this.exportarE.length + 3; i++) {
      worksheet.getCell('A' + i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('B' + i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('C' + i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('D' + i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      worksheet.getCell('E' + i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }

    //estilo de la tabla
    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(3).width = 15;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 15;

    //guardar el archivo
    this._workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Libro Mayor.xlsx');
    });
}


  // Filtrado
  applyFilter(event: Event) {
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
