import { Categoria } from './../../../../../modelos/categoria';
import { CategoriaService } from './../../../../../servicios/Categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoService } from 'src/app/servicios/estado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-categoria',
  templateUrl: './modificar-categoria.component.html',
  styleUrls: ['./modificar-categoria.component.css']
})
export class ModificarCategoriaComponent implements OnInit {

  public formCategoria!: FormGroup;
  public idCategoria : any;
  public listarEstado : any = [];
  public estadosDisponibles : any = [];
  public listaCategorias : any = [];
  public listaEstados: any = [];
  color = ('primary');

  constructor(
    private servicioEstado: EstadoService,
    private servicioCategoria: CategoriaService,
    public dialogRef: MatDialogRef<ModificarCategoriaComponent>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidCategoria();
    this.listaEstado();
  }

  private crearFormulario() {
    this.formCategoria = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
      estado: [null,Validators.required],
    });
  }

  public listaEstado() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idModulo.id == 31){
          this.estadosDisponibles.push(element)
        }
      });
      this.listarEstado = this.estadosDisponibles
  })
  ;}

  public listarporidCategoria() {
    this.idCategoria = this.data;
    this.servicioCategoria.listarPorId(this.idCategoria).subscribe(res => {
      this.listaCategorias = res;
      this.formCategoria.controls['id'].setValue(this.listaCategorias.id);
      this.formCategoria.controls['descripcion'].setValue(this.listaCategorias.descripcion);
      this.formCategoria.controls['estado'].setValue(this.listaCategorias.idEstado.id);
    })
  }

  public guardar() {
    let categoria : Categoria = new Categoria();
    categoria.id=Number(this.data);
    categoria.descripcion=this.formCategoria.controls['descripcion'].value;
    const idEstado = this.formCategoria.controls['estado'].value;
    this.servicioEstado.listarPorId(idEstado).subscribe(res => {
      categoria.idEstado = res
      if(categoria.descripcion==null || categoria.descripcion=="" || categoria.idEstado==null){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.actualizarCategoria(categoria);
      }
    })
  }

  public actualizarCategoria(categoria: Categoria) {
    this.servicioCategoria.actualizar(categoria).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Categoria modificada!',
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
