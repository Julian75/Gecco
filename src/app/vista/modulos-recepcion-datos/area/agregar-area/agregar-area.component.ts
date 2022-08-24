import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AreaService } from 'src/app/servicios/area.service';
import { Area } from 'src/app/modelos/area';

@Component({
  selector: 'app-agregar-area',
  templateUrl: './agregar-area.component.html',
  styleUrls: ['./agregar-area.component.css']
})
export class AgregarAreaComponent implements OnInit {

  public formArea!: FormGroup;
  color = ('primary');

  constructor(
    private fb: FormBuilder,
    private servicioArea : AreaService,
    public dialogRef: MatDialogRef<AgregarAreaComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formArea = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
    });
  }

  existe: boolean = false
  listaExis: any = []
  public guardar(){
    this.listaExis = []
    let area : Area = new Area();
    area.descripcion=this.formArea.controls['descripcion'].value;
    if(area.descripcion==null || area.descripcion==""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo esta vacio!',
        showConfirmButton: false,
        timer: 1500
      })
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
          this.registrarArea(area);
        }
      })
    }
  }

  public registrarArea(area: Area) {
    this.servicioArea.registrar(area).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Area Registrado!',
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
