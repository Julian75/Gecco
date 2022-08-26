import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoServicioService } from 'src/app/servicios/tipoServicio.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { TipoServicio2 } from 'src/app/modelos/modelos2/tipoServicio2';

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
    private servicioModificar: ModificarService,
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

  idTipoServicio: any = []
  public listarTodos(){
    this.idTipoServicio = this.data;
    this.servicioTipoServicio.listarPorId(this.idTipoServicio.id).subscribe(data => {
      this.formTipoServicio.setValue(data);
    }
    );
  }

  encontrado: boolean = false
  encontrados: any = []
  public guardar(){
    this.encontrados = []
    this.idTipoServicio = this.data;
    let tipoServicio : TipoServicio2 = new TipoServicio2();
    tipoServicio.id=this.idTipoServicio.id;
    tipoServicio.descripcion=this.formTipoServicio.controls['descripcion'].value;
    if(this.formTipoServicio.controls['descripcion'].value == null || this.formTipoServicio.controls['descripcion'].value == ""){
      Swal.fire({
        title: 'Campo Vacio!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      if(tipoServicio.descripcion.toLowerCase() == this.idTipoServicio.descripcion.toLowerCase()){
        Swal.fire({
          title: 'No hubo cambios',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
        this.dialogRef.close();
        window.location.reload();
      }else{
        this.servicioTipoServicio.listarTodos().subscribe(res => {
          res.forEach(element => {
            if(element.descripcion.toLowerCase() == tipoServicio.descripcion.toLowerCase()){
              this.encontrado = true;
            }else{
              this.encontrado = false;
            }
            this.encontrados.push(this.encontrado);
          })
          if(this.encontrados.includes(true)){
            Swal.fire({
              title: 'Ya existe ese tipo de servicio!',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            this.actualizarTipoServicio(tipoServicio);
          }
        })
      }
    }
  }

  actualizarTipoServicio(tipoServicio: TipoServicio2){
    this.servicioModificar.actualizarTipoServicio(tipoServicio).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Se actualizó correctamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.dialogRef.close();
      window.location.reload();
    });
  }
}
