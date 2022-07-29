import { Articulo } from './../../../../modelos/articulo';
import { MatDialogRef } from '@angular/material/dialog';
import { EstadoService } from 'src/app/servicios/estado.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-articulos',
  templateUrl: './agregar-articulos.component.html',
  styleUrls: ['./agregar-articulos.component.css']
})
export class AgregarArticulosComponent implements OnInit {
  public formArticulo!: FormGroup;
  public listarEstado: any = [];
  public listarExiste: any = [];
  public estadosDisponibles:any = [];
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgregarArticulosComponent>,
    private servicioArticulos: ArticuloService,
    private servicioEstado : EstadoService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarEstados();
  }

  private crearFormulario() {
    this.formArticulo = this.fb.group({
      id: 0,
      descripcion: [null,Validators.required],
      estado: [null,Validators.required]
    });
  }

  public listarEstados() {
    this.servicioEstado.listarTodos().subscribe(res => {
      // this.listarEstado = res;
      res.forEach(element => {
        if(element.idModulo.id == 22){
          this.estadosDisponibles.push(element)
        }
      });
      this.listarEstado = this.estadosDisponibles
    });
  }

  aprobar:boolean = false
  public guardar() {
    this.aprobar = false
    let articulo : Articulo = new Articulo();
    articulo.descripcion=this.formArticulo.controls['descripcion'].value;
    const idEstado = this.formArticulo.controls['estado'].value;

    this.servicioEstado.listarPorId(idEstado).subscribe(res => {
      articulo.idEstado = res
      if(articulo.descripcion==null || articulo.descripcion==""){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El campo esta vacio!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        this.servicioArticulos.listarTodos().subscribe(resArticulos=>{
          resArticulos.forEach(element => {
            if(element.descripcion == articulo.descripcion){
              this.aprobar = true
            }else{
              this.aprobar = false
            }
            this.listarExiste.push(this.aprobar);
          });
          const existe = this.listarExiste.includes( true );
          if(existe == true){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ese articulo ya existe!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            this.registrarArticulo(articulo);
          }
        })
      }
    })

  }

  public registrarArticulo(articulo: Articulo) {
    this.servicioArticulos.registrar(articulo).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Articulo Registrado!',
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
