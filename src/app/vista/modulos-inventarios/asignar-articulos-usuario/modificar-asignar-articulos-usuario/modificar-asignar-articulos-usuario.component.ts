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
        this.formAsignarArticulos.get('idDetalleArticulo')?.setValue(data.idDetalleArticulo.id);
        this.nombreArticulo = data.idDetalleArticulo.idArticulo.descripcion
      })
    })
  }
  public listarAsignacionProceso(){
    this.serviceAsignacionProceso.listarTodos().subscribe(data => {
      this.listarProcesos = data;
    })
  }

  public listarDetalleArticulo(){
    this.serviceDetalleArticulo.listarTodos().subscribe(data => {
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
              if(elementAsignArticulo.idDetalleArticulo.idArticulo.id == resAsignArt.idDetalleArticulo.idArticulo.id){
                this.listaAsignacionArticulos.push(elementAsignArticulo.id)
              }
            });
            if(this.listaAsignacionArticulos.length == 1){
              //crear automaticamente
              const idAsignProceso = this.formAsignarArticulos.controls['idAsignacionesProcesos'].value;
              this.serviceEstado.listarPorId(79).subscribe(resEstadoMod=>{
                for (let index = 0; index < this.listaAsignacionArticulos.length; index++) {
                  const element2 = this.listaAsignacionArticulos[index];
                  this.serviceAsignacionArticulo.listarPorId(element2).subscribe(resAsigArticulo=>{
                    asignacionArticulosModificar.id = resAsigArticulo.id
                    asignacionArticulosModificar.idAsignacionesProcesos = resAsigArticulo.idAsignacionesProcesos.id
                    asignacionArticulosModificar.idDetalleArticulo = resAsigArticulo.idDetalleArticulo.id
                    asignacionArticulosModificar.idEstado = resEstadoMod.id
                    this.serviceAsignacionProceso.listarPorId(idAsignProceso).subscribe(resAsigProcesoReg=>{
                      this.serviceEstado.listarPorId(78).subscribe(resEstadoReg=>{
                        asignacionArticulos.idAsignacionesProcesos = resAsigProcesoReg
                        asignacionArticulos.idDetalleArticulo = resAsignArt.idDetalleArticulo
                        asignacionArticulos.idEstado = resEstadoReg
                        this.servicioRegistrarModficarAsigAr(asignacionArticulosModificar, asignacionArticulos)
                      })
                    })
                  })
                }
              })
            }else if(this.listaAsignacionArticulos.length > 1){
              const idAsignProceso = this.formAsignarArticulos.controls['idAsignacionesProcesos'].value;
              for (let index = 0; index < this.listaAsignacionArticulos.length; index++) {
                const element = this.listaAsignacionArticulos[index];
                this.segundoIdAsignArt = this.listaAsignacionArticulos[1];
                this.primerIdAsignArt = this.listaAsignacionArticulos[0];
              }
              this.serviceAsignacionArticulo.listarPorId(this.primerIdAsignArt).subscribe(resAsigArticuloPrimera=>{
                this.serviceAsignacionArticulo.listarPorId(this.segundoIdAsignArt).subscribe(resAsigArticuloSegunda=>{
                  this.serviceAsignacionProceso.listarPorId(idAsignProceso).subscribe(resNuevaAsigProceso=>{
                    console.log(this.data, resAsigArticuloPrimera)
                    if(resNuevaAsigProceso.idUsuario.id == resAsigArticuloPrimera.idAsignacionesProcesos.idUsuario.id){
                      this.serviceEstado.listarPorId(78).subscribe(resEstadoReg=>{
                        asignacionArticulosModificarPrimera.id = resAsigArticuloPrimera.id
                        asignacionArticulosModificarPrimera.idAsignacionesProcesos = resAsigArticuloPrimera.idAsignacionesProcesos.id
                        asignacionArticulosModificarPrimera.idDetalleArticulo = resAsigArticuloPrimera.idDetalleArticulo.id
                        asignacionArticulosModificarPrimera.idEstado = resEstadoReg.id
                        asignacionArticulosModificarSegunda.id = resAsigArticuloSegunda.id
                        asignacionArticulosModificarSegunda.idAsignacionesProcesos = resAsigArticuloSegunda.idAsignacionesProcesos.id
                        asignacionArticulosModificarSegunda.idDetalleArticulo = resAsigArticuloSegunda.idDetalleArticulo.id
                        asignacionArticulosModificarSegunda.idEstado = 79
                        console.log(asignacionArticulosModificarPrimera, asignacionArticulosModificarSegunda)
                        this.servicioModificarAsigArtPrimeraSegunda(asignacionArticulosModificarPrimera, asignacionArticulosModificarSegunda)
                      })
                    }else if(resNuevaAsigProceso.idUsuario.id == resAsigArticuloSegunda.idAsignacionesProcesos.idUsuario.id){
                      this.serviceEstado.listarPorId(79).subscribe(resEstadoReg=>{
                        asignacionArticulosModificarPrimera.id = resAsigArticuloPrimera.id
                        asignacionArticulosModificarPrimera.idAsignacionesProcesos = resAsigArticuloPrimera.idAsignacionesProcesos.id
                        asignacionArticulosModificarPrimera.idDetalleArticulo = resAsigArticuloPrimera.idDetalleArticulo.id
                        asignacionArticulosModificarPrimera.idEstado = resEstadoReg.id
                        asignacionArticulosModificarSegunda.id = resAsigArticuloSegunda.id
                        asignacionArticulosModificarSegunda.idAsignacionesProcesos = resAsigArticuloSegunda.idAsignacionesProcesos.id
                        asignacionArticulosModificarSegunda.idDetalleArticulo = resAsigArticuloSegunda.idDetalleArticulo.id
                        asignacionArticulosModificarSegunda.idEstado = 78
                        console.log(asignacionArticulosModificarPrimera, asignacionArticulosModificarSegunda)
                        this.servicioModificarAsigArtPrimeraSegunda(asignacionArticulosModificarPrimera, asignacionArticulosModificarSegunda)
                      })
                    }else{
                      this.serviceAsignacionProceso.listarPorId(idAsignProceso).subscribe(resNuevaAsigProceso=>{
                        this.serviceEstado.listarPorId(78).subscribe(resEstadoReg=>{
                          asignacionArticulosModificar.id = resAsigArticuloSegunda.id
                          asignacionArticulosModificar.idAsignacionesProcesos = resNuevaAsigProceso.id
                          asignacionArticulosModificar.idDetalleArticulo = resAsigArticuloSegunda.idDetalleArticulo.id
                          asignacionArticulosModificar.idEstado = resEstadoReg.id
                          this.servicioModificarAsigArt(asignacionArticulosModificar)
                        })
                      })
                    }
                  })
                })
              })

            }else{
              Swal.fire({
                icon: 'error',
                title: 'Poque shi :3',
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

  public servicioRegistrarModficarAsigAr(asignacionArticuloMod: AsignacionArticulos2, asignacionArticuloReg: AsignacionArticulos){
    this.servicioModificar.actualizarAsignacionArticulos(asignacionArticuloMod).subscribe(resAsignActualizada=>{
      this.serviceAsignacionArticulo.registrar(asignacionArticuloReg).subscribe(resAsigArtNuevo=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Ha sido reasignado el articulo!',
          showConfirmButton: false,
          timer: 1500
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

  public servicioModificarAsigArt(asignacionArticuloMod: AsignacionArticulos2){
    this.servicioModificar.actualizarAsignacionArticulos(asignacionArticuloMod).subscribe(resAsignActualizada=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Ha sido reasignado el articulo!',
        showConfirmButton: false,
        timer: 1500
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

  public servicioModificarAsigArtPrimeraSegunda(asignacionArticuloModPrimera: AsignacionArticulos2, asignacionArticuloModSegunda: AsignacionArticulos2){
    this.servicioModificar.actualizarAsignacionArticulos(asignacionArticuloModPrimera).subscribe(resAsignActualizadaPrimera=>{
      this.servicioModificar.actualizarAsignacionArticulos(asignacionArticuloModSegunda).subscribe(resAsignActualizadaSegunda=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Ha sido reasignado el articulo!',
          showConfirmButton: false,
          timer: 1500
        })
      }, error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un error al actualizar la asignación segunda!',
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


  public registrar(asignacionArticulos1: AsignacionArticulos2){
  }
}
