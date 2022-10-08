import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-matriz-necesidad-detalle',
  templateUrl: './matriz-necesidad-detalle.component.html',
  styleUrls: ['./matriz-necesidad-detalle.component.css']
})
export class MatrizNecesidadDetalleComponent implements OnInit {

  displayedColumns = ['mes', 'cantidadMes', 'cantidadObjeto'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public formMatriz!: FormGroup;
  public listaTabla: any = [];
  public informacionMatriz: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
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
          listaValidacion.push(validar)
        }
      }else{
        listaValidacion.push(validar)
      }
      var validacion = listaValidacion.includes(true)
      if(validacion == true){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'La cantidad estimada de objetos o la del mes no puede ser mayor a la registrada anteriormente!',
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
              mes: mes,
              cantidadMes: cantidadMes,
              cantidadEstimada: cantidadObjeto
            }
            console.log(obj)
            this.listaTabla.push(obj)
            this.dataSource = new MatTableDataSource(this.listaTabla);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
}
