import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuditoriaActivoService } from './../../../../../servicios/auditoriaActivo.service';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-modal-auditorias-activos',
  templateUrl: './modal-auditorias-activos.component.html',
  styleUrls: ['./modal-auditorias-activos.component.css']
})
export class ModalAuditoriasActivosComponent implements OnInit {

  displayedColumns = ['id', 'codigoContable', 'articulo', 'marca', 'placa', 'serial', 'oficina', 'puntoVenta', 'usuario', 'estado'];
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
          if(this.listaAuditoriaActivos.length == resAuditoriasActivos.length){
            console.log(this.listaAuditoriaActivos)
            this.dataSource = new MatTableDataSource(this.listaAuditoriaActivos);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        })
      }
    })
  }

  listaActivosExcel: any = []
  exportToExcel(){
    this.listaActivosExcel = []
    for (let index = 0; index < this.listaAuditoriaActivos.length; index++) {
      const element = this.listaAuditoriaActivos[index];
      var obj = {
        "Id": element.idAuditoriaActivoRegistro.id,
        "Codigo Contable": element.idAsignacionPuntoVentaArticulo.idAsignacionesArticulos.idDetalleArticulo.codigoContable,
        "Tipo Articulo": element.idAsignacionPuntoVentaArticulo.idAsignacionesArticulos.idDetalleArticulo.idArticulo.descripcion,
        "Marca": element.idAsignacionPuntoVentaArticulo.idAsignacionesArticulos.idDetalleArticulo.marca,
        "Placa": element.idAsignacionPuntoVentaArticulo.idAsignacionesArticulos.idDetalleArticulo.placa,
        "Serial": element.idAsignacionPuntoVentaArticulo.idAsignacionesArticulos.idDetalleArticulo.serial,
        "Oficina Asignada": element.idAsignacionPuntoVentaArticulo.nombreOficina,
        "Punto Venta Asignado": element.idAsignacionPuntoVentaArticulo.nombreSitioVenta,
        "Usuario Asignado": element.idAsignacionPuntoVentaArticulo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.nombre+" "+element.idAsignacionPuntoVentaArticulo.idAsignacionesArticulos.idAsignacionesProcesos.idUsuario.apellido,
        "Estado Auditoria": element.estado
      }
      this.listaActivosExcel.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listaActivosExcel);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaModulos");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
