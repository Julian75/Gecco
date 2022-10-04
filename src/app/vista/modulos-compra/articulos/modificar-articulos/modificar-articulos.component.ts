import { DetalleArticulo2 } from './../../../../modelos/modelos2/detalleArticulo2';
import { DetalleArticulo } from './../../../../modelos/detalleArticulo';
import { DetalleArticuloService } from 'src/app/servicios/detalleArticulo.service';
import { CategoriaService } from './../../../../servicios/Categoria.service';
import { Articulo } from '../../../../modelos/articulo';
import { Articulo2 } from '../../../../modelos/articulo2';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoService } from 'src/app/servicios/estado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { TipoActivoService } from 'src/app/servicios/tipoActivo.service';

@Component({
  selector: 'app-modificar-articulos',
  templateUrl: './modificar-articulos.component.html',
  styleUrls: ['./modificar-articulos.component.css']
})
export class ModificarArticulosComponent implements OnInit {

  public formArticulo!: FormGroup;
  public listaArticulo : any = [];
  public categoriasDisponibles : any = [];
  public listaCategorias : any = [];
  public encontrado : boolean = false;
  public encontrados: any = [];
  color = ('primary');

  constructor(
    private servicioArticulo: ArticuloService,
    private servicioEstado: EstadoService,
    private servicioCategoria: CategoriaService,
    private servicioModificar: ModificarService,
    private servicioTipoActivos: TipoActivoService,
    private servicioDetalleArticulo: DetalleArticuloService,
    public dialogRef: MatDialogRef<ModificarArticulosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidArticulo();
    this.listarCategorias();
  }

  private crearFormulario() {
    this.formArticulo = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      categoria: [null,Validators.required],
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

  detalleArticulo: any = [];
  idArticulo: any;
  public listarporidArticulo() {
    this.detalleArticulo = []
    this.idArticulo = this.data;
    this.servicioArticulo.listarPorId(this.idArticulo).subscribe(res => {
      this.listaArticulo = res;
      this.formArticulo.controls['id'].setValue(this.listaArticulo.id);
      this.formArticulo.controls['descripcion'].setValue(this.listaArticulo.descripcion);
      this.formArticulo.controls['categoria'].setValue(this.listaArticulo.idCategoria.id);
    })
  }

  aprobar2: boolean = false;
  listAprobar2: any = [];
  idArticulito: any;
  public guardar() {
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.encontrados = [];
    this.listAprobar2 = []
    let articulo : Articulo2 = new Articulo2();
      this.idArticulito = this.data
      const descripcion = this.formArticulo.controls['descripcion'].value;
      const categoria = this.formArticulo.controls['categoria'].value;
      if(this.formArticulo.valid){
        this.servicioArticulo.listarTodos().subscribe(resArticulosCompletos=>{
          this.servicioArticulo.listarPorId(this.idArticulito).subscribe(resArticulo=>{
            if(resArticulo.descripcion.toLowerCase() == descripcion.toLowerCase() && resArticulo.idCategoria.id == categoria){
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'No hubo cambios',
                showConfirmButton: false,
                timer: 1500
              })
              window.location.reload();
            }else{
              resArticulosCompletos.forEach(elementArticulo => {
                if(elementArticulo.id != resArticulo.id){
                  if(elementArticulo.descripcion.toLowerCase() == descripcion.toLowerCase()){
                    this.aprobar2 = true
                  }else{
                    this.aprobar2 = false
                  }
                  this.listAprobar2.push(this.aprobar2)
                }
              });
              const existe2 = this.listAprobar2.includes(true)
              if(existe2 == true){
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Ese articulo ya existe',
                  showConfirmButton: false,
                  timer: 1500
                })
              }else{
                articulo.id = resArticulo.id
                articulo.descripcion = descripcion
                articulo.idCategoria = categoria
                articulo.idEstado = resArticulo.idEstado.id
                this.modificarArticulo(articulo)
              }
            }
          })
        })
      }
      else{
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Campos vacios',
          showConfirmButton: false,
          timer: 1500
        })
      }
  }

  public modificarArticulo(articulo: Articulo2){
    this.servicioModificar.actualizarArticulos(articulo).subscribe(res => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Articulo modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocurrio un error al modificar el articulo!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

}
