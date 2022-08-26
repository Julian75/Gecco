import { EstadoService } from './../../../../servicios/estado.service';
import { Rol } from './../../../../modelos/rol';
import { Estado } from './../../../../modelos/estado';
import { RolService } from './../../../../servicios/rol.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { JerarquiaService } from 'src/app/servicios/jerarquia.service';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent implements OnInit {
  public formRol!: FormGroup;
  public listarEstado: any = [];
  public listJerarquia: any = [];
  public listaJerarquia: any = [];
  public estadosDisponibles:any = [];
  public encontrado : boolean = false;
  public encontrados: any = [];
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarRolComponent>,
    private servicioRol: RolService,
    private servicioEstado : EstadoService,
    private servicioJerarquia: JerarquiaService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarEstados();
    this.listarJerarquia();
  }

  private crearFormulario() {
    this.formRol = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      estado: [null,Validators.required],
      jerarquia: [null,Validators.required]
    });
  }

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      // this.listarEstado = res;
      res.forEach(element => {
        if(element.idModulo.id == 3){
          this.estadosDisponibles.push(element)
        }
      });
      this.listarEstado = this.estadosDisponibles
    });
  }

  public listarJerarquia(){
    this.servicioJerarquia.listarTodos().subscribe(resjerar => {
      this.listJerarquia = resjerar;
    }
    )
  }

  public guardar() {
    this.encontrados = [];
    let rol : Rol = new Rol();
    const idEstado = this.formRol.controls['estado'].value;
    const idJerarquia = this.formRol.controls['jerarquia'].value;
    console.log(this.formRol.value.estado);
    if(this.formRol.valid){
      rol.descripcion=this.formRol.controls['descripcion'].value;
      this.servicioEstado.listarPorId(idEstado).subscribe(res => {
        this.listarEstado = res;
        rol.idEstado= this.listarEstado
        this.servicioJerarquia.listarPorId(idJerarquia).subscribe(resjerar => {
          this.listaJerarquia = resjerar;
          rol.idJerarquia= this.listaJerarquia
          this.servicioRol.listarTodos().subscribe(resrol => {
            resrol.forEach(element => {
              if(this.formRol.value.descripcion.toLowerCase() == element.descripcion.toLowerCase()){
                this.encontrado = true;
              }else{
                this.encontrado = false;
              }
              this.encontrados.push(this.encontrado);
            })
            const encontrado = this.encontrados.includes(true);
            if(encontrado == true){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'El rol ya existe!',
                showConfirmButton: false,
                timer: 1500
              })
            }else{
              this.registrarRol(rol);
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

  public registrarRol(rol: Rol) {
    this.servicioRol.registrar(rol).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Rol Registrado!',
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
