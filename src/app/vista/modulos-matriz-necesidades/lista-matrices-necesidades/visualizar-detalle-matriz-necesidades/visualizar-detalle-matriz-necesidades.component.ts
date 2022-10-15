import { MatrizNecesidad2 } from './../../../../modelos/modelos2/matrizNecesidad2';
import { MatrizNecesidadDetalle2 } from './../../../../modelos/modelos2/matrizNecesidadDetalle2';
import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatrizNecesidadService } from 'src/app/servicios/matrizNecesidad.service';
import { MatrizNecesidadDetalleService } from 'src/app/servicios/matrizNecesidadDetalle.service';
import Swal from 'sweetalert2';
import { MatrizNecesidadDetalle } from 'src/app/modelos/MatrizNecesidadDetalle';
//Grafica
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexLegend,
  ApexResponsive
} from "ng-apexcharts";
import { ModificarService } from 'src/app/servicios/modificar.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

@Component({
  selector: 'app-visualizar-detalle-matriz-necesidades',
  templateUrl: './visualizar-detalle-matriz-necesidades.component.html',
  styleUrls: ['./visualizar-detalle-matriz-necesidades.component.css']
})
export class VisualizarDetalleMatrizNecesidadesComponent implements OnInit {
  dtOptions: any = {};
  public listarMatrizDetalle: any = [];
  public formDetalleMatrizNecesidad!: FormGroup;
  listaMatrizDetalleNecesidades: any = []
  displayedColumns = ['descripcionMatrizDetalle','fecha','porcentajeMatrizDetalle','cantidadEjecuciones', 'cantidadObjetosEstimados', 'cantidadEjecucionesCompletas','costoEjecucionComprada','cantidadObjetosComprados','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  color = ('primary')

  //Grafico
  @ViewChild("chart") chart: VisualizarDetalleMatrizNecesidadesComponent;
  public chartOptions: Partial<ChartOptions>;
  public colorRojo = "#f70000";
  public colorAmarillo = "#f6f700";
  public colorVerdeOscuro = "#15a604";
  public colorVerdeClaro = "#00f704";
  public valor = 0;
  public colorFondo = "";
  public colorGradual = "";

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VisualizarDetalleMatrizNecesidadesComponent>,
    private servicioMatrizNecesidades: MatrizNecesidadService,
    private servicioMatrizDetalle: MatrizNecesidadDetalleService,
    private servicioModificar: ModificarService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public id: MatDialog,
  ) { }

  ngOnInit(): void {
    this.servicioMatrizNecesidades.listarPorId(Number(this.id)).subscribe(resMatriz=>{
      this.valor = resMatriz.porcentajeTotal
      if (this.valor >= 0 && this.valor <= 33) {
        this.colorFondo = this.colorRojo;
        this.colorGradual = this.colorRojo;
      }
      if (this.valor >= 34 && this.valor <= 66) {
        this.colorFondo = this.colorAmarillo;
        this.colorGradual = this.colorRojo;
      }
      if (this.valor >= 67 && this.valor <= 80) {
        this.colorFondo = this.colorVerdeOscuro;
        this.colorGradual = this.colorRojo;
      }
      if (this.valor >= 81 && this.valor <= 100) {
        this.colorFondo = this.colorVerdeClaro;
        this.colorGradual = this.colorRojo;
      }
      this.chartOptions = {
        series: [this.valor],
        chart: {
          type: "radialBar",
          offsetY: -20,
          foreColor: "#97B4E2",
          height: 350,
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "",
              strokeWidth: "97%",
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                opacity: 0.31,
                blur: 2
              }
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: -2,
                fontSize: "22px"
              }
            }
          }
        },
        fill: {
          type: "gradient",
          colors: [this.colorFondo],
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: [this.colorGradual],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        labels: ["Average Results"]
      };
    })
    this.listarTodos();
  }

  public listarTodos() {
    this.listarMatrizDetalle = [];
    this.servicioMatrizNecesidades.listarPorId(Number(this.id)).subscribe((resMatrizNecesidades: any) => {
      this.servicioMatrizDetalle.listarTodos().subscribe((resMatrizDetalle: any) => {
        resMatrizDetalle.forEach((element: any) => {
          if (element.idMatrizNecesidad.id == resMatrizNecesidades.id) {
            this.listarMatrizDetalle.push(element);
          }
        });
        this.dataSource = new MatTableDataSource(this.listarMatrizDetalle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  ejecucionesCumplidasNum: any
  detalleMatrizNecesidad: any
  noseEncuentra:boolean = false;
  listaNoseEncuentra:any = [];
  //Ejecuciones cumplidas
  ejecucionesCumplidas(valor:any, detalleMatrizNecesidad:any){
    this.listaNoseEncuentra = []
    this.noseEncuentra = false
    this.ejecucionesCumplidasNum = valor.target.value
    if(this.listaMatrizDetalleNecesidades.length == 0){
      var obj = {
        matrizNecesidadDetalle: {},
        ejecucionesCumplidasNum: 0,
        costoEjecucionComprad: 0,
        objetosCompradosCo: 0
      }
      obj.matrizNecesidadDetalle = detalleMatrizNecesidad
      obj.ejecucionesCumplidasNum = this.ejecucionesCumplidasNum
      this.listaMatrizDetalleNecesidades.push(obj)
    }else{
      for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
        const element = this.listaMatrizDetalleNecesidades[index];
        if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
          this.noseEncuentra = true
        }else{
          this.noseEncuentra = false
        }
        this.listaNoseEncuentra.push(this.noseEncuentra)
      }
      const existeMatrizNecesidadDetalle =  this.listaNoseEncuentra.includes(true)
      if(existeMatrizNecesidadDetalle == true){
        for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
          const element = this.listaMatrizDetalleNecesidades[index];
          if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
            this.listaMatrizDetalleNecesidades[index].ejecucionesCumplidasNum = this.ejecucionesCumplidasNum
          }
        }
      }else if(existeMatrizNecesidadDetalle == false){
        var obj = {
          matrizNecesidadDetalle: {},
          ejecucionesCumplidasNum: 0,
          costoEjecucionComprad: 0,
          objetosCompradosCo: 0
        }
        obj.matrizNecesidadDetalle = detalleMatrizNecesidad
        obj.ejecucionesCumplidasNum = this.ejecucionesCumplidasNum
        this.listaMatrizDetalleNecesidades.push(obj)
      }
    }
  }

  costoEjecucionComprad: any
  detalleMatrizNecesidadCosto: any
  //Ejecuciones cumplidas
  costoEjecucionComprado(valor:any, detalleMatrizNecesidad:any){
    this.listaNoseEncuentra = []
    this.noseEncuentra = false
    this.costoEjecucionComprad = valor.target.value
    this.detalleMatrizNecesidadCosto = detalleMatrizNecesidad
    if(this.listaMatrizDetalleNecesidades.length == 0){
      var obj = {
        matrizNecesidadDetalle: {},
        ejecucionesCumplidasNum: 0,
        costoEjecucionComprad: 0,
        objetosCompradosCo: 0
      }
      obj.matrizNecesidadDetalle = detalleMatrizNecesidad
      obj.costoEjecucionComprad = this.costoEjecucionComprad
      this.listaMatrizDetalleNecesidades.push(obj)
    }else{
      for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
        const element = this.listaMatrizDetalleNecesidades[index];
        if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
          this.noseEncuentra = true
        }else{
          this.noseEncuentra = false
        }
        this.listaNoseEncuentra.push(this.noseEncuentra)
      }
      const existeMatrizNecesidadDetalle =  this.listaNoseEncuentra.includes(true)
      if(existeMatrizNecesidadDetalle == true){
        for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
          const element = this.listaMatrizDetalleNecesidades[index];
          if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
            this.listaMatrizDetalleNecesidades[index].costoEjecucionComprad = this.costoEjecucionComprad
          }
        }
      }else if(existeMatrizNecesidadDetalle == false){
        var obj = {
          matrizNecesidadDetalle: {},
          ejecucionesCumplidasNum: 0,
          costoEjecucionComprad: 0,
          objetosCompradosCo: 0
        }
        obj.matrizNecesidadDetalle = detalleMatrizNecesidad
        obj.costoEjecucionComprad = this.costoEjecucionComprad
        this.listaMatrizDetalleNecesidades.push(obj)
      }
    }
  }

  objetosCompradosCo: any
  detalleMatrizNecesidadObjetos: any
  //Ejecuciones cumplidas
  objetosComprados(valor:any, detalleMatrizNecesidad:any){
    this.listaNoseEncuentra = []
    this.noseEncuentra = false
    this.objetosCompradosCo = valor.target.value
    this.detalleMatrizNecesidadObjetos = detalleMatrizNecesidad
    if(this.listaMatrizDetalleNecesidades.length == 0){
      var obj = {
        matrizNecesidadDetalle: {},
        ejecucionesCumplidasNum: 0,
        costoEjecucionComprad: 0,
        objetosCompradosCo: 0
      }
      obj.matrizNecesidadDetalle = detalleMatrizNecesidad
      obj.objetosCompradosCo = this.objetosCompradosCo
      this.listaMatrizDetalleNecesidades.push(obj)
    }else{
      for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
        const element = this.listaMatrizDetalleNecesidades[index];
        if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
          this.noseEncuentra = true
        }else{
          this.noseEncuentra = false
        }
        this.listaNoseEncuentra.push(this.noseEncuentra)
      }
      const existeMatrizNecesidadDetalle =  this.listaNoseEncuentra.includes(true)
      if(existeMatrizNecesidadDetalle == true){
        for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
          const element = this.listaMatrizDetalleNecesidades[index];
          if(element.matrizNecesidadDetalle.id == detalleMatrizNecesidad.id){
            this.listaMatrizDetalleNecesidades[index].objetosCompradosCo = this.objetosCompradosCo
          }
        }
      }else if(existeMatrizNecesidadDetalle == false){
        var obj = {
          matrizNecesidadDetalle: {},
          ejecucionesCumplidasNum: 0,
          costoEjecucionComprad: 0,
          objetosCompradosCo: 0
        }
        obj.matrizNecesidadDetalle = detalleMatrizNecesidad
        obj.objetosCompradosCo = this.objetosCompradosCo
        this.listaMatrizDetalleNecesidades.push(obj)
      }
    }
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.dataSource = new MatTableDataSource(this.listarMatrizDetalle);
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: MatrizNecesidadDetalle, filter: string) => {
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

  validarValoresIngresados: boolean = false;
  listaValidarValoresIngresadors: any = [];
  elementObtenidoDetalleMatriz: any = {};
  aceptarDetalleMatriz(detalleMatrizNecesided: any) {
    this.listaValidarValoresIngresadors = []
    this.elementObtenidoDetalleMatriz = {}
    for (let index = 0; index < this.listaMatrizDetalleNecesidades.length; index++) {
      const element = this.listaMatrizDetalleNecesidades[index];
      if(element.matrizNecesidadDetalle.id == detalleMatrizNecesided.id){
        if(element.ejecucionesCumplidasNum != 0 && element.costoEjecucionComprad != 0 && element.objetosCompradosCo != 0){
          this.validarValoresIngresados = true
          this.elementObtenidoDetalleMatriz = element
        }else{
          this.validarValoresIngresados = false
        }
        this.listaValidarValoresIngresadors.push(this.validarValoresIngresados)
      }
    }
    const validarValoresIngre = this.listaValidarValoresIngresadors.includes(true)
    if(validarValoresIngre == true){
      let matrizNecesidadDetalleActualizar : MatrizNecesidadDetalle2 = new MatrizNecesidadDetalle2();
      let matrizNecesidad : MatrizNecesidad2 = new MatrizNecesidad2();
      if(Number(this.elementObtenidoDetalleMatriz.ejecucionesCumplidasNum) > Number(detalleMatrizNecesided.cantidadEjecuciones)){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'El número de ejecuciones cumplidas no debe ser mayor a la del objetivo!',
          showConfirmButton: false,
          timer: 3500
        })
      }else{
        matrizNecesidadDetalleActualizar.id = detalleMatrizNecesided.id
        matrizNecesidadDetalleActualizar.id_matriz_necesidad = detalleMatrizNecesided.idMatrizNecesidad.id
        var fecha = new Date(detalleMatrizNecesided.fecha)
        fecha.setDate(fecha.getDate()+1)
        matrizNecesidadDetalleActualizar.fecha = fecha
        matrizNecesidadDetalleActualizar.descripcion = detalleMatrizNecesided.descripcion
        matrizNecesidadDetalleActualizar.cantidad_ejecuciones = detalleMatrizNecesided.cantidadEjecuciones
        matrizNecesidadDetalleActualizar.cantidad_estimada = detalleMatrizNecesided.cantidadEstimada
        matrizNecesidadDetalleActualizar.cantidad_comprada = this.elementObtenidoDetalleMatriz.objetosCompradosCo
        matrizNecesidadDetalleActualizar.costo_ejecucion_comprada = this.elementObtenidoDetalleMatriz.costoEjecucionComprad
        matrizNecesidadDetalleActualizar.cantidad_ejecuciones_cumplidas = this.elementObtenidoDetalleMatriz.ejecucionesCumplidasNum
        var lengthMatrizNecesidadesDetalle = this.listarMatrizDetalle.length
        var porcentajeIndividualEjecucionCompleta = 100/lengthMatrizNecesidadesDetalle
        var porcentajeEjecucionACumplir = porcentajeIndividualEjecucionCompleta/detalleMatrizNecesided.cantidadEjecuciones
        var porcentajeCumplidoFinalmente = porcentajeEjecucionACumplir*this.elementObtenidoDetalleMatriz.ejecucionesCumplidasNum
        matrizNecesidadDetalleActualizar.porcentaje = porcentajeCumplidoFinalmente
        matrizNecesidad.id = detalleMatrizNecesided.idMatrizNecesidad.id
        matrizNecesidad.cantidad = detalleMatrizNecesided.idMatrizNecesidad.cantidad
        matrizNecesidad.cantidadEjecuciones = detalleMatrizNecesided.idMatrizNecesidad.cantidadEjecuciones
        matrizNecesidad.costoEstimado = detalleMatrizNecesided.idMatrizNecesidad.costoEstimado
        if(detalleMatrizNecesided.idMatrizNecesidad.costoTotal == 0){
          matrizNecesidad.costoTotal = this.elementObtenidoDetalleMatriz.costoEjecucionComprad
        }else{
          matrizNecesidad.costoTotal = (Number(detalleMatrizNecesided.idMatrizNecesidad.costoTotal) + Number(this.elementObtenidoDetalleMatriz.costoEjecucionComprad))
        }
        matrizNecesidad.costoUnitario = detalleMatrizNecesided.idMatrizNecesidad.costoUnitario
        matrizNecesidad.detalle = detalleMatrizNecesided.idMatrizNecesidad.detalle
        var fechaMatrizNecesidad = new Date(detalleMatrizNecesided.idMatrizNecesidad.fecha)
        fechaMatrizNecesidad.setDate(fechaMatrizNecesidad.getDate()+1)
        matrizNecesidad.fecha = fechaMatrizNecesidad
        matrizNecesidad.idSubProceso = detalleMatrizNecesided.idMatrizNecesidad.idSubProceso.id
        matrizNecesidad.idTipoNecesidad = detalleMatrizNecesided.idMatrizNecesidad.idTipoNecesidad.id
        if(detalleMatrizNecesided.idMatrizNecesidad.porcentajeTotal == 0){
          matrizNecesidad.porcentajeTotal = porcentajeCumplidoFinalmente
        }else{
          matrizNecesidad.porcentajeTotal = (Number(detalleMatrizNecesided.idMatrizNecesidad.porcentajeTotal) + Number(porcentajeCumplidoFinalmente))
        }
        this.actualizarMatrizNecesidadDetalleyMatrizNecesidad(matrizNecesidadDetalleActualizar, matrizNecesidad)
      }
    }else if(validarValoresIngre == false){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Para actualizar los datos en matriz detalle necesidad, debe tener tanto las ejecuciones cumplidas, también el costo de esa ejecuccion y los objetos comprados mayor a 0!',
        showConfirmButton: false,
        timer: 3500
      })
    }
  }

  actualizarMatrizNecesidadDetalleyMatrizNecesidad(matrizNecesidadDetalleActualizar: MatrizNecesidadDetalle2, matrizNecesidadActualizar: MatrizNecesidad2){
    this.servicioModificar.actualizarMatrizNecesidadDetalle(matrizNecesidadDetalleActualizar).subscribe(resMatrizNecesidadDetalleActualizado=>{
      this.servicioModificar.actualizarMatrizNecesidad(matrizNecesidadActualizar).subscribe(resMatrizNecesidadActualizado=>{
        this.dialogRef.close();
        const dialogRef = this.dialog.open(VisualizarDetalleMatrizNecesidadesComponent, {
          width: '1000px',
          height: '440px',
          data: matrizNecesidadActualizar.id
        });
      }, error => {
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Hubo un error al actualizar la matriz necesidad!',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al actualizar la matriz necesidad detalle!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }


  name = 'listaTipoNovedades.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('tipoNovedades');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

}
