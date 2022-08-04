import { Proceso } from './../../../../modelos/proceso';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { CategoriaService } from './../../../../servicios/Categoria.service';
import { ProcesoService } from './../../../../servicios/proceso.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-proceso',
  templateUrl: './modificar-proceso.component.html',
  styleUrls: ['./modificar-proceso.component.css']
})
export class ModificarProcesoComponent implements OnInit {
  public formAsigCat!: FormGroup;
  public listaUsuarios: any = [];
  public listaProceso: any = [];
  public listarExiste: any = [];
  public usuariosDisponibles:any = [];
  public categoriasDisponibles:any = [];
  public listaCategorias:any = [];
  public idProceso : any;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModificarProcesoComponent>,
    private servicioProceso: ProcesoService,
    private servicioCategoria : CategoriaService,
    private servicioUsuario : UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarUsuarios();
    this.listarCategorias();
    this.listarporidProceso();
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

  public listarporidProceso() {
    this.idProceso = this.data;
    this.servicioProceso.listarPorId(this.idProceso).subscribe(res => {
      this.listaProceso = res;
      this.formAsigCat.controls['id'].setValue(this.listaProceso.id);
      this.formAsigCat.controls['categoria'].setValue(this.listaProceso.idCategoria.id);
      this.formAsigCat.controls['usuario'].setValue(this.listaProceso.idUsuario.id);
    })
  }

  aprobar:boolean = false
  public guardar() {
    this.listarExiste = []
    this.aprobar = false
    let proceso : Proceso = new Proceso();
    proceso.id = Number(this.data)
    const idCategoria = this.formAsigCat.controls['categoria'].value;
    const idUsuario = this.formAsigCat.controls['usuario'].value;

    this.servicioCategoria.listarPorId(idCategoria).subscribe(resCategoria => {
      proceso.idCategoria = resCategoria
      this.servicioUsuario.listarPorId(idUsuario).subscribe(resUsuario=>{
        proceso.idUsuario = resUsuario
        this.servicioProceso.listarPorId(proceso.id).subscribe(resProces=>{
          if(resProces.idCategoria.id == idCategoria && resProces.idUsuario.id){
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
              }else{
                this.modificarProceso(proceso);
              }
            })
          }
        })
      })
    })

  }

  public modificarProceso(proceso: Proceso) {
    this.servicioProceso.actualizar(proceso).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Asignación de categoria modificada!',
        showConfirmButton: false,
        timer: 1500
      })
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
