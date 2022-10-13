import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { RecordatorioService } from 'src/app/servicios/recordatorio.service';
import { ThemePalette } from '@angular/material/core';
import { Recordatorio } from 'src/app/modelos/recordatorio';

@Component({
  selector: 'app-agregar-recordatorio',
  templateUrl: './agregar-recordatorio.component.html',
  styleUrls: ['./agregar-recordatorio.component.css']
})
export class AgregarRecordatorioComponent implements OnInit {
  public dateControl = new FormControl();
  @ViewChild('picker') picker: any;
  public showSpinners = true;
  public stepHour = 1;
  public stepMinute = 1;
  public enableMeridian = false;
  public touchUi = false;
  public formRecordatorio!: FormGroup;
  public color: ThemePalette = 'primary';
  constructor(
    private servicioRecordatorio: RecordatorioService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarRecordatorioComponent>
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }
  public crearFormulario(): void {
    this.formRecordatorio = this.formBuilder.group({
      id: [''],
      descripcion: ['', Validators.required],
    });
  }

  fechaRecodatorio: Date;
  horaRecordatorio: any;
  guardar(){
    console.log(this.dateControl.value)
    var descripcion = this.formRecordatorio.controls['descripcion'].value;
    this.fechaRecodatorio = new Date(this.dateControl.value)
    this.horaRecordatorio = this.fechaRecodatorio.getHours()+":"+this.fechaRecodatorio.getMinutes()
    console.log(this.fechaRecodatorio)
    if (this.formRecordatorio.valid && this.dateControl.value != null) {
      if(new Date(this.fechaRecodatorio) < new Date()){
        Swal.fire({
          icon: 'error',
          title: 'La fecha y la hora no debe ser menor a la actual',
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        let recordatorio : Recordatorio = new Recordatorio();
        recordatorio.descripcion = descripcion
        recordatorio.fecha = new Date(this.fechaRecodatorio)
        recordatorio.hora = this.horaRecordatorio
        recordatorio.envio = 'no'
        console.log(recordatorio)
        this.registrarRecordatorio(recordatorio)
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacios',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  public registrarRecordatorio(recordatorio: Recordatorio){
    this.servicioRecordatorio.registrar(recordatorio).subscribe(resRecordatorio=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Evento Registrado!',
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
