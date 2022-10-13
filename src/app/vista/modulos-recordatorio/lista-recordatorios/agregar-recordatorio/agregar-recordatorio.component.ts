import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { RecordatorioService } from 'src/app/servicios/recordatorio.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-agregar-recordatorio',
  templateUrl: './agregar-recordatorio.component.html',
  styleUrls: ['./agregar-recordatorio.component.css']
})
export class AgregarRecordatorioComponent implements OnInit {
  public dateControl = new FormControl(new Date());
  @ViewChild('picker') picker: any;
  public showSpinners = true;
  public stepHour = 1;
  public stepMinute = 1;
  public enableMeridian = false;
  public touchUi = false;
  public myDatePicker:any;

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
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

  guardar(){
    if (this.formRecordatorio.valid) {
      this.servicioRecordatorio.registrar(this.formRecordatorio.value).subscribe(
        (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Recordatorio agregado',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Campos vacios',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
