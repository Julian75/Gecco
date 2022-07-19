import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EstadoService } from 'src/app/servicios/estado.service';
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
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serviceProveedor: ProveedorService,
    private serviceTipoDocumento: TipoDocumentoService,
    private serviceEstado: EstadoService,
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
          if (element.idModulo.id == 24) {
            this.listaEstado.push(element);
          }
        })
      }
    )
  }
  public guardar(){
    const idEstado = this.formProveedor.value.idEstado;
    const idTipoDocumento = this.formProveedor.value.idTipoDocumento;
    if (this.formProveedor.valid) {
      this.serviceTipoDocumento.listarPorId(idTipoDocumento).subscribe(
        (dataDocumento)=>{
        this.formProveedor.value.idTipoDocumento = dataDocumento;
        this.serviceEstado.listarPorId(idEstado).subscribe(
          (dataEstado)=>{
            this.formProveedor.value.idEstado = dataEstado;
            console.log(this.formProveedor.value);
            this.serviceProveedor.actualizar(this.formProveedor.value).subscribe(
              (data)=>{
                Swal.fire({
                  icon: 'success',
                  title: 'Proveedor modificado',
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigate(['/proveedores']);
              }
            )
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
