import { ClienteSC } from './../../../../modelos/clienteSC';
import { Router } from '@angular/router';
import { TipoDocumentoService } from './../../../../servicios/tipoDocumento.service';
import { ClienteSCService } from './../../../../servicios/clienteSC.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cliente-sc-modal',
  templateUrl: './agregar-cliente-sc-modal.component.html',
  styleUrls: ['./agregar-cliente-sc-modal.component.css']
})
export class AgregarClienteScModalComponent implements OnInit {
  public formClienteSC!: FormGroup;
  public listaTipoDocumentos: any = [];
  public listarExiste:any =[]
  color = ('primary');
  public encontrado = false;

  constructor(
    private fb: FormBuilder,
    private servicioClienteSC: ClienteSCService,
    private servicioTipoDocumento : TipoDocumentoService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
    this.listarTipoDocumentos();
  }

  private crearFormulario() {
    this.formClienteSC = this.fb.group({
      id: 0,
      nombre: [null,Validators.required],
      tipoDocumento: [null,Validators.required],
      correo: [null,Validators.required],
      apellido: [null,Validators.required],
      documento: [null,Validators.required],
      telefono: [null,Validators.required],
    });
  }

  public listarTipoDocumentos() {
    this.servicioTipoDocumento.listarTodos().subscribe(res => {
      this.listaTipoDocumentos = res
    });
  }

  public guardar() {
    let clienteSC : ClienteSC = new ClienteSC();
    clienteSC.nombre = this.formClienteSC.controls['nombre'].value;
    clienteSC.apellido = this.formClienteSC.controls['apellido'].value;
    clienteSC.documento = this.formClienteSC.controls['documento'].value;
    clienteSC.correo = this.formClienteSC.controls['correo'].value;
    clienteSC.telefono = this.formClienteSC.controls['telefono'].value;
    var idTipoDocumento = this.formClienteSC.controls['tipoDocumento'].value;
    console.log(clienteSC.documento)
    if (clienteSC.nombre == "" || clienteSC.apellido == "" || clienteSC.documento == null || clienteSC.correo == null || clienteSC.telefono == null || idTipoDocumento == null) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ningun campo debe estar vacio.',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      this.servicioClienteSC.listarTodos().subscribe(res=>{
        for (let i = 0; i < res.length; i++) {
          if(res[i].documento == clienteSC.documento || res[i].correo == clienteSC.correo){
            this.encontrado = true
          }else{
            this.encontrado = false
          }
          this.listarExiste.push(this.encontrado)
        }
        const existe = this.listarExiste.includes(true)
        if(existe == true){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Este cliente ya existe!',
            showConfirmButton: false,
            timer: 1500
          })
        }else if(existe == false){
          this.servicioTipoDocumento.listarPorId(idTipoDocumento).subscribe(resTipoDocumentos=>{
            clienteSC.idTipoDocumento = resTipoDocumentos
            console.log(clienteSC)
            this.registrarClienteSC(clienteSC)
          })
        }
      })
    }
  }

  public registrarClienteSC(clienteSC: ClienteSC) {
    this.servicioClienteSC.registrar(clienteSC).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cliente Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
      this.router.navigate(['/clientesSC']);
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
