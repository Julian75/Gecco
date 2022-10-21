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

  displayedColumns = ['id','fecha','cantidad','cantidadEjecuciones','costoEstimado','costoTotal', 'ejecucionPresupuesto', 'porcentajeTotal', 'subProceso','tipoNecesidad','opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private servicioListaMatrices: MatrizNecesidadService,
    private servicioAsignacionProceso: AsignacionProcesoService,
  ) { }

  ngOnInit(): void {
    this.listarMatrices();
    this.mostrarInformacionTabla();
  }

  public listarMatrices(){
    this.listarMatrice = []
    this.sumaPorcentajes = 0
    this.servicioListaMatrices.listarTodos().subscribe(res => {
      this.servicioAsignacionProceso.listarTodos().subscribe(resAsignacion=>{
        resAsignacion.forEach(element => {
          if(element.idUsuario.id == Number(sessionStorage.getItem("id"))){
            this.matrizUsuario = element
          }
        });
        res.forEach(elementMatriz => {
          if(elementMatriz.idSubProceso.idTipoProceso.id == this.matrizUsuario.idTiposProcesos.id){
            this.listarMatrice.push(elementMatriz)
          }
        });
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

  listarMatricesCompletas: any = []
  mostrarInformacionTabla(){
    this.listarMatricesCompletas = []
    this.servicioListaMatrices.listarTodos().subscribe(res => {
      this.servicioAsignacionProceso.listarTodos().subscribe(resAsignacion=>{
        resAsignacion.forEach(element => {
          if(element.idUsuario.id == Number(sessionStorage.getItem("id"))){
            this.matrizUsuario = element
          }
        });
        res.forEach(elementMatriz => {
          if(elementMatriz.idSubProceso.idTipoProceso.id == this.matrizUsuario.idTiposProcesos.id){
            // elementMatriz.costoTotal/(elementMatriz.costoEstimado * elementMatriz.porcentajeTotal)*100
            var valorDividido = elementMatriz.costoEstimado*(elementMatriz.porcentajeTotal/100)
            var totalesDivididos = elementMatriz.costoTotal/valorDividido
            var presupuestoMatriz = Math.round(totalesDivididos*100)
            elementMatriz.porcentajeTotal = Math.round(elementMatriz.porcentajeTotal)
            var obj = {
              color: '',
              porcentajeEjecucion: '',
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
            if(elementMatriz.porcentajeTotal < 50){
              obj.porcentajeEjecucion = 'incumplio'
            }
            if(elementMatriz.porcentajeTotal >= 50){
              obj.porcentajeEjecucion = 'cumplio'
            }
            console.log(obj)
            this.listarMatricesCompletas.push(obj)
          }
        });
        this.dataSource = new MatTableDataSource(this.listarMatricesCompletas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    })
  }

  visualizarMatrizNecesidad(id:Number){
    const dialogRef = this.dialog.open(VisualizarDetalleMatrizNecesidadesComponent, {
      width: '1000px',
      height: '440px',
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
    for (let index = 0; index < this.listarMatrice.length; index++) {
      const element = this.listarMatrice[index];
      var obj = {
        "Id Matriz Necesidad": element.id,
        "Fecha": element.fecha,
        "Tipo Necesidad": element.idTipoNecesidad.descripcion,
        "Proceso - SubProceso": element.idSubProceso.idTipoProceso.descripcion+" - "+element.idSubProceso.descripcion,
        "Cantidad Estimada": element.cantidad,
        "Costo Unitario Estimado": formatterPeso.format(element.costoUnitario),
        "Costo Estimado": formatterPeso.format(element.costoEstimado),
        "Costo Ejecutado": formatterPeso.format(element.costoTotal),
        "Ejecuciones Estimada": element.cantidadEjecuciones,
        "Porcentaje Total Cumplido": element.porcentajeTotal+"%",
        "Detalle Matriz": element.detalle
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
