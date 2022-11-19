import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public formMatriz!: FormGroup;

  constructor(
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  private crearFormulario() {
    this.formMatriz = this.fb.group({
      id: 0,
      mes: [null,Validators.required],
    });
  }

  listaMatricesDetalle: any = [];
  public matrizDetalleFecha(event){
    this.listaMatricesDetalle = []
    var fechaSeleccionada = this.formMatriz.controls['mes'].value
    var idUsuarioLogeado = Number(sessionStorage.getItem("id"))
    this.servicioConsultasGenerales.listarAsignacionesProceso(idUsuarioLogeado).subscribe(res=>{
      console.log(res)
      if(res.length > 0){
        res.forEach(elementAsignacionProceso => {
          this.servicioConsultasGenerales.listarMatrizDetalleProceso(Number(elementAsignacionProceso.idTiposProcesos), fechaSeleccionada).subscribe(resMatriz=>{
            resMatriz.forEach(elementMatriz => {
              this.listaMatricesDetalle.push(elementMatriz)
              console.log(this.listaMatricesDetalle)
            });
          })
        });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No tienen un proceso asignado!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

}
