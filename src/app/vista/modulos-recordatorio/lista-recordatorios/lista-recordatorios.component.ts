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

@Component({
  selector: 'app-lista-recordatorios',
  templateUrl: './lista-recordatorios.component.html',
  styleUrls: ['./lista-recordatorios.component.css']
})
export class ListaRecordatoriosComponent implements OnInit {
  dtOptions: any = {};
  public listarRecordatorio: any = [];

  displayedColumns = ['id', 'descripcion','fecha', 'Hora'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private recordatorioService: RecordatorioService,
  ) { }

  ngOnInit(): void {
    this.listarTodo();
  }

  listarTodo() {
    this.recordatorioService.listarTodos().subscribe( data => {
      this.listarRecordatorio = data;
      this.dataSource = new MatTableDataSource(this.listarRecordatorio);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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

  name = 'listaRoles.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('recordatorio');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }
}
