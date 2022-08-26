import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EscalaSolicitudesService } from 'src/app/servicios/escalaSolicitudes.service';
import { EscalaSolicitudes } from 'src/app/modelos/escalaSolicitudes';

@Component({
  selector: 'app-agregar-escala-solicitudes',
  templateUrl: './agregar-escala-solicitudes.component.html',
  styleUrls: ['./agregar-escala-solicitudes.component.css']
})
export class AgregarEscalaSolicitudesComponent implements OnInit {
  public formTipoServicio!: FormGroup;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioEscalaSolicitudes : EscalaSolicitudesService,
    public dialogRef: MatDialogRef<AgregarEscalaSolicitudesComponent>,
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
    let escalaSolicitudes : EscalaSolicitudes = new EscalaSolicitudes();
    escalaSolicitudes.descripcion=this.formTipoServicio.controls['descripcion'].value;
    if(escalaSolicitudes.descripcion==null || escalaSolicitudes.descripcion==""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.servicioEscalaSolicitudes.listarTodos().subscribe(resEscalaSolicitudes=>{
        resEscalaSolicitudes.forEach(element => {
          if(element.descripcion.toLowerCase() == escalaSolicitudes.descripcion.toLowerCase()){
            this.validar = true
          }else{ this.validar = false }
          this.listaValidar.push(this.validar)
        });
        const existe = this.listaValidar.includes(true)
        if(existe == true){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Esa escala ya existe!',
            showConfirmButton: false,
            timer: 1500
          })
          this.crearFormulario();
        }else{
          this.registrarEscalaSolicitud(escalaSolicitudes);
        }
      })
    }
  }

  public registrarEscalaSolicitud(escalaSolicitudes: EscalaSolicitudes){
    this.servicioEscalaSolicitudes.registrar(escalaSolicitudes).subscribe( data =>{
      Swal.fire({
        icon: 'success',
        title: 'Se registro una nueva escala!',
        showConfirmButton: false,
        timer: 1500
      });
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
