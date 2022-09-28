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
  public idArticulo : any;
  public listaArticulo : any = [];
  public categoriasDisponibles : any = [];
  public listaCategorias : any = [];
  public encontrado : boolean = false;
  public encontrados: any = [];
  public listaTipoActivos: any = [];
  color = ('primary');

  constructor(
    private servicioArticulo: ArticuloService,
    private servicioEstado: EstadoService,
    private servicioCategoria: CategoriaService,
    private servicioModificar: ModificarService,
    private servicioTipoActivos: TipoActivoService,
    private servicioDetalleArticulo: DetalleArticuloService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidArticulo();
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

  detalleArticulo: any = [];
  public listarporidArticulo() {
    this.detalleArticulo = []
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idArticulo = params.get('id');
      this.servicioArticulo.listarPorId(this.idArticulo).subscribe(res => {
        this.servicioDetalleArticulo.listarTodos().subscribe(resDetallesArticulos=>{
          resDetallesArticulos.forEach(elementDetalleArticulo => {
            if(elementDetalleArticulo.idArticulo.id == res.id){
              this.detalleArticulo = elementDetalleArticulo
            }
          });
          this.listaArticulo = res;
          this.formArticulo.controls['id'].setValue(this.listaArticulo.id);
          this.formArticulo.controls['descripcion'].setValue(this.listaArticulo.descripcion);
          this.formArticulo.controls['categoria'].setValue(this.listaArticulo.idCategoria.id);
          this.formArticulo.controls['serial'].setValue(this.detalleArticulo.serial);
          this.formArticulo.controls['placa'].setValue(this.detalleArticulo.placa);
          this.formArticulo.controls['marca'].setValue(this.detalleArticulo.marca);
          this.formArticulo.controls['tipoActivo'].setValue(this.detalleArticulo.idTipoActivo.id);
        })
      })
    })
  }

  detalleArticulito: any = []
  aprobar: boolean = false;
  listAprobar: any = [];
  aprobar2: boolean = false;
  listAprobar2: any = [];
  idDetalleArticulo: any;
  public guardar() {
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.encontrados = [];
    this.listAprobar = []
    this.listAprobar2 = []
    this.detalleArticulito = [];
    let articulo : Articulo2 = new Articulo2();
    let detalleArticulo : DetalleArticulo2 = new DetalleArticulo2();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idArticulo = params.get('id');
      const descripcion = this.formArticulo.controls['descripcion'].value;
      const categoria = this.formArticulo.controls['categoria'].value;
      const serial = this.formArticulo.controls['serial'].value;
      const placa = this.formArticulo.controls['placa'].value;
      const marca = this.formArticulo.controls['marca'].value;
      const tipoActivo = this.formArticulo.controls['tipoActivo'].value;
      if(this.formArticulo.valid){
        this.servicioArticulo.listarTodos().subscribe(resArticulosCompletos=>{
          this.servicioArticulo.listarPorId(this.idArticulo).subscribe(resArticulo=>{
            this.servicioDetalleArticulo.listarTodos().subscribe(resDetalleArticulo=>{
              resDetalleArticulo.forEach(elementDetalleArt => {
                if(elementDetalleArt.idArticulo.id == this.idArticulo){
                  detalleArticulo.id = elementDetalleArt.id
                  if(resArticulo.descripcion.toLowerCase() == descripcion.toLowerCase() && resArticulo.idCategoria.id == categoria && elementDetalleArt.serial.toLowerCase() == serial.toLowerCase() && elementDetalleArt.placa.toLowerCase() == placa.toLowerCase() && elementDetalleArt.marca.toLowerCase() == marca.toLowerCase() && elementDetalleArt.idTipoActivo.id == tipoActivo){
                    this.aprobar = true
                  }else{
                    this.aprobar = false
                  }
                  this.listAprobar.push(this.aprobar)
                }
              });
              const existe = this.listAprobar.includes(true)
              if(existe == true){
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
                  if(elementArticulo.id != this.idArticulo){
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
                  this.servicioDetalleArticulo.listarPorId(detalleArticulo.id).subscribe(resDetalleArticulito=>{
                    console.log(resDetalleArticulito)
                    articulo.id = this.idArticulo
                    articulo.descripcion = descripcion
                    articulo.idCategoria = categoria
                    articulo.idEstado = resArticulo.idEstado.id
                    detalleArticulo.codigoUnico = resDetalleArticulito.codigoUnico
                    detalleArticulo.idArticulo = resDetalleArticulito.idArticulo.id
                    detalleArticulo.idEstado = resDetalleArticulito.idEstado.id
                    detalleArticulo.idTipoActivo = tipoActivo
                    detalleArticulo.idUsuario = resDetalleArticulito.idUsuario.id
                    detalleArticulo.marca = marca
                    detalleArticulo.placa = placa
                    detalleArticulo.serial = serial
                    this.modificarArticulo(articulo, detalleArticulo)
                  })
                }
              }
            })
          })
        })
      }else{
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Campos vacios',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  public modificarArticulo(articulo: Articulo2, detalleArticulo: DetalleArticulo2){
    this.servicioModificar.actualizarArticulos(articulo).subscribe(res => {
      this.servicioModificar.actualizarDetalleArticulo(detalleArticulo).subscribe(resDetalleArticulo=>{
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
          title: 'Ocurrio un error al modificar el detalle del articulo!',
          showConfirmButton: false,
          timer: 1500
        })
      });
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

  // public modificarDetalleArticulo(detalleArticulo: DetalleArticulo2){
  //   this.servicioModificar.actualizarDetalleArticulo.()
  // }

//   public actualizarArticulo(articulo: Articulo2) {
//     this.servicioModificar.actualizarArticulos(articulo).subscribe(res => {
//       Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'Articulo modificado!',
//         showConfirmButton: false,
//         timer: 1500
//       })
//       window.location.reload();
//     }, error => {
//       Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'Articulo modificado!',
//         showConfirmButton: false,
//         timer: 1500
//       })
//       window.location.reload();
//     });
//  }

}
