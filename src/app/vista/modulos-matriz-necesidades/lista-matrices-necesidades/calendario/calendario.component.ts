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
  public matrizDetalleFecha(){
    this.listaMatricesDetalle = []
    var fechaSeleccionada = this.formMatriz.controls['mes'].value
    var idUsuarioLogeado = Number(sessionStorage.getItem("id"))
    console.log(idUsuarioLogeado)
    this.servicioConsultasGenerales.listarAsignacionesProceso(idUsuarioLogeado).subscribe(res=>{
      console.log(res)
      res.forEach(elementAsignacionProceso => {
        this.servicioConsultasGenerales.listarMatrizDetalleProceso(Number(elementAsignacionProceso.idTiposProcesos), fechaSeleccionada).subscribe(resMatriz=>{
          resMatriz.forEach(elementMatriz => {
            this.listaMatricesDetalle.push(elementMatriz)
          });
        })
      });
    })
  }

}
