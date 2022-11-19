import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { AuditoriaActivoService } from 'src/app/servicios/auditoriaActivo.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { ModalAuditoriasActivosComponent } from './modal-auditorias-activos/modal-auditorias-activos.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reporte-auditoria-activo',
  templateUrl: './reporte-auditoria-activo.component.html',
  styleUrls: ['./reporte-auditoria-activo.component.css']
})
export class ReporteAuditoriaActivoComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  reporteVisualizar: boolean = false;
  displayedColumns = ['id', 'fecha', 'hora', 'usuario', 'opcion'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioUsuario: UsuarioService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  listaAuditoriasRegistrosCompletas: any = []
  listaAuditorias: any = []
  reporteAuditorias(){
    const inicio = new Date(this.range.value.start);
    const fin = new Date(this.range.value.end);
    if(inicio.getFullYear() == 1969 || fin.getFullYear() == 1969){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Campos Vacios!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      const fechaInicio = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate()).toISOString().slice(0,10)
      const fechaFin = new Date(fin.getFullYear(), fin.getMonth(), fin.getDate()).toISOString().slice(0,10);
      if(fechaFin < fechaInicio){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'La fecha final no puede ser menor a fecha inicio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.listaAuditoriasRegistrosCompletas = []
        this.reporteVisualizar = false
        this.servicioConsultasGenerales.listarAuditoriaActivosRegistroFechas(fechaInicio, fechaFin).subscribe(resAuditoriasActivosRegistros=>{
          if(resAuditoriasActivosRegistros.length <= 0){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'No hubo auditorias durante ese rango de fechas!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            for (let index = 0; index < resAuditoriasActivosRegistros.length; index++) {
              const elementAuditoriaActivoRegistro = resAuditoriasActivosRegistros[index];
              this.servicioUsuario.listarPorId(elementAuditoriaActivoRegistro.idUsuario).subscribe(resUsuarioAuditoria=>{
                var fechaSolita = String(elementAuditoriaActivoRegistro.fecha).split(' ')
                var obj = {
                  fechaSolita: fechaSolita[0],
                  usuarioAuditoria: resUsuarioAuditoria,
                  auditoriaRegistro: elementAuditoriaActivoRegistro
                }
                this.listaAuditoriasRegistrosCompletas.push(obj)
                if((index+1) == resAuditoriasActivosRegistros.length){
                  this.dataSource = new MatTableDataSource(this.listaAuditoriasRegistrosCompletas);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  document.getElementById('validacion').setAttribute('style', 'display:block')
                }
              })
            }
          }
        })
      }
    }
  }

  reporteDetalle(auditoriaActivoRegistro: any){
    const dialogRef = this.dialog.open(ModalAuditoriasActivosComponent, {
      width: '80%',
      height: '80%',
      data: auditoriaActivoRegistro.auditoriaRegistro.id
    });
  }

}
