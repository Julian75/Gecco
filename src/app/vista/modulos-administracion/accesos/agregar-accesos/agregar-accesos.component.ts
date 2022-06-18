import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccesoService } from 'src/app/servicios/Acceso.service';
import {MatDialog , MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Accesos } from 'src/app/modelos/accesos';
import Swal from 'sweetalert2';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ModuloService } from 'src/app/servicios/modulo.service';
import { RolService } from 'src/app/servicios/rol.service';



@Component({
  selector: 'app-agregar-accesos',
  templateUrl: './agregar-accesos.component.html',
  styleUrls: ['./agregar-accesos.component.css']
})
export class AgregarAccesosComponent implements OnInit {
  public formaAccesos!: FormGroup;
  public listarModulo: any = [];
  color = ('primary');
  public encontrado = false;
  public listarExiste: any = [];
  public idModulo: any;
  constructor(
    private fb: FormBuilder,
    private servicioModulo: ModuloService,
    private servicioRol: RolService,
    public dialogRef: MatDialogRef<AgregarAccesosComponent>,
    private servicioAcceso: AccesoService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public idRol: MatDialog,
  ) { }

  ngOnInit(
  ): void {
    this.listarModulos()
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formaAccesos = this.fb.group({
      id: 0,
      rol: [null,Validators.required],
      modulo: [null,Validators.required],
    });
  }

  public guardar() {
    this.listarExiste = []
    this.encontrado = false
    let accesos : Accesos = new Accesos();
    const idRol = Number(this.idRol)
    this.servicioRol.listarPorId(idRol).subscribe(res=>{
      accesos.idRol = res
      console.log(accesos.idRol)
      this.servicioAcceso.listarTodos().subscribe(resAcceso=>{
        if(resAcceso.length === 0){
          const idModulo = this.formaAccesos.controls['modulo'].value;
          this.servicioModulo.listarPorId(idModulo).subscribe(res =>{
            accesos.idModulo = res
            this.registrarAccesos(accesos);
          })
        }else{
          console.log(resAcceso)
          this.idModulo = this.formaAccesos.controls['modulo'].value;
          console.log(this.idModulo)
          for (let index = 0; index < resAcceso.length; index++) {
            const element = resAcceso[index];
            if(element.idRol.id == accesos.idRol.id ){
              if (element.idModulo.id == this.idModulo ) {
                this.encontrado = true
              }
              else{
                this.encontrado = false
              }
            }
            this.listarExiste.push(this.encontrado)
          }
          const existe = this.listarExiste.includes( true )
          console.log(existe)
          if (existe == true){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ese acceso ya existe!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          if (existe== false){
            this.servicioModulo.listarPorId(this.idModulo).subscribe(res =>{
              accesos.idModulo = res
              console.log(accesos.idModulo)
              console.log(accesos)
              this.registrarAccesos(accesos);
            })
          }
        }
      })
    })
  }



  public listarModulos() {
    this.servicioModulo.listarTodos().subscribe(res => {
      this.listarModulo = res;
      console.log(res);
    });
  }

  public registrarAccesos(accesos: Accesos) {
    this.servicioAcceso.registrar(accesos).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Acceso Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.dialogRef.close();

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
