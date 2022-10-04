import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OpcionArticuloBaja } from 'src/app/modelos/opcionArticuloBaja';
import { OpcionArticuloBajaService } from 'src/app/servicios/opcionArticuloBaja.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-opciones-solicitud-bajas',
  templateUrl: './agregar-opciones-solicitud-bajas.component.html',
  styleUrls: ['./agregar-opciones-solicitud-bajas.component.css']
})
export class AgregarOpcionesSolicitudBajasComponent implements OnInit {

  public formOpcion!: FormGroup;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarOpcionesSolicitudBajasComponent>,
    private servicioOpcionBajas: OpcionArticuloBajaService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formOpcion = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
    });
  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    let opcionBajas : OpcionArticuloBaja = new OpcionArticuloBaja();
    opcionBajas.descripcion = this.formOpcion.value.descripcion;
    if(opcionBajas.descripcion==null || opcionBajas.descripcion==""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.servicioOpcionBajas.listarTodos().subscribe(resOpcion=>{
        resOpcion.forEach(element => {
          if(element.descripcion.toLowerCase() == opcionBajas.descripcion.toLowerCase()){
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
          this.servicioOpcionBajas.registrar(opcionBajas).subscribe( res => {
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
