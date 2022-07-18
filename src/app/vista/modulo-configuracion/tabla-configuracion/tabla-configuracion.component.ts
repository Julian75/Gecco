import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AgregarConfiguracionComponent } from '../agregar-configuracion/agregar-configuracion.component';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { ModificarTablaConfiguracionComponent } from '../modificar-tabla-configuracion/modificar-tabla-configuracion.component';

@Component({
  selector: 'app-tabla-configuracion',
  templateUrl: './tabla-configuracion.component.html',
  styleUrls: ['./tabla-configuracion.component.css']
})
export class TablaConfiguracionComponent implements OnInit {
  dtOptions: any = {};

  displayedColumns = ['id', 'descripcion', 'nombre', 'valor', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private servicioConfiguracion: ConfiguracionService,
  ) { }

  ngOnInit(): void {
    this.listarTodo();
  }

  public listarTodo(){
    this.servicioConfiguracion.listarTodos().subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(AgregarConfiguracionComponent, {
      width: '500px',
    });
  }

  abrirModalModificar(id:number): void {
    const dialogRef = this.dialog.open(ModificarTablaConfiguracionComponent, {
      width: '500px',
      data: id
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
