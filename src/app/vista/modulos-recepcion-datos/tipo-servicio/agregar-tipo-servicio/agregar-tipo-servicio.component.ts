import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TipoServicioService } from 'src/app/servicios/tipoServicio.service';
import { TipoServicio } from 'src/app/modelos/tipoServicio';
import { TipoNovedades } from 'src/app/modelos/tipoNovedades';

@Component({
  selector: 'app-agregar-tipo-servicio',
  templateUrl: './agregar-tipo-servicio.component.html',
  styleUrls: ['./agregar-tipo-servicio.component.css']
})
export class AgregarTipoServicioComponent implements OnInit {
  public formTipoServicio!: FormGroup;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioTipoServicio : TipoServicioService,
    public dialogRef: MatDialogRef<AgregarTipoServicioComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formTipoServicio = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
    });
  }

  validar: boolean = false;
  listaValidar: any = [];
  public guardar(){
    this.listaValidar = []
    let tipoServicio : TipoServicio = new TipoServicio();
    tipoServicio.descripcion = this.formTipoServicio.controls['descripcion'].value
    if(this.formTipoServicio.controls['descripcion'].value == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.servicioTipoServicio.listarTodos().subscribe(resTipoServicio=>{
        resTipoServicio.forEach(element => {
          if(element.descripcion.toLowerCase() == tipoServicio.descripcion.toLowerCase()){
            this.validar = true
          }else{ this.validar = false }
          this.listaValidar.push(this.validar)
        });
        const existe = this.listaValidar.includes(true)
        if(existe == true){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Este Tipo de Servicio ya existe!',
            showConfirmButton: false,
            timer: 1500
          })
          this.crearFormulario();
        }else{
          this.registrarTipoServicio(tipoServicio);
        }
      })
    }
  }

  public registrarTipoServicio(tipoServicio: TipoServicio){
    this.servicioTipoServicio.registrar(tipoServicio).subscribe( data =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se agrego un nuevo tipo de servicio!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }
}
