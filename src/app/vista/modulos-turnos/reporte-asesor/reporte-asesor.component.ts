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

  public reporte2(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.informacionAsesor = []
    this.cumpleAsignVende = []
    this.listaFinal = []
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
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      var obj = {
        nombreSitioVenta: "",
        Turno: "",
        horaInicio: "",
        horaFinal: "",
        venta: 0,
        presupuesto: 0,
        cumplimiento: "",
        faltanteCumplimiento: 0,
      }
      var obj2 = {
        nombreSitioVenta: "",
        Turno: "",
        horaInicio: "",
        horaFinal: "",
        venta: 0,
        presupuesto: 0,
        cumplimiento: "",
        faltanteCumplimiento: 0,
      }
      var obj3 = {
        nombreSitioVenta: "",
        Turno: "",
        horaInicio: "",
        horaFinal: "",
        venta: 0,
        presupuesto: 0,
        cumplimiento: "",
        faltanteCumplimiento: 0,
      }
      obj.nombreSitioVenta = "marian"
      obj.Turno = "primero"
      obj.horaInicio = "8:20"
      obj.horaFinal = "15:20"
      obj.venta = 150000
      obj.presupuesto = 50000000
      obj.cumplimiento = "50.9"
      obj.faltanteCumplimiento = 49850000
      obj2.nombreSitioVenta = "marian2"
      obj2.Turno = "segundo"
      obj2.horaInicio = "10:20"
      obj2.horaFinal = "21:20"
      obj2.venta = 150000
      obj2.presupuesto = 50000000
      obj2.cumplimiento = "50.9"
      obj2.faltanteCumplimiento = 49850000
      obj3.nombreSitioVenta = "marian3"
      obj3.Turno = "tercero"
      obj3.horaInicio = "10:20"
      obj3.horaFinal = "12:20"
      obj3.venta = 150000
      obj3.presupuesto = 50000000
      obj3.cumplimiento = "50.9"
      obj3.faltanteCumplimiento = 49850000
      this.listaFinal.push(obj, obj2, obj3)
    }
    this.dataSource = new MatTableDataSource( this.listaFinal);
    console.log(this.listaFinal)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //GRAFICO
    this.chartOptions = {
      series: [30, 100-30],
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
    document.getElementById('informacionAsesor')?.setAttribute('style', 'display: block;')
  }

  public reporte(){
    this.informacionAsesor = []
    this.cumpleAsignVende = []
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
                if((element.idVendedor == elementInformacionAsesor.ideUsuario && fechaI.getMonth()==this.fechaActual.getMonth() && fechaI.getFullYear()==this.fechaActual.getFullYear()) || (element.idVendedor == elementInformacionAsesor.ideUsuario && fechaF.getMonth()==this.fechaActual.getMonth() && fechaF.getFullYear()==this.fechaActual.getFullYear())){
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

                this.servicioVentasAsesor.listarPorId(fechaInicial, fechaFinal, this.idVendedor).subscribe(resVentasAsesor=>{
                  resVentasAsesor.forEach(element => {
                    console.log(resVentasAsesor)
                    this.cumpleAsignVende.forEach(elementAsignVende => {
                      if(element.ideSitioventa == elementAsignVende.idSitioVenta){
                        this.servicioPresupuesto.listarTodos().subscribe(resPresupuesto=>{
                          resPresupuesto.forEach(elementPresupuesto => {
                            var mesPresupusupuesto = new Date(elementPresupuesto.mes)
                            mesPresupusupuesto.setDate(mesPresupusupuesto.getDate()+1)
                            var mesAsigVendeI = new Date(elementAsignVende.fechaInicio)
                            mesAsigVendeI.setDate(mesAsigVendeI.getDate()+1)
                            var mesAsigVendeF = new Date(elementAsignVende.fechaFinal)
                            mesAsigVendeF.setDate(mesAsigVendeF.getDate()+1)
                            if((elementPresupuesto.idSitioVenta == elementAsignVende.idSitioVenta && mesAsigVendeI.getMonth() == mesPresupusupuesto.getMonth()) || (elementPresupuesto.idSitioVenta ==elementAsignVende.idSitioVenta && mesAsigVendeF.getMonth() == mesPresupusupuesto.getMonth())){
                              this.presupuesto = elementPresupuesto.valorPresupuesto
                              this.valorPresupuesto = elementPresupuesto.valorPresupuesto
                            }
                          });
                          var obj = {
                            nombreSitioVenta: elementAsignVende.nombreSitioVenta,
                            Turno: elementAsignVende.idTurno.descripcion,
                            horaInicio: elementAsignVende.idTurno.horaInicio,
                            horaFinal: elementAsignVende.idTurno.horaFinal,
                            venta: element.suma,
                            presupuesto: this.presupuesto,
                            cumplimiento: (element.suma/this.valorPresupuesto)*100,
                            faltanteCumplimiento: this.presupuesto-element.suma,
                          }
                          console.log(obj)
                        })
                      }
                    });
                  });
                })
              }
            });
          })
        }
      })
    }
  }

}
