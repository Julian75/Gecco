import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { DetalleSolicitud } from 'src/app/modelos/detalleSolicitud';
import { OrdenCompra } from 'src/app/modelos/ordenCompra';
import { Proveedor } from 'src/app/modelos/proveedor';
import { Solicitud } from 'src/app/modelos/solicitud';
import { DetalleSolicitudService } from 'src/app/servicios/detalleSolicitud.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { OrdenCompraService } from 'src/app/servicios/ordenCompra.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-modificar-orden-compra',
  templateUrl: './modificar-orden-compra.component.html',
  styleUrls: ['./modificar-orden-compra.component.css']
})
export class ModificarOrdenCompraComponent implements OnInit {
  public proveedores = new FormControl<string | Proveedor>("");
  public formProveedor!: FormGroup;
  public lista: any = []
  public list: any = [];
  public listaRow: any = [];
  options: Proveedor[] = []
  public opciones: any = ['Si', 'No'];
  filteredOptions!: Observable<Proveedor[]>;
  public seleccionadas!: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioProveedor: ProveedorService,
    private servicioDetalleSolicitud: DetalleSolicitudService,
    private servicioEstado: EstadoService,
    private servicioSolicitud: SolicitudService,
    private servicioOrdenCompra: OrdenCompraService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario()
    this.listarTodo()

  }

  crearFormulario(){
    this.formProveedor = this.fb.group({
      id: 0,
      antici: [null,Validators.required],
    });
  }

  public listarTodo(){
    for (const [key, value] of Object.entries(this.data)) {
      this.list.push(value)
    }
    this.servicioOrdenCompra.listarPorId(this.list[1]).subscribe(resordenCompra=>{
      this.formProveedor.setValue({
        id: resordenCompra.id,
        antici: resordenCompra.anticipoPorcentaje,
      })
      if(resordenCompra.anticipoPorcentaje != 0){
        document.getElementById('antici')?.setAttribute('value', String(resordenCompra.anticipoPorcentaje))
        this.opciones = ['Si']
        this.anticipoVal2 = resordenCompra.anticipoPorcentaje
        this.total = resordenCompra.valorAnticipo
        this.subtotal = resordenCompra.subtotal
        this.descuento = resordenCompra.descuento
      }else if(resordenCompra.anticipoPorcentaje == 0){
        this.opciones = ['No']
        this.anticipoVal2 = 0
        this.descuento = 0
        this.subtotal = resordenCompra.valorAnticipo
        this.total = resordenCompra.valorAnticipo
      }
      document.getElementById('proveedortra')?.setAttribute('value', resordenCompra.idProveedor.nombre)
      this.servicioSolicitud.listarPorId(resordenCompra.idSolicitud.id).subscribe(resSolicitud=>{
        console.log(resSolicitud)
        this.servicioDetalleSolicitud.listarTodos().subscribe(resDetalleSolicitud=>{
          resDetalleSolicitud.forEach(element => {
            if(element.idSolicitud.id == resSolicitud.id){
              this.listaRow.push(element)
            };
          })
          console.log(this.listaRow)
          this.dataSource = new MatTableDataSource(this.listaRow);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      })
    })


    $('#tabla tbody tr').each(function(){
      var input = $(this).find('input[type="number"]').attr('value');
      var valorTotal = $(this).find("td").eq(5).attr('value');
      console.log(input)
    });
  }
  solicitudDetalle:any
  ultimaPosicion:any
  subtotal:any
  anticipoVal:any
  anticipoVal2:any
  descuento:any
  total:any
  valorUnitario(valor:any, solicitudDetalle:any){
    console.log(solicitudDetalle, valor.target.value)
    for (let index = 0; index < this.listaRow.length; index++) {
      const element = this.listaRow[index];
      if(element.idArticulos.id == solicitudDetalle.idArticulos.id){
        element.valorUnitario = valor.target.value
        element.valorTotal = element.valorUnitario * element.cantidad
        element.cantidad = element.cantidad
        element.id = element.id
        element.idArticulos = element.idArticulos
        element.idEstado = element.idEstado
        element.idSolicitud = element.idSolicitud
        element.observacion = element.observacion
        this.lista.splice(index,1)
      }
    }
    this.subtotal = 0
    this.listaRow.forEach((element:any) => {
      this.subtotal += element.valorTotal

    });
    console.log(this.subtotal)
    this.anticipoVal = 0
    this.anticipoVal2 = 0
    this.total = 0
    var anticipo = this.formProveedor.controls['antici'].value;
    if(anticipo == null){
      this.anticipoVal = 0
      this.anticipoVal2 = 0
      this.total = this.subtotal
    }else if(anticipo!=null){
      this.anticipoVal = anticipo/100
      this.anticipoVal2 = anticipo
      this.descuento = this.subtotal * this.anticipoVal
      this.total = this.subtotal - this.descuento

    }
  }

  generarOrden(){
    var idSolicitud  = 0
    this.listaRow.forEach((element:any) => {
      idSolicitud = element.idSolicitud.id
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
      for (const [key, value] of Object.entries(this.data)) {
        this.list.push(value)
      }
      this.servicioOrdenCompra.listarPorId(this.list[1]).subscribe(resOrdenCompra=>{
        let ordenCompra : OrdenCompra = new OrdenCompra();
        ordenCompra.id = resOrdenCompra.id
        ordenCompra.subtotal = this.subtotal
        ordenCompra.descuento = this.descuento
        ordenCompra.valorAnticipo = this.total
        ordenCompra.anticipoPorcentaje = this.anticipoVal2
        ordenCompra.idProveedor = resOrdenCompra.idProveedor
        ordenCompra.idSolicitud = solicitud
        this.servicioEstado.listarPorId(43).subscribe(resEstado=>{
          ordenCompra.idEstado = resEstado
          // this.actualizarOrdenCompra(ordenCompra)
        })
      })
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

  displayedColumns: string[] = ['articulo', 'cantidad', 'valorUnitario', 'valorTotal'];
  dataSource = new MatTableDataSource<Proveedor>();
  selection = new SelectionModel<Proveedor>(true, []);

  name = 'ordenCompra.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('rol');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
