import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ElementosVisitaService } from 'src/app/servicios/ElementosVisita.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
@Component({
  selector: 'app-modificar-elementos-visita',
  templateUrl: './modificar-elementos-visita.component.html',
  styleUrls: ['./modificar-elementos-visita.component.css']
})
export class ModificarElementosVisitaComponent implements OnInit {
  public formElementoVisita!: FormGroup;
  color = ('primary');
  public idElementoVisita: any;

  constructor(
    public dialogRef: MatDialogRef<ModificarElementosVisitaComponent>,
    private fb: FormBuilder,
    private servicioModificar: ModificarService,
    private servicioElementoVisita: ElementosVisitaService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarPorIdElementos();
  }
  private crearFormulario(){
    this.formElementoVisita = this.fb.group({
      id: [''],
      descripcion: ['', Validators.required],
    });
  }
  public listarPorIdElementos(){
    this.idElementoVisita = this.data;
    this.servicioElementoVisita.listarPorId(this.idElementoVisita).subscribe(res => {
      this.formElementoVisita.setValue(res);
    })

  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    if (this.formElementoVisita.valid) {
      this.servicioElementoVisita.listarPorId(this.formElementoVisita.value.id).subscribe(resEle=>{
        this.servicioElementoVisita.listarTodos().subscribe(resElementos=>{
          if(this.formElementoVisita.value.descripcion.toLowerCase() == resEle.descripcion.toLowerCase()){
            Swal.fire({
              icon: 'success',
              title: 'No hubieron cambios!',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close();
            window.location.reload();
          }else{
            resElementos.forEach(element => {
              if(element.descripcion.toLowerCase() == this.formElementoVisita.value.descripcion.toLowerCase()){
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
                title: 'Ese Elemento ya existe!',
                showConfirmButton: false,
                timer: 1500
              });
            }else{
              this.servicioModificar.actualizarElementosVisita(this.formElementoVisita.value).subscribe(res => {
                Swal.fire({
                  icon: 'success',
                  title: 'Elemento Modificada',
                  text: 'El Elemento se modifico correctamente',
                });
                this.dialogRef.close();
                window.location.reload();
              })
            }
          }
        })
      })
    }else{
      Swal.fire({
        title: 'Error',
        text: 'El campo no puede estar vacio!',
        icon: 'error',
        confirmButtonText: 'Ok'
      }
      )
    }

  }
}
