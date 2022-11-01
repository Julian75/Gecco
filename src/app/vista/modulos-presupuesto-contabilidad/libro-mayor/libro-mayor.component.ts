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
  public guardar() {
    if (this.formLibroMayor.valid) {
      const spinner = document.getElementById('snipper');
    this.section = false;
    this.exportar = false;
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
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.exportarE);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'LibroMayor');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
