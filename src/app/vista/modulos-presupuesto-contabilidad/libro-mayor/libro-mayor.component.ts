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
    let html = '';
    let encabezado = '<div style="text-align: center; font-size: 20px; font-weight: bold; color: #000000; background-color: #FF0080; margin-bottom: 10px;">LIBRO MAYOR</div>'+ '<div style="text-align: center; font-size: 15px; font-weight: bold; color: #000000; background-color: #FF0080; margin-bottom: 10px;">'+'MES: '+new Date(this.listarLibrosMayor[0].fecha.toString().substring(0,4),this.listarLibrosMayor[0].fecha.toString().substring(5,7),0).toLocaleString('default', { month: 'long' }).toUpperCase()+' AÑO: '+this.listarLibrosMayor[0].fecha.toString().substring(0,4)+'</div>';
    html += encabezado;
    html += '<table border="1" style="width: 100%; border-collapse: collapse; font-size: 12px; font-weight: bold; color: #000000;">';
    html += '<thead>';
    html += '<tr>';
    html += '<th style="text-align: center; background-color: #D3D3D3;">Código</th>';
    html += '<th style="text-align: center; background-color: #D3D3D3;">Nombre</th>';
    html += '<th style="text-align: center; background-color: #D3D3D3;">Valor</th>';
    html += '<th style="text-align: center; background-color: #D3D3D3;">Mes</th>';
    html += '<th style="text-align: center; background-color: #D3D3D3;">Año</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    this.exportarE.forEach((item: any) => {
      html += '<tr>';
      html += '<td style="text-align: center;">' + item.Código + '</td>';
      html += '<td style="text-align: center;">' + item.Nombre + '</td>';
      html += '<td style="text-align: center;">' + item.Valor + '</td>';
      html += '<td style="text-align: center;">' + item.Mes + '</td>';
      html += '<td style="text-align: center;">' + item.Año + '</td>';
      html += '</tr>';
    });
    html += '</tbody>';
    html += '</table>';
    const linkSource = 'data:application/vnd.ms-excel;base64,' + btoa(html);
    const downloadLink = document.createElement("a");
    const fileName = 'LibroMayor.xls';
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
      

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
