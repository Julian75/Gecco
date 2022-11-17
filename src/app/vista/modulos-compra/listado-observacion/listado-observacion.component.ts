import { ProcesoComponent } from './../proceso/proceso.component';
import { DetalleSolicitudService } from './../../../servicios/detalleSolicitud.service';
import { SolicitudService } from './../../../servicios/solicitud.service';
import { VisualizarDetalleSolicitudComponent } from './../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DetalleSolicitud } from 'src/app/modelos/detalleSolicitud';
import { SelectionModel } from '@angular/cdk/collections';
import { DetalleArticulo } from 'src/app/modelos/detalleArticulo';
import { TodosComentariosComponent } from '../proceso/todos-comentarios/todos-comentarios.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-observacion',
  templateUrl: './listado-observacion.component.html',
  styleUrls: ['./listado-observacion.component.css']
})
export class ListadoObservacionComponent implements OnInit {
  public idSolicitud: any;
  public estadoSolicitud: any;
  public listarDetalle: any = [];
  displayedColumns = ['select', 'id', 'articulo','solicitud', 'cantidad','observacion','estado', 'opciones'];
  dataSource2!:MatTableDataSource<any>;
  dataSource = new MatTableDataSource<DetalleArticulo>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialogRef: MatDialogRef<VisualizarDetalleSolicitudComponent>,
    public dialogRef2: MatDialogRef<ListadoObservacionComponent>,
    public pasos: MatDialogRef<ProcesoComponent>,
    private servicelistaSolicitud: SolicitudService,
    private serviceDetalleSolicitud: DetalleSolicitudService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarDetalleSolicitud();
  }

  //chetbox

  selection = new SelectionModel<DetalleArticulo>(true, []);
  public list: any = {};
  public listaRow: any = [];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;

  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  seleccionados:any
  toggleAllRows(event: any) {
    if(event.checked == true){
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
      this.selection.select(...this.dataSource.data);
      this.listaRow = this.listarDetalle
    }else{
      console.log("hola")
      this.listaRow = []
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
      this.listaRow = []
      this.selection.select(...this.dataSource.data);
    }
    console.log(this.listaRow)
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
        if(element.articulo.id == this.list.id){
          if(element.seleccionado == true && event.checked == false){
            var posicion = this.listaRow.indexOf(element)
            this.listaRow.splice(posicion, 1)
            break
          }
        }else if(element.articulo.id != this.list.id && event.checked == true){
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
  checkboxLabel(row?: DetalleArticulo): string {
    var encontrado = false
    const listaEncontrado: any = []
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1},`+this.selection.isSelected(row)+` estas son: `+row;
  }

  listaModificada: any =[];
  public abrirTodosComentarios(){
    if(this.listaRow.length == 0){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Debe tener seleccionado a cuales articulos desea que le creen un comentario!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      if(this.listaRow[0].articulo == undefined){
        for (let i = 0; i < this.listaRow.length; i++) {
          var obj = { articulo: {}}
          const element = this.listaRow[i];
          obj.articulo = element
          this.listaModificada.push(obj)
        }
        if(this.listaModificada.length > 0){
          const dialogRef = this.dialog.open(TodosComentariosComponent, {
            width: '400px',
            data: this.listaModificada
          });
        }else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Debe tener seleccionado a cuales articulos desea que le creen un comentario!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }else{
        if(this.listaRow.length > 0){
          const dialogRef = this.dialog.open(TodosComentariosComponent, {
            width: '400px',
            data: this.listaRow
          });
        }else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Debe tener seleccionado a cuales articulos desea que le creen un comentario!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    }
  }

  public listarDetalleSolicitud() {
    this.idSolicitud = this.data;
    this.servicelistaSolicitud.listarPorId(this.idSolicitud.id).subscribe( res => {
      this.estadoSolicitud = res.idEstado.id
      this.serviceDetalleSolicitud.listarTodos().subscribe( resDetalle => {
        resDetalle.forEach(element => {
          if (element.idSolicitud.id == res.id && element.idEstado.id == 28 ) {
            this.listarDetalle.push(element);
          }
        })
        this.dataSource = new MatTableDataSource( this.listarDetalle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource2 = new MatTableDataSource(this.listarDetalle);
    }else{
      this.dataSource2.filter = filterValue.trim().toLowerCase();
      this.dataSource2.filterPredicate = (data: DetalleSolicitud, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return this.nestedFilterCheck(currentTerm, data, key);
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      }
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  name = 'listaSolicitudes.xlsx';
  exportToExcel(): void {
    // let element = document.getElementById('rol');
    // const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // const book: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    // XLSX.writeFile(book, this.name);
  }

  public formularioObservacion(idDetalleSolicitud: number){
    this.dialogRef2.close();
    const dialogRef = this.dialog.open(ProcesoComponent, {
      width: '400px',
      data: idDetalleSolicitud
    });
  }

  public volver(){
    this.dialogRef.close();
  }

}
