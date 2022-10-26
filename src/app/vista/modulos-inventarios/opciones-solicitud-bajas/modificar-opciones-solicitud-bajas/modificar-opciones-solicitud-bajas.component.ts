import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { OpcionArticuloBajaService } from 'src/app/servicios/opcionArticuloBaja.service';
import { OpcionArticuloBaja2 } from 'src/app/modelos/modelos2/opcionArticuloBaja2';

@Component({
  selector: 'app-modificar-opciones-solicitud-bajas',
  templateUrl: './modificar-opciones-solicitud-bajas.component.html',
  styleUrls: ['./modificar-opciones-solicitud-bajas.component.css']
})
export class ModificarOpcionesSolicitudBajasComponent implements OnInit {

  public formOpcion!: FormGroup;
  color = ('primary');
  public idOpcion :any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicioOpcionBajas: OpcionArticuloBajaService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarOpcionesSolicitudBajasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listaridOpcionesVisita();
  }
  private crearFormulario() {
    this.formOpcion = this.fb.group({
      id: [this.data],
      descripcion: [null,Validators.required],
    });
  }

  public listaridOpcionesVisita(){
    this.idOpcion = this.data
    this.servicioOpcionBajas.listarPorId(this.idOpcion).subscribe(res => {
      this.formOpcion.setValue(res);
    })
  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    let opcionArticuloBaja : OpcionArticuloBaja2 = new OpcionArticuloBaja2();
    opcionArticuloBaja.id = this.formOpcion.value.id;
    const descripcion = this.formOpcion.value.descripcion;
    this.servicioOpcionBajas.listarPorId(opcionArticuloBaja.id).subscribe(res=>{
      opcionArticuloBaja.descripcion = res.descripcion
      console.log(opcionArticuloBaja.descripcion)
      if(descripcion==''){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else if (descripcion.toLowerCase() == opcionArticuloBaja.descripcion.toLowerCase()){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'No hubieron cambios!',
          showConfirmButton: false,
          timer: 1500
        })
        this.dialogRef.close();
        window.location.reload();
      }else{
        document.getElementById("snipper").setAttribute("style", "display: block;")
        opcionArticuloBaja.descripcion = descripcion
        this.servicioOpcionBajas.listarTodos().subscribe(resModulo=>{
          resModulo.forEach(element => {
            if(element.descripcion.toLowerCase() == opcionArticuloBaja.descripcion.toLowerCase()){
              this.existe = true
            }else{
              this.existe = false
            }
            this.listaExis.push(this.existe)
          });
          const existe = this.listaExis.includes( true );
          if(existe == true){
            document.getElementById("snipper").setAttribute("style", "display: none;")
            Swal.fire({
              icon: 'error',
              title: 'Esa Opcion ya existe!',
              showConfirmButton: false,
              timer: 1500
            });
          }else{
            this.servicioModificar.actualizarOpcionArticuloBaja(opcionArticuloBaja).subscribe(res => {
              document.getElementById("snipper").setAttribute("style", "display: none;")
              Swal.fire({
                icon: 'success',
                title: 'Opcion Modificada',
                showConfirmButton: false,
                timer: 1500
              });
              this.dialogRef.close();
              window.location.reload();
            })
          }
        })
      }
    })
  }
}
