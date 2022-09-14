import { Sedes2 } from 'src/app/modelos/modelos2/sedes2';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { SedeService } from 'src/app/servicios/sedes.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-sedes',
  templateUrl: './modificar-sedes.component.html',
  styleUrls: ['./modificar-sedes.component.css']
})
export class ModificarSedesComponent implements OnInit {
  public formSede!: FormGroup;
  color = ('primary');
  public idSede: any;
  public listaSede: any = [];
  public encontrado = false;
  public encontrados: any = [];

  constructor(
    private servicioSede: SedeService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarSedesComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarporidSede();
  }

  private crearFormulario() {
    this.formSede = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required]
    });
  }

  public listarporidSede() {
    this.idSede = this.data;
    this.servicioSede.listarPorId(this.idSede).subscribe(res => {
      this.listaSede = res;
      this.formSede.controls['id'].setValue(this.listaSede.id);
      this.formSede.controls['descripcion'].setValue(this.listaSede.descripcion);
    })
  }

  public guardar() {
    this.encontrados = [];
    let sede : Sedes2 = new Sedes2();
    sede.id=Number(this.data);
    if(this.formSede.valid){
      const descripcion = this.formSede.value.descripcion;
      this.servicioSede.listarPorId(sede.id).subscribe(res=>{
        if(descripcion.toLowerCase() == res.descripcion.toLowerCase()){
          sede.descripcion=descripcion
          this.servicioModificar.actualizarSede(sede).subscribe(res=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'No hubieron cambios!',
              showConfirmButton: false,
              timer: 1500
            })
            this.dialogRef.close();
            window.location.reload();
          })
        }else{
          this.servicioSede.listarTodos().subscribe(resSede => {
            resSede.forEach(element => {
              if(descripcion.toLowerCase() == element.descripcion.toLowerCase()){
                this.encontrado = true;
              }else{
                this.encontrado = false;
              }
              this.encontrados.push(this.encontrado)
            })
            const existe = this.encontrados.includes(true);
            if(existe == true){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'La Sede ya existe!',
                showConfirmButton: false,
                timer: 1500
              })
            }else{
              sede.descripcion=descripcion
              this.servicioModificar.actualizarSede(sede).subscribe(res=>{
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Se modificó correctamente!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.dialogRef.close();
                window.location.reload();
              }, error => {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Ocurrió un error al modificar!',
                  showConfirmButton: false,
                  timer: 1500
                })
              })
            }
          })

        }

      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo está vacio!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
