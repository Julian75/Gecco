import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { LibroMayorService } from 'src/app/servicios/libroMayor.service';
import * as fs from 'file-saver'
import { Workbook, Worksheet } from 'exceljs'
import { data } from 'jquery';
import { style } from '@angular/animations';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
//GRAFICA
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  colors: string[];
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
//AÑO
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-consolidado-grafica',
  templateUrl: './consolidado-grafica.component.html',
  styleUrls: ['./consolidado-grafica.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
     provide: MAT_DATE_FORMATS, useValue: MY_FORMATS
    },
   ]
})
export class ConsolidadoGraficaComponent implements OnInit {
  //solo año
  selectYear:any
  date = new FormControl();
  @ViewChild('picker', { static: false })
  private picker!: MatDatepicker<Date>;

  //Tabla
  displayedColumns = ['id', 'descripcion'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tablaMostrar: boolean = false;

  //Listas de cada cuenta del excel
  listChance: any = []
  listVentasRaspa: any = []
  listLineaNegocios: any = []
  listCostoVentas: any = []
  listGastoAdmin: any = []
  listGastoVenta: any = []
  listGastoFinanciero: any = []
  listIngresoNoOPeracionales: any = []
  listEgresosNoOperacionales: any = []
  listProvisionImpuestoRenta: any = []
  //Variables operaciones
  ventasNetas: any = [];
  utilidadBruta: any = [];
  sumaGastos: any = [];
  utilidadOperativa: any = [];
  egresosTotal: any = [];
  utilidadAntesImpuesto: any = [];

  //Excel
  private _workbook!: Workbook

  public listaMeses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

  constructor(
    private servicioLibroMayor: LibroMayorService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioCuentas: CuentasService,
  ) { }

  ngOnInit(): void {
  }

  chosenYearHandler(ev, input){
    let { _d } = ev;
    this.selectYear = _d;
    this.picker.close()
  }

  //GRAFICA
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  titulo: any;
  individual = false;
  valorAnteriorDos: any;
  valorAnteriorUno: any;
  valorActual: any;
  variacion: any;
  porcentaje: any;
  public graficas(descripcion, valores){
    const formatterPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
    this.individual = false
    var serieGrafica = []
    if(descripcion == ""){
      serieGrafica = [
        {
          name: "UTILIDAD BRUTA",
          data: [Number(this.utilidadBruta[0].libroMayorAnteriorDos), Math.round(this.utilidadBruta[0].libroMayorAnteriorUno),Math.round(this.utilidadBruta[0].libroMayor)]
        },
        {
          name: "UTILIDAD OPERATIVA",
          data: [Number(this.utilidadOperativa[0].libroMayorAnteriorDos), Math.round(this.utilidadOperativa[0].libroMayorAnteriorUno),Math.round(this.utilidadOperativa[0].libroMayor)]
        },
        {
          name: "UTILIDAD ANTES DE IMPUESTOS",
          data: [Number(this.utilidadAntesImpuesto[0].libroMayorAnteriorDos), Math.round(this.utilidadAntesImpuesto[0].libroMayorAnteriorUno),Math.round(this.utilidadAntesImpuesto[0].libroMayor)]
        },
      ]
      this.chartOptions = {
        series: serieGrafica,
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [(this.selectYear.getFullYear()-2), (this.selectYear.getFullYear()-1), this.selectYear.getFullYear()]
        },
        yaxis: {
          show: false,
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return formatterPeso.format(val);
            }
          }
        }
      };
    }else{
      this.individual = true
      if(valores[0].libroMayor.valor == undefined){
        serieGrafica = [
          {
            name: descripcion,
            data: [Number(valores[0].libroMayorAnteriorDos), Math.round(valores[0].libroMayorAnteriorUno),Math.round(valores[0].libroMayor)]
          }
        ]
        this.valorAnteriorDos = formatterPeso.format((valores[0].libroMayorAnteriorDos))
        this.valorAnteriorUno = formatterPeso.format(Math.round(valores[0].libroMayorAnteriorUno))
        this.valorActual = formatterPeso.format(Math.round(valores[0].libroMayor))
        this.variacion = formatterPeso.format(Math.round((valores[0].libroMayor - valores[0].libroMayorAnteriorUno)))
        this.porcentaje = Number(((valores[0].libroMayor-valores[0].libroMayorAnteriorUno)/valores[0].libroMayor)*100)
      }else{
        serieGrafica = [
          {
            name: descripcion,
            data: [Number(valores[0].libroMayorAnteriorDos.valor), Math.round(valores[0].libroMayorAnteriorUno.valor),Math.round(valores[0].libroMayor.valor)],
          }
        ]
        this.valorAnteriorDos = formatterPeso.format((valores[0].libroMayorAnteriorDos.valor))
        this.valorAnteriorUno = formatterPeso.format(Math.round(valores[0].libroMayorAnteriorUno.valor))
        this.valorActual = formatterPeso.format(Math.round(valores[0].libroMayor.valor))
        this.variacion = formatterPeso.format(Math.round((valores[0].libroMayor.valor - valores[0].libroMayorAnteriorUno.valor)))
        this.porcentaje = Number(((valores[0].libroMayor.valor-valores[0].libroMayorAnteriorUno.valor)/valores[0].libroMayor.valor)*100)
      }
      this.titulo = descripcion
      this.chartOptions = {
        series: serieGrafica,
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          position: 'top'
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [(this.selectYear.getFullYear()-2), (this.selectYear.getFullYear()-1), this.selectYear.getFullYear()],
          title: {
            text: (this.selectYear.getFullYear()-2)+": "+this.valorAnteriorDos+" - "+(this.selectYear.getFullYear()-1)+": "+this.valorAnteriorUno+" - "+this.selectYear.getFullYear()+": "+this.valorActual
          }
        },
        yaxis: {
          show: false,
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return formatterPeso.format(val);
            }
          }
        }
      };
    }
  }

  listaClases: any = [] // Lista de todos los libros mayores de las cuentas
  existe: boolean = false;
  listaExiste: any = [];
  idPosicionCuenta: any
  objetoModificar: any = []
  obj2: any = []
  consolidadoGuardar(){
    this.listChance = []
    this.listVentasRaspa = []
    this.listLineaNegocios = []
    this.listCostoVentas = []
    this.listGastoAdmin = []
    this.listGastoVenta = []
    this.listGastoFinanciero = []
    this.listIngresoNoOPeracionales = []
    this.listEgresosNoOperacionales = []
    this.listProvisionImpuestoRenta = []
    this.ventasNetas = []
    this.utilidadBruta = []
    this.utilidadOperativa = [];
    this.utilidadAntesImpuesto = [];
    this.sumaGastos = []
    this.egresosTotal = []

    //Variables de suma
    //Ventas Netas
    var sumaValorVentasNetasDos = 0
    var sumaValorVentasNetasUno = 0
    var sumaValorVentasNetas = 0

    //Ventas Netas
    var sumaValorUtilidadOperativaDos = 0
    var sumaValorUtilidadOperativaUno = 0
    var sumaValorUtilidadOperativa = 0

    //Egresos no operacionales
    var ValorEgresosDos = 0
    var ValorEgresosUno = 0
    var ValorEgresos = 0

    //Utilidad antes de impuestos
    var ValorUtilidadImpuestosDos = 0
    var ValorUtilidadImpuestosUno = 0
    var ValorUtilidadImpuestos = 0

    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.listaClases = []
    var listaPosiciones = []
    this.servicioConsultasGenerales.listarLibrosMayorAño(this.selectYear.getFullYear()).subscribe(resLibrosMayorAño=>{ // Libro Mayor Actual
      this.servicioConsultasGenerales.listarCuentasPorJerarquia(1).subscribe(resCuentasJerarquia=>{
        var i = 0
        resLibrosMayorAño.forEach(elementLibroMayorAño => {
          var obj = {
            cuenta: {},
            libroMayor: {},
            libroMayorAnteriorDos: {},
            libroMayorAnteriorUno: {},
          }
          var mesActual = new Date(elementLibroMayorAño.fecha).toISOString().slice(0,10)
          var mesAlerta = ""
          var fechaSplit = mesActual.split('-')
          var fechaAnteriorDos = (this.selectYear.getFullYear()-2)+'-'+(fechaSplit[1])+'-01'
          var fechaAnteriorUno = (this.selectYear.getFullYear()-1)+'-'+(fechaSplit[1])+'-01'
          this.servicioLibroMayor.listarPorId(elementLibroMayorAño.id).subscribe(resLibroMayorId=>{
            if(resLibroMayorId.idCuenta.codigo == 41357001 || resLibroMayorId.idCuenta.codigo == 41357002 || resLibroMayorId.idCuenta.codigo == 415030 || resLibroMayorId.idCuenta.codigo == 6 || resLibroMayorId.idCuenta.codigo == 51 || resLibroMayorId.idCuenta.codigo == 52 || resLibroMayorId.idCuenta.codigo == 53 || resLibroMayorId.idCuenta.codigo == 5305 || resLibroMayorId.idCuenta.codigo == 42 || resLibroMayorId.idCuenta.codigo == 54){
              this.servicioConsultasGenerales.listarLibrosMayor(resLibroMayorId.idCuenta.id, fechaAnteriorDos).subscribe(resLibroMayorAnteriorDos=>{
                for (let i = 0; i < this.listaMeses.length; i++) {
                  const element = this.listaMeses[i];
                  if(Number(fechaSplit[1]) == i){
                    mesAlerta = element
                  }
                }
                // if(resLibroMayorAnteriorDos.length <= 0){
                //   Swal.fire({
                //     icon: 'error',
                //     title: 'Falta el valor del libro mayor de la cuenta'+resLibroMayorId.idCuenta.codigo+'en el mes de '+mesAlerta+' del año '+(this.selectYear.getFullYear()-2)+'!',
                //     showConfirmButton: false,
                //     timer: 2500
                //   });
                //   document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                // }else{
                  this.servicioConsultasGenerales.listarLibrosMayor(resLibroMayorId.idCuenta.id, fechaAnteriorUno).subscribe(resLibroMayorAnteriorUno=>{
                    if(resLibroMayorAnteriorUno.length <= 0){
                      Swal.fire({
                        icon: 'error',
                        title: 'Falta el valor del libro mayor de la cuenta'+resLibroMayorId.idCuenta.codigo+'en el mes de '+mesAlerta+' del año '+(this.selectYear.getFullYear()-1)+'!',
                        showConfirmButton: false,
                        timer: 2500
                      });
                      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                    }else{
                      this.objetoModificar = []
                      if(this.listaClases.length>0){
                        this.listaExiste = []
                        for (let index = 0; index < this.listaClases.length; index++) {
                          const element = this.listaClases[index];
                          if(element.cuenta.codigo == resLibroMayorId.idCuenta.codigo){
                            this.existe = true
                            this.idPosicionCuenta = index
                            this.objetoModificar.push(element)
                          }else{ this.existe = false }
                          this.listaExiste.push(this.existe)
                        }
                        const existe = this.listaExiste.includes(true)
                        if(existe == true){
                          this.listaClases[this.idPosicionCuenta].libroMayor.valor = Number(this.listaClases[this.idPosicionCuenta].libroMayor.valor)+Number(resLibroMayorId.valor)
                          if(resLibroMayorAnteriorDos.length > 0){
                            resLibroMayorAnteriorDos.forEach(elementLibroMayorAnteriorDos => {
                              var objetoModificar2 = {
                                cuenta: {},
                                libroMayor: {},
                                libroMayorAnteriorDos: {},
                                libroMayorAnteriorUno: {},
                              }
                              this.objetoModificar.forEach(elementModificar => {
                                var objetoVacio = Object.entries(elementModificar.libroMayorAnteriorDos).length === 0
                                console.log(objetoVacio)
                                if(objetoVacio == true){
                                  if(elementModificar.cuenta.id == elementLibroMayorAnteriorDos.idCuenta){
                                    objetoModificar2.cuenta = elementModificar.cuenta
                                    objetoModificar2.libroMayor = elementModificar.libroMayor
                                    objetoModificar2.libroMayorAnteriorDos = elementLibroMayorAnteriorDos
                                    objetoModificar2.libroMayorAnteriorUno = elementModificar.libroMayorAnteriorUno
                                    this.listaClases.splice(this.idPosicionCuenta, 1, objetoModificar2)
                                  }
                                }else{
                                  if(elementModificar.cuenta.id == elementLibroMayorAnteriorDos.idCuenta){
                                    var sumaValores = Number(elementModificar.libroMayorAnteriorDos.valor) + Number(elementLibroMayorAnteriorDos.valor)
                                    elementModificar.libroMayorAnteriorDos.valor = sumaValores
                                    objetoModificar2.cuenta = elementModificar.cuenta
                                    objetoModificar2.libroMayor = elementModificar.libroMayor
                                    objetoModificar2.libroMayorAnteriorDos = elementModificar.libroMayorAnteriorDos
                                    objetoModificar2.libroMayorAnteriorUno = elementModificar.libroMayorAnteriorUno
                                    this.listaClases.splice(this.idPosicionCuenta, 1, objetoModificar2)
                                  }
                                }
                              })
                            });
                          }
                          if(resLibroMayorAnteriorUno.length > 0){
                            resLibroMayorAnteriorUno.forEach(elementLibroMayorAnteriorUno => {
                              var objetoModificar3 = {
                                cuenta: {},
                                libroMayor: {},
                                libroMayorAnteriorDos: {},
                                libroMayorAnteriorUno: {},
                              }
                              this.objetoModificar.forEach(elementModificar => {
                                var objetoVacio2 = Object.entries(elementModificar.libroMayorAnteriorUno).length === 0
                                if(objetoVacio2 == true){
                                  if(elementModificar.cuenta.id == elementLibroMayorAnteriorUno.idCuenta){
                                    objetoModificar3.cuenta = elementModificar.cuenta
                                    objetoModificar3.libroMayor = elementModificar.libroMayor
                                    objetoModificar3.libroMayorAnteriorUno = elementLibroMayorAnteriorUno
                                    objetoModificar3.libroMayorAnteriorDos = elementModificar.libroMayorAnteriorDos
                                    this.listaClases.splice(this.idPosicionCuenta, 1, objetoModificar3)
                                  }
                                }else{
                                  if(elementModificar.cuenta.id == elementLibroMayorAnteriorUno.idCuenta){
                                    var sumaValores = Number(elementModificar.libroMayorAnteriorUno.valor) + Number(elementLibroMayorAnteriorUno.valor)
                                    elementModificar.libroMayorAnteriorUno.valor = sumaValores
                                    objetoModificar3.cuenta = elementModificar.cuenta
                                    objetoModificar3.libroMayor = elementModificar.libroMayor
                                    objetoModificar3.libroMayorAnteriorDos = elementModificar.libroMayorAnteriorDos
                                    objetoModificar3.libroMayorAnteriorUno = elementModificar.libroMayorAnteriorUno
                                    this.listaClases.splice(this.idPosicionCuenta, 1, objetoModificar3)
                                  }
                                }
                              })
                            });
                          }
                          i++
                        }else{
                          this.agregarLibrosMayoresCuentas(obj, resLibroMayorId, resLibroMayorAnteriorDos, resLibroMayorAnteriorUno)
                          i++
                        }
                      }else{
                        this.agregarLibrosMayoresCuentas(obj, resLibroMayorId, resLibroMayorAnteriorDos, resLibroMayorAnteriorUno)
                        i++
                      }
                      if(i == resLibrosMayorAño.length){
                        for (let index = 0; index < this.listaClases.length; index++) {
                          const element = this.listaClases[index];
                          if(element.cuenta.codigo == 41357001){
                            this.listChance.push(element)
                          }else if(element.cuenta.codigo == 41357002){
                            this.listVentasRaspa.push(element)
                          }else if(element.cuenta.codigo == 415030){
                            this.listLineaNegocios.push(element)
                          }else if(element.cuenta.codigo == 6){
                            this.listCostoVentas.push(element)
                          }else if(element.cuenta.codigo == 51){
                            this.listGastoAdmin.push(element)
                          }else if(element.cuenta.codigo == 52){
                            this.listGastoVenta.push(element)
                          }else if(element.cuenta.codigo == 5305){
                            this.listGastoFinanciero.push(element)
                          }else if(element.cuenta.codigo == 42){
                            this.listIngresoNoOPeracionales.push(element)
                          }else if(element.cuenta.codigo == 53){
                            this.listEgresosNoOperacionales.push(element)
                          }else if(element.cuenta.codigo == 54){
                            this.listProvisionImpuestoRenta.push(element)
                          }
                          if(element.cuenta.codigo == 41357001 || element.cuenta.codigo == 41357002 || element.cuenta.codigo == 415030){
                            console.log(element)
                            sumaValorVentasNetasDos = Number(sumaValorVentasNetasDos) + Number(element.libroMayorAnteriorDos.valor)
                            sumaValorVentasNetasUno = Number(sumaValorVentasNetasUno) + Number(element.libroMayorAnteriorUno.valor)
                            sumaValorVentasNetas = Number(sumaValorVentasNetas) + Number(element.libroMayor.valor)
                            var objVentasNetas = {
                              libroMayorAnteriorDos: sumaValorVentasNetasDos,
                              libroMayorAnteriorUno: sumaValorVentasNetasUno,
                              libroMayor: sumaValorVentasNetas
                            }
                          }
                          if(element.cuenta.codigo == 51 || element.cuenta.codigo == 52 || element.cuenta.codigo == 5305){
                            sumaValorUtilidadOperativaDos = Number(sumaValorUtilidadOperativaDos) + Number(element.libroMayorAnteriorDos.valor)
                            sumaValorUtilidadOperativaUno = Number(sumaValorUtilidadOperativaUno) + Number(element.libroMayorAnteriorUno.valor)
                            sumaValorUtilidadOperativa = Number(sumaValorUtilidadOperativa) + Number(element.libroMayor.valor)
                            var objGastos = {
                              libroMayorAnteriorDos: sumaValorUtilidadOperativaDos,
                              libroMayorAnteriorUno: sumaValorUtilidadOperativaUno,
                              libroMayor: sumaValorUtilidadOperativa
                            }
                          }
                          if((index+1) == this.listaClases.length){
                            this.ventasNetas.push(objVentasNetas)
                            this.sumaGastos.push(objGastos)

                            //Total de egresos no operacionales
                            ValorEgresosDos = Number(this.listEgresosNoOperacionales[0].libroMayorAnteriorDos.valor) - Number(this.listGastoFinanciero[0].libroMayorAnteriorDos.valor)
                            ValorEgresosUno = Number(this.listEgresosNoOperacionales[0].libroMayorAnteriorUno.valor) - Number(this.listGastoFinanciero[0].libroMayorAnteriorUno.valor)
                            ValorEgresos =  Number(this.listEgresosNoOperacionales[0].libroMayor.valor) - Number(this.listGastoFinanciero[0].libroMayor.valor)

                            var objEgresos = {
                              libroMayorAnteriorDos: ValorEgresosDos,
                              libroMayorAnteriorUno: ValorEgresosUno,
                              libroMayor: ValorEgresos
                            }

                            this.egresosTotal.push(objEgresos)

                            if(this.ventasNetas.length > 0 && this.listCostoVentas.length > 0){
                              var objUtilidadBruta = {
                                libroMayorAnteriorDos: 0,
                                libroMayorAnteriorUno: 0,
                                libroMayor: 0
                              }
                              objUtilidadBruta.libroMayorAnteriorDos = Number(this.ventasNetas[0].libroMayorAnteriorDos)-Number(this.listCostoVentas[0].libroMayorAnteriorDos.valor)
                              objUtilidadBruta.libroMayorAnteriorUno = Number(this.ventasNetas[0].libroMayorAnteriorUno)-Number(this.listCostoVentas[0].libroMayorAnteriorUno.valor)
                              objUtilidadBruta.libroMayor = Number(this.ventasNetas[0].libroMayor)-Number(this.listCostoVentas[0].libroMayor.valor)
                              this.utilidadBruta.push(objUtilidadBruta)
                            }
                            if(this.sumaGastos.length > 0 && this.utilidadBruta.length > 0){
                              var objUtilidadOperativa = {
                                libroMayorAnteriorDos: 0,
                                libroMayorAnteriorUno: 0,
                                libroMayor: 0
                              }
                              objUtilidadOperativa.libroMayorAnteriorDos = Number(this.utilidadBruta[0].libroMayorAnteriorDos)-Number(this.sumaGastos[0].libroMayorAnteriorDos)
                              objUtilidadOperativa.libroMayorAnteriorUno = Number(this.utilidadBruta[0].libroMayorAnteriorUno)-Number(this.sumaGastos[0].libroMayorAnteriorUno)
                              objUtilidadOperativa.libroMayor = Number(this.utilidadBruta[0].libroMayor)-Number(this.sumaGastos[0].libroMayor)
                              this.utilidadOperativa.push(objUtilidadOperativa)
                            }

                            //Utilidad Antes de Impuestos
                            ValorUtilidadImpuestosDos = (Number(this.utilidadOperativa[0].libroMayorAnteriorDos) + Number(this.listIngresoNoOPeracionales[0].libroMayorAnteriorDos.valor)) - Number(this.egresosTotal[0].libroMayorAnteriorDos)
                            ValorUtilidadImpuestosUno = (Number(this.utilidadOperativa[0].libroMayorAnteriorUno) + Number(this.listIngresoNoOPeracionales[0].libroMayorAnteriorUno.valor)) - Number(this.egresosTotal[0].libroMayorAnteriorUno)
                            ValorUtilidadImpuestos = (Number(this.utilidadOperativa[0].libroMayor) + Number(this.listIngresoNoOPeracionales[0].libroMayor.valor)) - Number(this.egresosTotal[0].libroMayor)

                            var objUtilidadImpuestos = {
                              libroMayorAnteriorDos: ValorUtilidadImpuestosDos,
                              libroMayorAnteriorUno: ValorUtilidadImpuestosUno,
                              libroMayor: ValorUtilidadImpuestos
                            }

                            this.utilidadAntesImpuesto.push(objUtilidadImpuestos)

                            this.tablaMostrar = true
                            this.graficas("", 0)
                            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                          }
                        }

                        // this.descargarExcel(this.listaClases)
                      }
                    }
                  })
                // }
              })
            }else{
              i++
            }
          })
        })
      })
    })
  }

  agregarLibrosMayoresCuentas(obj, resLibroMayorId, resLibroMayorAnteriorDos, resLibroMayorAnteriorUno){
    obj.cuenta = resLibroMayorId.idCuenta
    obj.libroMayor = resLibroMayorId
    if(resLibroMayorAnteriorDos.length > 0){
      resLibroMayorAnteriorDos.forEach(elementLibroMayorAnteriorDos => {
        obj.libroMayorAnteriorDos = elementLibroMayorAnteriorDos
      });
    }
    if(resLibroMayorAnteriorUno.length > 0){
      resLibroMayorAnteriorUno.forEach(elementLibroMayorAnteriorUno => {
        obj.libroMayorAnteriorUno = elementLibroMayorAnteriorUno
      });
    }
    this.listaClases.push(obj)
  }

  public descargarExcel(listaClases: any){
    this._workbook = new Workbook()
    this._workbook.creator = 'DigiDev';

    this.crearHoja(listaClases);

    this._workbook.xlsx.writeBuffer().then((data)=>{
      const blob = new Blob([data])
      fs.saveAs(blob, 'consolidado.xlsx');
    })
    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
  }

  listaDatosNecesarios: any = [];
  private crearHoja(listaClases: any){
    const hoja = this._workbook.addWorksheet('consolidado')

    //Estable el ancho de cada columna
    hoja.getColumn('B').width = 43;
    hoja.getColumn('C').width = 21;
    hoja.getColumn('D').width = 21;
    hoja.getColumn('E').width = 21;
    hoja.getColumn('F').width = 21;
    hoja.getColumn('G').width = 15;
    hoja.columns.forEach((column)=>{
      if(column.number == 2){
        column.alignment = { horizontal: 'left', wrapText: true}
      }
      if(column.number == 3 || column.number == 4 || column.number == 5){
        column.alignment = { horizontal: 'right', wrapText: true}
      }
    })

    //Combinacion de celdas
    hoja.mergeCells('B2:G3') //Combinar Celdas
    hoja.mergeCells('B4:G5') //Combinar Celdas
    hoja.mergeCells('B6:G6') //Combinar Celdas
    hoja.mergeCells('B8:G8') //Combinar Celdas
    hoja.mergeCells('B15:G15') //Combinar Celdas
    hoja.mergeCells('B20:G20') //Combinar Celdas
    hoja.mergeCells('B24:G24') //Combinar Celdas

    //Capturar años
    var añoanterioruno = this.selectYear.getFullYear()-1
    var añoanteriordos = this.selectYear.getFullYear()-2
    var tituloAños = añoanteriordos+' - '+añoanterioruno+' vs '+this.selectYear.getFullYear()

    //Titulos principales
    this.titulosPrincipales(hoja,[
      { value: 'ESTADO DE RESULTADO CONSOLIDADO', cell: 'B2'},
      { value: ''+tituloAños, cell: 'B4'}
    ])

    //Header Tablas
    this.headerTabla(hoja,[
      { value: 'VENTAS BRUTAS', cell: 'B7'},
      { value: ''+añoanteriordos, cell: 'C7'},
      { value: ''+añoanterioruno, cell: 'D7'},
      { value: ''+this.selectYear.getFullYear(), cell: 'E7'},
      { value: 'Variación '+(String(añoanterioruno).split(''))[2]+(String(añoanterioruno).split(''))[3]+'/'+(String(this.selectYear.getFullYear()).split(''))[2]+(String(this.selectYear.getFullYear()).split(''))[3], cell: 'F7'},
      { value: '%', cell: 'G7'},
    ])

    //Bordes por fila
    hoja.getRow(2).eachCell(cell => Object.assign(cell, {
      border: {
        bottom: { style: 'medium'},
      }
    }))
    hoja.getRow(7).eachCell(cell => Object.assign(cell, {
      border: {
        bottom: { style: 'thin'},
        top: { style: 'thin'},
        left: { style: 'thin'},
        rigth: { style: 'thin'},
      }
    }))

    // Insertamos el libro mayor

    const formatterPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })

    hoja.getRow(9).values = [
      '',
      'CHANCE',
      formatterPeso.format(this.listChance[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listChance[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listChance[0].libroMayor.valor),
      formatterPeso.format(Number(this.listChance[0].libroMayor.valor)-Number(this.listChance[0].libroMayorAnteriorUno.valor)),
      (((this.listChance[0].libroMayor.valor-this.listChance[0].libroMayorAnteriorUno.valor)/this.listChance[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(10).values = [
      '',
      'VENTAS DE RASPAS',
      formatterPeso.format(this.listVentasRaspa[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listVentasRaspa[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listVentasRaspa[0].libroMayor.valor),
      formatterPeso.format(Number(this.listVentasRaspa[0].libroMayor.valor)-Number(this.listVentasRaspa[0].libroMayorAnteriorUno.valor)),
      (((this.listVentasRaspa[0].libroMayor.valor-this.listVentasRaspa[0].libroMayorAnteriorUno.valor)/this.listVentasRaspa[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(11).values = [
      '',
      'LINEA DE NEGOCIOS',
      formatterPeso.format(this.listLineaNegocios[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listLineaNegocios[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listLineaNegocios[0].libroMayor.valor),
      formatterPeso.format(Number(this.listLineaNegocios[0].libroMayor.valor)-Number(this.listLineaNegocios[0].libroMayorAnteriorUno.valor)),
      (((this.listLineaNegocios[0].libroMayor.valor-this.listLineaNegocios[0].libroMayorAnteriorUno.valor)/this.listLineaNegocios[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(12).values = [
      '',
      'VENTAS NETAS',
      formatterPeso.format(this.ventasNetas[0].libroMayorAnteriorDos),
      formatterPeso.format(this.ventasNetas[0].libroMayorAnteriorUno),
      formatterPeso.format(this.ventasNetas[0].libroMayor),
      formatterPeso.format(Number(this.ventasNetas[0].libroMayor)-Number(this.ventasNetas[0].libroMayorAnteriorUno)),
      (((this.ventasNetas[0].libroMayor-this.ventasNetas[0].libroMayorAnteriorUno)/this.ventasNetas[0].libroMayor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(13).values = [
      '',
      '(-) COSTO DE VENTA',
      formatterPeso.format(this.listCostoVentas[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listCostoVentas[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listCostoVentas[0].libroMayor.valor),
      formatterPeso.format(Number(this.listCostoVentas[0].libroMayor.valor)-Number(this.listCostoVentas[0].libroMayorAnteriorUno.valor)),
      (((this.listCostoVentas[0].libroMayor.valor-this.listCostoVentas[0].libroMayorAnteriorUno.valor)/this.listCostoVentas[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(14).values = [
      '',
      'UTILIDAD BRUTA',
      formatterPeso.format(this.utilidadBruta[0].libroMayorAnteriorDos),
      formatterPeso.format(this.utilidadBruta[0].libroMayorAnteriorUno),
      formatterPeso.format(this.utilidadBruta[0].libroMayor),
      formatterPeso.format(Number(this.utilidadBruta[0].libroMayor)-Number(this.utilidadBruta[0].libroMayorAnteriorUno)),
      (((this.utilidadBruta[0].libroMayor-this.utilidadBruta[0].libroMayorAnteriorUno)/this.utilidadBruta[0].libroMayor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(16).values = [
      '',
      'GASTOS DE ADMINISTRACIÓN',
      formatterPeso.format(this.listGastoAdmin[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listGastoAdmin[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listGastoAdmin[0].libroMayor.valor),
      formatterPeso.format(Number(this.listGastoAdmin[0].libroMayor.valor)-Number(this.listGastoAdmin[0].libroMayorAnteriorUno.valor)),
      (((this.listGastoAdmin[0].libroMayor.valor-this.listGastoAdmin[0].libroMayorAnteriorUno.valor)/this.listGastoAdmin[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(17).values = [
      '',
      'GASTOS DE VENTAS',
      formatterPeso.format(this.listGastoVenta[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listGastoVenta[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listGastoVenta[0].libroMayor.valor),
      formatterPeso.format(Number(this.listGastoVenta[0].libroMayor.valor)-Number(this.listGastoVenta[0].libroMayorAnteriorUno.valor)),
      (((this.listGastoVenta[0].libroMayor.valor-this.listGastoVenta[0].libroMayorAnteriorUno.valor)/this.listGastoVenta[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(18).values = [
      '',
      'GASTOS FINANCIEROS',
      formatterPeso.format(this.listGastoFinanciero[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listGastoFinanciero[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listGastoFinanciero[0].libroMayor.valor),
      formatterPeso.format(Number(this.listGastoFinanciero[0].libroMayor.valor)-Number(this.listGastoFinanciero[0].libroMayorAnteriorUno.valor)),
      (((this.listGastoFinanciero[0].libroMayor.valor-this.listGastoFinanciero[0].libroMayorAnteriorUno.valor)/this.listGastoFinanciero[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(19).values = [
      '',
      'UTILIDAD OPERATIVA',
      formatterPeso.format(this.utilidadOperativa[0].libroMayorAnteriorDos),
      formatterPeso.format(this.utilidadOperativa[0].libroMayorAnteriorUno),
      formatterPeso.format(this.utilidadOperativa[0].libroMayor),
      formatterPeso.format(Number(this.utilidadOperativa[0].libroMayor)-Number(this.utilidadOperativa[0].libroMayorAnteriorUno)),
      (((this.utilidadOperativa[0].libroMayor-this.utilidadOperativa[0].libroMayorAnteriorUno)/this.utilidadOperativa[0].libroMayor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(21).values = [
      '',
      'INGRESOS NO OPERACIONALES',
      formatterPeso.format(this.listIngresoNoOPeracionales[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listIngresoNoOPeracionales[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listIngresoNoOPeracionales[0].libroMayor.valor),
      formatterPeso.format(Number(this.listIngresoNoOPeracionales[0].libroMayor.valor)-Number(this.listIngresoNoOPeracionales[0].libroMayorAnteriorUno.valor)),
      (((this.listIngresoNoOPeracionales[0].libroMayor.valor-this.listIngresoNoOPeracionales[0].libroMayorAnteriorUno.valor)/this.listIngresoNoOPeracionales[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(22).values = [
      '',
      'EGRESOS NO OPERACIONALES',
      formatterPeso.format(this.egresosTotal[0].libroMayorAnteriorDos),
      formatterPeso.format(this.egresosTotal[0].libroMayorAnteriorUno),
      formatterPeso.format(this.egresosTotal[0].libroMayor),
      formatterPeso.format(Number(this.egresosTotal[0].libroMayor)-Number(this.egresosTotal[0].libroMayorAnteriorUno)),
      (((this.egresosTotal[0].libroMayor-this.egresosTotal[0].libroMayorAnteriorUno)/this.egresosTotal[0].libroMayor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(23).values = [
      '',
      'UTILIDAD ANTES DE IMPUESTOS',
      formatterPeso.format(this.utilidadAntesImpuesto[0].libroMayorAnteriorDos),
      formatterPeso.format(this.utilidadAntesImpuesto[0].libroMayorAnteriorUno),
      formatterPeso.format(this.utilidadAntesImpuesto[0].libroMayor),
      formatterPeso.format(Number(this.utilidadAntesImpuesto[0].libroMayor)-Number(this.utilidadAntesImpuesto[0].libroMayorAnteriorUno)),
      (((this.utilidadAntesImpuesto[0].libroMayor-this.utilidadAntesImpuesto[0].libroMayorAnteriorUno)/this.utilidadAntesImpuesto[0].libroMayor)*100).toFixed(2)+'%',
    ]

    hoja.getRow(25).values = [
      '',
      'PROVISION IMPUESTO DE RENTA',
      formatterPeso.format(this.listProvisionImpuestoRenta[0].libroMayorAnteriorDos.valor),
      formatterPeso.format(this.listProvisionImpuestoRenta[0].libroMayorAnteriorUno.valor),
      formatterPeso.format(this.listProvisionImpuestoRenta[0].libroMayor.valor),
      formatterPeso.format(Number(this.listProvisionImpuestoRenta[0].libroMayor.valor)-Number(this.listProvisionImpuestoRenta[0].libroMayorAnteriorUno.valor)),
      (((this.listProvisionImpuestoRenta[0].libroMayor.valor-this.listProvisionImpuestoRenta[0].libroMayorAnteriorUno.valor)/this.listProvisionImpuestoRenta[0].libroMayor.valor)*100).toFixed(2)+'%',
    ]

    //Estilos completos para toda la tabla
    var listaCeldas = ['C', 'D', 'E', 'F', 'G']
    for (let index = 0; index < 17; index++) {
      const hojaActual = hoja.getCell("B"+(index+9))
      const hojaH = hoja.getCell("H"+(index+9))
      const element = listaClases[index];
      listaCeldas.forEach(elementCelda => {
        const hojaC = hoja.getCell(elementCelda+(index+9))
        if((index+9) == 12){
          hojaC.style = {
            font: { size: 13, bold: true,  color: { argb: '242A30' } },
            fill: {
              type: 'pattern' , //patron o bloque
              pattern: 'solid',
              fgColor: { argb: 'B8CCE4' }, //Azul Oscuro
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
          }
        }else if((index+9)==14 || (index+9)==19  || (index+9)==23){
          hojaC.style = {
            font: { size: 13, bold: true,  color: { argb: '242A30' } },
            fill: {
              type: 'pattern' , //patron o bloque
              pattern: 'solid',
              fgColor: { argb: 'F49BA0' }, //Rojo
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
          }
        }else{
          hojaC.style = {
            font: { size: 13, bold: true,  color: { argb: '242A30' } },
            fill: {
              type: 'pattern' , //patron o bloque
              pattern: 'solid',
              fgColor: { argb: 'DCEFF6' }, //Azul claro
            },
            alignment: { horizontal: 'center', vertical: 'middle' },
          }
        }
      });
      //configurar estilos
      if((index+9)==14 || (index+9)==19  || (index+9)==23){
        hojaActual.style = {
          font: { size: 13, bold: true,  color: { argb: '242A30' } },
          fill: {
            type: 'pattern' , //patron o bloque
            pattern: 'solid',
            fgColor: { argb: 'F49BA0' }, // Rojo
          },
          alignment: { horizontal: 'center', vertical: 'middle' },
        }
      }else if((index+9) == 15 || (index+9) == 20 || (index+9) == 24){
        hojaActual.style = {
          font: { size: 13, bold: true,  color: { argb: 'FFFFFF' } },
          fill: {
            type: 'pattern' , //patron o bloque
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF' }, //Blanco
          },
          alignment: { horizontal: 'center', vertical: 'middle' },
        }
      }else{
        hojaActual.style = {
          font: { size: 13, bold: true,  color: { argb: '242A30' } },
          fill: {
            type: 'pattern' , //patron o bloque
            pattern: 'solid',
            fgColor: { argb: 'B8CCE4' }, //Azul Oscuro
          },
          alignment: { horizontal: 'center', vertical: 'middle' },
        }
      }
      hoja.getRow(index+9).eachCell(cell => {
        if(Number(cell.col) != 1){
          Object.assign(cell,{
          border: {
            bottom: { style: 'thin'},
            top: { style: 'thin'},
            left: { style: 'thin'},
            rigth: { style: 'thin'},
          }
        })
        }
      })
      if((index+9) == 15 || (index+9) == 20 || (index+9) == 24){
        hojaH.border = {
        };
      }else{
        hojaH.border = {
          left: {style:'thin'}
        };
      }
    }
  }

  private titulosPrincipales(
    hoja: Worksheet,
    cells: { value: string; cell: string }[]
    ){
      cells.forEach(element => {
      const hojaActual = hoja.getCell(element.cell)
      //configurar estilos
      hojaActual.value = element.value;
      hojaActual.style = {
        font: { size: 20, bold: true,  color: { argb: 'FFFFFF' } },
        fill: {
          type: 'pattern' , //patron o bloque
          pattern: 'solid',
          fgColor: { argb: '16365C' },
        },
        alignment: { horizontal: 'center', vertical: 'middle' },
      }
    });
  }

  private headerTabla(
    hoja: Worksheet,
    cells: { value: string; cell: string }[]
    ){
      cells.forEach(element => {
      const hojaActual = hoja.getCell(element.cell)
      //configurar estilos
      hojaActual.value = element.value;
      hojaActual.style = {
        font: { size: 15, bold: true,  color: { argb: '000000' }, italic: true },
        fill: {
          type: 'pattern' , //patron o bloque
          pattern: 'solid',
          fgColor: { argb: 'F49295' },
        },
        alignment: { horizontal: 'center', vertical: 'middle' },
      }
    });

  }
}
