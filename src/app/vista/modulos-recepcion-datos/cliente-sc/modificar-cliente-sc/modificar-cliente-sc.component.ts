import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteSCService } from 'src/app/servicios/clienteSC.service';
import { ClienteSC } from './../../../../modelos/clienteSC';
import { TipoDocumentoService } from 'src/app/servicios/tipoDocumento.service';
import { ModificarService } from 'src/app/servicios/modificar.service';
import { ClienteSC2 } from 'src/app/modelos/modelos2/clienteSC2';
@Component({
  selector: 'app-modificar-cliente-sc',
  templateUrl: './modificar-cliente-sc.component.html',
  styleUrls: ['./modificar-cliente-sc.component.css']
})
export class ModificarClienteScComponent implements OnInit {

  public formClienteSC!: FormGroup;
  public idCliente : any;
  public listarCliente : any = [];

  // Lista de relaciones foraneas
  public estadosDisponibles : any = [];
  public listaEstados: any = [];
  public listaTipoDocumentos: any = [];
  public listaRoles: any = [];
  public listaOficinas: any = [];

  public encontrado = false;
  public listarExiste: any = [];
  public contrasenaDesencru:any;

  constructor(
    private servicioCliente: ClienteSCService,
    private servicioModificar: ModificarService,
    private servicioTipoDocumento: TipoDocumentoService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listaporidClienteSc();
    this.listarTipoDocumentos();
  }

  private crearFormulario() {
    this.formClienteSC = this.fb.group({
      id: [''],
      nombre: [null,Validators.required],
      apellido: [null,Validators.required],
      correo: [null,Validators.required],
      documento: [null,Validators.required],
      tipoDocumento: [null,Validators.required],
      telefono: [null,Validators.required],
    });
  }


  public listarTipoDocumentos() {
    this.servicioTipoDocumento.listarTodos().subscribe(res => {
      this.listaTipoDocumentos = res

    });
  }

  public listaporidClienteSc() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idCliente = params.get('id');
      this.servicioCliente.listarPorId(this.idCliente).subscribe(res => {
        this.listarCliente = res;
        console.log(this.listarCliente);
        this.formClienteSC.setValue({
          id: this.listarCliente.id,
          nombre: this.listarCliente.nombre,
          apellido: this.listarCliente.apellido,
          correo: this.listarCliente.correo,
          documento: this.listarCliente.documento,
          tipoDocumento: this.listarCliente.idTipoDocumento.id,
          telefono: this.listarCliente.telefono,
        });
      })
    })
  }

  existe: boolean = false
  listaExis: any = []
  listaTipoDoc: any = []
  public guardar() {
    this.listaExis = []
    this.listarExiste = []
    let cliente : ClienteSC2 = new ClienteSC2();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.servicioCliente.listarPorId(Number(params.get('id'))).subscribe(res=>{
        cliente.id = res.id;
        cliente.nombre = res.nombre
        cliente.apellido = res.apellido
        cliente.correo = res.correo
        cliente.documento = res.documento
        cliente.idTipoDocumento = res.idTipoDocumento.id
        cliente.telefono = res.telefono
        this.servicioCliente.listarTodos().subscribe(resClientes=>{
          const documento = this.formClienteSC.controls['documento'].value;
          const nombre = this.formClienteSC.controls['nombre'].value;
          const apellido = this.formClienteSC.controls['apellido'].value;
          const correo = this.formClienteSC.controls['correo'].value;
          const tipoDocumento = this.formClienteSC.controls['tipoDocumento'].value;
          const telefono = this.formClienteSC.controls['telefono'].value;
          if(nombre== "" || documento==null || apellido=="" || correo==""  || tipoDocumento==null || tipoDocumento==undefined|| telefono==null || telefono==undefined ||telefono==""){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Campos Vacios!',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            if(res.apellido == apellido && res.correo == correo && res.documento == documento && res.idTipoDocumento.id == tipoDocumento && res.nombre == nombre && res.telefono == telefono){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'No hubieron cambios!',
                showConfirmButton: false,
                timer: 2000
              })
              window.location.reload();
            }else if(documento != res.documento || correo != res.correo){
              this.servicioCliente.listarTodos().subscribe(resClient=>{
                resClient.forEach(element => {
                  if(res.id != element.id && documento == element.documento){
                    this.existe = true
                  }else{
                    this.existe = false
                  }
                  this.listaExis.push(this.existe)
                });
                console.log(this.listaExis)
                const existe = this.listaExis.includes( true );
                if(existe == true){
                  Swal.fire({
                    icon: 'error',
                    title: 'Ya existe un cliente con ese documento y/o correo!',
                    showConfirmButton: false,
                    timer: 1500
                  });
                }else{
                  cliente.documento = this.formClienteSC.controls['documento'].value;
                  cliente.correo = this.formClienteSC.controls['correo'].value;
                  this.actualizarCliente(cliente);
                }
              })
            }else{
              if(cliente.apellido != apellido){
                cliente.apellido = apellido
              }
              if(cliente.idTipoDocumento != tipoDocumento){
                cliente.idTipoDocumento = this.formClienteSC.controls['tipoDocumento'].value
              }
              if(cliente.nombre != nombre){
                cliente.nombre = nombre
              }
              if(cliente.telefono != telefono){
                cliente.telefono = telefono
              }
              this.actualizarCliente(cliente);
            }
          }
        })
      })
    })
  }

  public actualizarCliente(cliente: ClienteSC2) {
    this.servicioModificar.actualizarClienteSC(cliente).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cliente modificado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.crearFormulario();
      this.router.navigate(['/clientesSC']);
      window.location.reload();
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al modificar Usuario!',
        showConfirmButton: false,
        timer: 1500
      })
    });
 }


}
