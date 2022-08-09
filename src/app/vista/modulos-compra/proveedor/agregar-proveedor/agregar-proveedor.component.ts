import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { TipoDocumentoService } from 'src/app/servicios/tipoDocumento.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {
  public formProveedor!: FormGroup;
  public listaDocumentos:any = []
  public listaEstado : any = []
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private servicioDocumento : TipoDocumentoService,
    private servicioEstado : EstadoService,
    private servicioProveedor : ProveedorService,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarTipoDocumento();
    this.listarEstados();
  }

  private crearFormulario(){
    this.formProveedor = this.fb.group({
      id:0,
      idTipoDocumento: ['', Validators.required],
      documento: [null, Validators.required],
      direccion: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: [null, Validators.required],
      idEstado:['', Validators.required],
      observacion: ['', Validators.required],
    });
  }
  public listarTipoDocumento(){
    this.servicioDocumento.listarTodos().subscribe(
      (data)=>{
        this.listaDocumentos = data;
      }
    )
  }

  public listarEstados(){
    this.servicioEstado.listarTodos().subscribe(
      (data)=>{
        data.forEach(element => {
          if (element.idModulo.id == 26) {
            this.listaEstado.push(element);
          }
        })
      }
    )
  }
  public guardar(){
    const idEstado = this.formProveedor.value.idEstado;
    const idTipoDocumento = this.formProveedor.value.idTipoDocumento;
    const telefono = this.formProveedor.value.telefono;

    if (this.formProveedor.valid) {
      this.servicioDocumento.listarPorId(idTipoDocumento).subscribe(
        (dataDocumento)=>{
        this.formProveedor.value.idTipoDocumento = dataDocumento;
        this.servicioEstado.listarPorId(idEstado).subscribe(
          (dataEstado)=>{
            this.formProveedor.value.idEstado = dataEstado;
            this.servicioProveedor.listarTodos().subscribe(
              (data)=>{
                let contador = 0;
                data.forEach(element => {
                  if (element.documento == this.formProveedor.value.documento || element.nombre == this.formProveedor.value.nombre || element.telefono == this.formProveedor.value.telefono || element.direccion == this.formProveedor.value.direccion) {
                    contador++;
                  }
                }
              )
              if (contador > 0) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Algunos campos ya existe en la base de datos!',
                })
              }else{
                this.servicioProveedor.registrar(this.formProveedor.value).subscribe(
                  (data)=>{
                    Swal.fire({
                      icon: 'success',
                      title: 'Exito',
                      text: 'Proveedor guardado correctamente!',
                    })
                    this.formProveedor.reset();
                  }
                )
              }
          })
        }
        )
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor revise los campos',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}

