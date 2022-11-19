import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { SolicitudAutorizacionPagoService } from 'src/app/servicios/solicitudAutorizacionPago.service';
import { DatosFormularioPagoService } from 'src/app/servicios/datosFormularioPago.service';
import { ClienteAutorizacionPagoService } from 'src/app/servicios/clienteAutorizacionPago.service';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { MotivoAutorizacionPago } from 'src/app/modelos/motivoAutorizacionPago';
import { EstadoService } from 'src/app/servicios/estado.service';
import { SolicitudAutorizacionPago } from 'src/app/modelos/solicitudAutorizacionPago';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ClienteAutorizacionPago } from 'src/app/modelos/clienteAutorizacionPago';
import { MotivoAutorizacionPagoService } from 'src/app/servicios/motivoAutorizacionPago.service';
import { DatosFormularioPago } from 'src/app/modelos/datosFormularioPago';
@Component({
  selector: 'app-solicitud-autorizacion-premios',
  templateUrl: './solicitud-autorizacion-premios.component.html',
  styleUrls: ['./solicitud-autorizacion-premios.component.css'],
})
export class SolicitudAutorizacionPremiosComponent implements OnInit {
  public formSolicitudAutorizacion !: FormGroup;
  color = ('primary');
  public listaOficinas: any = [];
  constructor(
    private fb: FormBuilder,
    private servicioSoliciAutorizacion: SolicitudAutorizacionPagoService,
    private servicioDatosFormulario: DatosFormularioPagoService,
    private ClienteAutorizacion: ClienteAutorizacionPagoService,
    private servicioEstado: EstadoService,
    private servicioOficinas : OficinasService,
    private servicioUsuario: UsuarioService,
    private servicioMotivoAutorizacionPago: MotivoAutorizacionPagoService,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarOficinas();
  }
  private crearFormulario() {
    this.formSolicitudAutorizacion = this.fb.group({
      id: 0,
      idOficina: [null, Validators.required],
      motivo: [null, Validators.required],
      fecha: [null, Validators.required],
      seriePreImpresa: [null, Validators.required],
      colillaPreImpresa: [null, Validators.required],
      serieImpresa: [null, Validators.required],
      colillaImpresa: [null, Validators.required],
      codigo: [null, Validators.required],
      nombreLoteria: [null, Validators.required],
      totalFormulario: [null, Validators.required],
      totalBruto: [null, Validators.required],
      cedulaColocador: [null, Validators.required],
      nombreCompleto: [null, Validators.required],
      cedula: [null, Validators.required],
      direccion: [null, Validators.required],
      telefono: [null, Validators.required],
    });
  }

  public listarOficinas() {
    this.servicioOficinas.listarTodos().subscribe(res => {
      this.listaOficinas = res;
    });
  }

  guardar(){
    if(this.formSolicitudAutorizacion.valid){
      let motivoAutorizacionPago: MotivoAutorizacionPago = new MotivoAutorizacionPago();
      motivoAutorizacionPago.descripcion = this.formSolicitudAutorizacion.value.motivo;
      this.servicioEstado.listarPorId(96).subscribe(res => {
        motivoAutorizacionPago.idEstado = res;
        console.log(motivoAutorizacionPago);
        this.servicioMotivoAutorizacionPago.registrar(motivoAutorizacionPago).subscribe(resMotivoAutorizacionPago => {
          this.servicioMotivoAutorizacionPago.listarTodos().subscribe(resMotivoAutorizacionPago => {
            const buscarMotivoAutorizacionPago = resMotivoAutorizacionPago.find((motivoAutorizacionPago: { descripcion: any; }) => motivoAutorizacionPago.descripcion === this.formSolicitudAutorizacion.value.motivo);
            let clienteAutorizacionPago: ClienteAutorizacionPago = new ClienteAutorizacionPago();
            clienteAutorizacionPago.cedula = this.formSolicitudAutorizacion.value.cedula;
            clienteAutorizacionPago.direccion = this.formSolicitudAutorizacion.value.direccion;
            clienteAutorizacionPago.nombre = this.formSolicitudAutorizacion.value.nombreCompleto;
            clienteAutorizacionPago.telefono = this.formSolicitudAutorizacion.value.telefono;
            this.ClienteAutorizacion.registrar(clienteAutorizacionPago).subscribe(resCliente => {
              this.ClienteAutorizacion.listarTodos().subscribe(resClientesAutorizacion => {
                const buscarCliente = resClientesAutorizacion.find((cliente: ClienteAutorizacionPago) => Number(cliente.cedula) === Number(clienteAutorizacionPago.cedula));
                let datosFormularioPago: DatosFormularioPago = new DatosFormularioPago();
                datosFormularioPago.fechaSorteo = this.formSolicitudAutorizacion.value.fecha;
                datosFormularioPago.seriePreImpresa = this.formSolicitudAutorizacion.value.seriePreImpresa;
                datosFormularioPago.serieImpresa = this.formSolicitudAutorizacion.value.serieImpresa;
                datosFormularioPago.colillaImpresa = this.formSolicitudAutorizacion.value.colillaImpresa;
                datosFormularioPago.serieCodigoVenta = this.formSolicitudAutorizacion.value.codigo;
                datosFormularioPago.nombreSorteoLoteria = this.formSolicitudAutorizacion.value.nombreLoteria;
                datosFormularioPago.totalFormulario = this.formSolicitudAutorizacion.value.totalFormulario;
                datosFormularioPago.totalGanadoBruto = this.formSolicitudAutorizacion.value.totalBruto;
                datosFormularioPago.cedulaColocador = this.formSolicitudAutorizacion.value.cedulaColocador;
                datosFormularioPago.idClientesAutorizacionPago = buscarCliente;
                this.servicioDatosFormulario.registrar(datosFormularioPago).subscribe(res => {
                  this.servicioDatosFormulario.listarTodos().subscribe(resDatosFormulario => {
                    const buscarDatosFormulario = resDatosFormulario.find((datosFormulario: DatosFormularioPago) => datosFormulario.serieCodigoVenta === datosFormularioPago.serieCodigoVenta);
                    let solicitudAutorizacionPago: SolicitudAutorizacionPago = new SolicitudAutorizacionPago();
                    solicitudAutorizacionPago.fecha = new Date(new Date().getTime()).toISOString();
                    solicitudAutorizacionPago.idMotivoAutorizacionPago = buscarMotivoAutorizacionPago;
                    const oficinas = this.listaOficinas.find((oficina: any) => oficina.ideOficina === Number(this.formSolicitudAutorizacion.value.idOficina));
                    solicitudAutorizacionPago.idOficina = oficinas.ideOficina;
                    solicitudAutorizacionPago.nombreOficiona = oficinas.nom_oficina;
                    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(res => {
                      solicitudAutorizacionPago.idUsuario = res;
                      solicitudAutorizacionPago.idDatosFormularioPago  = buscarDatosFormulario;
                      console.log(solicitudAutorizacionPago);
                      this.servicioSoliciAutorizacion.registrar(solicitudAutorizacionPago).subscribe(res => {
                        Swal.fire({
                          icon: 'success',
                          text: 'Se ha registrado correctamente',
                          showConfirmButton: false,
                          timer: 1500
                        });
                        this.formSolicitudAutorizacion.reset();
                      }, error => {
                        Swal.fire({
                          icon: 'error',
                          text: 'Error al registrar la solicitud',
                          showConfirmButton: false,
                          timer: 1500
                          });
                      });
                    })
                  });
                }, error => {
                  Swal.fire({
                    icon: 'error',
                    text: 'Error al registrar datos formulario pago',
                  });
                });
              });
            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Error al registrar cliente',
              });
            });
          });
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar el motivo de autorización de pago',
          });
        });


      })
    }else{
      Swal.fire({
        icon: 'error',
        text: 'Campos vacios',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  public format() {
    var totalFormulario = this.formSolicitudAutorizacion.controls['totalFormulario'].value
    const formatterPesoFormulario = new Intl.NumberFormat('es-CO')
    var num = totalFormulario.replace(/\./g, '');
    var num2 = formatterPesoFormulario.format(num)
    this.formSolicitudAutorizacion.controls['totalFormulario'].setValue(num2)
  }

  public formatBruto() {
    var totalBruto = this.formSolicitudAutorizacion.controls['totalBruto'].value
    const formatterPesoBruto = new Intl.NumberFormat('es-CO')
    var num = totalBruto.replace(/\./g, '');
    var num2 = formatterPesoBruto.format(num)
    this.formSolicitudAutorizacion.controls['totalBruto'].setValue(num2)
  }
}

