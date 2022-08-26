import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EscalaSolicitudesService } from 'src/app/servicios/escalaSolicitudes.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { EscalaSolicitudes2 } from 'src/app/modelos/modelos2/escalaSolicitudes2';

@Component({
  selector: 'app-modificar-escala-solicitudes',
  templateUrl: './modificar-escala-solicitudes.component.html',
  styleUrls: ['./modificar-escala-solicitudes.component.css']
})
export class ModificarEscalaSolicitudesComponent implements OnInit {
  public formEscalaSolicitud!: FormGroup;
  public id: any;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<ModificarEscalaSolicitudesComponent>,
    private servicioEscalaSolicitud: EscalaSolicitudesService,
    private servicioModificar: ModificarService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos()
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formEscalaSolicitud = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
    });
  }

  listaEscSol: any = []
  public listarTodos(){
    this.listaEscSol = this.data
    this.servicioEscalaSolicitud.listarPorId(this.listaEscSol.id).subscribe(data => {
      this.formEscalaSolicitud.setValue(data);
    }
    );
  }

  validar: boolean = false
  listaValidar: any = []
  public guardar(){
    this.listaEscSol = this.data
    this.listaValidar = []
    if(this.formEscalaSolicitud.controls['descripcion'].value == null || this.formEscalaSolicitud.controls['descripcion'].value == ""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      let escalaSolicitud : EscalaSolicitudes2 = new EscalaSolicitudes2();
      escalaSolicitud.id=this.listaEscSol.id;
      escalaSolicitud.descripcion = this.formEscalaSolicitud.controls['descripcion'].value;
      if(escalaSolicitud.descripcion.toLowerCase() == this.listaEscSol.descripcion.toLowerCase()){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'No hubieron cambios!',
          showConfirmButton: false,
          timer: 1500
        })
        this.dialogRef.close();
        window.location.reload();
      }else{
        this.servicioEscalaSolicitud.listarTodos().subscribe(resEscalaSolicitud=>{
          resEscalaSolicitud.forEach(element => {
            if(element.descripcion.toLowerCase() == escalaSolicitud.descripcion.toLowerCase()){
              this.validar = true
            }else{ this.validar = false }
            this.listaValidar.push(this.validar)
          });
          const existe = this.listaValidar.includes(true)
          if(existe == true){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Esta escala solicitud ya existe!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            this.actualizarEscalaSolicitud(escalaSolicitud);
          }
        })
      }
    }
  }

  public actualizarEscalaSolicitud(escalaSolicitud: EscalaSolicitudes2){
    this.servicioModificar.actualizarEscalaSolicitudes(escalaSolicitud).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Se actualizó correctamente',
        showConfirmButton: false,
        timer: 1500
      });
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
