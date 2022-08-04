import { Proceso } from './../../../../modelos/proceso';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { CategoriaService } from './../../../../servicios/Categoria.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProcesoService } from 'src/app/servicios/proceso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-proceso',
  templateUrl: './agregar-proceso.component.html',
  styleUrls: ['./agregar-proceso.component.css']
})
export class AgregarProcesoComponent implements OnInit {
  public formAsigCat!: FormGroup;
  public listaUsuarios: any = [];
  public listarExiste: any = [];
  public usuariosDisponibles:any = [];
  public categoriasDisponibles:any = [];
  public listaCategorias:any = [];
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarProcesoComponent>,
    private servicioProceso: ProcesoService,
    private servicioCategoria : CategoriaService,
    private servicioUsuario : UsuarioService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarUsuarios();
    this.listarCategorias();
  }

  private crearFormulario() {
    this.formAsigCat = this.fb.group({
      id: 0,
      categoria: [null,Validators.required],
      usuario: [null,Validators.required]
    });
  }

  public listarCategorias() {
    this.servicioCategoria.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idEstado.id == 49){
          this.categoriasDisponibles.push(element)
        }
      });
      this.listaCategorias = this.categoriasDisponibles
    });
  }

  public listarUsuarios() {
    this.servicioUsuario.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idEstado.id == 11){
          this.usuariosDisponibles.push(element)
        }
      });
      this.listaUsuarios = this.usuariosDisponibles
    });
  }

  aprobar:boolean = false
  public guardar() {
    this.listarExiste = []
    this.aprobar = false
    let proceso : Proceso = new Proceso();
    const idCategoria = this.formAsigCat.controls['categoria'].value;
    const idUsuario = this.formAsigCat.controls['usuario'].value;

    this.servicioCategoria.listarPorId(idCategoria).subscribe(resCategoria => {
      proceso.idCategoria = resCategoria
      this.servicioUsuario.listarPorId(idUsuario).subscribe(resUsuario=>{
        proceso.idUsuario = resUsuario
        this.servicioProceso.listarTodos().subscribe(resProceso=>{
          resProceso.forEach(element => {
            if(element.idCategoria.id == idCategoria && element.idUsuario.id == idUsuario){
              this.aprobar = true
            }else{
              this.aprobar = false
            }
            this.listarExiste.push(this.aprobar);
          });
          const existe = this.listarExiste.includes( true );
          if(existe == true){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Esta asignación ya existe!',
              showConfirmButton: false,
              timer: 1500
            })
            this.crearFormulario()
          }else{
            this.registrarProceso(proceso);
          }
        })
      })
    })

  }

  public registrarProceso(proceso: Proceso) {
    this.servicioProceso.registrar(proceso).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Asignación de categoria registrado!',
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
