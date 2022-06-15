import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-olvido-contrasena',
  templateUrl: './olvido-contrasena.component.html',
  styleUrls: ['./olvido-contrasena.component.css']
})
export class OlvidoContrasenaComponent implements OnInit {

  public formCorreo!: FormGroup;
  public listarUsuarios: any = [];

  constructor(
    private fb: FormBuilder,
    private httpclien : HttpClient,
    private servicioUsuario: UsuarioService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formCorreo = this.fb.group({
      id: 0,
      documento: [null,Validators.required],
      correo: [null,Validators.required],
    });
  }

  public enviarCorreo () {
    const documento = this.formCorreo.controls['documento'].value;
    const correo = this.formCorreo.controls['correo'].value;
    this.servicioUsuario.listarTodos().subscribe( res =>{
      for (let i = 0; i < res.length; i++) {
        if(documento == res[i].documento && correo == res[i].correo){
          let parametros ={
            email: correo,
            asunto: 'OLVIDO DE CONTRASEÑA',
            mensaje:`<!doctype html>
            <html>
              <head>
                <meta charset="utf-8">
              </head>
              <body>
                <p>Has realizado una solicitud para el cambio de contraseña</p>
                <h3>Para completar tu cambio de contraseña, oprime el boton de abajo!!</h3>
                <a href="http://localhost:4200/cambiarContrasena"
                style="text-decoration: none;
                    padding: 10px;
                    font-weight: 600;
                    font-size: 20px;
                    color: #ffffff;
                    background-color: #FFB633;
                    border-radius: 6px;
                    box-shadow: 0 2px 3px #ffffff;
                    pointer-events: all;
                    "
                >Cambiar contraseña</a>
              </body>
            </html>`,
          }
          console.log(parametros)
          this.httpclien.post('http://localhost:3500/envio',parametros).subscribe(resp=>{
            console.log(resp)
          })
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se ha enviado un correo con el enlace para cambiar la contraseña',
              showConfirmButton: false,
              timer: 1800
            })
        }
      }
    })
  }

}
