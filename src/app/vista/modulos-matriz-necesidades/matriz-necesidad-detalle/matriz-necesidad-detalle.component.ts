import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatrizNecesidadDetalle } from 'src/app/modelos/MatrizNecesidadDetalle';
import { MatrizNecesidadDetalleService } from 'src/app/servicios/matrizNecesidadDetalle.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-matriz-necesidad-detalle',
  templateUrl: './matriz-necesidad-detalle.component.html',
  styleUrls: ['./matriz-necesidad-detalle.component.css']
})
export class MatrizNecesidadDetalleComponent implements OnInit {

  displayedColumns = ['select', 'mes', 'cantidadMes', 'cantidadObjeto'];
  // dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public formMatriz!: FormGroup;
  public listaTabla: any = [];
  public informacionMatriz: any;
  public listaRow: any = [];
  public list: any = {};
  public fecha: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private servicioMatrizDetalle: MatrizNecesidadDetalleService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<MatrizNecesidadDetalleComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formMatriz = this.fb.group({
      id: 0,
      mes: [null,Validators.required],
      cantidadMes: [null,Validators.required],
      cantidadObjeto: [null,Validators.required],
    });
    this.informacionMatriz = this.data
  }

  public guardar(){
    if(this.formMatriz.valid){
      this.informacionMatriz = this.data
      var cantidadMes = this.formMatriz.controls['cantidadMes'].value;
      var cantidadObjeto = this.formMatriz.controls['cantidadObjeto'].value;
      var fecha = this.formMatriz.controls['mes'].value.split('-');
      var mes = new Date(fecha[0], (fecha[1]-1), 11)
      var sumaMes = 0;
      var totalMes = 0;
      var sumaObjeto = 0;
      var totalObjeto = 0;
      var validar = false
      var listaValidacion = []
      var validarFecha = false
      var listaValidacionFecha = []
      var codigo = 1
      console.log(this.listaTabla)
      if(this.listaTabla.length > 0){
        for (let i = 0; i < this.listaTabla.length; i++) {
          const element = this.listaTabla[i];
          sumaMes = sumaMes + element.cantidadMes
          totalMes = sumaMes + cantidadMes
          sumaObjeto = sumaObjeto + element.cantidadEstimada
          totalObjeto = sumaObjeto + cantidadObjeto
          if(totalMes > this.informacionMatriz.cantidadEjecuciones){
            validar = true
          }else if(totalObjeto > this.informacionMatriz.cantidad){
            validar = true
          }
          if(mes.getMonth() == element.mes.getMonth()){
            validarFecha = true
          }
          listaValidacion.push(validar)
          listaValidacionFecha.push(validarFecha)
        }
        codigo = codigo + 1
      }else{
        listaValidacion.push(validar)
        listaValidacionFecha.push(validarFecha)
      }
      var validacion = listaValidacion.includes(true)
      var validacionFecha = listaValidacionFecha.includes(true)
      if(validacion == true){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No se pueden ingresar mas porque sobrepasaria la cantidad digitada!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        if(validacionFecha == true){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'El mes seleccionado ya esta registrado en la tabla!',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          if(cantidadMes > this.informacionMatriz.cantidadEjecuciones){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'La cantidad de ejecuciones por mes no puede ser mayor a la registrada anteriormente!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            if(cantidadObjeto > this.informacionMatriz.cantidad){
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'La cantidad estimada de objetos no puede ser mayor a la registrada anteriormente!',
                showConfirmButton: false,
                timer: 1500
              })
            }else{
              var obj = {
                id: codigo,
                mes: mes,
                cantidadMes: cantidadMes,
                cantidadEstimada: cantidadObjeto
              }
              this.listaTabla.push(obj)
              this.dataSource = new MatTableDataSource(this.listaTabla);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          }
        }
      }
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los campos no pueden estar vacios!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public crearMatriz(){
    this.informacionMatriz = this.data
    var sumaMes = 0;
    var sumaObjeto = 0;
    var validar = false
    var listaValidacion = []
    console.log(this.informacionMatriz)
    for (let i = 0; i < this.listaTabla.length; i++) {
      const element = this.listaTabla[i];
      sumaMes = sumaMes + element.cantidadMes
      sumaObjeto = sumaObjeto + element.cantidadEstimada
      if(sumaMes == this.informacionMatriz.cantidadEjecuciones && sumaObjeto == this.informacionMatriz.cantidad){
        validar = true
      }
      listaValidacion.push(validar)
    }
    var validacion = listaValidacion.includes(true)
    if(this.listaTabla.length > 0){
      if(validacion == true){
        let matrizDetalle : MatrizNecesidadDetalle = new MatrizNecesidadDetalle();
        matrizDetalle.fecha = this.fecha
        matrizDetalle.idMatrizNecesidad = this.informacionMatriz
        matrizDetalle.cantidadComprada = 0
        matrizDetalle.costoEjecucionComprada = 0
        matrizDetalle.porcentaje = 0
        for (let i = 0; i < this.listaTabla.length; i++) {
          const element = this.listaTabla[i];
          matrizDetalle.cantidadEjecuciones = element.cantidadMes
          matrizDetalle.cantidadEstimada = element.cantidadEstimada
          this.registrarMatriz(matrizDetalle);
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Matriz Registrado!',
          showConfirmButton: false,
          timer: 1500
        })
        this.dialogRef.close();
        window.location.reload();
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'La cantidad de mes o la cantidad de objetos es menor a la registrada!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'La solicitud no se puede generar si la tabla esta vacia!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public registrarMatriz(matrizDetalle: MatrizNecesidadDetalle){
    this.servicioMatrizDetalle.registrar(matrizDetalle).subscribe(res =>{

    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  dataSource = new MatTableDataSource<MatrizNecesidadDetalle>();
  selection = new SelectionModel<MatrizNecesidadDetalle>(true, []);

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
    this.listaRow = this.listaTabla
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
        if(element.articulo.id == this.list.articulo.id){
          if(element.seleccionado == true && event.checked == false){
            var posicion = this.listaRow.indexOf(element)
            this.listaRow.splice(posicion, 1)
            break
          }
        }else if(element.articulo.id != this.list.articulo.id && event.checked == true){
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
  checkboxLabel(row?: MatrizNecesidadDetalle): string {
    var encontrado = false
    const listaEncontrado: any = []
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1},`+this.selection.isSelected(row)+` estas son: `+row;
  }

  public eliminarSeleccion(){
    if(this.listaRow.length == this.listaTabla.length){
      this.listaTabla = []
      this.dataSource = new MatTableDataSource( this.listaTabla);
    }else{
      this.listaRow.forEach((element:any) => {
        for (let i in this.listaTabla) {
          if (this.listaTabla[i].id == element.articulo.id) {
            this.listaTabla.splice(i, 1)
          }
        }
      });
      this.dataSource = new MatTableDataSource( this.listaTabla);
    }
  }
}
