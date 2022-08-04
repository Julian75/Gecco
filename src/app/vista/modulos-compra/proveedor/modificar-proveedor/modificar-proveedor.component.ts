import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Proveedor2 } from 'src/app/modelos/proveedor2';
import { EstadoService } from 'src/app/servicios/estado.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { TipoDocumentoService } from 'src/app/servicios/tipoDocumento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-proveedor',
  templateUrl: './modificar-proveedor.component.html',
  styleUrls: ['./modificar-proveedor.component.css']
})
export class ModificarProveedorComponent implements OnInit {
  public formProveedor!: FormGroup;
  public listaDocumentos:any =[]
  public listaEstado:any = []
  public idProveedor:any = []
  public listaExiste: any = []
  public encontrado: any
  public pro : any = []
  public pro2 : any = []
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serviceProveedor: ProveedorService,
    private serviceTipoDocumento: TipoDocumentoService,
    private serviceEstado: EstadoService,
    private servicioModificar: ModificarService,
  ) { }


  ngOnInit(): void {
    this.listarTodo();
    this.crearFormulario();
    this.listarDocumentos();
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
  public listarTodo(){
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idProveedor = Number(params.get('id'));
      this.serviceProveedor.listarPorId(this.idProveedor).subscribe(
        (data)=>{
          console.log(data);
          this.formProveedor.setValue({
            id: data.id,
            idTipoDocumento: data.idTipoDocumento.id,
            documento: data.documento,
            direccion: data.direccion,
            nombre: data.nombre,
            telefono: data.telefono,
            idEstado: data.idEstado.id,
            observacion: data.observacion,
          });
        }
      )
    })
  }
  public listarDocumentos(){
    this.serviceTipoDocumento.listarTodos().subscribe(
      (data) => {
        this.listaDocumentos = data;
      }
    );
  }
  public listarEstados(){
    this.serviceEstado.listarTodos().subscribe(
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
    this.pro2 = []
    const idEstado = this.formProveedor.value.idEstado;
    const idTipoDocumento = this.formProveedor.value.idTipoDocumento;
    if (this.formProveedor.valid) {
      this.serviceTipoDocumento.listarPorId(idTipoDocumento).subscribe(
        (dataDocumento)=>{
        this.formProveedor.value.idTipoDocumento = dataDocumento.id;
        this.serviceProveedor.listarTodos().subscribe( data => {
          data.forEach(element => {
            if (this.formProveedor.value.idEstado == element.idEstado.id && this.formProveedor.value.idTipoDocumento == element.idTipoDocumento.id && this.formProveedor.value.documento == element.documento ) {
              this.pro=true
            }else{
              this.pro=false
            }
            this.pro2.push(this.pro)
          }
          );
          const existe  = this.pro2.includes(true)
          console.log(existe)
          if (existe == true) {
            this.servicioModificar.actualizarProveedor(this.formProveedor.value).subscribe(data=>{
            })
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: 'No hubieron cambios, pero se modificó el proveedor!',
            })
            this.router.navigate(['/proveedores']);
          }else {
            this.servicioModificar.actualizarProveedor(this.formProveedor.value).subscribe(data=>{
            })
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: 'Proveedor modificado correctamente!',
            })
            this.router.navigate(['/proveedores']);
          }
        })
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
