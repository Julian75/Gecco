import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Novedad } from 'src/app/modelos/novedad';
import { AsignarTurnoVendedorService } from 'src/app/servicios/asignarTurnoVendedor.service';
import { NovedadService } from 'src/app/servicios/novedad.service';
import { TipoNovedadesService } from 'src/app/servicios/tipoNovedades.Service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-novedad',
  templateUrl: './agregar-novedad.component.html',
  styleUrls: ['./agregar-novedad.component.css']
})
export class AgregarNovedadComponent implements OnInit {

  public formNovedad!: FormGroup;
  public listarTipoNovedades: any = [];
  public lista: any = [];
  public fecha: Date = new Date();
  public fechaActual:any
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarNovedadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private servicioTipoNovedad : TipoNovedadesService,
    private servicioAsignarTurnoVendedor : AsignarTurnoVendedorService,
    private servicioUsuario : UsuarioService,
    private servicioNovedad : NovedadService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarTipoNovedad();
  }
  private crearFormulario() {
    this.formNovedad = this.fb.group({
      id: 0,
      tipoNovedad: [null,Validators.required],
      observacion: [null,Validators.required],
    });
  }

  public listarTipoNovedad() {
    this.servicioTipoNovedad.listarTodos().subscribe(res => {
      this.listarTipoNovedades = res
  });}

  public guardar() {
    for (const [key, value] of Object.entries(this.data)) {
      this.lista.push(value)
    }
    this.servicioAsignarTurnoVendedor.listarPorId(this.lista[0]).subscribe(res=>{
      let novedad : Novedad = new Novedad();
      novedad.idAsignarTurnoVendedor = res
      novedad.estado = this.lista[1]
      this.servicioUsuario.listarTodos().subscribe(resUsuario=>{
        resUsuario.forEach(elementUsuario => {
          if(elementUsuario.documento == Number(sessionStorage.getItem('usuario'))){
            novedad.idUsuario = elementUsuario
            const tipoNovedad = this.formNovedad.controls['tipoNovedad'].value;
            this.servicioTipoNovedad.listarPorId(tipoNovedad).subscribe(resTipoNovedad=>{
              novedad.observacion = this.formNovedad.controls['observacion'].value;
              novedad.fecha = this.fecha;
              novedad.idTipoNovedad = resTipoNovedad
              if(novedad.observacion==null || novedad.observacion==""){
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'El campo esta vacio!',
                  showConfirmButton: false,
                  timer: 1500
                })
              }else{
                var horaActual = this.fecha.getHours() + ":"+ this.fecha.getMinutes();
                if (this.fecha.getMinutes() >= 0 && this.fecha.getMinutes() <10) {
                  var minutos = "0"+this.fecha.getMinutes();
                  novedad.hora = this.fecha.getHours() + ":"+minutos
                }else{
                  novedad.hora = horaActual
                }
                this.registrarNovedad(novedad);
              }
            })
          }
        });
      })
    })
  }

  public registrarNovedad(novedad: Novedad) {
    this.servicioNovedad.registrar(novedad).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Novedad Registrada!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();

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
