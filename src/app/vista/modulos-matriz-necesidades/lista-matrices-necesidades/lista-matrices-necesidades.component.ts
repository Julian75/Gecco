import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatrizNecesidadService } from 'src/app/servicios/matrizNecesidad.service';
import { VisualizarDetalleMatrizNecesidadesComponent } from './visualizar-detalle-matriz-necesidades/visualizar-detalle-matriz-necesidades.component';
import { MatDialog } from '@angular/material/dialog';
import { AsignacionProcesoService } from 'src/app/servicios/asignacionProceso.service';
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

  displayedColumns = ['id','fecha','cantidad','cantidadEjecuciones','costoEstimado','costoTotal', 'porcentajeTotal', 'subProceso','tipoNecesidad','opciones'];
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
        this.dataSource = new MatTableDataSource(this.listarMatrice);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        for (let i = 0; i < this.listarMatrice.length; i++) {
          const element = this.listarMatrice[i];
          var lengthMatrizNecesidades = this.listarMatrice.length
          var porcentajeIndividualEjecucionCompleta = 100/lengthMatrizNecesidades
          var porcentajeTotalIndividual = (element.porcentajeTotal/100)*porcentajeIndividualEjecucionCompleta
          this.sumaPorcentajes = this.sumaPorcentajes + porcentajeTotalIndividual
        }
        this.valor = this.sumaPorcentajes
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
      },
      (err) => console.log(err)
    );

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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
