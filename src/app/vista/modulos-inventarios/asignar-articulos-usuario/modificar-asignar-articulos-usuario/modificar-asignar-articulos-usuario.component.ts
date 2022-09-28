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
  public listaEstado: any = []
  public validar: any = []
  public validar2: any = []
  public articulos: any = []
  public articulos2: any = []
  public ultimoArticulo: any = []
  public objetos: any = []
  public encontrado: any = []
  public valida = false;
  public noValido: boolean = false;
  color = ('primary');
  constructor(
    private serviceAsignacionProceso: AsignacionProcesoService,
    private serviceDetalleArticulo: DetalleArticuloService,
    private serviceAsignacionArticulo: AsignacionArticulosService,
    private serviceEstado: EstadoService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarAsignarArticulosUsuarioComponent>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarAsignacionProceso();
    this.listarDetalleArticulo();
    this.listarEstados();
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

  public listarEstados(){
    this.serviceEstado.listarTodos().subscribe(data => {
      data.forEach((element: any) => {
        if (element.id == 76 || element.id == 78 || element.id == 79) {
          this.listaEstado.push(element);
        }
      })
      this.serviceAsignacionArticulo.listarPorId(Number(this.data)).subscribe(data => {
        this.formAsignarArticulos.get('idEstado')?.setValue(data.idEstado.id);
        this.formAsignarArticulos.get('idAsignacionesProcesos')?.setValue(data.idAsignacionesProcesos.id);
        this.formAsignarArticulos.get('idDetalleArticulo')?.setValue(data.idDetalleArticulo.id);
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


  public guardar() {
    this.validar2 = [];
    this.validar = [];
    this.objetos = [];
    this.articulos2 = [];
    let asignacionArticulos = new AsignacionArticulos();
    let asignacionArticulos1 = new AsignacionArticulos2();
    if (this.formAsignarArticulos.valid) {
      this.validar = [];
      this.serviceAsignacionArticulo.listarTodos().subscribe(data => {
        data.forEach((element: any) => {
          if (element.idAsignacionesProcesos.id == this.formAsignarArticulos.value.idAsignacionesProcesos && element.idDetalleArticulo.id == this.formAsignarArticulos.value.idDetalleArticulo && element.idEstado.id == this.formAsignarArticulos.value.idEstado) {
            this.valida = true
            this.articulos.push(element);
          }
          this.validar.push(this.valida)
          this.articulos2.push(element)
        })
        const validar = this.validar.find((element: any) => element == true)
        if (validar == true) {
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
          this.serviceAsignacionArticulo.listarTodos().subscribe(data => {
            this.serviceAsignacionArticulo.listarPorId(Number(this.data)).subscribe(art => {
              for (let i = 0; i < data.length; i++) {
                console.log(this.formAsignarArticulos.value.idAsignacionesProcesos)
                console.log(data[i].idAsignacionesProcesos.id)
                if (data[i].idAsignacionesProcesos.id == this.formAsignarArticulos.value.idAsignacionesProcesos ) {
                  this.noValido = true;
                  this.objetos.push(data[i]);
                }else{
                  this.noValido = false;
                }
                this.validar2.push(this.noValido)
              }
              const validar2 = this.validar2.find((element: any) => element == true)

              if (validar2 == true) {
                console.log("Entró");
                asignacionArticulos1.id = this.objetos[0].id;
                this.serviceAsignacionProceso.listarPorId(this.objetos[0].idAsignacionesProcesos.id).subscribe(data => {
                  asignacionArticulos1.idAsignacionesProcesos = data.id;
                  this.serviceDetalleArticulo.listarPorId(this.formAsignarArticulos.value.idDetalleArticulo).subscribe(data => {
                    asignacionArticulos1.idDetalleArticulo = data.id;
                    if(this.objetos[0].idAsignacionesProcesos.idUsuario.id == sessionStorage.getItem('id')){
                      this.serviceEstado.listarPorId(this.formAsignarArticulos.value.idEstado).subscribe(data => {
                        asignacionArticulos1.idEstado = data.id;
                        this.servicioModificar.actualizarAsignacionArticulos(asignacionArticulos1).subscribe(data => {
                          Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se modificó correctamente',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          this.dialogRef.close();
                          window.location.reload();
                        })
                      })
                    }else{
                      this.serviceEstado.listarPorId(this.formAsignarArticulos.value.idEstado).subscribe(data => {
                        asignacionArticulos1.idEstado = data.id;
                        this.servicioModificar.actualizarAsignacionArticulos(asignacionArticulos1).subscribe(data => {
                          Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Se modificó correctamente',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          this.dialogRef.close();
                          window.location.reload();
                        })
                      })
                    }
                  })
                })
              }else{
                console.log("No entró");
                this.serviceAsignacionArticulo.listarPorId(Number(this.data)).subscribe(data => {
                  console.log(data);
                  asignacionArticulos1.id = data.id;
                  asignacionArticulos1.idAsignacionesProcesos = data.idAsignacionesProcesos.id;
                  asignacionArticulos1.idDetalleArticulo = data.idDetalleArticulo.id;
                  asignacionArticulos1.idEstado = 79;
                  this.servicioModificar.actualizarAsignacionArticulos(asignacionArticulos1).subscribe(data => {
                    asignacionArticulos.id = 0;
                    this.serviceAsignacionProceso.listarPorId(this.formAsignarArticulos.value.idAsignacionesProcesos).subscribe(data1 => {
                      asignacionArticulos.idAsignacionesProcesos = data1;
                      this.serviceDetalleArticulo.listarPorId(this.formAsignarArticulos.value.idDetalleArticulo).subscribe(data2 => {
                        asignacionArticulos.idDetalleArticulo = data2;
                        this.serviceEstado.listarPorId(this.formAsignarArticulos.value.idEstado).subscribe(data3 => {
                          asignacionArticulos.idEstado = data3;
                          console.log(asignacionArticulos);
                          console.log(this.formAsignarArticulos.value);
                          this.serviceAsignacionArticulo.registrar(asignacionArticulos).subscribe(data => {
                            Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: 'Se modificó correctamente',
                              showConfirmButton: false,
                              timer: 1500
                            })
                            this.dialogRef.close();
                            window.location.reload();
                          })
                        })
                      })
                    })
                  })
                })
              }
            })
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

  public registrar(asignacionArticulos1: AsignacionArticulos2){
  }
}
