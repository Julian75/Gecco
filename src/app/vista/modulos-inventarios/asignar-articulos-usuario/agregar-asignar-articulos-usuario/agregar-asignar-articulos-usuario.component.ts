import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AsignacionProcesoService } from 'src/app/servicios/asignacionProceso.service';
import { DetalleArticuloService } from 'src/app/servicios/detalleArticulo.service';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-agregar-asignar-articulos-usuario',
  templateUrl: './agregar-asignar-articulos-usuario.component.html',
  styleUrls: ['./agregar-asignar-articulos-usuario.component.css']
})
export class AgregarAsignarArticulosUsuarioComponent implements OnInit {
  public formAsignarArticulos!: FormGroup;
  public listarProcesos: any = []
  public listarEstado: any = []
  public listDetalleArticulo: any = []
  public listaEstado: any = []
  public validar: any = []
  color = ('primary');
  constructor(
    private serviceAsignacionProceso: AsignacionProcesoService,
    private serviceDetalleArticulo: DetalleArticuloService,
    private serviceAsignacionArticulo: AsignacionArticulosService,
    private serviceEstado: EstadoService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.listarAsignacionProceso();
    this.listarDetalleArticulo();
    this.listarEstados();
    this.crearFormulario();
  }

  private crearFormulario(){
    this.formAsignarArticulos = this.formBuilder.group({
      idAsignacionesProcesos: ['', Validators.required],
      idDetalleArticulo: ['', Validators.required],
      idEstado: ['', Validators.required],
    });
  }

  public listarEstados(){
    this.serviceEstado.listarTodos().subscribe(data => {
      data.forEach((element: any) => {
        if (element.id == 78) {
          this.listaEstado.push(element);
        }
      })
      this.serviceEstado.listarPorId(this.listaEstado[0].id).subscribe(data => {
        this.formAsignarArticulos.get('idEstado')?.setValue(data.id);
        document.getElementById('estado')?.setAttribute('disabled', 'disabled');
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

  iguales: boolean = false;
  public guardar(){
    this.validar = [];
    if (this.formAsignarArticulos.valid) {
      this.serviceAsignacionProceso.listarPorId(Number(this.formAsignarArticulos.value.idAsignacionesProcesos)).subscribe(data => {
        this.formAsignarArticulos.value.idAsignacionesProcesos = data;
        this.serviceDetalleArticulo.listarPorId(Number(this.formAsignarArticulos.value.idDetalleArticulo)).subscribe(data => {
          this.formAsignarArticulos.value.idDetalleArticulo = data;
          this.serviceEstado.listarPorId(78).subscribe(data => {
            this.formAsignarArticulos.value.idEstado = data;
            this.serviceAsignacionArticulo.listarTodos().subscribe(data => {
              console.log(this.formAsignarArticulos.value);
              data.forEach((element: any) => {
                if (element.idAsignacionesProcesos.id == this.formAsignarArticulos.value.idAsignacionesProcesos.id && element.idDetalleArticulo.id == this.formAsignarArticulos.value.idDetalleArticulo.id) {
                  this.iguales = true;
                }else{
                  this.iguales = false;
                }
                this.validar.push(this.iguales);
              });
              const validar = this.validar.find((element: any) => element == true);
              if (validar == true) {
                Swal.fire({
                  icon: 'error',
                  text: 'El articulo ya fue asignado a este proceso',
                  showConfirmButton: false,
                  timer: 1500
                })
              }else{
                this.serviceAsignacionArticulo.registrar(this.formAsignarArticulos.value).subscribe(data => {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Articulo asignado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  window.location.reload();
                })
              }
            })
          })
        })
      })
    }
  }
}
