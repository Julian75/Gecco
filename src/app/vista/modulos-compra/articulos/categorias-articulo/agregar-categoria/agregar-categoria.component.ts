import { Categoria } from './../../../../../modelos/categoria';
import { EstadoService } from 'src/app/servicios/estado.service';
import { CategoriaService } from './../../../../../servicios/Categoria.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent implements OnInit {
  public formCategoria!: FormGroup;
  public listarEstado: any = [];
  public listarExiste: any = [];
  public estadosDisponibles:any = [];
  public listaCategorias:any = [];
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarCategoriaComponent>,
    private servicioEstado : EstadoService,
    private servicioCategoria : CategoriaService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarEstados();
  }

  private crearFormulario() {
    this.formCategoria = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      estado: [null,Validators.required]
    });
  }
  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      this.listarEstado = res;
      res.forEach(element => {
        if(element.idModulo.id == 31){
          this.estadosDisponibles.push(element)
        }
      });
      this.listarEstado = this.estadosDisponibles
    });
  }

  aprobar:boolean = false
  public guardar() {
    this.aprobar = false
    let categoria : Categoria = new Categoria();
    categoria.descripcion=this.formCategoria.controls['descripcion'].value.toLowerCase();
    const idEstado = this.formCategoria.controls['estado'].value;
    if(this.formCategoria.valid){
      this.servicioEstado.listarPorId(idEstado).subscribe(res => {
        categoria.idEstado = res
        this.servicioCategoria.listarTodos().subscribe(resArticulos=>{
          resArticulos.forEach(element => {
            if(element.descripcion == categoria.descripcion){
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
              title: 'Esa categoria ya existe!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            this.registrarCategoria(categoria);
          }
        })

      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debe llenar todos los campos!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public registrarCategoria(categoria: Categoria) {
    this.servicioCategoria.registrar(categoria).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Categoria Registrada!',
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
