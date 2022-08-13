import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioVendedoresService } from 'src/app/servicios/serviciosSiga/usuariosVendedores.service';
import Swal from 'sweetalert2';
import { VentasAsesorService } from 'src/app/servicios/serviciosSiga/ventasAsesor.service';
import { PresupuestoVentaMensualService } from 'src/app/servicios/presupuestoVentaMensual.service';

@Component({
  selector: 'app-reporte-asesor',
  templateUrl: './reporte-asesor.component.html',
  styleUrls: ['./reporte-asesor.component.css']
})
export class ReporteAsesorComponent implements OnInit {
  public formReporte!: FormGroup;
  public informacionAsesor: any = [];
  public cumpleAsignVende: any = [];
  public idVendedor: any;
  public presupuesto: any;
  public fechaActual: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private servicioAsignarTurnoVendedor: AsignarTurnoVendedorService,
    private servicioUsuariosVendedores: UsuarioVendedoresService,
    private servicioVentasAsesor: VentasAsesorService,
    private servicioPresupuesto: PresupuestoVentaMensualService,
  ) { }

  ngOnInit() {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formReporte = this.fb.group({
      id: 0,
      documentoAsesor: [null,Validators.required]
    });
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
                  console.log(elementAsignVende)
                  this.idVendedor = elementAsignVende.idVendedor
                });

                this.servicioVentasAsesor.listarPorId(fechaInicial, fechaFinal, this.idVendedor).subscribe(resVentasAsesor=>{
                  resVentasAsesor.forEach(element => {
                    console.log(resVentasAsesor)
                    this.cumpleAsignVende.forEach(elementAsignVende => {
                      console.log(elementAsignVende)
                      if(element.ideSitioventa == elementAsignVende.idSitioVenta){
                        console.log("le falta")
                        this.servicioPresupuesto.listarTodos().subscribe(resPresupuesto=>{
                          resPresupuesto.forEach(elementPresupuesto => {
                            if(elementPresupuesto.idSitioVenta ==elementAsignVende.idSitioVenta){
                              this.presupuesto = elementPresupuesto.valorPresupuesto
                            }
                          });
                          var obj = {
                            nombreSitioVenta: elementAsignVende.nombreSitioVenta,
                            Turno: elementAsignVende.idTurno.descripcion,
                            horaInicio: elementAsignVende.idTurno.horaInicio,
                            horaFinal: elementAsignVende.idTurno.horaFinal,
                            venta: element.suma,
                            presupuesto: this.presupuesto,
                            // cumplimiento: ,
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
