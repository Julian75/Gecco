import { CategoriaService } from './../../../../servicios/Categoria.service';
import { Articulo } from '../../../../modelos/articulo';
import { Articulo2 } from '../../../../modelos/articulo2';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoService } from 'src/app/servicios/estado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';

@Component({
  selector: 'app-modificar-articulos',
  templateUrl: './modificar-articulos.component.html',
  styleUrls: ['./modificar-articulos.component.css']
})
export class ModificarArticulosComponent implements OnInit {

  public formArticulo!: FormGroup;
  public idArticulo : any;
  public listaArticulo : any = [];
  public listarEstado : any = [];
  public estadosDisponibles : any = [];
  public categoriasDisponibles : any = [];
  public listaCategorias : any = [];
  public listaEstados: any = [];
  public encontrado : boolean = false;
  public encontrados: any = [];
  color = ('primary');

  constructor(
    private servicioArticulo: ArticuloService,
    private servicioEstado: EstadoService,
    private servicioCategoria: CategoriaService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarArticulosComponent>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidArticulo();
    this.listaEstado();
    this.listarCategorias();
  }

  private crearFormulario() {
    this.formArticulo = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
      idEstado: [null,Validators.required],
      idCategoria: [null,Validators.required],
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

  public listaEstado() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idModulo.id == 22){
          this.estadosDisponibles.push(element)
        }
      });
      this.listarEstado = this.estadosDisponibles
  })
  ;}

  public listarporidArticulo() {
    this.idArticulo = this.data;
    this.servicioArticulo.listarPorId(this.idArticulo).subscribe(res => {
      this.listaArticulo = res;
      this.formArticulo.controls['id'].setValue(this.listaArticulo.id);
      this.formArticulo.controls['descripcion'].setValue(this.listaArticulo.descripcion);
      this.formArticulo.controls['idEstado'].setValue(this.listaArticulo.idEstado.id);
      this.formArticulo.controls['idCategoria'].setValue(this.listaArticulo.idCategoria.id);
    })
  }

  public guardar() {
    this.encontrados = [];
    let articulo : Articulo2 = new Articulo2();
    this.formArticulo.value.id=Number(this.data);
    const artic = this.formArticulo.value.descripcion;
    const idEstado = this.formArticulo.controls['idEstado'].value;
    if(this.formArticulo.valid){
      this.servicioEstado.listarPorId(idEstado).subscribe(res => {
        this.formArticulo.value.idEstado = res.id
        const idCategoria= this.formArticulo.controls['idCategoria'].value;
        this.servicioCategoria.listarPorId(idCategoria).subscribe(resCategoria => {
          this.formArticulo.value.idCategoria = resCategoria.id
          this.formArticulo.value.descripcion = artic
          this.servicioArticulo.listarPorId(this.formArticulo.value.id).subscribe(resArticulo => {
            if(resArticulo.descripcion.toLowerCase() == this.formArticulo.value.descripcion.toLowerCase() ){
              this.servicioModificar.actualizarArticulos(this.formArticulo.value).subscribe(res => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'No se hubo cambio',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.dialogRef.close();
                window.location.reload();
              });
            }else{
              this.servicioArticulo.listarTodos().subscribe(res => {
                res.forEach(elementArticulo => {
                  if(elementArticulo.descripcion.toLowerCase() == this.formArticulo.value.descripcion.toLowerCase() ){
                    this.encontrado = true
                  }else{
                    this.encontrado = false
                  }
                  this.encontrados.push(this.encontrado)
                });
                const encontrados = this.encontrados.find(encontrado => encontrado == true)
                console.log(encontrados)
                if(encontrados == true){
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Ya existe ese articulo',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }else{
                  this.servicioModificar.actualizarArticulos(this.formArticulo.value).subscribe(res => {
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Se modificó correctamente',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    this.dialogRef.close();
                    window.location.reload();
                  });
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
        title: 'Campos vacios',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public actualizarArticulo(articulo: Articulo2) {
    this.servicioModificar.actualizarArticulos(articulo).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Articulo modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Articulo modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
    });
 }

}
