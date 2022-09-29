import { EstadoService } from './../../../../servicios/estado.service';
import { UsuarioService } from './../../../../servicios/usuario.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { AsignacionArticulosService } from 'src/app/servicios/asignacionArticulo.service';
import { SolicitudBajasArticulosService } from 'src/app/servicios/solicitudBajasArticulos.service';
import { SolicitudBajasArticulos } from 'src/app/modelos/solicitudBajasArticulos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-solicitud-baja-articulo',
  templateUrl: './agregar-solicitud-baja-articulo.component.html',
  styleUrls: ['./agregar-solicitud-baja-articulo.component.css']
})
export class AgregarSolicitudBajaArticuloComponent implements OnInit {

  public formSolicitudBajaArticulo!: FormGroup;
  public idSolicitudAsignArticulo:any;
  color = ('primary');
  public fechaActual:Date = new Date();

  constructor(
    private fb: FormBuilder,
    public servicioUsuario: UsuarioService,
    public servicioAsignacionArticulo: AsignacionArticulosService,
    public servicioEstado: EstadoService,
    public servicioSolicitudBajasArticulos: SolicitudBajasArticulosService,
    public dialogRef: MatDialogRef<AgregarSolicitudBajaArticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario()
  }

  private crearFormulario(){
    this.formSolicitudBajaArticulo = this.fb.group({
      id:0,
      observacion: ['', Validators.required],
    });
  }

  validar: boolean = false;
  listaExiste:any = [];
  idSolicitudBaja: any;
  public guardar(){
    this.validar = false
    this.listaExiste = []
    const observacion = this.formSolicitudBajaArticulo.controls['observacion'].value;
    if(observacion == "" || observacion == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Escriba la razón del porque desea dar de baja este articulo!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      this.idSolicitudAsignArticulo = this.data
      this.servicioAsignacionArticulo.listarPorId(this.idSolicitudAsignArticulo).subscribe(resAsignArticulo=>{
        this.servicioSolicitudBajasArticulos.listarTodos().subscribe(resSolicitudesBajas=>{
          resSolicitudesBajas.forEach(elementSolicitudBaja => {
            if(elementSolicitudBaja.idDetalleArticulo.id == resAsignArticulo.idDetalleArticulo.id){
              this.validar = true
              this.idSolicitudBaja = elementSolicitudBaja.id
            }else{
              this.validar = false
            }
            this.listaExiste.push(this.validar)
          });
          const existe = this.listaExiste.includes(true)
          if(existe == true){
            this.servicioSolicitudBajasArticulos.listarPorId(this.idSolicitudBaja).subscribe(resSolicitudBaja=>{
              document.getElementById('snipper')?.setAttribute('style', 'display: none;')
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Ya existe una solicitud de baja del articulo '+resSolicitudBaja.idDetalleArticulo.idArticulo.descripcion.toLowerCase()+' por parte del usuario '+resSolicitudBaja.idUsuario.nombre+' '+resSolicitudBaja.idUsuario.apellido+' y tiene el estado de '+resSolicitudBaja.idEstado.descripcion.toLowerCase()+'.',
                showConfirmButton: false,
                timer: 1500
              })
            })
          }else if(existe == false){
            this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
              this.servicioEstado.listarPorId(80).subscribe(resEstado=>{
                let solicitudBajasArticulos : SolicitudBajasArticulos = new SolicitudBajasArticulos();
                solicitudBajasArticulos.fecha = this.fechaActual
                solicitudBajasArticulos.idDetalleArticulo = resAsignArticulo.idDetalleArticulo
                solicitudBajasArticulos.idEstado = resEstado
                solicitudBajasArticulos.idUsuario = resUsuario
                solicitudBajasArticulos.observacion = observacion
                this.registrarSolicitudBajasArticulos(solicitudBajasArticulos)
              })
            })
          }
        })
      })
    }
  }

  public registrarSolicitudBajasArticulos(solicitudBajaArticulo: SolicitudBajasArticulos){
    this.servicioSolicitudBajasArticulos.registrar(solicitudBajaArticulo).subscribe(resSolicitudBajaArticulo=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha solicitado dar de baja el articulo!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
    }, error => {
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar la solicitud!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
