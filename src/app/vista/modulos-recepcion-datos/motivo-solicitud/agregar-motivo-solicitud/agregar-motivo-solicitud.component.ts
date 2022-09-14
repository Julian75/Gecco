import { MotivoSolicitud } from './../../../../modelos/MotivoSolicitud';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { AreaService } from 'src/app/servicios/area.service';
@Component({
  selector: 'app-agregar-motivo-solicitud',
  templateUrl: './agregar-motivo-solicitud.component.html',
  styleUrls: ['./agregar-motivo-solicitud.component.css']
})
export class AgregarMotivoSolicitudComponent implements OnInit {
  public formMotivoSolicitud!: FormGroup;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioMotivoSolicitud : MotivoSolicitudService,
    private servicioArea: AreaService,
    public dialogRef: MatDialogRef<AgregarMotivoSolicitudComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listaArea();
  }

  private crearFormulario() {
    this.formMotivoSolicitud = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      area: [null,Validators.required],
    });
  }

  listasArea:any = []
  public listaArea(){
    this.servicioArea.listarTodos().subscribe(resArea=>{
      this.listasArea = resArea;
    })
  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    if(this.formMotivoSolicitud.valid){
      this.servicioMotivoSolicitud.listarTodos().subscribe(resMotivo=>{
        resMotivo.forEach(element => {
          if(element.descripcion.toLowerCase() == this.formMotivoSolicitud.value.descripcion.toLowerCase()){
            this.existe = true
          }else{
            this.existe = false
          }
          this.listaExis.push(this.existe)
        });
        const existe = this.listaExis.includes( true );
        if(existe == true){
          Swal.fire({
            icon: 'error',
            title: 'Ese Motivo de Solicitud ya existe!',
            showConfirmButton: false,
            timer: 1500
          });
        }else{
          let motivoSolicitud : MotivoSolicitud = new MotivoSolicitud();
          motivoSolicitud.descripcion = this.formMotivoSolicitud.controls['descripcion'].value;
          this.servicioArea.listarPorId(this.formMotivoSolicitud.controls['area'].value).subscribe(resArea=>{
            motivoSolicitud.idArea = resArea
            this.servicioMotivoSolicitud.registrar(motivoSolicitud).subscribe( data =>{
              Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                showConfirmButton: false,
                timer: 1500
              });
              this.dialogRef.close();
              window.location.reload();
            })
          })
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
