import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
@Component({
  selector: 'app-modificar-motivo-solicitud',
  templateUrl: './modificar-motivo-solicitud.component.html',
  styleUrls: ['./modificar-motivo-solicitud.component.css']
})
export class ModificarMotivoSolicitudComponent implements OnInit {
  public formMotivoSolicitud!: FormGroup;
  public id: any;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<ModificarMotivoSolicitudComponent>,
    private servicioMotivoSolicitud: MotivoSolicitudService,
    private servicioModificar: ModificarService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos()
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formMotivoSolicitud = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
    });
  }
  public listarTodos(){
    this.servicioMotivoSolicitud.listarPorId(Number(this.data)).subscribe(data => {
      this.formMotivoSolicitud.setValue(data);
    }
    );
  }
  public guardar(){
    if (this.formMotivoSolicitud.valid) {
      this.servicioModificar.actualizarMotivoSolicitud(this.formMotivoSolicitud.value).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Se actualizo el motivo',
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
