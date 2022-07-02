import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AccesoService } from 'src/app/servicios/Acceso.service';
import {MatDialog , MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Accesos } from 'src/app/modelos/accesos';
import { ModuloService } from 'src/app/servicios/modulo.service';
import { RolService } from 'src/app/servicios/rol.service';
import Swal from 'sweetalert2';
import { AgregarAccesosComponent } from '../agregar-accesos/agregar-accesos.component';

@Component({
  selector: 'app-modificar-accesos',
  templateUrl: './modificar-accesos.component.html',
  styleUrls: ['./modificar-accesos.component.css']
})
export class ModificarAccesosComponent implements OnInit {
  public formaModificarAccesos!: FormGroup;
  public id :any
  public listarAccesoModulo : any =[]
  color = ('primary');
  public listarModulo: any = [];
  constructor(
    private fb: FormBuilder,
    private servicioModulo: ModuloService,
    private servicioRol: RolService,
    public dialogRef: MatDialogRef<AgregarAccesosComponent>,
    private servicioAcceso: AccesoService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public acceso: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarModulos()
    this.listardModulo()
    this.crearFormulario()
  }

  private crearFormulario() {
    this.formaModificarAccesos = this.fb.group({
      id: [''],
      modulo: [null,Validators.required],
      rol: [null,Validators.required],
    });
  }

  public listarModulos() {
    this.servicioModulo.listarTodos().subscribe(res => {
      this.listarModulo = res;
    })
  }

  public listardModulo(){
    this.id=this.acceso
    this.servicioAcceso.listarPorId(this.id).subscribe(res => {
      this.listarAccesoModulo = res;
      this.formaModificarAccesos.controls['id'].setValue(this.listarAccesoModulo.id);
      this.formaModificarAccesos.controls['modulo'].setValue(this.listarAccesoModulo.idModulo.id);
      this.formaModificarAccesos.controls['rol'].setValue(this.listarAccesoModulo.idRol.id);
    });
  }

  public guardar() {
    // let esta : Estado = new Estado();
    // esta.id=Number(this.estado);
    // esta.descripcion=this.formEstado.controls['descripcion'].value;
    // const idModulo = this.formEstado.controls['modulo'].value;
    // this.servicioEstado.listarPorId(idModulo).subscribe(res => {
    //   this.listarModulo = res;
    //   esta.idModulo= this.listarModulo

    //   if(esta.descripcion==null || esta.descripcion=="" || esta.id==null){
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'error',
    //       title: 'El campo esta vacio!',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //   }else{
    //     this.actualizarEstado(esta);
    //   }
    // })
  }
}
