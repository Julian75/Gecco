import { HistorialArticulos } from './../../../../modelos/historialArticulos';
import { TipoActivoService } from 'src/app/servicios/tipoActivo.service';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AsignacionArticulos } from 'src/app/modelos/asignacionArticulos';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DetalleArticulo } from './../../../../modelos/detalleArticulo';
import { DetalleArticuloService } from 'src/app/servicios/detalleArticulo.service';
import { AsignacionProcesoService } from 'src/app/servicios/asignacionProceso.service';
import { CategoriaService } from './../../../../servicios/Categoria.service';
import { Articulo } from './../../../../modelos/articulo';
import { EstadoService } from 'src/app/servicios/estado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import Swal from 'sweetalert2';
import { HistorialArticuloService } from 'src/app/servicios/historialArticulo.service';

@Component({
  selector: 'app-agregar-articulos',
  templateUrl: './agregar-articulos.component.html',
  styleUrls: ['./agregar-articulos.component.css']
})
export class AgregarArticulosComponent implements OnInit {
  public formArticulo!: FormGroup;
  public listarEstado: any = [];
  public listarExiste: any = [];
  public estadosDisponibles:any = [];
  public categoriasDisponibles:any = [];
  public listaCategorias:any = [];
  public fechaActual: Date = new Date();
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarArticulosComponent>,
    private servicioArticulos: ArticuloService,
    private servicioEstado : EstadoService,
    private servicioAsigProceso : AsignacionProcesoService,
    private servicioAsigArt: AsignacionArticulosService,
    private servicioCategoria : CategoriaService,
    private servicioUsario : UsuarioService,
    private servicioHistorialArticulo : HistorialArticuloService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarEstados();
    this.listarCategorias();
  }

  private crearFormulario() {
    this.formArticulo = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      categoria: [null,Validators.required]
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

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idModulo.id == 22){
          this.estadosDisponibles.push(element)
        }
      });
      this.listarEstado = this.estadosDisponibles
    });
  }

  aprobar:boolean = false
  idAsignProceso: any;
  existeProceso: boolean = false;
  listaExisteProceso: any = [];
  public guardar() {
    this.listarExiste = []
    this.listaExisteProceso = [];
    this.aprobar = false
    let articulo : Articulo = new Articulo();
    articulo.descripcion=this.formArticulo.controls['descripcion'].value;
    const idCategoria = this.formArticulo.controls['categoria'].value;
    if(this.formArticulo.valid){
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      this.servicioEstado.listarPorId(26).subscribe(resEstado => {
        articulo.idEstado = resEstado
        this.servicioCategoria.listarPorId(idCategoria).subscribe(resCategoria=>{
          articulo.idCategoria = resCategoria
          this.servicioArticulos.listarTodos().subscribe(resArticulos=>{
            resArticulos.forEach(element => {
              if(element.descripcion.toLowerCase() == articulo.descripcion.toLowerCase() ){
                this.aprobar = true
              }else{
                this.aprobar = false
              }
              this.listarExiste.push(this.aprobar);
            });
            const existe = this.listarExiste.includes( true );
            if(existe == true){
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ese articulo ya existe!',
                showConfirmButton: false,
                timer: 1500
              })
            }else{
              this.registrarArticulo(articulo);
            }
          })
        })

      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Campos vacios!',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  idArticulo: any;
  public registrarArticulo(articulo: Articulo) {
    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    this.servicioArticulos.registrar(articulo).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Articulo Registrado!',
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
