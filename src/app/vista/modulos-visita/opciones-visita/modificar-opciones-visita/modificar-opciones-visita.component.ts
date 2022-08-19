import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OpcionesVisitaService } from './../../../../servicios/opcionesVisita.service';
import { OpcionesVisita } from 'src/app/modelos/opcionesVisita';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { OpcionesVisita2 } from 'src/app/modelos/modelos2/opcionesVisita2';

@Component({
  selector: 'app-modificar-opciones-visita',
  templateUrl: './modificar-opciones-visita.component.html',
  styleUrls: ['./modificar-opciones-visita.component.css']
})
export class ModificarOpcionesVisitaComponent implements OnInit {
  public formOpcionVisita!: FormGroup;
  color = ('primary');
  public idOpcion :any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicioOpcionVisita: OpcionesVisitaService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarOpcionesVisitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listaridOpcionesVisita();
  }
  private crearFormulario() {
    this.formOpcionVisita = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
    });
  }

  public listaridOpcionesVisita(){
    this.idOpcion = this.data
    this.servicioOpcionVisita.listarPorId(this.idOpcion).subscribe(res => {
      this.formOpcionVisita.setValue(res);
    })
  }

  public guardar(){
    let opcionVisita : OpcionesVisita2 = new OpcionesVisita2();
    opcionVisita.id = this.formOpcionVisita.value.id;
    const descripcion = this.formOpcionVisita.value.descripcion;
    this.servicioOpcionVisita.listarPorId(opcionVisita.id).subscribe(res=>{
      opcionVisita.descripcion = res.descripcion
      if(descripcion==''){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else if (descripcion == opcionVisita.descripcion){
        Swal.fire({
          title: 'Actualizado',
          text: 'No hubieron cambios',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.value) {
            window.location.reload();
            this.dialogRef.close();
          }
        })
      }else{
        opcionVisita.descripcion = descripcion
        this.servicioModificar.actualizarOpcionesVisita(opcionVisita).subscribe(res => {
          Swal.fire({
            title: 'Actualizado',
            text: 'Se actualizó correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              window.location.reload();
              this.dialogRef.close();
            }
          })
        })
      }
    })
  }
}
