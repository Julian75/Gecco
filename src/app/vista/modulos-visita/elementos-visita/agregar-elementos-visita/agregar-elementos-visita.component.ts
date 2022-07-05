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
      res.forEach(element => {
        if(element.descripcion == this.formElementosVisita.value.descripcion){
          this.encontrador = true;
        }else{
          this.encontrador = false;
        }
        this.listarElementos.push(this.encontrador);
      })
      const existe = this.listarElementos.includes(true);
      if(existe == true){
        Swal.fire({
          title: 'Error',
          text: 'El elemento ya existe',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }else if(existe == false){
        this.servicioElementosVisita.registrar(this.formElementosVisita.value).subscribe(res => {
          Swal.fire({
            title: 'Registro exitoso',
            text: 'El elemento se registró correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then((result)=>{
            this.dialogRef.close();
            window.location.reload();
          })

        }
        )
      }
    })
  }
}
