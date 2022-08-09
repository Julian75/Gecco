import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, startWith, map } from 'rxjs';
import { Articulo } from '../../../modelos/articulo';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Solicitud } from 'src/app/modelos/solicitud';
import { EstadoService } from 'src/app/servicios/estado.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { DetalleSolicitudService } from 'src/app/servicios/detalleSolicitud.service';
import Swal from 'sweetalert2';
import { DetalleSolicitud } from 'src/app/modelos/detalleSolicitud';

@Component({
  selector: 'app-generar-solicitud',
  templateUrl: './generar-solicitud.component.html',
  styleUrls: ['./generar-solicitud.component.css']
})
export class GenerarSolicitudComponent implements OnInit {
  public formSolicitud!: FormGroup;
  public articulos = new FormControl<string | Articulo>("");
  options: Articulo[] = []
  filteredOptions!: Observable<Articulo[]>;
  public seleccionadas!: FormGroup;
  public listaArticulos: any = [];
  public listaArticulo: any = [];
  public articulosDisponibles:any = [];
  public listadoArtSel: any = [];
  public listadoArtSel2: any = [];
  public listarExiste: any = [];

  public listadoSolicitud: any = [];

  public listaNumeros: any = [];
  public list: any = {};
  public listaRow: any = [];

  public fecha: Date = new Date();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  color = ('primary');

  constructor(
    private fb: FormBuilder,
    private servicioArticulo: ArticuloService,
    private servicioEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioSolicitud: SolicitudService,
    private servicioDetalleSolicitud: DetalleSolicitudService

  ){}


  ngOnInit(): void {
    this.crearFormulario();
    this.listarArticulos();
  }

  private crearFormulario() {
    this.formSolicitud = this.fb.group({
      id: 0,
      articulo: [null,Validators.required],
      cantidad: [null,Validators.required],
      observacion: [null,Validators.required],
    });
  }

  articlo: any
  public listarArticulos() {
    this.servicioArticulo.listarTodos().subscribe(res => {
      this.articulosDisponibles = []
      res.forEach(element => {
        if(element.idEstado.id == 26){
          this.articulosDisponibles.push(element)
        }
      });
      this.listaArticulos = this.articulosDisponibles
      this.filteredOptions = this.articulos.valueChanges.pipe(
        startWith(""),
        map(value => {
          const descripcion = typeof value == 'string' ? value : value?.descripcion;
          this.articlo = value
          return descripcion ? this._filter(descripcion as string, this.listaArticulos) : this.listaArticulos.slice();
        }),
      );
    });
  }
  public guardar() {
    var encontrado = false
    const listaEncontrado: any = []
    const cantidad = this.formSolicitud.controls['cantidad'].value
    const observacion = this.formSolicitud.controls['observacion'].value
    if(this.articulo == undefined || cantidad == null || observacion == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      var obj = {
        articulo: this.articulo,
        cantidad: cantidad,
        observacion: observacion
      }
      if(this.listadoArtSel.length<1){
        this.listadoArtSel.push(obj)
        this.crearFormulario();
        this.articulos = new FormControl<string | Articulo>("");
        this.listarArticulos();

      }else if(this.listadoArtSel.length>=1){
        this.listadoArtSel.forEach((element:any) => {
          if(element.articulo.id == obj.articulo.id){
            encontrado = true
          }
          else if(element.articulo.id != obj.articulo.id){
            encontrado = false
          }
          listaEncontrado.push(encontrado)
        });
        const existe = listaEncontrado.includes( true )
        if(existe == false){
          this.listadoArtSel.push(obj)
          this.crearFormulario();
          this.articulos = new FormControl<string | Articulo>("");
          this.listarArticulos();
        }else if(existe == true){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Este articulo ya esta agregado!',
            showConfirmButton: false,
            timer: 1500
          })
          this.crearFormulario();
          this.articulos = new FormControl<string | Articulo>("");
          this.listarArticulos();
        }
      }
      this.dataSource = new MatTableDataSource( this.listadoArtSel);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
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

  num:any
  public _filter(descripcion: string, listaArticulos: any): Articulo[] {

    const filterValue = descripcion.toLowerCase();
    this.num = (listaArticulos.filter((listaArticulos:any) => (listaArticulos.descripcion.toLowerCase().includes(filterValue)))).length
    return listaArticulos.filter((listaArticulos:any) => (listaArticulos.descripcion.toLowerCase().includes(filterValue)));
  }

  articulo:any
  capturarArticulo(event:MatAutocompleteSelectedEvent){
    this.articulo = event.option.value
  }

  displayedColumns: string[] = ['select', 'articulo', 'cantidad', 'observacion'];
  dataSource = new MatTableDataSource<Articulo>();
  selection = new SelectionModel<Articulo>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  seleccionados:any
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
    this.listaRow = this.listadoArtSel
  }

  toggle(event:any, row: any) {
    this.list = row
    var obj = {
      articulo: [],
      seleccionado: Boolean
    }
    var encontrado = false
    const listaEncontrado: any = []
    if(this.listaRow.length>=1 ){
      for (let index = 0; index < this.listaRow.length; index++) {
        const element = this.listaRow[index];
        if(element.articulo.articulo.id == this.list.articulo.id){
          if(element.seleccionado == true && event.checked == false){
            var posicion = this.listaRow.indexOf(element)
            this.listaRow.splice(posicion, 1)
            break
          }
        }else if(element.articulo.articulo.id != this.list.articulo.id && event.checked == true){
          obj.articulo = this.list
          obj.seleccionado = event.checked
          this.listaRow.push(obj)
          break
        }
      }
    }else{
      if(event.checked == true){
        obj.articulo = this.list
        obj.seleccionado = event.checked
        this.listaRow.push(obj)
      }
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Articulo): string {
    var encontrado = false
    const listaEncontrado: any = []
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1},`+this.selection.isSelected(row)+` estas son: `+row;
  }

  public eliminarArticulo(){
    if(this.listaRow.length == this.listadoArtSel.length){
      this.listadoArtSel = []
      this.dataSource = new MatTableDataSource( this.listadoArtSel);
    }else{
      this.listaRow.forEach((element:any) => {
        for (let i in this.listadoArtSel) {
          if (this.listadoArtSel[i].articulo.id == element.articulo.articulo.id) {
            this.listadoArtSel.splice(i, 1)
          }
        }
      });
      this.dataSource = new MatTableDataSource( this.listadoArtSel);
    }
  }

  aprobar:boolean = false
  public agregarArticulo() {
    this.aprobar = false
    let articulo : Articulo = new Articulo();
    articulo.descripcion=this.articlo;
    this.servicioEstado.listarPorId(26).subscribe(res => {
      articulo.idEstado = res
      if(articulo.descripcion==null || articulo.descripcion==""){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.servicioArticulo.listarTodos().subscribe(resArticulos=>{
          resArticulos.forEach(element => {
            if(element.descripcion == articulo.descripcion){
              this.aprobar = true
            }else{
              this.aprobar = false
            }
            this.listarExiste.push(this.aprobar);
          });
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
            this.registrarArticulo(articulo);
          }
        })
      }
    })

  }

  public registrarArticulo(articulo: Articulo) {
    this.servicioArticulo.registrar(articulo).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Articulo Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
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

  public limpiar(){
    this.listadoArtSel = []
  }

  public generarSolicitud(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    let solicitud : Solicitud = new Solicitud();
    solicitud.fecha = this.fecha
    this.servicioEstado.listarPorId(28).subscribe(resEstado=>{
      solicitud.idEstado = resEstado
      this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
        solicitud.idUsuario = resUsuario
        this.registrarSolicitud(solicitud)
      })
    })
  }

  public registrarSolicitud(solicitud: Solicitud){
    this.servicioSolicitud.registrar(solicitud).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se registro la solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
      this.detalleSolicitud()
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

  public detalleSolicitud(){
    var usuarios: any = []
    this.servicioSolicitud.listarTodos().subscribe(resSolicitudes=>{
      resSolicitudes.forEach(element => {
        if(element.idUsuario.id == Number(sessionStorage.getItem('id'))){
          usuarios.push(element)
        }
      });
      for (let index = 0; index < usuarios.length; index++) {
        const element = usuarios[index];
        if(usuarios.indexOf(element) == usuarios.length-1){
          this.listadoSolicitud.push(element)
        }
      }
      this.listadoArtSel.forEach((element:any) => {
        let detalleSolicitud : DetalleSolicitud = new DetalleSolicitud();
        detalleSolicitud.idArticulos = element.articulo
        this.listadoSolicitud.forEach((elementSolicitud:any) => {
          detalleSolicitud.idSolicitud = elementSolicitud
          detalleSolicitud.valorUnitario = 0
          detalleSolicitud.cantidad = element.cantidad
          detalleSolicitud.valorTotal = 0
          detalleSolicitud.observacion = element.observacion
          this.servicioEstado.listarPorId(28).subscribe(resEstado=>{
            detalleSolicitud.idEstado = resEstado
            this.registrarDetalleSolicitud(detalleSolicitud)
          })
        });
      });
    })
  }

  public registrarDetalleSolicitud(detalleSolicitud: DetalleSolicitud){
    this.servicioDetalleSolicitud.registrar(detalleSolicitud).subscribe(res=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
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
