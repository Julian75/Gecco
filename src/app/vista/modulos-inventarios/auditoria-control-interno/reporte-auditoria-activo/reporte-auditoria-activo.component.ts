import { AuditoriaActivoService } from 'src/app/servicios/auditoriaActivo.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import Swal from 'sweetalert2';

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

  constructor(
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioAuditoriaActivos: AuditoriaActivoService,
  ) { }

  ngOnInit(): void {
  }

  listaAuditoriasCompletas: any = []
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
        this.listaAuditoriasCompletas = []
        this.servicioConsultasGenerales.listarAuditoriaActivosFechas(fechaInicio, fechaFin).subscribe(resAuditoriasActivos=>{
          if(resAuditoriasActivos.length <= 0){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'No hubo auditorias durante ese rango de fechas!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            resAuditoriasActivos.forEach(element => {

            });
          }
          console.log(resAuditoriasActivos)
        })
      }
    }
  }

}
