import { TipoNovedades } from './../../../../../modelos/tipoNovedades';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoNovedadesService } from 'src/app/servicios/tipoNovedades.Service';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { TipoNovedades2 } from 'src/app/modelos/modelos2/tipoNovedades2';

@Component({
  selector: 'app-modificar-tipo-novedades',
  templateUrl: './modificar-tipo-novedades.component.html',
  styleUrls: ['./modificar-tipo-novedades.component.css']
})
export class ModificarTipoNovedadesComponent implements OnInit {
  public formTipoNovedad!: FormGroup;
  public idTipoNovedad : any = [];
  public listarTipoNovedad : any = [];
  color = ('primary');
  constructor(
    private serviciotipoNovedad: TipoNovedadesService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarTipoNovedadesComponent>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidTipoNovedad();
  }

  private crearFormulario() {
    this.formTipoNovedad = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
      observacion: [null],
    });
  }

  public listarporidTipoNovedad() {
    this.idTipoNovedad = this.data;
    this.serviciotipoNovedad.listarPorId(this.idTipoNovedad.id).subscribe(res => {
      this.listarTipoNovedad = res;
      this.formTipoNovedad.controls['id'].setValue(this.listarTipoNovedad.id);
      this.formTipoNovedad.controls['descripcion'].setValue(this.listarTipoNovedad.descripcion);
      this.formTipoNovedad.controls['observacion'].setValue(this.listarTipoNovedad.observacion);
    })
  }

  validar: boolean = false;
  listaValidar: any = [];
  listaTipoNov: any = [];
  public guardar() {
    this.listaTipoNov = this.data
    this.listaValidar = []
    if(this.formTipoNovedad.controls['descripcion'].value == null || this.formTipoNovedad.controls['descripcion'].value == ""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      let tipoNovedad : TipoNovedades2 = new TipoNovedades2();
      tipoNovedad.id=this.listaTipoNov.id;
      tipoNovedad.descripcion=this.formTipoNovedad.controls['descripcion'].value;
      if(this.formTipoNovedad.controls['observacion'].value == null){
        tipoNovedad.observacion = ""
      }else{
        tipoNovedad.observacion = this.formTipoNovedad.controls['observacion'].value
      }
      if(tipoNovedad.descripcion.toLowerCase() == this.listaTipoNov.descripcion.toLowerCase() && tipoNovedad.observacion.toLowerCase() == this.listaTipoNov.observacion.toLowerCase()){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'No hubieron cambios!',
          showConfirmButton: false,
          timer: 1500
        })
        this.dialogRef.close();
        window.location.reload();
      }else if(tipoNovedad.descripcion.toLowerCase() == this.listaTipoNov.descripcion.toLowerCase() && tipoNovedad.observacion.toLowerCase() != this.listaTipoNov.observacion.toLowerCase()){
        this.actualizarTipoNovedad(tipoNovedad);
      }else{
        this.serviciotipoNovedad.listarTodos().subscribe(resTipoNovedades=>{
          resTipoNovedades.forEach(element => {
            if(element.descripcion.toLowerCase() == tipoNovedad.descripcion.toLowerCase()){
              this.validar = true
            }else{ this.validar = false }
            this.listaValidar.push(this.validar)
          });
          const existe = this.listaValidar.includes(true)
          if(existe == true){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Este Tipo Novedad ya existe!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            this.actualizarTipoNovedad(tipoNovedad);
          }
        })
      }
    }
  }

  public actualizarTipoNovedad(tipoNovedad: TipoNovedades) {
    this.servicioModificar.actualizarTipoNovedades(tipoNovedad).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tipo Novedad modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
 }
}
