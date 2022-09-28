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
  public listaTipoActivos:any = [];
  public listaAsigUsuarios: any = [];
  public fechaActual: Date = new Date();
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioArticulos: ArticuloService,
    private servicioDetalleArticulo: DetalleArticuloService,
    private servicioAsigArtiUsuario: AsignacionArticulosService,
    private servicioAsigProceso: AsignacionProcesoService,
    private servicioEstado : EstadoService,
    private servicioCategoria : CategoriaService,
    private servicioTipoActivos: TipoActivoService,
    private servicioUsario: UsuarioService,
    private servicioHistorialArticulo: HistorialArticuloService,
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarTipoActivos();
    this.listarCategorias();
  }

  private crearFormulario() {
    this.formArticulo = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      categoria: [null,Validators.required],
      serial: [null,Validators.required],
      placa: [null,Validators.required],
      marca: [null,Validators.required],
      tipoActivo: [null,Validators.required]
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

  public listarTipoActivos() {
    this.servicioTipoActivos.listarTodos().subscribe(resTipoActivos => {
      this.listaTipoActivos = resTipoActivos
    });
  }

  aprobar:boolean = false
  public guardar() {
    console.log("articulo")
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.listarExiste = []
    this.aprobar = false
    let articulo : Articulo = new Articulo();
    articulo.descripcion=this.formArticulo.controls['descripcion'].value;
    const idCategoria = this.formArticulo.controls['categoria'].value;
    if(this.formArticulo.valid){
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      this.servicioEstado.listarPorId(26).subscribe(res => {
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
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
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
    const tipoActivo = this.formArticulo.controls['tipoActivo'].value;
    const marca = this.formArticulo.controls['marca'].value;
    const serial = this.formArticulo.controls['serial'].value;
    const placa = this.formArticulo.controls['placa'].value;
    this.servicioArticulos.registrar(articulo).subscribe(res=>{
      this.servicioArticulos.listarTodos().subscribe(resArticulo=>{
        resArticulo.forEach(elementArticulo => {
          if(elementArticulo.descripcion.toLowerCase() == articulo.descripcion.toLowerCase() && elementArticulo.idCategoria.id == articulo.idCategoria.id && elementArticulo.idEstado.id == articulo.idEstado.id){
            this.idArticulo = elementArticulo.id
          }
        });
        console.log(this.idArticulo)
        this.servicioArticulos.listarPorId(Number(this.idArticulo)).subscribe(resArticulito=>{
          this.servicioTipoActivos.listarPorId(tipoActivo).subscribe(resTipoActivo=>{
            this.servicioUsario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
              this.servicioEstado.listarPorId(74).subscribe(resEstadoDetalleArticulo=>{
                let detalleArticulo : DetalleArticulo = new DetalleArticulo()
                detalleArticulo.idEstado = resEstadoDetalleArticulo
                detalleArticulo.idArticulo = resArticulito
                detalleArticulo.idTipoActivo = resTipoActivo
                detalleArticulo.idUsuario = resUsuario
                detalleArticulo.marca = marca
                detalleArticulo.placa = placa
                detalleArticulo.serial = serial
                var numero = Math.floor(Math.random())
                console.log(numero, resArticulito.id)
                detalleArticulo.codigoUnico = String((numero*resArticulito.id)+""+resArticulito.id)
                console.log(detalleArticulo)
                this.registrarDetalleArticulo(detalleArticulo)
              })
            })
          })

        })
      })

    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  idDetalleArti: any;
  idAsignProceso: any;
  public registrarDetalleArticulo(detalleArticulo: DetalleArticulo){
    this.servicioDetalleArticulo.registrar(detalleArticulo).subscribe(resDetalleArticulo=>{
      this.servicioDetalleArticulo.listarTodos().subscribe(resDetallesArticulos=>{
        resDetallesArticulos.forEach(elementDetalleArticulo => {
          if(elementDetalleArticulo.codigoUnico == detalleArticulo.codigoUnico && elementDetalleArticulo.idArticulo.id == detalleArticulo.idArticulo.id && elementDetalleArticulo.idTipoActivo.id == detalleArticulo.idTipoActivo.id && elementDetalleArticulo.serial == detalleArticulo.serial && elementDetalleArticulo.marca == detalleArticulo.marca && elementDetalleArticulo.placa == detalleArticulo.placa){
            this.idDetalleArti = elementDetalleArticulo.id
          }
        })
        this.servicioDetalleArticulo.listarPorId(this.idDetalleArti).subscribe(resDetalleArticulito=>{
          this.servicioEstado.listarPorId(76).subscribe(resEstado=>{
            this.servicioAsigProceso.listarTodos().subscribe(resAsignProceso=>{
              resAsignProceso.forEach(elementAsignProceso => {
                if(elementAsignProceso.idUsuario.id == Number(sessionStorage.getItem('id'))){
                  this.idAsignProceso = elementAsignProceso.id
                }
              });
              console.log(this.idAsignProceso)
              this.servicioAsigProceso.listarPorId(this.idAsignProceso).subscribe(resAsignProcesito=>{
                let asignArticuloUsuario: AsignacionArticulos = new AsignacionArticulos()
                asignArticuloUsuario.idAsignacionesProcesos = resAsignProcesito
                asignArticuloUsuario.idDetalleArticulo = resDetalleArticulito
                asignArticuloUsuario.idEstado = resEstado
                console.log(asignArticuloUsuario)
                this.registrarAsignacionArticuloUsuario(asignArticuloUsuario, resDetalleArticulito)
              })
            })
          })
        })
      })
    })
  }

  public registrarAsignacionArticuloUsuario(asignacionArticuloUsuario: AsignacionArticulos, resDetalleArticulito){
    this.servicioUsario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAsigArtiUsuario.registrar(asignacionArticuloUsuario).subscribe(resAsignArtUsuario=>{
        let historialArticulo: HistorialArticulos = new HistorialArticulos()
        historialArticulo.fecha = this.fechaActual
        console.log(this.fechaActual)
        historialArticulo.idDetalleArticulo = resDetalleArticulito
        historialArticulo.idUsuario = resUsuario
        historialArticulo.observacion = "Se registro el articulo "+asignacionArticuloUsuario.idDetalleArticulo.idArticulo.descripcion.toLowerCase()+" quedando a cargo del usuario "+asignacionArticuloUsuario.idAsignacionesProcesos.idUsuario.nombre+" "+asignacionArticuloUsuario.idAsignacionesProcesos.idUsuario.apellido+"."
        this.registrarHistorialArticulo(historialArticulo)
      })
    })
  }

  public registrarHistorialArticulo(historialArticulo: HistorialArticulos){
    this.servicioHistorialArticulo.registrar(historialArticulo).subscribe(resHistorialArticulo=>{
      console.log(resHistorialArticulo)
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Articulo Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
    })
  }

}
