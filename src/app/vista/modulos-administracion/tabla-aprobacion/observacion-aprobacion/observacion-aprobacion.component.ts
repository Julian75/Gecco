import { EliminacionTurnoVendedor } from './../../../../modelos/eliminacionTurnoVendedor';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EliminacionTurnoVendedorService } from 'src/app/servicios/EliminacionTurnoVendedor.service';

@Component({
  selector: 'app-observacion-aprobacion',
  templateUrl: './observacion-aprobacion.component.html',
  styleUrls: ['./observacion-aprobacion.component.css']
})
export class ObservacionAprobacionComponent implements OnInit {

  public formAprobacion!: FormGroup;

  constructor(
    private servicioEliminacion: EliminacionTurnoVendedorService,
    public dialogRef: MatDialogRef<ObservacionAprobacionComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidEliminacion();
  }

  private crearFormulario() {
    this.formAprobacion = this.fb.group({
      id: [''],
      observacion: [null,Validators.required],
    });
  }

  public listarporidEliminacion() {
    this.servicioEliminacion.listarPorId(Number(this.data)).subscribe(res => {
      this.formAprobacion.controls['observacion'].setValue(res.observacion);
    })
  }
}
