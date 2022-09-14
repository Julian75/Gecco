import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sedes } from 'src/app/modelos/sedes';
import { SedeService } from 'src/app/servicios/sedes.service';

@Component({
  selector: 'app-agregar-sedes',
  templateUrl: './agregar-sedes.component.html',
  styleUrls: ['./agregar-sedes.component.css']
})
export class AgregarSedesComponent implements OnInit {
  public formSede!: FormGroup;
  public listarEstado: any = [];
  public estadosDisponibles:any = [];
  public encontrados: any = [];
  public encontrado = false;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarSedesComponent>,
    private servicioSede: SedeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formSede = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required]
    });
  }


  public guardar() {
    this.encontrados = [];
    let sede : Sedes = new Sedes();
    if(this.formSede.valid){
      sede.descripcion=this.formSede.controls['descripcion'].value;
        this.servicioSede.listarTodos().subscribe(resSede => {
          resSede.forEach(element => {
            if(element.descripcion.toLowerCase() == this.formSede.value.descripcion.toLowerCase()){
              this.encontrado = true;
            }else{
              this.encontrado = false;
            }
            this.encontrados.push(this.encontrado);
          })
          const existe = this.encontrados.includes(true);
          console.log(existe);
          if(existe == true){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'La Sede ya existe!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            this.registrarSede(sede);
          }
        });
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo está vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public registrarSede(sede: Sedes) {
    this.servicioSede.registrar(sede).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sede Registrada!',
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
