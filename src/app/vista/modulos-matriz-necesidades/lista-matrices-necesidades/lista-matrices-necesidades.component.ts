import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatrizNecesidadService } from 'src/app/servicios/matrizNecesidad.service';
import { VisualizarDetalleMatrizNecesidadesComponent } from './visualizar-detalle-matriz-necesidades/visualizar-detalle-matriz-necesidades.component';
import { MatDialog } from '@angular/material/dialog';
import { AsignacionProcesoService } from 'src/app/servicios/asignacionProceso.service';
import { MatrizNecesidad } from 'src/app/modelos/matrizNecesidad';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as FileSaver from 'file-saver';
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
import { AsignacionProceso } from 'src/app/modelos/asignacionProceso';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { TipoProcesoService } from 'src/app/servicios/tipoProceso.service';
import { CalendarioComponent } from './calendario/calendario.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

@Component({
  selector: 'app-lista-matrices-necesidades',
  templateUrl: './lista-matrices-necesidades.component.html',
  styleUrls: ['./lista-matrices-necesidades.component.css']
})
export class ListaMatricesNecesidadesComponent implements OnInit {
  dtOptions: any = {};
  public listarMatrice: any = [];
  public matrizUsuario: any;
  public lista: any = [];
  validar: boolean = false;

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
  public sumaPorcentajes = 0;
  public formMatriz!: FormGroup;

  displayedColumns = ['subProceso','tipoNecesidad', 'detalleMatriz','cantidad','cantidadEjecuciones','costoEstimado','costoTotal', 'ejecucionPresupuesto', 'cumpPlaneacion', 'porcentajeTotal', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private servicioListaMatrices: MatrizNecesidadService,
    private servicioAsignacionProceso: AsignacionProcesoService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioUsuario: UsuarioService,
    private servicioTipoProceso: TipoProcesoService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.listarMatrices();
    this.mostrarInformacionTabla();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public abrirCalendario(){
    const dialogRef = this.dialog.open(CalendarioComponent, {
      width: '80%',
      height: '80%'
    });
  }

  //Listar Matrice para grafica
  idExisteAcceso: boolean = false
  listaExisteAcceso: any = []
  public listarMatrices(){
    this.listarMatrice = []
    this.sumaPorcentajes = 0
    this.listaExisteAcceso = []
    this.valor = 0
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuarioIdLogueado=>{
      this.servicioConsultasGenerales.listarAccesos(resUsuarioIdLogueado.idRol.id).subscribe(resAccesos=>{
        resAccesos.forEach(element => {
          if(element.idModulo == 76){
            this.idExisteAcceso = true
          }else{ this.idExisteAcceso = false }
          this.listaExisteAcceso.push(this.idExisteAcceso)
        });
        const existeAcceso = this.listaExisteAcceso.includes(true)
        if(existeAcceso == true){
          this.servicioListaMatrices.listarTodos().subscribe(resMatricesCompletas=>{
            for (let i = 0; i < resMatricesCompletas.length; i++) {
              const element = resMatricesCompletas[i];
              var lengthMatrizNecesidades = resMatricesCompletas.length
              var porcentajeIndividualEjecucionCompleta = 100/lengthMatrizNecesidades
              var porcentajeTotalIndividual = (element.porcentajeTotal/100)*porcentajeIndividualEjecucionCompleta
              this.sumaPorcentajes = this.sumaPorcentajes + porcentajeTotalIndividual
            }
            this.valor = Math.round(this.sumaPorcentajes)
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
                width: 250,
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
                      fontSize: "20px"
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
        }else{
          this.servicioListaMatrices.listarTodos().subscribe(res => {
            this.servicioAsignacionProceso.listarTodos().subscribe(resAsignacion=>{
              const resAsignacionFiltrado = resAsignacion.filter((element:any) => element.idUsuario.id == Number(sessionStorage.getItem("id")))
              for (let i = 0; i < resAsignacionFiltrado.length; i++) {
                const element = resAsignacionFiltrado[i];
                const resFiltrado = res.filter((elementMatriz:any) => elementMatriz.idSubProceso.idTipoProceso.id == element.idTiposProcesos.id)
                for (let j = 0; j < resFiltrado.length; j++) {
                  const elementMatriz = resFiltrado[j];
                  this.listarMatrice.push(elementMatriz)
                }
              }
              for (let i = 0; i < this.listarMatrice.length; i++) {
                const element = this.listarMatrice[i];
                var lengthMatrizNecesidades = this.listarMatrice.length
                var porcentajeIndividualEjecucionCompleta = 100/lengthMatrizNecesidades
                var porcentajeTotalIndividual = (element.porcentajeTotal/100)*porcentajeIndividualEjecucionCompleta
                this.sumaPorcentajes = this.sumaPorcentajes + porcentajeTotalIndividual
              }
              this.valor = Math.round(this.sumaPorcentajes)
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
                  width: 250,
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
                        fontSize: "20px"
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
            });
          })
        }
      })
    })
  }

  //Listar Matrice para datos de la tabla
  listarMatricesCompletas: any = []
  totalEstimadoMatriz: any = 0;
  totalEjecutadoMatriz: any = 0;
  idExisteAccesoTabla: boolean = false
  listaExisteAccesoTabla: any = []
  mostrarInformacionTabla(){
    this.validar = false
    this.listarMatricesCompletas = []
    this.lista =[]
    this.listaExisteAccesoTabla = []
    this.servicioListaMatrices.listarTodos().subscribe(res => {
      this.servicioAsignacionProceso.listarTodos().subscribe(resAsignacion=>{
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuarioIdLogueado=>{
          this.servicioConsultasGenerales.listarAccesos(resUsuarioIdLogueado.idRol.id).subscribe(resAccesos=>{
            resAccesos.forEach(element => {
              if(element.idModulo == 76){
                this.idExisteAccesoTabla = true
              }else{ this.idExisteAccesoTabla = false }
              this.listaExisteAccesoTabla.push(this.idExisteAcceso)
            });
            const existeAccesoTabla = this.listaExisteAccesoTabla.includes(true)
            if(existeAccesoTabla == true){
              this.organizarTablas(res)
            }else{
              const resAsignacionFiltrado = resAsignacion.filter((element:any) => element.idUsuario.id == Number(sessionStorage.getItem("id")))
              for (let i = 0; i < resAsignacionFiltrado.length; i++) {
                const element = resAsignacionFiltrado[i];
                const resFiltrado = res.filter((elementMatriz:any) => elementMatriz.idSubProceso.idTipoProceso.id == element.idTiposProcesos.id)
                for (let j = 0; j < resFiltrado.length; j++) {
                  const elementMatriz = resFiltrado[j];
                  this.lista.push(elementMatriz)
                }
              }
              this.organizarTablas(this.lista)
            }
          })
        })
      })
    })
  }

  organizarTablas(listaMatrices: any){
    for (let index = 0; index < listaMatrices.length; index++) {
      const elementMatriz = listaMatrices[index];
      this.totalEstimadoMatriz = Number(this.totalEstimadoMatriz) + Number(elementMatriz.costoEstimado)
      this.totalEjecutadoMatriz = Number(this.totalEjecutadoMatriz) + Number(elementMatriz.costoTotal)
      var valorDividido = elementMatriz.costoEstimado*(elementMatriz.porcentajeTotal/100)
      var totalesDivididos = elementMatriz.costoTotal/valorDividido
      var presupuestoMatriz = Math.round(totalesDivididos*100)
      elementMatriz.porcentajeTotal = Math.round(elementMatriz.porcentajeTotal)
      var obj = {
        color: '',
        porcentajeEjecucion: 0,
        colorPorcentajeEjecucion: '',
        matriz: elementMatriz,
        ejecucionPresupuesto: presupuestoMatriz,
      }
      if(elementMatriz.porcentajeTotal == 0){
        obj.ejecucionPresupuesto = 0
      }
      if(presupuestoMatriz < 0){
        obj.color = 'incumplio'
      }
      if(presupuestoMatriz > 1){
        obj.color = 'cumplio'
      }
      if(presupuestoMatriz > 100){
        obj.color = 'pasado'
      }
      var porcentajeCumEjeFech = Math.round((elementMatriz.cumPlaneacion/elementMatriz.cantidadEjecuciones)*100)
      obj.porcentajeEjecucion = porcentajeCumEjeFech
      if(porcentajeCumEjeFech < 50){
        obj.colorPorcentajeEjecucion = 'incumplio'
      }
      if(porcentajeCumEjeFech >= 50){
        obj.colorPorcentajeEjecucion = 'cumplio'
      }
      this.listarMatricesCompletas.push(obj)
      if((index+1) == listaMatrices.length){
        this.dataSource = new MatTableDataSource(this.listarMatricesCompletas);
      }
    }
  }

  visualizarMatrizNecesidad(id:Number){
    const dialogRef = this.dialog.open(VisualizarDetalleMatrizNecesidadesComponent, {
      width: '80%',
      height: '80%',
      data: id
    });
    dialogRef.afterClosed().subscribe(() =>{
      this.listarMatrices()
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue == ""){
      this.mostrarInformacionTabla()
    }else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filterPredicate = (data: MatrizNecesidad, filter: string) => {
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

  listadoMatrices: any = [] //lista que nos sirve para guardar los objetos que se van a mostrar en el excel
  exportToExcel(): void {
    this.listadoMatrices = []
    const formatterPeso = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    })
    for (let index = 0; index < this.listarMatricesCompletas.length; index++) {
      const element = this.listarMatricesCompletas[index];
      var obj = {
        "Id Matriz Necesidad": element.matriz.id,
        "Proceso - SubProceso": element.matriz.idSubProceso.idTipoProceso.descripcion+" - "+element.matriz.idSubProceso.descripcion,
        "Fecha": element.matriz.fecha,
        "Tipo Necesidad": element.matriz.idTipoNecesidad.descripcion,
        "Cantidad Estimada": element.matriz.cantidad,
        "Costo Unitario Estimado": element.matriz.costoUnitario,
        "Costo Estimado": element.matriz.costoEstimado,
        "Costo Ejecutado": element.matriz.costoTotal,
        "Ejecuciones Estimada": element.matriz.cantidadEjecuciones,
        "Porcentaje Total Cumplido": element.matriz.porcentajeTotal+"%",
        "Detalle Matriz": element.matriz.detalle
      }
      this.listadoMatrices.push(obj)
    }
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.listadoMatrices);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "listaMatrices");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
