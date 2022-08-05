import { AprobarComentarioComponent } from './../comentarios-solicitud/aprobar-comentario/aprobar-comentario.component';
import { ListadoObservacionComponent } from './../listado-observacion/listado-observacion.component';
import { ProcesoComponent } from './../proceso/proceso.component';
import { VisualizarDetalleSolicitudComponent } from './../lista-solicitudes/visualizar-detalle-solicitud/visualizar-detalle-solicitud.component';
import { DetalleSolicitudService } from './../../../servicios/detalleSolicitud.service';
import { OrdenCompraService } from 'src/app/servicios/ordenCompra.service';
import { ModificarOrdenCompraComponent } from './../orden-compra/modificar-orden-compra/modificar-orden-compra.component';
import { OrdenCompraComponent } from './../orden-compra/orden-compra.component';
import { OrdenCompra } from './../../../modelos/ordenCompra';
import { AgregarCotizacionComponent } from './../generar-cotizacion/agregar-cotizacion/agregar-cotizacion.component';
import { ModificarSolicitudComponent } from './../lista-solicitudes/modificar-solicitud/modificar-solicitud.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { GenerarCotizacionComponent } from './../generar-cotizacion/generar-cotizacion.component';
import { SolicitudesComponent } from './../solicitudes/solicitudes.component';
import { Router } from '@angular/router';
import { SolicitudService } from './../../../servicios/solicitud.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListaCotizacionesComponent } from '../lista-cotizaciones/lista-cotizaciones.component';
import { AccesoService } from 'src/app/servicios/Acceso.service';
import Swal from 'sweetalert2';
import { AprobacionRegistroComponent } from '../aprobacion-registro/aprobacion-registro.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SolicitudConformeComponent } from '../solicitud-conforme/solicitud-conforme.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pasos',
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.css']
})
export class PasosComponent implements OnInit {

  public listaEstado: any = [];
  public lista: any = [];
  public listarExiste: any = [];
  public habilitar = false
  public habilitar2 = false

  constructor(
    private servicioSolicitud: SolicitudService,
    private servicioSolicitudDetalle: DetalleSolicitudService,
    private servicioAccesos: AccesoService,
    private servicioUsuario: UsuarioService,
    private servicioOrdenCompra: OrdenCompraService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.estado();
  }

  public estado(){
    for (const [key, value] of Object.entries(this.data)) {
      this.lista.push(value)
    }
    this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
      if(res.idEstado.id == 28 || res.idEstado.id == 57){
        document.getElementById("card0")?.setAttribute("style", "background-color: #009AE4;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #DBDBDB;")
      }else if(res.idEstado.id == 56){
        document.getElementById("card0")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #009AE4;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #DBDBDB;")
      }else if(res.idEstado.id == 54){
        document.getElementById("card0")?.setAttribute("style", "background-color: #009AE4;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #DBDBDB;")
      }else if (res.idEstado.id == 29) {
        document.getElementById("card0")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #009AE4;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #DBDBDB;")
      }else if (res.idEstado.id == 30) {
        document.getElementById("card0")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #FF5555;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #DBDBDB;")
      }else if(res.idEstado.id == 36){
        document.getElementById("card0")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #009AE4;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #DBDBDB;")
      }else if(res.idEstado.id == 35){
        document.getElementById("card0")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #FF5555;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #DBDBDB;")
      }else if(res.idEstado.id == 34){
        document.getElementById("card0")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #009AE4;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #DBDBDB;")
      }else if(res.idEstado.id == 37){
        document.getElementById("card0")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #009AE4;")
      }else if(res.idEstado.id == 47){
        document.getElementById("card0")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #FF5555;")
      }
      else if(res.idEstado.id == 46 || res.idEstado.id == 60){
        document.getElementById("card0")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #AEEA00;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #AEEA00;")
      }
      else{
        document.getElementById("card0")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card1")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card2")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card3")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card4")?.setAttribute("style", "background-color: #DBDBDB;")
        document.getElementById("card5")?.setAttribute("style", "background-color: #DBDBDB;")
      }
    })
  }

  public solicitudes0(){
    this.listarExiste = []
    for (const [key, value] of Object.entries(this.data)) {
      this.lista.push(value)
    }
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
        this.servicioSolicitud.listarPorId(this.lista[0]).subscribe(resSolicitud=>{
          for (let index = 0; index < resAccesos.length; index++) {
            const element = resAccesos[index];
            if(element.idModulo.id == 23 && resUsuario.idRol.id == element.idRol.id  ){
              this.habilitar = true
            }else if(resSolicitud.idUsuario.id == resUsuario.id){
              this.habilitar = false
            }
            this.listarExiste.push(this.habilitar)
          }
          console.log(this.listarExiste)
          const existe = this.listarExiste.includes( true )
          if(existe == true){
            this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
              if(res.idEstado.id == 28){
                const dialogRef = this.dialog.open(ListadoObservacionComponent, {
                  width: '1000px',
                  data: {id:this.lista[0]}
                });
              }else if(res.idEstado.id == 54){
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Aún no se ha hecho los comentarios solicitados',
                  showConfirmButton: false,
                  timer: 1500
                })
              }else if(res.idEstado.id == 57){
                this.servicioSolicitud.listarPorId(this.lista[0]).subscribe(resSolicitud=>{
                  const dialogRef = this.dialog.open(AprobarComentarioComponent, {
                    width: '1000px',
                    data: resSolicitud
                  });
                })
              }
            })
          }else if(existe == false){
            this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
              resAccesos.forEach(element => {
                if(element.idModulo.id == 32){
                  this.habilitar2 = true
                }
              });
              if(this.habilitar2 == true){
                this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
                  if(res.idEstado.id == 54){
                    this.servicioSolicitud.listarPorId(this.lista[0]).subscribe(resSolicitud=>{
                      const dialogRef = this.dialog.open(VisualizarDetalleSolicitudComponent, {
                        width: '1000px',
                        data: resSolicitud
                      });
                    })
                  }
                })
              }else{
                this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
                  if(res.idEstado.id == 28){
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'Aún no ha decidido si desea una opinión.!',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                  if(res.idEstado.id == 54){
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'Aún no se ha hecho los comentarios solicitados',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                  if(res.idEstado.id == 57){
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'Falta validar si desea más comentarios o no.',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  }

  public solicitudes(){
    this.listarExiste = []
    for (const [key, value] of Object.entries(this.data)) {
      this.lista.push(value)
    }
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
        this.servicioSolicitud.listarPorId(this.lista[0]).subscribe(resSolicitud=>{
          for (let index = 0; index < resAccesos.length; index++) {
            const element = resAccesos[index];
            if(element.idModulo.id == 23 && resUsuario.idRol.id == element.idRol.id  ){
              this.habilitar = true
            }else if(resSolicitud.idUsuario.id == resUsuario.id){
              this.habilitar = false
            }
            this.listarExiste.push(this.habilitar)
          }
          console.log(this.listarExiste)
          const existe = this.listarExiste.includes( true )
          if(existe == true){
            this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
              if(res.idEstado.id == 56){
                const dialogRef = this.dialog.open(SolicitudesComponent, {
                  width: '1000px',
                  height: '430px',
                  data: this.lista[0]
                });
              }else if(res.idEstado.id == 30){
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Aún no se ha modificado la solicitud!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            })
          }else if(existe == false){
            this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
              if(res.idEstado.id == 56){
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Aún no se ha validado la solicitud!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }if(res.idEstado.id == 30){
                const dialogRef = this.dialog.open(ModificarSolicitudComponent, {
                  width: '2500px',
                  height: '700px',
                  data: this.lista[0]
                });
              }
            })
          }
        })
      })
    })
  }

  public solicitudes2(){
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
    this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
        resAccesos.forEach(element => {
          if(element.idModulo.id == 23 && resUsuario.idRol.id == element.idRol.id){
            this.habilitar = true
          }
        });
        if(this.habilitar == true){
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 29){
              const dialogRef = this.dialog.open(GenerarCotizacionComponent, {
                width: '1000px',
                height: '430px',
                data: this.lista[0]
              });
            }
          })
        }else if(this.habilitar == false){
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 29){
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Aún no se ha registrado la cotización!',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        }
      })
    })
  }

  public solicitudes3(){
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
        resAccesos.forEach(element => {
          if(element.idModulo.id == 24 && resUsuario.idRol.id == element.idRol.id){
            this.habilitar = true
          }
        });
        if(this.habilitar == true){
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 36){
              const dialogRef = this.dialog.open(ListaCotizacionesComponent, {
                width: '1000px',
                height: '430px',
                data: this.lista[0]
              });
            }
          })
        }else if(this.habilitar == false){
          this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
            resAccesos.forEach(element => {
              if(element.idModulo.id == 23 && resUsuario.idRol.id == element.idRol.id){
                this.habilitar2 = true
              }
            });
            if(this.habilitar2 == true){
              this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
                if(res.idEstado.id == 35){
                  const dialogRef = this.dialog.open(AgregarCotizacionComponent, {
                    width: '450px',
                    data: this.lista[0]
                  });
                }
                if(res.idEstado.id == 36){
                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Aún no se ha validado la cotización!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
              })
            }else{
              this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
                if(res.idEstado.id == 35){
                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Aún no se ha agregado otra cotización ya que fue rechazada.!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
                if(res.idEstado.id == 36){
                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Aún no se ha validado la cotización!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
              })
            }
          })
        }
      })
    })
  }

  // Card registro
  public solicitudes4(){
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
        resAccesos.forEach(element => {
          if(element.idModulo.id == 24 && resUsuario.idRol.id == element.idRol.id){
            this.habilitar = true
          }
        });
        if(this.habilitar == true){
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 34){
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Aún no se ha hecho un registro!',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        }else if(this.habilitar == false){
          resAccesos.forEach(element => {
            if(element.idModulo.id == 23 && resUsuario.idRol.id == element.idRol.id){
              this.habilitar2 = true
            }
          });
          if(this.habilitar2 == true){
            this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
              if(res.idEstado.id == 34){
                const dialogRef = this.dialog.open(OrdenCompraComponent, {
                  width: '1000px',
                  height: '650px',
                  data: this.lista[0]
                });
              }
            })
          }else if(this.habilitar2 == false){
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Aún no se ha hecho un registro!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      })
    })
  }

  // Card aprobacion
  public solicitudes5(){
    this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
      this.servicioAccesos.listarTodos().subscribe(resAccesos=>{
        resAccesos.forEach(element => {
          if(element.idModulo.id == 24 && resUsuario.idRol.id == element.idRol.id){
            this.habilitar = true
          }
        });
        if(this.habilitar == true){
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 34){
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Aún no se ha hecho un registro!',
                showConfirmButton: false,
                timer: 1500
              })
            }else if(res.idEstado.id == 37){
              const dialogRef = this.dialog.open(AprobacionRegistroComponent, {
                width: '1000px',
                height: '650px',
                data: this.lista[0]
              });
            }else if(res.idEstado.id == 46){
              this.requisicion();
            }
          })
        }else if(this.habilitar == false){
          resAccesos.forEach(element => {
            if(element.idModulo.id == 23 && resUsuario.idRol.id == element.idRol.id){
              this.habilitar2 = true
            }
          });
          if(this.habilitar2 == true){
            this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
              if(res.idEstado.id == 37){
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Aún no se ha validado su registro!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }else if(res.idEstado.id == 46){
                this.requisicion();
              }
              else if(res.idEstado.id == 47){
                this.servicioOrdenCompra.listarTodos().subscribe(resOrdenCompra=>{
                  resOrdenCompra.forEach(element => {
                    if(element.idSolicitud.id == this.lista[0]){
                      const dialogRef = this.dialog.open(ModificarOrdenCompraComponent, {
                        width: '1000px',
                        height: '650px',
                        data: {idSolicitud: this.lista[0], idOrdenCompra: element.id}
                      });
                    }
                  });
                })
              }
            })
          }else{
            this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
              if(res.idEstado.id == 37){
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Aún no se ha validado su registro!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }else if(res.idEstado.id == 47){
                this.servicioOrdenCompra.listarTodos().subscribe(resOrdenCompra=>{
                  resOrdenCompra.forEach(element => {
                    if(element.idSolicitud.id == this.lista[0]){
                      Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        title: 'Aún no se ha modificado el registro!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    }
                  });
                })
              }else if(res.idEstado.id == 46){
                const dialogRef = this.dialog.open(SolicitudConformeComponent, {
                  width: '1000px',
                  height: '650px',
                  data: this.lista[0]
                });
              }else if(res.idEstado.id == 60){
                this.requisicion();
              }
            })
          }
        }
      })
    })
  }

  public requisicion(){
    this.servicioOrdenCompra.listarTodos().subscribe(resOrdenCompra=>{
      resOrdenCompra.forEach(element => {
        if(element.idSolicitud.id == this.lista[0]){
          var body = []
          this.servicioOrdenCompra.listarPorId(element.id).subscribe(resOrden=>{
            this.servicioSolicitudDetalle.listarTodos().subscribe(resDetalle=>{
              resDetalle.forEach(element => {
                if(element.idSolicitud.id == resOrden.idSolicitud.id && element.idEstado.id != 59){
                  var now = new Array
                  now.push(element.idArticulos.descripcion)
                  now.push(element.cantidad)
                  now.push(element.valorUnitario)
                  now.push(element.valorTotal)
                  body.push(now)
                }
              });
              console.log(body)
              this.servicioOrdenCompra.listarPorId(element.id).subscribe(async res=>{
                const pdfDefinition: any = {
                  content: [
                    {
                      text: 'Nombre Empresa: Apuestas Nacionales de Colombia',
                      bold: true,
                      margin: [0, 0, 0, 10]
                    },
                    {
                      text: 'Lider de Proceso: '+res.idSolicitud.idUsuario.nombre+' '+res.idSolicitud.idUsuario.apellido,
                      margin: [0, 0, 0, 10]
                    },
                    {
                      text: 'Fecha: '+res.idSolicitud.fecha,
                      margin: [0, 0, 0, 10]
                    },
                    {
                      text: 'Proveedor: '+res.idProveedor.nombre,
                      margin: [0, 0, 0, 10]
                    },
                    {
                      text: 'Orden Compra: '+res.id,
                      relativePosition: {x: 250, y: -25},
                      margin: [0, 0, 0, 20]
                    },
                    {
                      image: await this.getBase64ImageFromURL(
                        'assets/logo/GECCO 2.png'
                      ),
                      relativePosition: {x: 350, y: -120},
                      width: 150
                    },
                    {
                      text: 'Requisición',
                      bold: true,
                      fontSize: 20,
                      alignment: 'center',
                      margin: [0, 0, 0, 20]
                    },{
                      table: {
                        widths: ['*', '*', '*', '*'],
                        body: [
                          [
                            'Articulo',
                            'Cantidad',
                            'Valor Unitario',
                            'Valor Total'
                          ],
                        ]
                      },
                      margin: [0, 0, 0, 0.3]
                    },
                    {
                      table: {
                        widths: ['*', '*', '*', '*'],
                        body: body
                      },
                      margin: [0, 0, 0, 40]
                    },
                    {
                      text: 'SubTotal: '+ res.subtotal +' COP',
                      relativePosition: {x: 350, y: -25},
                      margin: [0, 0, 0, 20],
                    },
                    {
                      text: 'Anticipo: '+ res.anticipoPorcentaje +' %',
                      relativePosition: {x: 350, y: -25},
                      margin: [0, 0, 0, 20],
                    },
                    {
                      text: 'Descuento: '+ res.descuento +' COP',
                      relativePosition: {x: 350, y: -25},
                      margin: [0, 0, 0, 20],
                    },
                    {
                      text: 'Total: '+ res.valorAnticipo +' COP',
                      relativePosition: {x: 350, y: -25},
                      margin: [0, 0, 0, 20],
                    },
                  ]
                }
                const pdf = pdfMake.createPdf(pdfDefinition);
                pdf.open();
              })
            })
          })
        }
      })
    })
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

}
