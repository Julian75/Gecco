import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-agregar-configuracion',
  templateUrl: './agregar-configuracion.component.html',
  styleUrls: ['./agregar-configuracion.component.css']
})
export class AgregarConfiguracionComponent implements OnInit {
  public formConfiguracion!: FormGroup;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioConfiguracion: ConfiguracionService,
    public dialogRef: MatDialogRef<AgregarConfiguracionComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario(){
    this.formConfiguracion = this.fb.group({
      id:0,
      descripcion: ['', Validators.required],
      nombre: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }

  existe: boolean = false
  listaExis: any = []
  public guardar(){
    this.listaExis = []
    this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
      if(this.formConfiguracion.value.descripcion == "" || this.formConfiguracion.value.nombre == "" || this.formConfiguracion.value.valor == ""){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Los campos no pueden estar vacios!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        resConfiguracion.forEach(element => {
          if(element.nombre.toLowerCase() == this.formConfiguracion.value.nombre.toLowerCase()){
            this.existe = true
          }else{
            this.existe = false
          }
          this.listaExis.push(this.existe)
        });
        const existe = this.listaExis.includes( true );
        if(existe == true){
          Swal.fire({
            icon: 'error',
            title: 'Esa Configuracion ya existe!',
            showConfirmButton: false,
            timer: 1500
          });
        }else{
          this.servicioConfiguracion.registrar(this.formConfiguracion.value).subscribe( res => {
            Swal.fire({
              icon: 'success',
              title: 'Configuracion Registrada',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close();
            window.location.reload();
          })
        }
      }
    })
  }
}
