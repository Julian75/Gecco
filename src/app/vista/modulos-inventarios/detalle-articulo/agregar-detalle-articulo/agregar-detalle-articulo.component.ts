import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetalleArticuloService } from './../../../../servicios/detalleArticulo.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleArticulo } from './../../../../modelos/detalleArticulo';
import { EstadoService } from './../../../../servicios/estado.service';
import { ArticuloService } from './../../../../servicios/articulo.service';
import { Component, OnInit } from '@angular/core';
import { TipoActivoService } from 'src/app/servicios/tipoActivo.service';

@Component({
  selector: 'app-agregar-detalle-articulo',
  templateUrl: './agregar-detalle-articulo.component.html',
  styleUrls: ['./agregar-detalle-articulo.component.css']
})
export class AgregarDetalleArticuloComponent implements OnInit {
  public formDetalleArticulo!: FormGroup;
  public listarArticulos: any = [];
  public listJerarquia: any = [];
  public listaJerarquia: any = [];
  public articulosDisponibles:any = [];
  public encontrado : boolean = false;
  public encontrados: any = [];
  public listaEstados: any = [];
  public listaTipoActivos: any = [];
  public estadosDisponibles:any = [];
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioDetalleArticulo: DetalleArticuloService,
    private servicioArticulo: ArticuloService,
    private servicioTipoActivos: TipoActivoService,
    private servicioEstado: EstadoService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarArticulo();
    this.listarEstados();
    this.listarTipoActivos();
  }

  private crearFormulario() {
    this.formDetalleArticulo = this.fb.group({
      id: 0,
      articulo: [null,Validators.required],
      serial: [null,Validators.required],
      placa: [null,Validators.required],
      marca: [null,Validators.required],
      estado: [null,Validators.required],
      tipoActivo: [null,Validators.required]

    });
  }

  public listarArticulo() {
    this.servicioArticulo.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idEstado.id == 26){
          this.articulosDisponibles.push(element)
        }
      });
      this.listarArticulos = this.articulosDisponibles
    });
  }

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      res.forEach(element => {
        if(element.idModulo.id == 53){
          this.estadosDisponibles.push(element)
        }
      });
      this.listaEstados = this.estadosDisponibles
    });
  }

  public listarTipoActivos() {
    this.servicioTipoActivos.listarTodos().subscribe(res => {
      this.listaTipoActivos = res
    });
  }

  public guardar() {
    // this.encontrados = [];
    // let rol : Rol = new Rol();
    // const idEstado = this.formRol.controls['estado'].value;
    // const idJerarquia = this.formRol.controls['jerarquia'].value;
    // console.log(this.formRol.value.estado);
    // if(this.formRol.valid){
    //   rol.descripcion=this.formRol.controls['descripcion'].value;
    //   this.servicioEstado.listarPorId(idEstado).subscribe(res => {
    //     this.listarEstado = res;
    //     rol.idEstado= this.listarEstado
    //     this.servicioJerarquia.listarPorId(idJerarquia).subscribe(resjerar => {
    //       this.listaJerarquia = resjerar;
    //       rol.idJerarquia= this.listaJerarquia
    //       this.servicioRol.listarTodos().subscribe(resrol => {
    //         resrol.forEach(element => {
    //           if(this.formRol.value.descripcion.toLowerCase() == element.descripcion.toLowerCase()){
    //             this.encontrado = true;
    //           }else{
    //             this.encontrado = false;
    //           }
    //           this.encontrados.push(this.encontrado);
    //         })
    //         const encontrado = this.encontrados.includes(true);
    //         if(encontrado == true){
    //           Swal.fire({
    //             position: 'center',
    //             icon: 'error',
    //             title: 'El rol ya existe!',
    //             showConfirmButton: false,
    //             timer: 1500
    //           })
    //         }else{
    //           this.registrarRol(rol);
    //         }
    //       })
    //     })
    //   })
    // }else{
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'El campo está vacio!',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    // }

  }

  public registrarRol(detalleArticulo: DetalleArticulo) {
    // this.servicioRol.registrar(rol).subscribe(res=>{
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'success',
    //     title: 'Rol Registrado!',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    //   this.dialogRef.close();
    //   window.location.reload();

    // }, error => {
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'Hubo un error al agregar!',
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    // });
  }
}
