import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EscalaSolicitudesService } from 'src/app/servicios/escalaSolicitudes.service';

@Component({
  selector: 'app-modificar-escala-solicitudes',
  templateUrl: './modificar-escala-solicitudes.component.html',
  styleUrls: ['./modificar-escala-solicitudes.component.css']
})
export class ModificarEscalaSolicitudesComponent implements OnInit {
  public formEscalaSolicitud!: FormGroup;
  public id: any;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<ModificarEscalaSolicitudesComponent>,
    private servicioEscalaSolicitud: EscalaSolicitudesService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos()
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formEscalaSolicitud = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
    });
  }
  public listarTodos(){
    this.servicioEscalaSolicitud.listarPorId(Number(this.data)).subscribe(data => {
      this.formEscalaSolicitud.setValue(data);
    }
    );
  }

  public guardar(){
    if (this.formEscalaSolicitud.valid) {
      this.servicioEscalaSolicitud.actualizar(this.formEscalaSolicitud.value).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Se actualizó correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.dialogRef.close();
        window.location.reload();
      }
      );
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Campos incorrectos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
