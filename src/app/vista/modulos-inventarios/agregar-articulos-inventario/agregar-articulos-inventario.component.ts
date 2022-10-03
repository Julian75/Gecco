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
  public listarArticulo: any = [];
  public listaArticulo: any = [];
  public listAprobar: any = [];
  public articulo : any = [];
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
    this.listarArticulos();
  }

  private crearFormulario() {
    this.formArticulo = this.fb.group({
      id: 0,
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
    this.listAprobar = []
    this.articulo = []
    if(this.formArticulo.valid){
      let articulo = this.myControl.value as Articulo
      this.articulo.push(articulo)
      if(this.myControl.value == ""){
        Swal.fire({
          icon: 'error',
          title: 'Debe seleccionar al menos un articulo!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.servicioMovimientoCompraInventario.listarTodos().subscribe(res => {
          for(let i = 0; i < res.length; i++){
            if(this.articulo.length > 0){
              if(res[i].idArticulo.id == this.articulo[0].id){
                this.aprobar = true
              }else{
                this.aprobar = false
              }
            }else{
              this.aprobar = false
            }
            this.listAprobar.push(this.aprobar)
          }
          if(this.listAprobar.includes(true)){
            document.getElementById('snipper')?.setAttribute('style', 'display: block;')
            this.registrarArticulo(articulo)
          }else{
            Swal.fire({
              icon: 'error',
              title: 'El articulo que seleccionó no se ha comprado!!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }
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
                var min = 1
                var numero = Math.floor(Math.random()*(min+1)+min);
                console.log(numero)
                detalleArticulo.codigoUnico = String((numero*resArticulito.id)+""+resArticulito.id)
                console.log(detalleArticulo)
                this.registrarDetalleArticulo(detalleArticulo , articulo)
              })
            })
          })

        })
      })
  }

  idMovimientoCompraInventario: any;
  public registrarDetalleArticulo(detalleArticulo: DetalleArticulo , articulo: Articulo) {
    let inventario : Inventario = new Inventario()
    let movimientoCompraInventario : MovimientoComprasInventario2 = new MovimientoComprasInventario2()
    this.servicioMovimientoCompraInventario.listarTodos().subscribe(resMovimientoCompraInventario=>{
      resMovimientoCompraInventario.forEach(elementMovimientoCompraInventario => {
        if(elementMovimientoCompraInventario.idArticulo.id == articulo.id){
          this.idMovimientoCompraInventario = elementMovimientoCompraInventario.id
        }
      });
      this.servicioMovimientoCompraInventario.listarPorId(Number(this.idMovimientoCompraInventario)).subscribe(resMovimientoCompraInventarioModel=>{
        if(this.formArticulo.controls['cantidad'].value <= resMovimientoCompraInventarioModel.cantidad){
          this.servicioDetalleArticulo.registrar(detalleArticulo).subscribe(resDetalleArticulo=>{
            inventario.idArticulo = resMovimientoCompraInventarioModel.idArticulo
            inventario.idDetalleArticulo = detalleArticulo
            inventario.cantidad = Number(this.formArticulo.controls['cantidad'].value)
            movimientoCompraInventario.id = resMovimientoCompraInventarioModel.id
            movimientoCompraInventario.id_articulo = resMovimientoCompraInventarioModel.idArticulo.id
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
          })
        }else{
          document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La cantidad ingresada es mayor a la cantidad que se ha comprado, solo hay '+resMovimientoCompraInventarioModel.cantidad+'.',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    })
  }

  public listarArticulos() {
    this.servicioArticulos.listarTodos().subscribe(res => {
      this.listarArticulo = res;
      let result = this.listarArticulo.filter((item:any, index:any) => {
        if(item.idEstado.id == 26){
          this.listaArticulo.push(item)
        }
      })
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const descripcion = typeof value === 'string' ? value : value.descripcion;
          return descripcion ? this._filter(descripcion as string, this.listaArticulo) : this.listaArticulo.slice();
        }),
      );
    })
  }

  public _filter(descripcion: string, listaArticulo: any): Articulo[] {
    const filterValue = descripcion.toLowerCase();
    return listaArticulo.filter((option: any) => option.descripcion.toLowerCase().indexOf(filterValue) === 0);
  }

  ar: any;
  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.ar = event.option.value
  }

  displayFn(articulo: Articulo): string {
    return articulo && articulo.descripcion ? articulo.descripcion : '';
  }


}

