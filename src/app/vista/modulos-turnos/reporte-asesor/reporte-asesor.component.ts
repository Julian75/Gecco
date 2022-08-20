import { AsignarTurnoService } from 'src/app/servicios/asignarTurno.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioVendedoresService } from 'src/app/servicios/serviciosSiga/usuariosVendedores.service';
import Swal from 'sweetalert2';
import { VentasAsesorService } from 'src/app/servicios/serviciosSiga/ventasAsesor.service';
import { PresupuestoVentaMensualService } from 'src/app/servicios/presupuestoVentaMensual.service';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-reporte-asesor',
  templateUrl: './reporte-asesor.component.html',
  styleUrls: ['./reporte-asesor.component.css']
})
export class ReporteAsesorComponent implements OnInit {
  public formReporte!: FormGroup;
  public informacionAsesor: any = [];
  public cumpleAsignVende: any = [];
  public listaF: any = [];
  public listaFinal: any = [];
  public idVendedor: any;
  public presupuesto: any;
  public valorPresupuesto: any;
  public fechaActual: Date = new Date();
  displayedColumns = ['id', 'descripcion', 'horaInicio', 'horaFinal', 'estado', 'tipoTurno'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //GRAFICO
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private fb: FormBuilder,
    private servicioAsignarTurnoVendedor: AsignarTurnoVendedorService,
    private servicioUsuariosVendedores: UsuarioVendedoresService,
    private servicioVentasAsesor: VentasAsesorService,
    private servicioAsignTurn: AsignarTurnoService,
    private servicioPresupuesto: PresupuestoVentaMensualService,
  ) { }

  ngOnInit() {
    this.crearFormulario();
    this.chartOptions = {
      series: [40, 100-40]
    };
  }

  private crearFormulario() {
    this.formReporte = this.fb.group({
      id: 0,
      documentoAsesor: [null,Validators.required]
    });
  }

  sumPorcen: any
  listaAsignVenSitioVenta: any = []
  valorTotalVentas: any
  totVentas: any
  valorTotalPresupuesto: any
  totPresupuesto: any
  valorTotalPorcentaje: any
  valorTotalVentasCumplidas: any
  totVentasCumplidas: any
  presupuestin: any
  i:any
  public reporte(){
    this.informacionAsesor = []
    this.cumpleAsignVende = []
    this.listaF = []
    this.listaFinal = []
    this.listaAsignVenSitioVenta = []
    this.sumPorcen = 0
    this.valorTotalVentas = 0
    this.valorTotalPresupuesto = 0
    this.valorTotalPorcentaje = 0
    this.valorTotalVentasCumplidas = 0
    this.presupuestin = 0
    this.i = 0
    var documentoAsesor = this.formReporte.controls['documentoAsesor'].value
    if(documentoAsesor == "" || documentoAsesor == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No digito el número de identificación!',
        showConfirmButton: false,
        timer: 2500
      })
    }else{
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      this.servicioUsuariosVendedores.listarTodos().subscribe(resUsuariosVendedores=>{
        resUsuariosVendedores.forEach(elementAsesor => {
          if(elementAsesor.num_identificacion == Number(documentoAsesor)){
            this.informacionAsesor.push(elementAsesor)
          }
        });
        if(this.informacionAsesor.length<1){
          document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No existe ningun asesor con ese número de identificación!',
            showConfirmButton: false,
            timer: 2500
          })
        }else{
          this.servicioAsignarTurnoVendedor.listarTodos().subscribe(resAsigTurnVend=>{
            this.informacionAsesor.forEach(elementInformacionAsesor => {
              resAsigTurnVend.forEach(element => {
                var fechaI = new Date(element.fechaInicio)
                fechaI.setDate(fechaI.getDate()+1)
                var fechaF = new Date(element.fechaFinal)
                fechaF.setDate(fechaF.getDate()+1)
                if((element.idVendedor == elementInformacionAsesor.ideUsuario && fechaI.getMonth()==this.fechaActual.getMonth() && fechaI.getFullYear()==this.fechaActual.getFullYear() && element.estado != 'Eliminado') || (element.idVendedor == elementInformacionAsesor.ideUsuario && fechaF.getMonth()==this.fechaActual.getMonth() && fechaF.getFullYear()==this.fechaActual.getFullYear()) && element.estado != 'Eliminado'){
                  this.cumpleAsignVende.push(element)
                }
              });
              if(this.cumpleAsignVende.length<1){
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Ese asesor no tiene ninguna asignación de turno en este mes.',
                  showConfirmButton: false,
                  timer: 2500
                })
              }else{
                var primerDia = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth(), 1);
                var ultimoDia = new Date(this.fechaActual.getFullYear(), (this.fechaActual.getMonth()+1), 0);
                var fechaInicial = primerDia.getFullYear()+""+(primerDia.getMonth()+1)+""+primerDia.getDate()
                if(primerDia.getDate()<=9 && primerDia.getMonth()<=9){
                  fechaInicial = primerDia.getFullYear()+"0"+(primerDia.getMonth()+1)+"0"+primerDia.getDate()
                }else if(primerDia.getDate()<=9){
                  fechaInicial = primerDia.getFullYear()+""+(primerDia.getMonth()+1)+"0"+primerDia.getDate()
                }else if(primerDia.getMonth()<=9){
                  fechaInicial = primerDia.getFullYear()+"0"+(primerDia.getMonth()+1)+""+primerDia.getDate()
                }

                var fechaFinal = ultimoDia.getFullYear()+""+(ultimoDia.getMonth()+1)+""+ultimoDia.getDate();

                if(ultimoDia.getDate()<=9 && ultimoDia.getMonth()<=9){
                  fechaFinal = ultimoDia.getFullYear()+"0"+(ultimoDia.getMonth()+1)+"0"+ultimoDia.getDate();
                }else if(ultimoDia.getDate()<=9){
                  fechaFinal = ultimoDia.getFullYear()+""+(ultimoDia.getMonth()+1)+"0"+ultimoDia.getDate();
                }else if(ultimoDia.getMonth()<=9){
                  fechaFinal = ultimoDia.getFullYear()+"0"+(ultimoDia.getMonth()+1)+""+ultimoDia.getDate();
                }

                this.cumpleAsignVende.forEach(elementAsignVende => {
                  this.idVendedor = elementAsignVende.idVendedor
                });

                console.log(fechaInicial, fechaFinal)
                this.servicioVentasAsesor.listarPorId(fechaInicial, fechaFinal, this.idVendedor).subscribe(resVentasAsesor=>{
                  this.servicioAsignTurn.listarTodos().subscribe(resAsigTurno=>{
                    this.servicioPresupuesto.listarTodos().subscribe(resPresupuesto=>{
                      resVentasAsesor.forEach(element => {
                        this.i += 1
                        var turnos = {
                          ideSitioVenta: 0,
                          nombreSitioVenta: "",
                          turnos: [],
                          turnitos: '',
                          porcentaje: 0,
                          porcentajito: 0,
                          presupuesto: 0,
                          ventas: 0,
                          faltaVenta: 0,
                        }
                        this.cumpleAsignVende.forEach(elementAsignVende => {
                          if(element.ideSitioventa == elementAsignVende.idSitioVenta){
                            console.log(elementAsignVende)
                            turnos.ideSitioVenta = elementAsignVende.idSitioVenta
                            turnos.nombreSitioVenta = elementAsignVende.nombreSitioVenta
                            var Turno = elementAsignVende.idTurno.horaInicio+" a "+elementAsignVende.idTurno.horaFinal
                            turnos.turnos.push(Turno)
                            resAsigTurno.forEach(elementAsigTurno => {
                              if(elementAsigTurno.idSitioVenta == elementAsignVende.idSitioVenta && elementAsigTurno.idTurnos.id == elementAsignVende.idTurno.id){
                                this.sumPorcen += elementAsigTurno.porcentaje / 100
                              }
                            });
                            turnos.porcentajito = this.sumPorcen
                            resPresupuesto.forEach(elementPresupuesto => {
                              var mesPresupusupuesto = new Date(elementPresupuesto.mes)
                              mesPresupusupuesto.setDate(mesPresupusupuesto.getDate()+1)
                              var mesAsigVendeI = new Date(elementAsignVende.fechaInicio)
                              mesAsigVendeI.setDate(mesAsigVendeI.getDate()+1)
                              var mesAsigVendeF = new Date(elementAsignVende.fechaFinal)
                              mesAsigVendeF.setDate(mesAsigVendeF.getDate()+1)
                              if((elementPresupuesto.idSitioVenta == elementAsignVende.idSitioVenta && mesAsigVendeI.getMonth() == mesPresupusupuesto.getMonth()) || (elementPresupuesto.idSitioVenta ==elementAsignVende.idSitioVenta && mesAsigVendeF.getMonth() == mesPresupusupuesto.getMonth())){
                                this.presupuestin = elementPresupuesto.valorPresupuesto
                              }
                            })
                            turnos.presupuesto = this.presupuestin / turnos.porcentajito
                            turnos.ventas = element.suma
                            turnos.faltaVenta = turnos.presupuesto-turnos.ventas
                            turnos.porcentaje = (turnos.ventas / turnos.presupuesto)*100
                            console.log(turnos)
                            for (let index = 0; index < turnos.turnos.length; index++) {
                              index = index+1
                              const element = turnos.turnos[index];
                              if(turnos.turnos.length == 1){
                                turnos.turnitos = turnos.turnos[0]
                              }else if(turnos.turnos.length > 1){
                                turnos.turnitos = turnos.turnos[0]+" - "+element
                              }
                            }
                          }
                        });
                        // console.log(turnos)
                        if(turnos.faltaVenta != 0 && turnos.ideSitioVenta != 0 && turnos.nombreSitioVenta != "" && turnos.porcentaje != 0 && turnos.presupuesto != 0 && turnos.turnitos != "" && turnos.turnos.length != 0 && turnos.ventas != 0){
                          console.log(turnos)
                          this.listaF.push(turnos)
                          let result = this.listaF.filter(function({ideSitioVenta}) {
                            return !this.has(ideSitioVenta) && this.add(ideSitioVenta);
                          }, new Set)
                          this.listaFinal = result
                          console.log(result)
                          for (let index = 0; index < result.length; index++) {
                            const elementFinal = result[index];
                            this.valorTotalVentas += elementFinal.ventas
                            this.valorTotalPresupuesto += elementFinal.presupuesto
                            this.valorTotalPorcentaje = (this.valorTotalVentas / this.valorTotalPresupuesto)*100
                            this.valorTotalVentasCumplidas += elementFinal.faltaVenta
                          }
                          if(resVentasAsesor.length == this.i){
                            console.log(this.valorTotalVentas, this.valorTotalPresupuesto, this.valorTotalPorcentaje, this.valorTotalVentasCumplidas)
                            if(result.length == 1){
                              this.valorTotalVentas = this.valorTotalVentas
                              this.valorTotalPresupuesto = this.valorTotalPresupuesto
                              this.valorTotalVentasCumplidas = this.valorTotalVentasCumplidas
                            }else{
                              for (let index = 0; index < result.length; index++) {
                                this.totVentas = this.valorTotalVentas - result[0].ventas
                                this.totPresupuesto = this.valorTotalPresupuesto - result[0].presupuesto
                                this.totVentasCumplidas = this.valorTotalVentasCumplidas - result[0].faltaVenta
                              }
                              this.valorTotalVentas = this.totVentas
                              this.valorTotalPresupuesto = this.totPresupuesto
                              this.valorTotalVentasCumplidas = this.totVentasCumplidas
                            }
                            var finalTabla = {
                              ideSitioVenta: "",
                              nombreSitioVenta: "",
                              turnos: [],
                              turnitos: '',
                              porcentaje: this.valorTotalPorcentaje,
                              presupuesto: this.valorTotalPresupuesto,
                              ventas: this.valorTotalVentas,
                              faltaVenta: this.valorTotalVentasCumplidas,
                            }
                            if(finalTabla.faltaVenta != 0  && finalTabla.porcentaje != NaN && finalTabla.presupuesto != 0 &&  finalTabla.ventas != 0){
                              this.listaFinal.push(finalTabla)
                            }
                            this.dataSource = new MatTableDataSource( this.listaFinal);
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.sort = this.sort;
                            console.log(this.listaFinal)
                            //GRAFICO
                            this.chartOptions = {
                              series: [this.valorTotalPorcentaje, 100-this.valorTotalPorcentaje],
                              chart: {
                                width: 380,
                                type: "pie"
                              },
                              labels: ["Cumplio", "Falta"],
                              responsive: [
                                {
                                  breakpoint: 480,
                                  options: {
                                    chart: {
                                      width: 200,
                                    },
                                    legend: {
                                      position: "bottom"
                                    }
                                  }
                                }
                              ]
                            };
                            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                            document.getElementById('informacionAsesor')?.setAttribute('style', 'display: block;')
                        }
                        }
                      });
                    });
                  })
                })
              }
            });
          })
        }
      })
    }
  }

}
