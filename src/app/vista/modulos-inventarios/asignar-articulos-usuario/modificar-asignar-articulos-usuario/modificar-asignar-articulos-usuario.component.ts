import { Component,Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AsignacionProcesoService } from 'src/app/servicios/asignacionProceso.service';
import { DetalleArticuloService } from 'src/app/servicios/detalleArticulo.service';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { AsignacionArticulos } from 'src/app/modelos/asignacionArticulos';
import { AsignacionArticulos2 } from 'src/app/modelos/modelos2/asignacionArticulos2';
import { HistorialService } from 'src/app/servicios/serviciosSiga/historial.service';
import { HistorialArticulos } from 'src/app/modelos/historialArticulos';
import { HistorialArticuloService } from 'src/app/servicios/historialArticulo.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ArticuloService } from 'src/app/servicios/articulo.service';

@Component({
  selector: 'app-modificar-asignar-articulos-usuario',
  templateUrl: './modificar-asignar-articulos-usuario.component.html',
  styleUrls: ['./modificar-asignar-articulos-usuario.component.css']
})
export class ModificarAsignarArticulosUsuarioComponent implements OnInit {
  public formAsignarArticulos!: FormGroup;
  public listarProcesos: any = []
  public listarEstado: any = []
  public listDetalleArticulo: any = []
  public fechaActual: Date = new Date();

  color = ('primary');
  constructor(
    private serviceAsignacionProceso: AsignacionProcesoService,
    private serviceDetalleArticulo: DetalleArticuloService,
    private serviceAsignacionArticulo: AsignacionArticulosService,
    private serviceEstado: EstadoService,
    private servicioModificar: ModificarService,
    private serviceHistorial: HistorialArticuloService,
    private serviceUsuario: UsuarioService,
    public dialogRef: MatDialogRef<ModificarAsignarArticulosUsuarioComponent>,
    private formBuilder: FormBuilder,
    private servicioArticulo: ArticuloService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarAsignacionProceso();
    this.listarDetalleArticulo();
    this.listarTodos();
    this.crearFormulario();
  }

  private crearFormulario(){
    this.formAsignarArticulos = this.formBuilder.group({
      id: [this.data],
      idAsignacionesProcesos: ['', Validators.required],
      idDetalleArticulo: ['', Validators.required],
      idEstado: ['', Validators.required],
    });
  }

  nombreArticulo: any;
  public listarTodos(){
    this.serviceEstado.listarTodos().subscribe(data => {
      this.serviceAsignacionArticulo.listarPorId(Number(this.data)).subscribe(data => {
        this.formAsignarArticulos.get('idEstado')?.setValue(data.idEstado.id);
        this.formAsignarArticulos.get('idAsignacionesProcesos')?.setValue(data.idAsignacionesProcesos.id);
        this.formAsignarArticulos.get('idDetalleArticulo')?.setValue(data.idArticulo.id);
        this.nombreArticulo = data.idArticulo.descripcion
      })
    })
  }
  public listarAsignacionProceso(){
    this.serviceAsignacionProceso.listarTodos().subscribe(data => {
      this.listarProcesos = data;
    })
  }

  public listarDetalleArticulo(){
    this.servicioArticulo.listarTodos().subscribe(data => {
      this.listDetalleArticulo = data;
    })
  }

  listaAsignacionArticulos: any = [];
  primerIdAsignArt: any;
  segundoIdAsignArt: any;
  public guardar() {
    this.listaAsignacionArticulos = []
    let asignacionArticulos = new AsignacionArticulos();
    let asignacionArticulosModificar = new AsignacionArticulos2();
    let asignacionArticulosModificarPrimera = new AsignacionArticulos2();
    let asignacionArticulosModificarSegunda = new AsignacionArticulos2();
    let historial = new HistorialArticulos();
    let historialPrimera = new HistorialArticulos();
    let historialSegunda = new HistorialArticulos();
    if (this.formAsignarArticulos.valid) {
      this.serviceAsignacionArticulo.listarPorId(Number(this.data)).subscribe(resAsignArt=>{
        if(resAsignArt.idAsignacionesProcesos.id == this.formAsignarArticulos.value.idAsignacionesProcesos){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'No hubieron cambios',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close();
          window.location.reload();
        }else{
          this.serviceAsignacionArticulo.listarTodos().subscribe(resAsigArtCompleto=>{
            resAsigArtCompleto.forEach(elementAsignArticulo => {
              if(elementAsignArticulo.idArticulo.id == resAsignArt.idArticulo.id){
                this.listaAsignacionArticulos.push(elementAsignArticulo.id)
              }
            });
            if(this.listaAsignacionArticulos.length == 1){
              //crear automaticamente
              const idAsignProceso = this.formAsignarArticulos.controls['idAsignacionesProcesos'].value;
              this.serviceUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(usuarioLog =>{
                this.serviceEstado.listarPorId(79).subscribe(resEstadoMod=>{
                  for (let index = 0; index < this.listaAsignacionArticulos.length; index++) {
                    const element2 = this.listaAsignacionArticulos[index];
                    this.serviceAsignacionArticulo.listarPorId(element2).subscribe(resAsigArticulo=>{
                      historial.fecha = new Date();
                      asignacionArticulosModificar.id = resAsigArticulo.id
                      asignacionArticulosModificar.idAsignacionesProcesos = resAsigArticulo.idAsignacionesProcesos.id
                      asignacionArticulosModificar.idArticulo = resAsigArticulo.idArticulo.id
                      asignacionArticulosModificar.idEstado = resEstadoMod.id
                      this.serviceAsignacionProceso.listarPorId(idAsignProceso).subscribe(resAsigProcesoReg=>{
                        this.serviceEstado.listarPorId(78).subscribe(resEstadoReg=>{
                          asignacionArticulos.idAsignacionesProcesos = resAsigProcesoReg
                          asignacionArticulos.idArticulo = resAsignArt.idArticulo
                          historial.observacion = "Se reasignó el artículo" + " " + resAsigArticulo.idArticulo.descripcion+ " al usuario"+ " " + resAsigProcesoReg.idUsuario.nombre+ " " +resAsigProcesoReg.idUsuario.apellido+ " del área"+ " " + resAsigProcesoReg.idTiposProcesos.descripcion
                          historial.idArticulo = resAsignArt.idArticulo
                          historial.idUsuario = usuarioLog
                          asignacionArticulos.idEstado = resEstadoReg
                          this.servicioRegistrarModficarAsigAr(asignacionArticulosModificar, asignacionArticulos, historial)
                        })
                      })
                    })
                  }
                })
              })
            }else if(this.listaAsignacionArticulos.length > 1){
              const idAsignProceso = this.formAsignarArticulos.controls['idAsignacionesProcesos'].value;
              for (let index = 0; index < this.listaAsignacionArticulos.length; index++) {
                const element = this.listaAsignacionArticulos[index];
                this.segundoIdAsignArt = this.listaAsignacionArticulos[1];
                this.primerIdAsignArt = this.listaAsignacionArticulos[0];
              }
              this.serviceUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(usuariolog =>{
                this.serviceAsignacionArticulo.listarPorId(this.primerIdAsignArt).subscribe(resAsigArticuloPrimera=>{
                  this.serviceAsignacionArticulo.listarPorId(this.segundoIdAsignArt).subscribe(resAsigArticuloSegunda=>{
                    this.serviceAsignacionProceso.listarPorId(idAsignProceso).subscribe(resNuevaAsigProceso=>{
                      if(resNuevaAsigProceso.idUsuario.id == resAsigArticuloPrimera.idAsignacionesProcesos.idUsuario.id){
                        this.serviceEstado.listarPorId(76).subscribe(resEstadoReg=>{
                          this.serviceEstado.listarPorId(79).subscribe(resEstadoSegunda=>{
                            historialPrimera.fecha = new Date()
                            asignacionArticulosModificarPrimera.id = resAsigArticuloPrimera.id
                            asignacionArticulosModificarPrimera.idAsignacionesProcesos = resAsigArticuloPrimera.idAsignacionesProcesos.id
                            asignacionArticulosModificarPrimera.idArticulo = resAsigArticuloPrimera.idArticulo.id
                            asignacionArticulosModificarPrimera.idEstado = resEstadoReg.id
                            asignacionArticulosModificarSegunda.id = resAsigArticuloSegunda.id
                            asignacionArticulosModificarSegunda.idAsignacionesProcesos = resAsigArticuloSegunda.idAsignacionesProcesos.id
                            asignacionArticulosModificarSegunda.idArticulo = resAsigArticuloSegunda.idArticulo.id
                            asignacionArticulosModificarSegunda.idEstado = resEstadoSegunda.id
                            historialPrimera.idArticulo = resAsigArticuloPrimera.idArticulo
                            historialPrimera.observacion = "Se reasignó el artículo"+ " " +resAsigArticuloSegunda.idArticulo.descripcion+ " de"+ " " + resAsigArticuloSegunda.idAsignacionesProcesos.idUsuario.nombre + " " + resAsigArticuloSegunda.idAsignacionesProcesos.idUsuario.apellido + " " + " del área" + " " + resAsigArticuloSegunda.idAsignacionesProcesos.idTiposProcesos.descripcion + " al usuario" + " " + resAsigArticuloPrimera.idAsignacionesProcesos.idUsuario.nombre + " " + resAsigArticuloPrimera.idAsignacionesProcesos.idUsuario.apellido + " del área" + " " +  resAsigArticuloPrimera.idAsignacionesProcesos.idTiposProcesos.descripcion
                            historialPrimera.idUsuario = usuariolog
                            this.servicioModificarAsigArtPrimeraSegunda(asignacionArticulosModificarPrimera, asignacionArticulosModificarSegunda , historialPrimera)
                          })

                        })
                      }else if(resNuevaAsigProceso.idUsuario.id == resAsigArticuloSegunda.idAsignacionesProcesos.idUsuario.id){
                        this.serviceEstado.listarPorId(79).subscribe(resEstadoRegCompras=>{
                          this.serviceEstado.listarPorId(78).subscribe(resEstadoRegMod=>{
                            asignacionArticulosModificarPrimera.id = resAsigArticuloPrimera.id
                            asignacionArticulosModificarPrimera.idAsignacionesProcesos = resAsigArticuloPrimera.idAsignacionesProcesos.id
                            asignacionArticulosModificarPrimera.idArticulo = resAsigArticuloPrimera.idArticulo.id
                            asignacionArticulosModificarPrimera.idEstado = resEstadoRegCompras.id
                            asignacionArticulosModificarSegunda.id = resAsigArticuloSegunda.id
                            asignacionArticulosModificarSegunda.idAsignacionesProcesos = resAsigArticuloSegunda.idAsignacionesProcesos.id
                            asignacionArticulosModificarSegunda.idArticulo = resAsigArticuloSegunda.idArticulo.id
                            historialSegunda.fecha = this.fechaActual
                            historialSegunda.idArticulo = resAsigArticuloSegunda.idArticulo
                            historialSegunda.observacion = "Se reasignó el artículo"+ " " +resAsigArticuloPrimera.idArticulo.descripcion+ " de"+ " " + resAsigArticuloPrimera.idAsignacionesProcesos.idUsuario.nombre + " " + resAsigArticuloPrimera.idAsignacionesProcesos.idUsuario.apellido + " " + " del área" + " " + resAsigArticuloPrimera.idAsignacionesProcesos.idTiposProcesos.descripcion + " al usuario" + " " + resAsigArticuloSegunda.idAsignacionesProcesos.idUsuario.nombre + " " + resAsigArticuloSegunda.idAsignacionesProcesos.idUsuario.apellido + " del área" + " " +  resAsigArticuloSegunda.idAsignacionesProcesos.idTiposProcesos.descripcion
                            historialSegunda.idUsuario = usuariolog
                            console.log(historialSegunda)
                            asignacionArticulosModificarSegunda.idEstado = resEstadoRegMod.id
                            console.log(asignacionArticulosModificarPrimera, asignacionArticulosModificarSegunda)
                            this.servicioModificarAsigArtPrimeraSegunda(asignacionArticulosModificarPrimera, asignacionArticulosModificarSegunda, historialSegunda)
                          })
                        })
                      }else{
                        this.serviceAsignacionProceso.listarPorId(idAsignProceso).subscribe(resNuevaAsigProceso=>{
                          this.serviceEstado.listarPorId(78).subscribe(resEstadoReg=>{
                            this.serviceEstado.listarPorId(79).subscribe(resEstadoPrimera=>{
                              historial.fecha = new Date()
                              asignacionArticulosModificarPrimera.id = resAsigArticuloPrimera.id
                              asignacionArticulosModificarPrimera.idAsignacionesProcesos = resAsigArticuloPrimera.idAsignacionesProcesos.id
                              asignacionArticulosModificarPrimera.idArticulo = resAsigArticuloPrimera.idArticulo.id
                              asignacionArticulosModificarPrimera.idEstado = resEstadoPrimera.id
                              asignacionArticulosModificar.id = resAsigArticuloSegunda.id
                              asignacionArticulosModificar.idAsignacionesProcesos = resNuevaAsigProceso.id
                              asignacionArticulosModificar.idArticulo = resAsigArticuloSegunda.idArticulo.id
                              historial.observacion = "Se reasignó el artículo" + " " + resAsigArticuloSegunda.idArticulo.descripcion + " del usuario" + " " + resAsigArticuloSegunda.idAsignacionesProcesos.idUsuario.nombre + " " +  resAsigArticuloSegunda.idAsignacionesProcesos.idUsuario.apellido + " del área" + " " + resAsigArticuloSegunda.idAsignacionesProcesos.idTiposProcesos.descripcion + " al usuario" + " "+ resNuevaAsigProceso.idUsuario.nombre + " "  +resNuevaAsigProceso.idUsuario.apellido + " del área" + " " + resNuevaAsigProceso.idTiposProcesos.descripcion
                              historial.idArticulo = resAsigArticuloSegunda.idArticulo
                              historial.idUsuario = usuariolog
                              asignacionArticulosModificar.idEstado = resEstadoReg.id
                              this.servicioModificarAsigArtPrimeraSegunda(asignacionArticulosModificarPrimera, asignacionArticulosModificar, historial)
                            })
                          })
                        })
                      }
                    })
                  })
                })
              })

            }else{
              Swal.fire({
                icon: 'error',
                title: 'No encontrado',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos vacios',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public servicioRegistrarModficarAsigAr(asignacionArticuloMod: AsignacionArticulos2, asignacionArticuloReg: AsignacionArticulos, historial: HistorialArticulos){
    this.servicioModificar.actualizarAsignacionArticulos(asignacionArticuloMod).subscribe(resAsignActualizada=>{
      this.serviceAsignacionArticulo.registrar(asignacionArticuloReg).subscribe(resAsigArtNuevo=>{
        this.serviceHistorial.registrar(historial).subscribe(resHistorialNuevo =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ha sido reasignado el articulo!',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload()
        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrio un error al registrar el resHistorialNuevo!',
            showConfirmButton: false,
            timer: 1500
          })
        })
      })
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocurrio un error al actualizar la asignación articulo!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  public servicioModificarAsigArtPrimeraSegunda(asignacionArticuloModPrimera: AsignacionArticulos2, asignacionArticuloModSegunda: AsignacionArticulos2, historialPrimera: HistorialArticulos){
    this.servicioModificar.actualizarAsignacionArticulos(asignacionArticuloModPrimera).subscribe(resAsignActualizadaPrimera=>{
      this.servicioModificar.actualizarAsignacionArticulos(asignacionArticuloModSegunda).subscribe(resAsignActualizadaSegunda=>{
        this.serviceHistorial.registrar(historialPrimera).subscribe( historialprimera=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ha sido reasignado el articulo!',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload()
        },  error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrio un error registrar el historialprimera!',
            showConfirmButton: false,
            timer: 1500
          })
        })
      }, error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un error al actualizar la resAsignActualizadaSegunda!',
          showConfirmButton: false,
          timer: 1500
        })
      });
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocurrio un error al actualizar la asignación primera!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

}
