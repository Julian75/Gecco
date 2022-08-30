import { DetalleSolicitudService } from 'src/app/servicios/detalleSolicitud.service';
import { DetalleSolicitud } from 'src/app/modelos/detalleSolicitud';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import { Solicitud } from 'src/app/modelos/solicitud';
import { AgregarCotizacionLiderProcesoComponent } from './agregar-cotizacion-lider-proceso/agregar-cotizacion-lider-proceso.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-peticion-cotizacion',
  templateUrl: './peticion-cotizacion.component.html',
  styleUrls: ['./peticion-cotizacion.component.css']
})
export class PeticionCotizacionComponent implements OnInit {
  public solicitud: any;
  public listadoArtSel: any = [];
  public fecha: Date = new Date();
  public listadoSolicitud: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private dialogRef: MatDialogRef<PeticionCotizacionComponent>,
    private dialog: MatDialog,
    private servicioEstado: EstadoService,
    private servicioUsuario: UsuarioService,
    private servicioSolicitud: SolicitudService,
    private servicioDetalleSolicitud: DetalleSolicitudService,
  ) { }

  ngOnInit(): void {
  }

  public capturarOpcion(decision: number){
    if(decision != null){
      document.getElementById('snipper')?.setAttribute('style', 'display: block;')
      let solicitud : Solicitud = new Solicitud();
      solicitud.fecha = this.fecha
      this.servicioEstado.listarPorId(28).subscribe(resEstado=>{
        solicitud.idEstado = resEstado
        this.servicioUsuario.listarPorId(Number(sessionStorage.getItem('id'))).subscribe(resUsuario=>{
          solicitud.idUsuario = resUsuario
          this.registrarSolicitud(solicitud, decision)
        })
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debe indicar si subiera o no una cotizacion para poder generar su solicitud!',
        showConfirmButton: false,
        timer: 2500
      })
    }
  }

  public registrarSolicitud(solicitud: Solicitud, decision){
    this.servicioSolicitud.registrar(solicitud).subscribe(res=>{
      this.detalleSolicitud(res, decision)
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  contador: any;
  public detalleSolicitud(solicitud:any, decision){
    var usuarios: any = []
    this.servicioSolicitud.listarTodos().subscribe(resSolicitudes=>{
      resSolicitudes.forEach(element => {
        if(element.idUsuario.id == Number(sessionStorage.getItem('id'))){
          usuarios.push(element)
        }
      });
      for (let index = 0; index < usuarios.length; index++) {
        const element = usuarios[index];
        if(usuarios.indexOf(element) == usuarios.length-1){
          this.listadoSolicitud.push(element)
        }
      }
      this.listadoArtSel = this.data
      for (let index = 0; index < this.listadoArtSel.length; index++) {
        const element = this.listadoArtSel[index];
        let detalleSolicitud : DetalleSolicitud = new DetalleSolicitud();
        detalleSolicitud.idArticulos = element.articulo
        this.listadoSolicitud.forEach((elementSolicitud:any) => {
          detalleSolicitud.idSolicitud = elementSolicitud
          detalleSolicitud.valorUnitario = 0
          detalleSolicitud.cantidad = element.cantidad
          detalleSolicitud.valorTotal = 0
          detalleSolicitud.observacion = element.observacion
          this.servicioEstado.listarPorId(28).subscribe(resEstado=>{
            detalleSolicitud.idEstado = resEstado
            this.registrarDetalleSolicitud(detalleSolicitud, solicitud, decision, this.listadoArtSel, index)
          })
        });
      }
    })
  }

  public registrarDetalleSolicitud(detalleSolicitud: DetalleSolicitud, solicitud: any, decision, lista, i){
    this.servicioDetalleSolicitud.registrar(detalleSolicitud).subscribe(res=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      console.log(lista, this.contador, decision, i)
      if(lista.length == i+1){
        if(decision == 1){
          const dialogRef = this.dialog.open(AgregarCotizacionLiderProcesoComponent, {
            width: '500px',
            data: solicitud.id
          })
          this.dialogRef.close();
        }else if(decision == 2 ){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha registrado la solicitud sin cotización!',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close();
          window.location.reload();
        }
      }
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

}
