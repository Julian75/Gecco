import { Area2 } from './../../../../modelos/modelos2/area2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AreaService } from 'src/app/servicios/area.service';
import { Area } from 'src/app/modelos/area';

@Component({
  selector: 'app-modificar-area',
  templateUrl: './modificar-area.component.html',
  styleUrls: ['./modificar-area.component.css']
})
export class ModificarAreaComponent implements OnInit {

  public formArea!: FormGroup;
  public id: any;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<ModificarAreaComponent>,
    private servicioArea: AreaService,
    private servicioModificar: ModificarService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarTodos()
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formArea = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
    });
  }

  public listarTodos(){
    this.servicioArea.listarPorId(Number(this.data)).subscribe(data => {
      this.formArea.setValue(data);
    }
    );
  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    let area : Area2 = new Area2();
    area.id=Number(this.data);
    if(this.formArea.valid){
      area.descripcion=this.formArea.controls['descripcion'].value;
      this.servicioArea.listarPorId(Number(this.data)).subscribe(data => {
        if(data.descripcion==area.descripcion){
            this.servicioModificar.actualizarArea(area).subscribe(res => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'No hubo cambios!',
                showConfirmButton: false,
                timer: 1500
              })
              this.dialogRef.close();
              window.location.reload();
            });
        }else{
          this.servicioArea.listarTodos().subscribe(resArea=>{
            resArea.forEach(element => {
              if(element.descripcion.toLowerCase() == area.descripcion.toLowerCase()){
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
                title: 'Esa Area ya existe!',
                showConfirmButton: false,
                timer: 1500
              });
            }else{
              this.actualizarArea(area);
            }
          })
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        showConfirmButton: false,
        timer: 1500,
      })
    }


  }

  public actualizarArea(area: Area2) {
    this.servicioModificar.actualizarArea(area).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Area modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();
      window.location.reload();
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al modificar!',
        showConfirmButton: false,
        timer: 1500
      })
    });
 }
}
