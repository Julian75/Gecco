import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MotivoSolicitudService } from 'src/app/servicios/motivoSolicitud.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { AreaService } from 'src/app/servicios/area.service';
import { MotivoSolicitud2 } from 'src/app/modelos/modelos2/motivoSolicitud2';
@Component({
  selector: 'app-modificar-motivo-solicitud',
  templateUrl: './modificar-motivo-solicitud.component.html',
  styleUrls: ['./modificar-motivo-solicitud.component.css']
})
export class ModificarMotivoSolicitudComponent implements OnInit {
  public formMotivoSolicitud!: FormGroup;
  public id: any;
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<ModificarMotivoSolicitudComponent>,
    private servicioMotivoSolicitud: MotivoSolicitudService,
    private servicioArea: AreaService,
    private servicioModificar: ModificarService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos()
    this.crearFormulario();
    this.listaArea();
  }

  private crearFormulario() {
    this.formMotivoSolicitud = this.fb.group({
      id: [''],
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

  idMotivo: any
  listaMotivo: any = []
  public listarTodos(){
    this.idMotivo = this.data;
    this.servicioMotivoSolicitud.listarPorId(this.idMotivo).subscribe(res => {
      this.listaMotivo = res;
      console.log(this.listaMotivo)
      this.formMotivoSolicitud.controls['id'].setValue(this.listaMotivo.id);
      this.formMotivoSolicitud.controls['descripcion'].setValue(this.listaMotivo.descripcion);
      this.formMotivoSolicitud.controls['area'].setValue(this.listaMotivo.idArea.id);
    })
  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    if (this.formMotivoSolicitud.valid) {
      this.servicioMotivoSolicitud.listarPorId(Number(this.data)).subscribe(resMot=>{
        this.servicioMotivoSolicitud.listarTodos().subscribe(resMotivo=>{
          if(resMot.descripcion.toLowerCase() == this.formMotivoSolicitud.value.descripcion.toLowerCase() && resMot.idArea.id == this.formMotivoSolicitud.value.area){
            Swal.fire({
              icon: 'success',
              title: 'No hubieron cambios!',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close();
            window.location.reload();
          }else{
            resMotivo.forEach(element => {
              if(element.descripcion.toLowerCase() == this.formMotivoSolicitud.value.descripcion.toLowerCase() && element.id != resMot.id){
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
                title: 'Ese motivo de solicitud ya existe!',
                showConfirmButton: false,
                timer: 1500
              });
            }else{
              let motivoSolicitudActualizar : MotivoSolicitud2 = new MotivoSolicitud2();
              motivoSolicitudActualizar.id = resMot.id
              motivoSolicitudActualizar.descripcion = this.formMotivoSolicitud.controls['descripcion'].value;
              motivoSolicitudActualizar.idArea = Number(this.formMotivoSolicitud.controls['area'].value);
              console.log(motivoSolicitudActualizar)
              this.servicioModificar.actualizarMotivoSolicitud(motivoSolicitudActualizar).subscribe(data => {
                Swal.fire({
                  icon: 'success',
                  title: 'Se actualizo el motivo',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.dialogRef.close();
                window.location.reload();
              }
              );
            }
          }
        })
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campo Vacio',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
