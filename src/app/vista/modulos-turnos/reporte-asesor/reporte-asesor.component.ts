import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-asesor',
  templateUrl: './reporte-asesor.component.html',
  styleUrls: ['./reporte-asesor.component.css']
})
export class ReporteAsesorComponent implements OnInit {
  public formReporte!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formReporte = this.fb.group({
      id: 0,
      documentoAsesor: [null,Validators.required]
    });
  }

  public reporte(){
    console.log(this.formReporte.controls['documentoAsesor'].value)
  }

}
