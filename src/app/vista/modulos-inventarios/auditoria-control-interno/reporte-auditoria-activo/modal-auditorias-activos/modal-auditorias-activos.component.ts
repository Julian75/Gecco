import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuditoriaActivoService } from './../../../../../servicios/auditoriaActivo.service';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-auditorias-activos',
  templateUrl: './modal-auditorias-activos.component.html',
  styleUrls: ['./modal-auditorias-activos.component.css']
})
export class ModalAuditoriasActivosComponent implements OnInit {

  displayedColumns = ['id', 'seriaol', 'articulo', 'marca', 'placa', 'serial', 'oficina', 'puntoVenta', 'usuario', 'estado'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<ModalAuditoriasActivosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioAuditoriaActivos: AuditoriaActivoService,
  ) { }

  ngOnInit(): void {
    this.listarAuditoriasActivos()
  }

  listaAuditoriaActivos: any = []
  listarAuditoriasActivos(){
    this.listaAuditoriaActivos = []
    this.servicioConsultasGenerales.listarAuditoriaActivosConIdRegistro(Number(this.data)).subscribe(resAuditoriasActivos=>{
      for (let index = 0; index < resAuditoriasActivos.length; index++) {
        const element = resAuditoriasActivos[index];
        this.servicioAuditoriaActivos.listarPorId(element.id).subscribe(resAuditoriaActivoId=>{
          this.listaAuditoriaActivos.push(resAuditoriaActivoId)
          if((index+1) == resAuditoriasActivos.length){
            console.log(this.listaAuditoriaActivos)
            this.dataSource = new MatTableDataSource(this.listaAuditoriaActivos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        })
      }
    })
  }

}
