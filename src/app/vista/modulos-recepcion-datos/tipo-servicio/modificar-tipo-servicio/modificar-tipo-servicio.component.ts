import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoServicioService } from 'src/app/servicios/tipoServicio.service';

@Component({
  selector: 'app-modificar-tipo-servicio',
  templateUrl: './modificar-tipo-servicio.component.html',
  styleUrls: ['./modificar-tipo-servicio.component.css']
})
export class ModificarTipoServicioComponent implements OnInit {
  public formTipoServicio!: FormGroup;
  public id: any;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<ModificarTipoServicioComponent>,
    private servicioTipoServicio: TipoServicioService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos()
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formTipoServicio = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
    });
  }
  public listarTodos(){
    this.servicioTipoServicio.listarPorId(Number(this.data)).subscribe(data => {
      this.formTipoServicio.setValue(data);
    }
    );
  }
  public guardar(){
    if (this.formTipoServicio.valid) {
      this.servicioTipoServicio.registrar(this.formTipoServicio.value).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
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
