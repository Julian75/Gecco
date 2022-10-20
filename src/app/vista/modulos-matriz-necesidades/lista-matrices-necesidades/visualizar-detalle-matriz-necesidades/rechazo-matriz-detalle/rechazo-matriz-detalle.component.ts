import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { RechazoMatrizDetalleService } from 'src/app/servicios/rechazoMatrizDetalle.service';
import { RechazoMatrizDetalle } from 'src/app/modelos/rechazoMatrizDetalle';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { VisualizarDetalleMatrizNecesidadesComponent } from '../visualizar-detalle-matriz-necesidades.component';
import { MatrizNecesidadService } from 'src/app/servicios/matrizNecesidad.service';
import { MatrizNecesidadDetalle2 } from 'src/app/modelos/modelos2/matrizNecesidadDetalle2';
import { MatrizNecesidad2 } from 'src/app/modelos/modelos2/matrizNecesidad2';
import { MatrizNecesidadDetalleService } from 'src/app/servicios/matrizNecesidadDetalle.service';

@Component({
  selector: 'app-rechazo-matriz-detalle',
  templateUrl: './rechazo-matriz-detalle.component.html',
  styleUrls: ['./rechazo-matriz-detalle.component.css']
})
export class RechazoMatrizDetalleComponent implements OnInit {

  public formMatrizDetalle!: FormGroup;
  public listaDetalleSolicitud: any = [];
  public matriz: any;

  constructor(
    private servicioEstado: EstadoService,
    private servicioModificar: ModificarService,
    private servicioUsuario: UsuarioService,
    private servicioRechazo: RechazoMatrizDetalleService,
    private servicioMatrizNecesidades: MatrizNecesidadService,
    private servicioMatrizDetalle: MatrizNecesidadDetalleService,
    public dialogRef: MatDialogRef<RechazoMatrizDetalleComponent>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formMatrizDetalle = this.fb.group({
      id: [''],
      observacion: [null,Validators.required],
    });
  }

  public guardar(){
    this.matriz = this.data
    document.getElementById('snipper8')?.setAttribute('style', 'display: block;')
    let rechazoMatriz : RechazoMatrizDetalle = new RechazoMatrizDetalle();
    const observacion = this.formMatrizDetalle.controls['observacion'].value;
    if(observacion == "" || observacion == null){
      document.getElementById('snipper8')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'La observacion no puede estar vacia!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      rechazoMatriz.comentario = observacion
      this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario => {
        rechazoMatriz.idUsuario = resUsuario
        this.servicioMatrizDetalle.listarPorId(this.matriz.id).subscribe(resMatrizDetalle=>{
          rechazoMatriz.idMatrizDetalle = resMatrizDetalle
          this.rechazarSolicitud(rechazoMatriz);
        })
      })
    }
  }

  public rechazarSolicitud(rechazoMatriz : RechazoMatrizDetalle){
    this.servicioRechazo.registrar(rechazoMatriz).subscribe(resRechazo=>{
      this.matriz = this.data
      this.servicioEstado.listarPorId(87).subscribe(resEstado =>{
        let matrizNecesidadDetalleActualizar : MatrizNecesidadDetalle2 = new MatrizNecesidadDetalle2();
        matrizNecesidadDetalleActualizar.id = this.matriz.id
        matrizNecesidadDetalleActualizar.cantidad_ejecuciones = this.matriz.cantidadEjecuciones
        matrizNecesidadDetalleActualizar.cantidad_estimada = this.matriz.cantidadEstimada
        matrizNecesidadDetalleActualizar.descripcion = this.matriz.descripcion
        matrizNecesidadDetalleActualizar.fecha = this.matriz.fecha
        matrizNecesidadDetalleActualizar.cantidad_comprada = 0
        matrizNecesidadDetalleActualizar.cantidad_ejecuciones_cumplidas = 0
        matrizNecesidadDetalleActualizar.id_orden_compra = 0
        matrizNecesidadDetalleActualizar.costo_ejecucion_comprada = 0
        matrizNecesidadDetalleActualizar.porcentaje = 0
        matrizNecesidadDetalleActualizar.id_matriz_necesidad = this.matriz.idMatrizNecesidad.id
        matrizNecesidadDetalleActualizar.id_estado = resEstado.id
        this.actualizarMatrizDetalleRechazo(matrizNecesidadDetalleActualizar);
      })
    }, error => {
      document.getElementById('snipper8')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al generar la observacion!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  listaMatrizDetalleSinRechazo: any = [];
  suma = 0;
  contador = 0;
  public actualizarMatrizDetalleRechazo(matrizDetalle : MatrizNecesidadDetalle2){
    this.suma = 0
    this.contador = 0
    this.listaMatrizDetalleSinRechazo = [];
    this.servicioModificar.actualizarMatrizNecesidadDetalle(matrizDetalle).subscribe(resMatrizNecesidadDetalleActualizado=>{
      this.servicioMatrizDetalle.listarTodos().subscribe(resMatDetalle =>{
        let matrizNecesidadDetalleActualizar : MatrizNecesidadDetalle2 = new MatrizNecesidadDetalle2();
        let matrizNecesidad : MatrizNecesidad2 = new MatrizNecesidad2();
        resMatDetalle.forEach(element => {
          if(element.idMatrizNecesidad.id == matrizDetalle.id_matriz_necesidad && element.idEstado.id != 87){
            this.listaMatrizDetalleSinRechazo.push(element)
          }
        });
        for (let i = 0; i < this.listaMatrizDetalleSinRechazo.length; i++) {
          const element = this.listaMatrizDetalleSinRechazo[i];
          var lengthMatrizNecesidadesDetalle = this.listaMatrizDetalleSinRechazo.length
          var porcentajeIndividualEjecucionCompleta = 100/lengthMatrizNecesidadesDetalle
          var porcentajeEjecucionACumplir = porcentajeIndividualEjecucionCompleta/element.cantidadEjecuciones
          var porcentajeCumplidoFinalmente = porcentajeEjecucionACumplir*element.cantidadEjecucionesCumplidas
          matrizNecesidadDetalleActualizar.id = element.id
          matrizNecesidadDetalleActualizar.cantidad_ejecuciones = element.cantidadEjecuciones
          matrizNecesidadDetalleActualizar.id_orden_compra = element.idOrdenCompra
          matrizNecesidadDetalleActualizar.cantidad_estimada = element.cantidadEstimada
          matrizNecesidadDetalleActualizar.descripcion = element.descripcion
          matrizNecesidadDetalleActualizar.fecha = element.fecha
          matrizNecesidadDetalleActualizar.cantidad_comprada = element.cantidadComprada
          matrizNecesidadDetalleActualizar.cantidad_ejecuciones_cumplidas = element.cantidadEjecucionesCumplidas
          matrizNecesidadDetalleActualizar.costo_ejecucion_comprada = element.costoEjecucionComprada
          matrizNecesidadDetalleActualizar.porcentaje = porcentajeCumplidoFinalmente
          matrizNecesidadDetalleActualizar.id_matriz_necesidad = element.idMatrizNecesidad.id
          matrizNecesidadDetalleActualizar.id_estado = element.idEstado.id
          this.actualizarMatrizDetalleIndividual(matrizNecesidadDetalleActualizar);
          this.suma = this.suma + porcentajeCumplidoFinalmente
          this.contador ++
          if(this.contador == this.listaMatrizDetalleSinRechazo.length){
            this.servicioMatrizNecesidades.listarPorId(matrizDetalle.id_matriz_necesidad).subscribe(resMatriz =>{
              matrizNecesidad.id = resMatriz.id
              matrizNecesidad.cantidad = resMatriz.cantidad
              matrizNecesidad.cantidadEjecuciones = resMatriz.cantidadEjecuciones
              matrizNecesidad.costoEstimado = resMatriz.costoEstimado
              matrizNecesidad.costoTotal = resMatriz.costoTotal
              matrizNecesidad.costoUnitario = resMatriz.costoUnitario
              matrizNecesidad.detalle = resMatriz.detalle
              var fechaMatrizNecesidad = new Date(resMatriz.fecha)
              fechaMatrizNecesidad.setDate(fechaMatrizNecesidad.getDate()+1)
              matrizNecesidad.fecha = fechaMatrizNecesidad
              matrizNecesidad.idSubProceso = resMatriz.idSubProceso.id
              matrizNecesidad.idTipoActivo = resMatriz.idTipoActivo.id
              matrizNecesidad.idTipoNecesidad = resMatriz.idTipoNecesidad.id
              matrizNecesidad.porcentajeTotal = this.suma
              this.actualizarMatrizNecesidad(matrizNecesidad);
            })
          }
        }
      })
    }, error => {
      document.getElementById('snipper8')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al actualizar la matriz necesidad detalle!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public actualizarMatrizDetalleIndividual(matrizDetalle : MatrizNecesidadDetalle2){
    this.servicioModificar.actualizarMatrizNecesidadDetalle(matrizDetalle).subscribe(resMatrizNecesidadDetalleActualizado=>{

    }, error => {
      document.getElementById('snipper8')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al actualizar la matriz necesidad detalle!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public actualizarMatrizNecesidad(MatrizNecesidad: MatrizNecesidad2){
    this.servicioModificar.actualizarMatrizNecesidad(MatrizNecesidad).subscribe(resMatrizNecesidadDetalleActualizado=>{
      this.dialogRef.close();
      const dialogRef = this.dialog.open(VisualizarDetalleMatrizNecesidadesComponent, {
        width: '1000px',
        height: '440px',
        data: MatrizNecesidad.id
      });
    }, error => {
      document.getElementById('snipper8')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al actualizar la matriz necesidad detalle!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
