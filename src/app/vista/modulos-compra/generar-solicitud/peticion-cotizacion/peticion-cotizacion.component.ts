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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    public dialogRef: MatDialogRef<PeticionCotizacionComponent>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public capturarOpcion(decision: number){
    this.solicitud = this.data
    console.log(this.solicitud, this.solicitud.id)
    if(decision == 1){
      const dialogRef = this.dialog.open(AgregarCotizacionLiderProcesoComponent, {
        width: '500px',
        data: this.solicitud.id
      })
      this.dialogRef.close();
    }else if(decision ==2 ){
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

}
