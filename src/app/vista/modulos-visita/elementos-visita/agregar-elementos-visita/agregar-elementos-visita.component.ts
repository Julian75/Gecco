import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ElementosVisitaService } from 'src/app/servicios/ElementosVisita.service';

@Component({
  selector: 'app-agregar-elementos-visita',
  templateUrl: './agregar-elementos-visita.component.html',
  styleUrls: ['./agregar-elementos-visita.component.css']
})
export class AgregarElementosVisitaComponent implements OnInit {
  public formElementosVisita!: FormGroup;
  public listarElementos: any = [];
  public encontrador = false;
  public listarExiste : any = [];
  public elementosDisponibles:any = [];
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarElementosVisitaComponent>,
    private servicioElementosVisita : ElementosVisitaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario()
  }

  private crearFormulario() {
    this.formElementosVisita = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
    });
  }

  public guardar(){
    this.listarElementos = []
    this.servicioElementosVisita.listarTodos().subscribe(res => {
      if(this.formElementosVisita.value.descripcion == null || this.formElementosVisita.value.descripcion == ""){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo no puede estar vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        res.forEach(element => {
          if(element.descripcion.toLowerCase() == this.formElementosVisita.value.descripcion.toLowerCase()){
            this.encontrador = true;
          }else{
            this.encontrador = false;
          }
          this.listarElementos.push(this.encontrador);
        })
        const existe = this.listarElementos.includes(true);
        if(existe == true){
          Swal.fire({
            icon: 'error',
            title: 'Ese Elemento ya existe!',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
          window.location.reload();
        }else if(existe == false){
          this.servicioElementosVisita.registrar(this.formElementosVisita.value).subscribe(res => {
            Swal.fire({
              icon: 'success',
              title: 'Elemento Registrado',
              text: 'El Elemento se registro correctamente',
            });
            this.dialogRef.close();
            window.location.reload();
          }
          )
        }
      }
    })
  }
}
