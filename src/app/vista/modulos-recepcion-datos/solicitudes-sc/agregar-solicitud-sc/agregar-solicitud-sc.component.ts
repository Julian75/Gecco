import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-solicitud-sc',
  templateUrl: './agregar-solicitud-sc.component.html',
  styleUrls: ['./agregar-solicitud-sc.component.css']
})
export class AgregarSolicitudScComponent implements OnInit {

  public formSolicitud!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormulario
  }

  private crearFormulario() {
    this.formSolicitud = this.fb.group({
      id: 0,
      nombre: [null,Validators.required],
      apellido: [null,Validators.required],
      correo: [null,Validators.required],
      documento: [null,Validators.required],
      estado: [null,Validators.required],
      rol: [null,Validators.required],
      tipoDocumento: [null,Validators.required],
      oficina: [null,Validators.required],
    });
  }

}
