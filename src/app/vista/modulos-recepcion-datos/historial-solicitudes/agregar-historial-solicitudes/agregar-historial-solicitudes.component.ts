import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-agregar-historial-solicitudes',
  templateUrl: './agregar-historial-solicitudes.component.html',
  styleUrls: ['./agregar-historial-solicitudes.component.css']
})
export class AgregarHistorialSolicitudesComponent implements OnInit {

  public formComentario!: FormGroup;
  public opcion: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  aprobar:boolean = false
  public capturarOpcion(opcion: number){
    this.opcion = opcion
    this.aprobar = false
    if(this.opcion == 1){
      this.aprobar = true
    }else if(this.opcion == 2){
      this.aprobar = false
    }
  }

}
