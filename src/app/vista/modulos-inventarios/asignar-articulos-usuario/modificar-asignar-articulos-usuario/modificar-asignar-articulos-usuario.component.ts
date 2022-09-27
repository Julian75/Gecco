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
  public articulos: any = []
  public ultimoArticulo: any = []
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

  valida: boolean = false;
  public guardar() {
    this.validar = [];
    if (this.formAsignarArticulos.valid) {
      this.serviceAsignacionArticulo.listarTodos().subscribe(data => {
        data.forEach((element: any) => {
          if (element.idAsignacionesProcesos.id == this.formAsignarArticulos.value.idAsignacionesProcesos && element.idDetalleArticulo.id == this.formAsignarArticulos.value.idDetalleArticulo && element.idEstado.id == this.formAsignarArticulos.value.idEstado) {
            this.valida = true
          }else{
            this.valida = false
          }
          this.validar.push(this.valida)
        })
        const validar = this.validar.filter((element: any) => element == true)
        if (validar.length == 0) {
          this.serviceAsignacionArticulo.listarPorId(Number(this.data)).subscribe(data => {
            if(data.idAsignacionesProcesos.idUsuario.documento == Number(sessionStorage.getItem('usuario'))){
              this.serviceAsignacionProceso.listarPorId(this.formAsignarArticulos.value.idAsignacionesProcesos).subscribe(data1 => {
                this.formAsignarArticulos.value.idAsignacionesProcesos = data1.id;
                this.serviceDetalleArticulo.listarPorId(this.formAsignarArticulos.value.idDetalleArticulo).subscribe(data2 => {
                  this.formAsignarArticulos.value.idDetalleArticulo = data2.id;
                  this.serviceEstado.listarPorId(this.formAsignarArticulos.value.idEstado).subscribe(data3 => {
                    this.formAsignarArticulos.value.idEstado = data3.id;
                    this.servicioModificar.actualizarAsignacionArticulos(this.formAsignarArticulos.value).subscribe(data => {
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha modificado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this.dialogRef.close();
                      window.location.reload();
                      this.formAsignarArticulos.reset();
                    })
                  })
                })
              })
            }else if(data.idAsignacionesProcesos.idUsuario.documento != Number(sessionStorage.getItem('usuario'))){
              this.serviceAsignacionProceso.listarPorId(this.formAsignarArticulos.value.idAsignacionesProcesos).subscribe(data1 => {
                this.formAsignarArticulos.value.idAsignacionesProcesos = data1;
                this.serviceDetalleArticulo.listarPorId(this.formAsignarArticulos.value.idDetalleArticulo).subscribe(data2 => {
                  this.formAsignarArticulos.value.idDetalleArticulo = data2;
                  this.serviceEstado.listarPorId(this.formAsignarArticulos.value.idEstado).subscribe(data3 => {
                    this.formAsignarArticulos.value.idEstado = data3;
                    this.serviceAsignacionArticulo.registrar(this.formAsignarArticulos.value).subscribe(data => {
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha modificado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      // this.dialogRef.close();
                      // window.location.reload();
                      this.formAsignarArticulos.reset();
                      this.registrar();
                    })
                  })
                })
              })
            }
          })
        }else{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'No hubieron cambios',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close();
          window.location.reload();
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

  public registrar (){
    this.articulos = [];
    this.ultimoArticulo = [];
    let asignacionArticulos = new AsignacionArticulos();
    let asignacionArticulos1 = new AsignacionArticulos2();
    this.serviceAsignacionArticulo.listarPorId(Number(this.data)).subscribe(articulo => {
      var obj = {
        id: articulo.id,
        idAsignacionesProcesos: articulo.idAsignacionesProcesos,
        idDetalleArticulo: articulo.idDetalleArticulo,
        idEstado: articulo.idEstado,
      }
        this.serviceAsignacionArticulo.listarTodos().subscribe(arti => {
          arti.forEach((element: any) => {
            if (element.idAsignacionesProcesos.id == obj.idAsignacionesProcesos.id && element.idDetalleArticulo.id == obj.idDetalleArticulo.id ) {
              this.articulos.push(element)
            }
          })
          console.log(this.articulos);
          if (this.articulos.length == 1) {
            console.log('nuevo');
            asignacionArticulos.id = 0;
            asignacionArticulos.idAsignacionesProcesos = obj.idAsignacionesProcesos;
            asignacionArticulos.idDetalleArticulo = obj.idDetalleArticulo;
            this.serviceEstado.listarPorId(obj.idEstado.id).subscribe(est => {
              asignacionArticulos.idEstado = est;
              this.serviceAsignacionArticulo.registrar(asignacionArticulos).subscribe(data => {
                // this.dialogRef.close();
                // window.location.reload();
              })
            })
          }else{
            console.log("existe");
            let result = this.articulos.filter((element: any, index: any) => {
              if(index === this.articulos.findLastIndex((e: any) => e.idDetalleArticulo.id === element.idDetalleArticulo.id)){
                this.ultimoArticulo.push(element)
              }
            })
            console.log(this.ultimoArticulo);
            // this.ultimoArticulo.forEach((element: any) => {
            //   asignacionArticulos.id = 0;
            //   asignacionArticulos.idAsignacionesProcesos = obj.idAsignacionesProcesos;
            //   asignacionArticulos.idDetalleArticulo = obj.idDetalleArticulo;
            //   this.serviceEstado.listarPorId(this.formAsignarArticulos.value.idEstado).subscribe(est => {
            //     asignacionArticulos.idEstado = est;
            //     this.serviceAsignacionArticulo.registrar(asignacionArticulos).subscribe(data => {
            //       this.dialogRef.close();
            //       window.location.reload();
            //     })
            //   })
            // })
          }
        })
      })
  }
}
