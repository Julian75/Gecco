import { EstadoService } from './../../../../servicios/estado.service';
import { Estado } from './../../../../modelos/estado';
import { RolService } from './../../../../servicios/rol.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Rol } from './../../../../modelos/rol';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { JerarquiaService } from 'src/app/servicios/jerarquia.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { Rol2 } from 'src/app/modelos/modelos2/rol2';
@Component({
  selector: 'app-modificar-rol',
  templateUrl: './modificar-rol.component.html',
  styleUrls: ['./modificar-rol.component.css']
})
export class ModificarRolComponent implements OnInit {
  public formRol!: FormGroup;
  public idRol : any;
  public listarRol : any = [];
  public listarEstado : any = [];
  public listarJerarquia: any
  public estadosDisponibles : any = [];
  public listaEstados: any = [];
  public listJerarquia: any = [];
  public encontrado : boolean = false;
  public encontrados:any = [];
  color = ('primary');

  constructor(
    private servicioRol: RolService,
    private servicioEstado: EstadoService,
    private servicioJerarquia: JerarquiaService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarRolComponent>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidRol();
    this.listaEstado();
    this.listaJerarquia();
  }

  private crearFormulario() {
    this.formRol = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
      idEstado: [null,Validators.required],
      idJerarquia: [null,Validators.required]
    });
  }

  public listaEstado() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idModulo.id == 3){
          this.estadosDisponibles.push(element)
        }
      });
      this.listarEstado = this.estadosDisponibles
  })
  ;}

  public listaJerarquia() {
    this.servicioJerarquia.listarTodos().subscribe(resJerar => {
      this.listarJerarquia = resJerar;
    }
    );
  }

  public listarporidRol() {
    this.idRol = this.data;
    this.servicioRol.listarPorId(this.idRol).subscribe(res => {
      this.listarRol = res;
      this.formRol.controls['id'].setValue(this.listarRol.id);
      this.formRol.controls['descripcion'].setValue(this.listarRol.descripcion);
      this.formRol.controls['idEstado'].setValue(this.listarRol.idEstado);
      this.formRol.controls['idJerarquia'].setValue(this.listarRol.idJerarquia);
    })
  }

  public guardar() {
    this.encontrados = [];
    this.formRol.value.id = this.data;
    const idEstado = this.formRol.value.idEstado.id;
    const idJerarquia = this.formRol.value.idJerarquia.id;
    if(this.formRol.valid){
      const descripcion= this.formRol.value.descripcion;
      this.servicioEstado.listarPorId(idEstado).subscribe(res => {
        this.formRol.value.idEstado= res.id
        this.servicioJerarquia.listarPorId(idJerarquia).subscribe(resJerar => {
          this.listJerarquia = resJerar.id;
          this.formRol.value.idJerarquia= this.listJerarquia
          this.formRol.value.descripcion= descripcion
          this.servicioRol.listarPorId(this.formRol.value.id).subscribe(res => {
            if(res.descripcion.toLowerCase() == this.formRol.value.descripcion.toLowerCase() && res.idEstado.id == this.formRol.value.idEstado && res.idJerarquia.id == this.formRol.value.idJerarquia){
              this.servicioModificar.actualizarRol(this.formRol.value).subscribe(res => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'No hubieron cambios!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.dialogRef.close();
                window.location.reload();
              })
            }else{
              this.servicioRol.listarTodos().subscribe(resRo => {
                resRo.forEach(elementRol => {
                  if(elementRol.descripcion.toLowerCase() == this.formRol.value.descripcion.toLowerCase() && elementRol.idJerarquia.id == idJerarquia && elementRol.idEstado.id == idEstado){
                    this.encontrado = true;
                  }else{
                    this.encontrado = false;
                  }
                  this.encontrados.push(this.encontrado);
                });
                const encontrados = this.encontrados.find(encontrado => encontrado == true);
                if(encontrados == true){
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ya existe un rol con esa descripción, jerarquía y estado!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }else{
                  this.servicioModificar.actualizarRol(this.formRol.value).subscribe(res => {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Se modificó Correctamente!',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    this.dialogRef.close();
                    window.location.reload();
                  }, err => {
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'Ocurrió un error al modificar el rol!',
                      showConfirmButton: false,
                      timer: 1500
                      })
                  })

                }
              })
            }
          })
        })
      })
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


  compareFunction(o1: any, o2: any) {
    return o1.id === o2.id;
  }
}
