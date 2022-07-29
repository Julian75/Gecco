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

  constructor(
    private servicioSolicitud: SolicitudService,
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
      if(res.idEstado.id == 28){
        document.getElementById("card1")?.setAttribute("style", "background-color: blue;")
        document.getElementById("card2")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card3")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if (res.idEstado.id == 29) {
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: blue;")
        document.getElementById("card3")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if (res.idEstado.id == 30) {
        document.getElementById("card1")?.setAttribute("style", "background-color: red;")
        document.getElementById("card2")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card3")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if(res.idEstado.id == 36){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: blue;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if(res.idEstado.id == 35){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: red;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if(res.idEstado.id == 34){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: green;")
        document.getElementById("card4")?.setAttribute("style", "background-color: blue;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }else if(res.idEstado.id == 37){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: green;")
        document.getElementById("card4")?.setAttribute("style", "background-color: green;")
        document.getElementById("card5")?.setAttribute("style", "background-color: blue;")
      }else if(res.idEstado.id == 47){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: green;")
        document.getElementById("card4")?.setAttribute("style", "background-color: green;")
        document.getElementById("card5")?.setAttribute("style", "background-color: red;")
      }
      else if(res.idEstado.id == 46){
        document.getElementById("card1")?.setAttribute("style", "background-color: green;")
        document.getElementById("card2")?.setAttribute("style", "background-color: green;")
        document.getElementById("card3")?.setAttribute("style", "background-color: green;")
        document.getElementById("card4")?.setAttribute("style", "background-color: green;")
        document.getElementById("card5")?.setAttribute("style", "background-color: green;")
      }
      else{
        document.getElementById("card1")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card2")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card3")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card4")?.setAttribute("style", "background-color: gray;")
        document.getElementById("card5")?.setAttribute("style", "background-color: gray;")
      }
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
              if(res.idEstado.id == 28){
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
              if(res.idEstado.id == 28){
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
          this.servicioSolicitud.listarPorId(Number(this.lista[0])).subscribe(res => {
            if(res.idEstado.id == 34){
              const dialogRef = this.dialog.open(OrdenCompraComponent, {
                width: '1000px',
                height: '650px',
                data: this.lista[0]
              });
            }
          })
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
              console.log("Debe generar la requisicion")
            }
          })
        }else if(this.habilitar == false){
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
        }
      })
    })
  }
}
