import { Categoria } from './../../../../../modelos/categoria';
import { Categoria2 } from './../../../../../modelos/categoria2';
import { CategoriaService } from './../../../../../servicios/Categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoService } from 'src/app/servicios/estado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';

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
  public encontrado : boolean = false;
  public encontrados: any = [];
  constructor(
    private servicioEstado: EstadoService,
    private servicioCategoria: CategoriaService,
    private servicioModificar: ModificarService,
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
    let categoria : Categoria2 = new Categoria2();
    categoria.id=Number(this.data);
    categoria.descripcion=this.formCategoria.controls['descripcion'].value;
    const idEstado = this.formCategoria.controls['estado'].value;
    if(this.formCategoria.valid){
      this.servicioEstado.listarPorId(idEstado).subscribe(res => {
        categoria.idEstado = res.id
        this.servicioCategoria.listarPorId(categoria.id).subscribe(res => {
          if(res.descripcion.toLowerCase() == categoria.descripcion.toLowerCase()){
            this.servicioModificar.actualizarCategoria(categoria).subscribe(res => {
              Swal.fire({
                title: 'No hubo cambios!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              })
              this.dialogRef.close();
              window.location.reload();
            })
          }else{
            this.servicioCategoria.listarTodos().subscribe(res => {
              res.forEach(element => {
                if(element.descripcion.toLowerCase() == categoria.descripcion.toLowerCase() ){
                  this.encontrado = true;
                }else{
                  this.encontrado = false;
                }
                this.encontrados.push(this.encontrado);
              })
              if(this.encontrados.includes(true)){
                Swal.fire({
                  title: 'Ya existe una categoria con esa descripcion',
                  icon: 'error',
                  showConfirmButton: false,
                  timer: 1500
                })
              }else{
                this.actualizarCategoria(categoria);
              }
            })
          }

        })
      })
    }else{
      Swal.fire({
        title: 'Campos Vacíos!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public actualizarCategoria(categoria: Categoria2) {
    this.servicioModificar.actualizarCategoria(categoria).subscribe(res => {
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
