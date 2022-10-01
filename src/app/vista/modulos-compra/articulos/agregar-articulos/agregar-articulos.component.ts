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
      estado: [null,Validators.required],
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
    const idEstado = this.formArticulo.controls['estado'].value;
    const idCategoria = this.formArticulo.controls['categoria'].value;
    if(this.formArticulo.valid){
      this.servicioEstado.listarPorId(idEstado).subscribe(res => {
        articulo.idEstado = res
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
            console.log(this.listarExiste)
            const existe = this.listarExiste.includes( true );
            if(existe == true){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ese articulo ya existe!',
                showConfirmButton: false,
                timer: 1500
              })
            }else{
              this.servicioAsigProceso.listarTodos().subscribe(resAsignProceso=>{
                resAsignProceso.forEach(elementAsignProceso => {
                  if(elementAsignProceso.idUsuario.id == Number(sessionStorage.getItem('id'))){
                    this.idAsignProceso = elementAsignProceso.id
                    this.existeProceso = true
                  }else{
                    this.existeProceso = false
                  }
                  this.listaExisteProceso.push(this.existeProceso)
                });
                const existeProceso = this.listaExisteProceso.includes(true)
                if(existeProceso == true){
                  this.registrarArticulo(articulo, this.idAsignProceso);
                }else if(existeProceso == false){
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Primero debe tener una asignacion de proceso este usuario logueado!',
                    showConfirmButton: false,
                    timer: 1500
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
        title: 'Campos vacios!',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  idArticulo: any;
  public registrarArticulo(articulo: Articulo, idAsignacionProceso) {
    this.servicioArticulos.registrar(articulo).subscribe(res=>{
        this.servicioEstado.listarPorId(76).subscribe(resEstado=>{
          this.servicioArticulos.listarTodos().subscribe(resArticulo=>{
            resArticulo.forEach(elementArticulo => {
              if(elementArticulo.descripcion.toLowerCase() == articulo.descripcion.toLowerCase() && elementArticulo.idCategoria.id == articulo.idCategoria.id && elementArticulo.idEstado.id == articulo.idEstado.id){
                this.idArticulo = elementArticulo.id
              }
            });
            this.servicioAsigProceso.listarPorId(idAsignacionProceso).subscribe(resAsignProcesito=>{
              this.servicioArticulos.listarPorId(this.idArticulo).subscribe(resArticulo=>{
                let asignArticuloUsuario: AsignacionArticulos = new AsignacionArticulos()
                asignArticuloUsuario.idAsignacionesProcesos = resAsignProcesito
                asignArticuloUsuario.idArticulo = resArticulo
                asignArticuloUsuario.idEstado = resEstado
                this.registrarAsignacionArticuloUsuario(asignArticuloUsuario, resArticulo)
              })
            })
          })
        })
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

  public registrarAsignacionArticuloUsuario(asignacionArticuloUsuario: AsignacionArticulos, resArticulito){
    this.servicioUsario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAsigArt.registrar(asignacionArticuloUsuario).subscribe(resAsignArtUsuario=>{
        let historialArticulo: HistorialArticulos = new HistorialArticulos()
        historialArticulo.fecha = this.fechaActual
        historialArticulo.idArticulo = resArticulito
        historialArticulo.idUsuario = resUsuario
        historialArticulo.observacion = "Se registro el articulo "+asignacionArticuloUsuario.idArticulo.descripcion.toLowerCase()+" quedando a cargo del usuario "+asignacionArticuloUsuario.idAsignacionesProcesos.idUsuario.nombre+" "+asignacionArticuloUsuario.idAsignacionesProcesos.idUsuario.apellido+"."
        this.registrarHistorialArticulo(historialArticulo)
      })
    })
  }

  public registrarHistorialArticulo(historialArticulo: HistorialArticulos){
    this.servicioHistorialArticulo.registrar(historialArticulo).subscribe(resHistorialArticulo=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Articulo Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
    })
  }
}
