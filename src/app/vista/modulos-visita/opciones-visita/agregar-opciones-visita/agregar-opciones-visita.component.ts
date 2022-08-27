import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OpcionesVisitaService } from 'src/app/servicios/opcionesVisita.service';
import Swal from 'sweetalert2';
import { OpcionesVisita } from 'src/app/modelos/opcionesVisita';

@Component({
  selector: 'app-agregar-opciones-visita',
  templateUrl: './agregar-opciones-visita.component.html',
  styleUrls: ['./agregar-opciones-visita.component.css']
})
export class AgregarOpcionesVisitaComponent implements OnInit {
  public formOpcionVisita!: FormGroup;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarOpcionesVisitaComponent>,
    private servicioOpcion: OpcionesVisitaService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formOpcionVisita = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
    });
  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    let opcionVisita : OpcionesVisita = new OpcionesVisita();
    opcionVisita.descripcion = this.formOpcionVisita.value.descripcion;
    if(opcionVisita.descripcion==null || opcionVisita.descripcion==""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.servicioOpcion.listarTodos().subscribe(resOpcion=>{
        resOpcion.forEach(element => {
          if(element.descripcion.toLowerCase() == opcionVisita.descripcion.toLowerCase()){
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
            title: 'Esa Opcion ya existe!',
            showConfirmButton: false,
            timer: 1500
          });
        }else{
          this.servicioOpcion.registrar(opcionVisita).subscribe( res => {
            Swal.fire({
              icon: 'success',
              title: 'Registro exitoso',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close();
            window.location.reload();
          })
        }
      })
    }
  }
}
