import { MatrizNecesidadService } from './../../../../servicios/matrizNecesidad.service';
import { MatrizNecesidadDetalle } from 'src/app/modelos/MatrizNecesidadDetalle';
import { MatrizNecesidadDetalleComponent } from './../matriz-necesidad-detalle.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { PeriodoEjecucionService } from 'src/app/servicios/periodoEjecucion.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { MatrizNecesidadDetalleService } from 'src/app/servicios/matrizNecesidadDetalle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-periodo-ejecucion-matriz-detalle',
  templateUrl: './periodo-ejecucion-matriz-detalle.component.html',
  styleUrls: ['./periodo-ejecucion-matriz-detalle.component.css']
})
export class PeriodoEjecucionMatrizDetalleComponent implements OnInit {
  public formPeriodoEjecucion!: FormGroup;
  public listaPeriodoEjecuciones: any = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private servicioPeriodoEjecucion: PeriodoEjecucionService,
    private servicioEstado: EstadoService,
    private servicioMatrizDetalle: MatrizNecesidadDetalleService,
    private servicioMatrizNecesidades: MatrizNecesidadService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarPeriodosEjecuciones();
  }

  private crearFormulario() {
    this.formPeriodoEjecucion = this.fb.group({
      mes: [null,Validators.required]
    });
  }

  listarPeriodosEjecuciones(){
    this.servicioPeriodoEjecucion.listarTodos().subscribe(resPeriodoEjecuciones=>{
      this.listaPeriodoEjecuciones = resPeriodoEjecuciones
    })
  }

  seleccionPeriodo: any;
  seleccionPeriodoEjecucion(seleccion){
    this.seleccionPeriodo = seleccion.value
    if(Number(this.seleccionPeriodo) == 7){
      document.getElementById('mesInicial')?.setAttribute('style', 'display: none;')
      this.crearFormulario();
    }else{
      document.getElementById('mesInicial')?.setAttribute('style', 'display: block;')
      this.crearFormulario();
    }
  }

  listaMatrizNecesidad: any = []
  listaValidacionMatriz: any = []
  validacion = false
  listaVerificacion = []
  listaMatrizCreada: any = []
  fechaActual: Date = new Date();
  guardar(){
    document.getElementById("snipper1").setAttribute("style", "display: block;")
    this.listaVerificacion = []
    if(this.seleccionPeriodo == 7){
      const dialogRef = this.dialog.open(MatrizNecesidadDetalleComponent, {
        width: '1000px',
        height: '440px',
        data: this.data,
        backdropClass: 'static',
        disableClose: true,
      });
    }else{
      this.listaValidacionMatriz = []
      this.servicioPeriodoEjecucion.listarPorId(Number(this.seleccionPeriodo)).subscribe(resPeriodo=>{
        this.servicioEstado.listarPorId(85).subscribe(resEstado=>{
          this.listaMatrizNecesidad = this.data
          var splitfecha = this.formPeriodoEjecucion.controls['mes'].value.split('-')
          var año = splitfecha[0]
          var mes = Number(splitfecha[1])
          for (let index = 0; index < 13; index++) {
            if(index > 0){
              mes = mes + resPeriodo.cantidad
            }
            var obj = {
              fecha: '',
              ejecuciones: 0,
              objetos: 0,
            }
            if (año == (this.fechaActual.getFullYear()+1)) {
              this.validacion = true
            }
            this.listaVerificacion.push(this.validacion)
            if(mes <= 12){
              if(this.listaValidacionMatriz.length < this.listaMatrizNecesidad.cantidadEjecuciones && this.listaValidacionMatriz.length < this.listaMatrizNecesidad.cantidad){
                if(mes == 12){
                  var fechita = new Date(año, mes)
                  obj.fecha = String((fechita.getFullYear()-1)+"-12-1")
                  this.listaValidacionMatriz.push(obj)
                }else{
                  var fechita = new Date(año, mes)
                  obj.fecha = String(fechita.getFullYear()+"-"+fechita.getMonth()+"-1")
                  this.listaValidacionMatriz.push(obj)
                }
              }
            }else{
              break
            }
          }
          var existe = this.listaVerificacion.includes(true)
          if(existe == true){
            var sumaEjecuciones = 1
            for (let i = 0; i < this.listaMatrizNecesidad.cantidadEjecuciones; i++) {
              for (let j = 0; j < this.listaValidacionMatriz.length; j++) {
                if(sumaEjecuciones <= this.listaMatrizNecesidad.cantidadEjecuciones){
                  this.listaValidacionMatriz[j].ejecuciones = Number(this.listaValidacionMatriz[j].ejecuciones)+1
                  sumaEjecuciones = sumaEjecuciones + 1
                }else{
                  break
                }
              }
            }
            var sumaObjetos = 1
            for (let i = 0; i < this.listaMatrizNecesidad.cantidad; i++) {
              for (let j = 0; j < this.listaValidacionMatriz.length; j++) {
                if(sumaObjetos <= this.listaMatrizNecesidad.cantidad){
                  this.listaValidacionMatriz[j].objetos = Number(this.listaValidacionMatriz[j].objetos)+1
                  sumaObjetos = sumaObjetos + 1
                }else{
                  break
                }
              }
            }
            this.servicioMatrizNecesidades.registrar(this.listaMatrizNecesidad).subscribe(resMatriz=>{
              this.listaMatrizCreada = resMatriz
              for (let i = 0; i < this.listaValidacionMatriz.length; i++) {
                const element = this.listaValidacionMatriz[i];
                let matrizDetalle : MatrizNecesidadDetalle = new MatrizNecesidadDetalle();
                matrizDetalle.cantidadEstimada = element.objetos
                matrizDetalle.cantidadEjecuciones = element.ejecuciones
                matrizDetalle.idMatrizNecesidad = this.listaMatrizCreada
                matrizDetalle.descripcion = this.listaMatrizNecesidad.detalle
                matrizDetalle.cantidadComprada = 0
                matrizDetalle.costoEjecucionComprada = 0
                matrizDetalle.porcentaje = 0
                matrizDetalle.cantidadEjecucionesCumplidas = 0
                matrizDetalle.idOrdenCompra = 0
                matrizDetalle.idEstado = resEstado
                matrizDetalle.fecha = new Date(element.fecha)
                this.registrarMatrizDetalle(matrizDetalle);
              }
            }, error => {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Hubo un error al agregar la matriz de necesidades!',
                showConfirmButton: false,
                timer: 1500
              })
              document.getElementById("snipper1").setAttribute("style", "display: none;")
              window.location.reload()
            })
          }else{
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'El año en el que quiere generar esa matriz no es valido!',
              showConfirmButton: false,
              timer: 1500
            })
            document.getElementById("snipper1").setAttribute("style", "display: none;")
          }
        })
      })
    }
  }

  registrarMatrizDetalle(matrizDetalle: MatrizNecesidadDetalle){
    this.servicioMatrizDetalle.registrar(matrizDetalle).subscribe(resMatrizDetalle=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se registro la matriz necesidad!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload()
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar matriz detalle!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("snipper1").setAttribute("style", "display: none;")
      window.location.reload()
    })
  }

}
