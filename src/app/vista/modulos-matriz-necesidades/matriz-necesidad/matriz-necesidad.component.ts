import { SubProceso } from './../../../modelos/subProceso';
import { startWith, map, Observable } from 'rxjs';
import { TipoActivoService } from 'src/app/servicios/tipoActivo.service';
import { TipoNecesidad } from 'src/app/modelos/tipoNecesidad';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SubProcesoService } from 'src/app/servicios/subProceso.Service';
import { TipoNecesidadService } from 'src/app/servicios/tipoNecesidad.service';
import Swal from 'sweetalert2';
import { MatrizNecesidad } from 'src/app/modelos/matrizNecesidad';
import { MatrizNecesidadService } from 'src/app/servicios/matrizNecesidad.service';
import {MatDialog} from '@angular/material/dialog';
import { MatrizNecesidadDetalleComponent } from '../matriz-necesidad-detalle/matriz-necesidad-detalle.component';
import { TipoProcesoService } from 'src/app/servicios/tipoProceso.service';

@Component({
  selector: 'app-matriz-necesidad',
  templateUrl: './matriz-necesidad.component.html',
  styleUrls: ['./matriz-necesidad.component.css']
})
export class MatrizNecesidadComponent implements OnInit {

  public formMatrizNecesidad!: FormGroup;
  color = ('primary');
  public listaProcesos: any = [];
  public listaSubprocesos: any = [];
  public listaTipoActivos: any = [];
  public listaNecesidades: any = [];
  public fechaActual: Date = new Date();
  control = new FormControl<string | SubProceso>("");
  opcionesFiltradas!: Observable<SubProceso[]>;

  constructor(
    private servicioSubProceso: SubProcesoService,
    private servicioProceso: TipoProcesoService,
    private servicioTipoActivos: TipoActivoService,
    private servicioTipoNecesidades: TipoNecesidadService,
    private servicioMatrizNecesidad: MatrizNecesidadService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarProcesos();
    this.listarTipoNecesidades();
    this.listarTipoActivos();
    this.crearFormulario();
  }

  public listarProcesos() {
    this.servicioProceso.listarTodos().subscribe(resProcesos => {
      this.listaProcesos = resProcesos
    });
  }

  idProceso: any // Id de la oficina capturado - 18
  listaIdProcesos: any = []
  listaSubProcesos: any = []
  idProcesos(event:any){
    this.listaSubProcesos = []
    const listaSubProceso = event.value
    this.listaIdProcesos.push(listaSubProceso.id)
    let ultimo = this.listaIdProcesos[this.listaIdProcesos.length - 1]
    let penultimo = this.listaIdProcesos[this.listaIdProcesos.length - 2]
    if(ultimo != penultimo || penultimo == undefined){
      this.servicioSubProceso.listarTodos().subscribe(resSubProcesos=>{
        resSubProcesos.forEach(elementSubProceso => {
          if(elementSubProceso.idTipoProceso.id == ultimo){
            this.listaSubProcesos.push(elementSubProceso)
          }
        });
        this.opcionesFiltradas = this.control.valueChanges.pipe(
          startWith(""),
          map(value => {
            const descripcion = typeof value == 'string' ? value : value?.descripcion;
            return descripcion ? this.filtrado(descripcion as string, this.listaSubProcesos) : this.listaSubProcesos.slice();
          }),
          );
      })
    }
  }

  public filtrado(descripcion: string, listaSubProceso:any): SubProceso[] {
    const filterNo2 = descripcion.toLowerCase();

    return listaSubProceso.filter((subProceso:any) => (subProceso.descripcion.toLowerCase().includes(filterNo2)));
  }

  textoSubProceso:any
  displaySf(subproceso: SubProceso): any {
    this.textoSubProceso = subproceso
    if(this.textoSubProceso == ""){
      this.textoSubProceso = " "
    }else{
      this.textoSubProceso = subproceso.descripcion

      return this.textoSubProceso;
    }
  }

  public listarTipoActivos() {
    this.servicioTipoActivos.listarTodos().subscribe(resTiposActivos => {
      this.listaTipoActivos = resTiposActivos
    });
  }

  public listarTipoNecesidades() {
    this.servicioTipoNecesidades.listarTodos().subscribe(resTipoNecesidades => {
      this.listaNecesidades = resTipoNecesidades
    });
  }

  private crearFormulario() {
    this.formMatrizNecesidad = this.fb.group({
      id: 0,
      proceso: [null,Validators.required],
      tipoNecesidad: [null,Validators.required],
      detalle: [null,Validators.required],
      cantidad: [null,Validators.required],
      cantidadEjecucion: [null,Validators.required],
      costoUnitario: [null,Validators.required],
      tipoActivo: [null,Validators.required],
    });
  }

  listaSubProcesito: any = []
  public guardar(){
    if(this.formMatrizNecesidad.valid && this.control.value != ''){
      let matrizNecesidad : MatrizNecesidad = new MatrizNecesidad()
      this.listaSubProcesito = this.control.value
      var costoUnitario = this.formMatrizNecesidad.controls['costoUnitario'].value
      var costoSinPuntos = Number(costoUnitario.replace(/\./g, ''));
      this.servicioTipoNecesidades.listarPorId(Number(this.formMatrizNecesidad.controls['tipoNecesidad'].value)).subscribe(resTipoNecesidad=>{
        this.servicioTipoActivos.listarPorId(Number(this.formMatrizNecesidad.controls['tipoActivo'].value)).subscribe(resTipoActivo=>{
          this.servicioSubProceso.listarPorId(Number(this.listaSubProcesito.id)).subscribe(resSubproceso=>{
            matrizNecesidad.idSubProceso = resSubproceso
            matrizNecesidad.idTipoNecesidad = resTipoNecesidad
            matrizNecesidad.idTipoActivo = resTipoActivo
            matrizNecesidad.fecha = this.fechaActual
            matrizNecesidad.cantidad = this.formMatrizNecesidad.controls['cantidad'].value
            matrizNecesidad.cantidadEjecuciones = this.formMatrizNecesidad.controls['cantidadEjecucion'].value
            matrizNecesidad.costoTotal = 0
            matrizNecesidad.costoUnitario = costoSinPuntos
            matrizNecesidad.detalle = this.formMatrizNecesidad.controls['detalle'].value
            matrizNecesidad.costoEstimado = matrizNecesidad.costoUnitario * matrizNecesidad.cantidad
            matrizNecesidad.porcentajeTotal = 0;
            this.registrarMatrizNecesidad(matrizNecesidad)
          })
        })
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Campos Vacios!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public registrarMatrizNecesidad(matrizNecesidad: MatrizNecesidad){
    this.servicioMatrizNecesidad.registrar(matrizNecesidad).subscribe(resMatrizNecesidad=>{
      const dialogRef = this.dialog.open(MatrizNecesidadDetalleComponent, {
        width: '900px',
        height: '550px',
        data: resMatrizNecesidad,
        backdropClass: 'static',
        disableClose: true,
      });
    })
  }

  public format() {
    var costo = this.formMatrizNecesidad.controls['costoUnitario'].value
    const formatterPeso = new Intl.NumberFormat('es-CO')
    var num = costo.replace(/\./g, '');
    var num2 = formatterPeso.format(num)
    this.formMatrizNecesidad.controls['costoUnitario'].setValue(num2)
  }

}
