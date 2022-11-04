import { Cuentas } from './../../../../modelos/cuentas';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cuentas-faltantes-porcentaje',
  templateUrl: './cuentas-faltantes-porcentaje.component.html',
  styleUrls: ['./cuentas-faltantes-porcentaje.component.css']
})
export class CuentasFaltantesPorcentajeComponent implements OnInit {

  displayedColumns = ['id','codigo', 'descripcion'];
  dataSource1!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public listaPorcentajes: any = [];

  constructor(
    public dialogRef: MatDialogRef<CuentasFaltantesPorcentajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  public listarTodos(){
    this.listaPorcentajes = this.data
    this.listaPorcentajes.sort((a, b) => Number(a.codigo) - Number(b.codigo))
    this.dataSource1 = new MatTableDataSource(this.listaPorcentajes);
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

}
