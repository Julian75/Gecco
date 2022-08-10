import { ConfiguracionService } from './../../../servicios/configuracion.service';
import { Correo } from './../../../modelos/correo';
import { CorreoService } from './../../../servicios/Correo.service';
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
  public correo: any;
  public contrasena: any;

  constructor(
    private fb: FormBuilder,
    private httpclien : HttpClient,
    private servicioUsuario: UsuarioService,
    private corroService: CorreoService,
    private servicioConfiguracion: ConfiguracionService
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
    const documento = Number(this.formCorreo.controls['documento'].value);
    const correo = this.formCorreo.controls['correo'].value;
    this.servicioUsuario.listarTodos().subscribe( res =>{
      for (let i = 0; i < res.length; i++) {
        if(documento == res[i].documento && correo == res[i].correo){
          this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
            resConfiguracion.forEach(elementConfi => {
              if(elementConfi.nombre == "correo_gecco"){
                this.correo = elementConfi.valor
              }
              if(elementConfi.nombre == "contraseña_correo"){
                this.contrasena = elementConfi.valor
              }
            });
            console.log(this.correo)
            correo.correo = this.correo
            correo.contrasena = this.contrasena
            var datosCorreo: Correo =  new Correo()
            datosCorreo.to = correo
            datosCorreo.subject = "Olvido De Contraseña"
            datosCorreo.messaje = "<!doctype html>"
              +"<html>"
              +"<head>"
              +"<meta charset='utf-8'>"
              +"</head>"
              +"<body>"
              +"<h3 style='color: black;'>Has realizado una solicitud para el cambio de contraseña</h3>"
              +"<h3 style='color: black;'>Para completar tu cambio de contraseña, oprime el boton de abajo!!</h3>"
              +"<a href='http://localhost/cambiarContrasena'"
              +"style='text-decoration: none;"
              +"padding: 10px;"
              +"font-weight: 600;"
              +"font-size: 20px;"
              +"color: #ffffff;"
              +"background-color: #00235C;"
              +"border-radius: 6px;"
              +"box-shadow: 0 2px 3px #ffffff;"
              +"pointer-events: all;"
              +"'"
              +">Cambiar contraseña</a>"
              +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='margin-top: 30px; width: 400px;'>"
              +"</body>"
              +"</html>";
            this.corroService.enviar(datosCorreo).subscribe(res => {})
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se ha enviado un correo con el enlace para cambiar la contraseña',
              showConfirmButton: false,
              timer: 1800
            })
            window.location.reload()
          })
        }
      }
    })
  }

}
