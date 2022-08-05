import { Component, Inject, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SelectionModel } from '@angular/cdk/collections';
import { Proveedor } from 'src/app/modelos/proveedor';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { DetalleSolicitudService } from 'src/app/servicios/detalleSolicitud.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { OrdenCompra } from 'src/app/modelos/ordenCompra';
import { DetalleSolicitud } from 'src/app/modelos/detalleSolicitud';
import { EstadoService } from 'src/app/servicios/estado.service';
import { Solicitud } from 'src/app/modelos/solicitud';
import { OrdenCompraService } from 'src/app/servicios/ordenCompra.service';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit {
  public proveedores = new FormControl<string | Proveedor>("");
  public formProveedor!: FormGroup;
  public proveedorDisponibles : any = []
  public listaDetalle: any = []
  public lista: any = []
  public listarExiste: any = []
  public listaProveedores: any = []
  public list: any = {};
  public valor: any
  public listaRow: any = [];
  options: Proveedor[] = []
  public opciones: any = ['Si', 'No'];
  filteredOptions!: Observable<Proveedor[]>;
  public seleccionadas!: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  color = ('primary');
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private fb: FormBuilder,
    private servicioProveedor: ProveedorService,
    private servicioDetalleSolicitud: DetalleSolicitudService,
    private servicioEstado: EstadoService,
    private servicioSolicitud: SolicitudService,
    private servicioOrdenCompra: OrdenCompraService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<OrdenCompraComponent>,
  ) { }

  ngOnInit(): void {
    this.listarProveedor()
    this.crearFormulario()
    this.listarTodos()
  }

  crearFormulario(){
    this.formProveedor = this.fb.group({
      id: 0,
      antici: [null,Validators.required],
    });
  }


  public listarTodos(){
    this.servicioDetalleSolicitud.listarTodos().subscribe(resDetalleSolicitud=>{
      resDetalleSolicitud.forEach(element => {
        if(element.idSolicitud.id == Number(this.data) && element.idEstado.id != 59){
          var obj = {
            solicitudDetalle: element,
            cantidad: 0
          }
          this.listaDetalle.push(obj)
        }
      });
      console.log(this.listaDetalle)
      this.dataSource = new MatTableDataSource(this.listaDetalle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  solicitudDetalle:any
  ultimaPosicion:any
  subtotal:any
  anticipoVal:any
  anticipoVal2:any
  total:any
  descuento:any
  valorUnitario(valor:any, solicitudDetalle:any){
    this.ultimaPosicion = 0
    var validaro = false
    console.log(solicitudDetalle.idArticulos, valor.target.value)
    var obj = {
      solicitudDetalle: {},
      cantidad: 0,
      valorUnitario: 0,
      posicion: 0
    }
    if(this.lista.length<1){
      obj.solicitudDetalle = solicitudDetalle
      obj.cantidad = valor.target.value
      obj.valorUnitario = solicitudDetalle.cantidad * Number(valor.target.value)
      obj.posicion = this.lista.length
      this.lista.push(obj)
      console.log(this.lista)
    }else{
      for (let index = 0; index < this.lista.length; index++) {
        const element = this.lista[index];
        if(element.solicitudDetalle.idArticulos.id == solicitudDetalle.idArticulos.id){
          element.cantidad = valor.target.value
          element.valorUnitario = element.solicitudDetalle.cantidad * Number(valor.target.value)
          this.lista.splice(index,1)
          validaro = true
        }else{
          validaro = false
        }

      }
      const existe = this.listarExiste.includes( true )
      console.log(existe)
      if(existe == false){
        obj.solicitudDetalle = solicitudDetalle
        obj.cantidad = valor.target.value
        obj.valorUnitario = solicitudDetalle.cantidad * Number(valor.target.value)
        obj.posicion = this.lista.length
        this.lista.push(obj)
        console.log(this.lista)
      }
    }
    this.ultimaPosicion = this.lista.length-1
    this.subtotal = 0
    this.lista.forEach((element:any) => {
      this.subtotal += element.valorUnitario
    });
    this.anticipoVal = 0
    this.anticipoVal2 = 0
    this.total = 0
    this.descuento = 0
    var anticipo = this.formProveedor.controls['antici'].value;
    if(anticipo == null){
      this.anticipoVal = 0
      this.anticipoVal2 = 0
      this.descuento = 0
      this.total = this.subtotal
    }else if(anticipo!=null){
      this.anticipoVal2 = anticipo
      this.descuento = (this.subtotal * this.anticipoVal2)/100
      this.total = this.subtotal - this.descuento
    }

  }


  generarOrden(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    var idSolicitud  = 0
    this.lista.forEach((element:any) => {
      idSolicitud = element.solicitudDetalle.idSolicitud.id
    })
    this.servicioSolicitud.listarPorId(idSolicitud).subscribe(resSolicitud=>{
        let solicitud : Solicitud = new Solicitud();
        solicitud.id = resSolicitud.id
        solicitud.fecha = resSolicitud.fecha
        this.servicioEstado.listarPorId(37).subscribe(resEstado=>{
          solicitud.idEstado = resEstado
          solicitud.idUsuario = resSolicitud.idUsuario
          this.actualizarSolicitud(solicitud, idSolicitud)
        })
    })
  }

  public actualizarSolicitud(solicitud:Solicitud, idSolicitud:number){
    this.servicioSolicitud.actualizar(solicitud).subscribe(resSolicitud=>{
      this.realizarRegistro(idSolicitud)
    }, error => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al actualizar la solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public realizarRegistro(idSolicitud:number){
    let ordenCompra : OrdenCompra = new OrdenCompra();
    this.servicioSolicitud.listarPorId(idSolicitud).subscribe(resSolicitud=>{
      ordenCompra.idSolicitud = resSolicitud
      ordenCompra.idProveedor = this.proveedor
      var anticipo = this.formProveedor.controls['antici'].value;
      if(anticipo == null){
        ordenCompra.anticipoPorcentaje = 0
      }else if(anticipo!=null){
        ordenCompra.anticipoPorcentaje = this.anticipoVal2
      }
      this.servicioEstado.listarPorId(43).subscribe(resEstado=>{
        ordenCompra.idEstado = resEstado
        ordenCompra.valorAnticipo = this.total
        ordenCompra.subtotal = this.subtotal
        ordenCompra.descuento = this.descuento
        console.log(this.subtotal, this.descuento)
        this.registrarOrdenCompra(ordenCompra)
      })
    })
  }

  public registrarOrdenCompra(ordenCompra:OrdenCompra){
    this.servicioOrdenCompra.registrar(ordenCompra).subscribe(resOrdenCompra=>{
      this.actualSolicDetalle()
    }, error => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al registrar la orden de compra!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public actualSolicDetalle(){
    const cantidad = this.formProveedor.controls['antici'].value
    console.log(cantidad, this.lista)
    this.lista.forEach((element:any) => {
      let solicitudDetalle : DetalleSolicitud = new DetalleSolicitud();
      solicitudDetalle.id = element.solicitudDetalle.id
      solicitudDetalle.cantidad = element.solicitudDetalle.cantidad
      solicitudDetalle.idArticulos = element.solicitudDetalle.idArticulos
      this.servicioEstado.listarPorId(37).subscribe(resEstado=>{
        solicitudDetalle.idEstado = resEstado
        solicitudDetalle.idSolicitud = element.solicitudDetalle.idSolicitud
        solicitudDetalle.observacion = element.solicitudDetalle.observacion
        solicitudDetalle.valorUnitario = element.cantidad
        solicitudDetalle.valorTotal = element.valorUnitario
        this.actualizarSolicitudDetalle(solicitudDetalle)
      })
    });
  }

  public actualizarSolicitudDetalle(solicitudDetalle: DetalleSolicitud){
    this.servicioDetalleSolicitud.actualizar(solicitudDetalle).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se hizo el registro!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      window.location.reload()
      this.dialogRef.close();
    }, error => {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al actualizar las solicitudes detalle!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public listarProveedor() {
    this.servicioProveedor.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idEstado.id == 41){
          this.proveedorDisponibles.push(element)
        }
      });
      this.listaProveedores = this.proveedorDisponibles
      this.filteredOptions = this.proveedores.valueChanges.pipe(
        startWith(""),
        map(value => {
          const nombre = typeof value == 'string' ? value : value?.nombre;
          return nombre ? this._filter(nombre as string, this.listaProveedores) : this.listaProveedores.slice();
        }),
      );
    });
  }

  radio:any
  capturarOpcion(op:any){
    if(op == "Si"){
      document.getElementById('anticipo')?.setAttribute('style', 'display: block;')
    }else{
      document.getElementById('anticipo')?.setAttribute('style', 'display: none;')
    }
  }
  textoProveedor:any
  displayFn(proveedor: Proveedor): any {
    this.textoProveedor = proveedor
    if(this.textoProveedor == ""){
      this.textoProveedor = " "
    }else{
      this.textoProveedor = proveedor.nombre
      console.log(this.textoProveedor)
      return this.textoProveedor;
    }
  }

  private _filter(value: string, lista: any[]): any[] {
    const filterValue = value.toLowerCase();
    return lista.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  proveedor:any
  capturarProveedor(event:MatAutocompleteSelectedEvent){
    this.proveedor = event.option.value
  }

  displayedColumns: string[] = ['articulo', 'cantidad', 'valorUnitario', 'valorTotal'];
  dataSource = new MatTableDataSource<Proveedor>();
  selection = new SelectionModel<Proveedor>(true, []);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  name = 'ordenCompra.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }


}
