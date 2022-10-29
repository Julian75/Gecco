import { Component, OnInit, ViewChild,Inject  } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-descargas-multiples',
  templateUrl: './descargas-multiples.component.html',
  styleUrls: ['./descargas-multiples.component.css']
})
export class DescargasMultiplesComponent implements OnInit {

  public archivos: any;
  dtOptions: any = {};
  displayedColumns = ['nombreArchivo', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos(){
    this.archivos = this.data
    for (let i = 0; i < this.archivos.length; i++) {
      const element = this.archivos[i];
    }
    this.dataSource = new MatTableDataSource(this.archivos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public descargarPdf(url){
    window.location.href = url;
  }

}
