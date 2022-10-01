import { Component, OnInit } from '@angular/core';
import { DetalleArticulo } from 'src/app/modelos/detalleArticulo';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import { DetalleArticuloService } from 'src/app/servicios/detalleArticulo.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { AsignacionProcesoService } from 'src/app/servicios/asignacionProceso.service';
import { CategoriaService } from 'src/app/servicios/Categoria.service';
import { TipoActivoService } from 'src/app/servicios/tipoActivo.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { HistorialArticuloService } from 'src/app/servicios/historialArticulo.service';
import { Articulo } from 'src/app/modelos/articulo';
import { AsignacionArticulos } from 'src/app/modelos/asignacionArticulos';
import { HistorialArticulos } from 'src/app/modelos/historialArticulos';
import { InventarioService } from 'src/app/servicios/inventario.service';
import { CompraService } from 'src/app/servicios/compra.service';
import {MovimientosComprasInventarioService} from 'src/app/servicios/movimientosComprasInventario.service';
import { MovimientoComprasInventario2 } from 'src/app/modelos/modelos2/movimientosComprasInventario2';
import { Inventario } from 'src/app/modelos/inventario';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-agregar-articulos-inventario',
  templateUrl: './agregar-articulos-inventario.component.html',
  styleUrls: ['./agregar-articulos-inventario.component.css']
})
export class AgregarArticulosInventarioComponent implements OnInit {
  myControl = new FormControl<string | Articulo>("");
  options: Articulo[] = []
  filteredOptions!: Observable<Articulo[]>;

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
    private servicioInventario: InventarioService,
    private servicioMovimientoCompraInventario: MovimientosComprasInventarioService,
    private servicioModificar: ModificarService,
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarTipoActivos();
    this.listarCategorias();
  }

  private crearFormulario() {
    this.formArticulo = this.fb.group({
      id: 0,
      articulo: ['', Validators.required],
      serial: [null,Validators.required],
      placa: [null,Validators.required],
      marca: [null,Validators.required],
      tipoActivo: [null,Validators.required],
      cantidad: [0,Validators.required],
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
      console.log(this.formArticulo.value)
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
                this.registrarDetalleArticulo(detalleArticulo , articulo)
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

  idMovimientoCompraInventario: any;
  public registrarDetalleArticulo(detalleArticulo: DetalleArticulo , articulo: Articulo) {
    let inventario : Inventario = new Inventario()
    let movimientoCompraInventario : MovimientoComprasInventario2 = new MovimientoComprasInventario2()
    this.servicioDetalleArticulo.registrar(detalleArticulo).subscribe(resDetalleArticulo=>{
      this.servicioMovimientoCompraInventario.listarTodos().subscribe(resMovimientoCompraInventario=>{
        resMovimientoCompraInventario.forEach(elementMovimientoCompraInventario => {
          if(elementMovimientoCompraInventario.idArticulo.id == articulo.id){
            this.idMovimientoCompraInventario = elementMovimientoCompraInventario.id
          }
        });
        this.servicioMovimientoCompraInventario.listarPorId(Number(this.idMovimientoCompraInventario)).subscribe(resMovimientoCompraInventarioModel=>{
          if(this.formArticulo.controls['cantidad'].value <= resMovimientoCompraInventarioModel.cantidad){
            inventario.id_articulo = resMovimientoCompraInventarioModel.idArticulo
            inventario.id_detalle_articulo = detalleArticulo
            inventario.cantidad = Number(this.formArticulo.controls['cantidad'].value)
            movimientoCompraInventario.id = resMovimientoCompraInventarioModel.id
            movimientoCompraInventario.idArticulo = resMovimientoCompraInventarioModel.idArticulo.id
            movimientoCompraInventario.cantidad = resMovimientoCompraInventarioModel.cantidad - Number(inventario.cantidad)
            this.servicioInventario.registrar(inventario).subscribe(resInventario=>{
              this.servicioModificar.actualizarMovimientoCI(movimientoCompraInventario).subscribe(resMovimientoCompraInventario=>{
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Articulo Registrado!',
                  showConfirmButton: false,
                  timer: 1500
                })
                window.location.reload();
              },  error => {
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Hubo un error al modificar el movimientoCompra!',
                  showConfirmButton: false,
                  timer: 1500
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
            })
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'La cantidad ingresada es mayor a la cantidad del articulo en el inventario!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      })

    })
  }

  textoArticulo:any
  displayFn(articulo: Articulo): any {
    this.textoArticulo = articulo
    if(this.textoArticulo == ""){
      this.textoArticulo = " "
    }else{
      this.textoArticulo = articulo.descripcion

      return this.textoArticulo;
    }
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.idArticulos(event.option.value)
  }

  listaIdArticulo: any = [];
  listaArticuloTabla: any = [];
  listaArticulosTabla: any = [];
  public idArticulos(articulo:any){
    const listaArticulo = articulo
    this.listaIdArticulo.push(listaArticulo.id)
    let ultimo = this.listaIdArticulo[this.listaIdArticulo.length - 1]
    localStorage.setItem("v", ultimo)
    let penultimo = this.listaIdArticulo[this.listaIdArticulo.length - 2]
    if(ultimo != penultimo || penultimo == undefined){
      this.servicioArticulos.listarTodos().subscribe(res=>{
        this.listaArticuloTabla =[]
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          if (element.id == ultimo){
            this.listaArticuloTabla.push(element)
          }
        }
        this.listaArticulosTabla = this.listaArticuloTabla

      })
    }
  }
}

