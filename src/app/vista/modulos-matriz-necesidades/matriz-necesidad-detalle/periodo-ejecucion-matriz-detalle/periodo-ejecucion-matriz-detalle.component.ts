import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-periodo-ejecucion-matriz-detalle',
  templateUrl: './periodo-ejecucion-matriz-detalle.component.html',
  styleUrls: ['./periodo-ejecucion-matriz-detalle.component.css']
})
export class PeriodoEjecucionMatrizDetalleComponent implements OnInit {

  listaPeriodoEjecuciones: any = ['Mensual', 'Bimestral', 'Trimestral', 'Cuatrimestral', 'Semestral', 'Anual', 'Ninguna'];
  public formPeriodoEjecucion!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formPeriodoEjecucion = this.fb.group({
      mes: [null,Validators.required]
    });
  }

  seleccionPeriodo: any;
  seleccionPeriodoEjecucion(seleccion){
    this.seleccionPeriodo = seleccion
    if(seleccion.value == "Ninguna"){
      document.getElementById('mesInicial')?.setAttribute('style', 'display: none;')
      this.crearFormulario();
    }else{
      document.getElementById('mesInicial')?.setAttribute('style', 'display: block;')
      this.crearFormulario();
    }
  }

  guardar(){
    var splitfecha = this.formPeriodoEjecucion.controls['mes'].value.split('-')
    console.log(splitfecha)
    var año = splitfecha[0]
    var mes = splitfecha[1]

  }

}
