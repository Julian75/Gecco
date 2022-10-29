import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OpcionesVisitaService } from './../../../../servicios/opcionesVisita.service';
import { OpcionesVisita } from 'src/app/modelos/opcionesVisita';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { OpcionesVisita2 } from 'src/app/modelos/modelos2/opcionesVisita2';

@Component({
  selector: 'app-modificar-opciones-visita',
  templateUrl: './modificar-opciones-visita.component.html',
  styleUrls: ['./modificar-opciones-visita.component.css']
})
export class ModificarOpcionesVisitaComponent implements OnInit {
  public formOpcionVisita!: FormGroup;
  color = ('primary');
  public idOpcion :any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicioOpcionVisita: OpcionesVisitaService,
    private servicioModificar: ModificarService,
    public dialogRef: MatDialogRef<ModificarOpcionesVisitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listaridOpcionesVisita();
  }
  private crearFormulario() {
    this.formOpcionVisita = this.fb.group({
      id: [''],
      descripcion: [null,Validators.required],
    });
  }

  public listaridOpcionesVisita(){
    this.idOpcion = this.data
    this.servicioOpcionVisita.listarPorId(this.idOpcion).subscribe(res => {
      this.formOpcionVisita.setValue(res);
    })
  }

  existe: boolean = false
  listaExis: any = []
  public guardar() {
    this.listaExis = []
    let opcionVisita : OpcionesVisita2 = new OpcionesVisita2();
    opcionVisita.id = this.formOpcionVisita.value.id;
    const descripcion = this.formOpcionVisita.value.descripcion;
    this.servicioOpcionVisita.listarPorId(opcionVisita.id).subscribe(res=>{
      opcionVisita.descripcion = res.descripcion
      if(descripcion==''){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else if (descripcion.toLowerCase() == opcionVisita.descripcion.toLowerCase()){
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
        opcionVisita.descripcion = descripcion
        this.servicioOpcionVisita.listarTodos().subscribe(resModulo=>{
          resModulo.forEach(element => {
            if(element.descripcion.toLowerCase() == opcionVisita.descripcion.toLowerCase()){
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
              title: 'Esa Opcion ya existe!',
              showConfirmButton: false,
              timer: 1500
            });
          }else{
            this.servicioModificar.actualizarOpcionesVisita(opcionVisita).subscribe(res => {
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
