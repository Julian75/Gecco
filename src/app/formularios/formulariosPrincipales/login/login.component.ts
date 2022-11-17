import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import { forEach } from 'jszip';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;
  public inicioSesion = false;
  public contraseñaIncorrecta = false;
  public vacios = false;
  public noRegistrado = false;
  public listarcontraseñaIncorrecta: any = [];
  public listarVacios: any = [];
  public listarNoRegistrado: any = [];
  public listarinicioSesion: any = [];
  public usuario: any;
  public id: any = [];
  public desencriptado: any;

  constructor(
    private fb: FormBuilder,
    private servicioUsuario : UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarImagen();
  }

  private crearFormulario() {
    this.formLogin = this.fb.group({
      username: [null,Validators.required],
      password: [null,Validators.required]
    });
  }

  public listarImagen(){
    const logo = document.getElementById('logo').getAttribute('src');
    const fondo = document.getElementById('fondoImg')
    fondo?.setAttribute('style', 'background-image: url('+logo+' ); background-size: cover; width: 100vw; position: absolute; z-index: 1;')
  }
  ingresar(){
    if(this.formLogin.controls['username'].value == null){
      const username = document.getElementById('user');
      username?.animate([{ transform: 'translateX(0px)' },{ transform: 'translateX(10px)' },{ transform: 'translateX(-10px)' },{ transform: 'translateX(10px)' },{ transform: 'translateX(-10px)' },{ transform: 'translateX(10px)' },{ transform: 'translateX(-10px)' },{ transform: 'translateX(10px)' },{ transform: 'translateX(-10px)' },{ transform: 'translateX(0px)' }], {duration: 2000,iterations: 1});
    }else if(this.formLogin.controls['password'].value == null){
      const password = document.getElementById('contrasena');
      password?.animate([{ transform: 'translateX(0px)' },{ transform: 'translateX(10px)' },{ transform: 'translateX(-10px)' },{ transform: 'translateX(10px)' },{ transform: 'translateX(-10px)' },{ transform: 'translateX(10px)' },{ transform: 'translateX(-10px)' },{ transform: 'translateX(10px)' },{ transform: 'translateX(-10px)' },{ transform: 'translateX(0px)' }], {duration: 2000,iterations: 1});
    }else if(this.formLogin.value.username != null && this.formLogin.value.password != null){
      this.servicioUsuario.listarTodos().subscribe(res=>{
        const username = this.formLogin.controls['username'].value;
        const password = this.formLogin.controls['password'].value;
        const encontrarUsuario = res.find((usuario:any) => usuario.documento == username);
        if(encontrarUsuario != undefined){
          const contrasena = encontrarUsuario.password.toString();
          var bytes  = CryptoJS.AES.decrypt(contrasena, 'secret key 123');
          var decryptedData = JSON.stringify(bytes.toString(CryptoJS.enc.Utf8));
          if(decryptedData == JSON.stringify(password)){
            const encontrarActivo = res.find((usuario:any) => usuario.idEstado.id == 11);
            if(encontrarActivo){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Bienvenido(a)!',
                showConfirmButton: false,
                timer: 1500
              })
              this.usuario = encontrarUsuario.documento
              this.id = encontrarUsuario.id
              sessionStorage.setItem('usuario',this.usuario)
              sessionStorage.setItem('id',this.id)
              this.router.navigate(['/vista']);
            }else{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Usuario inactivo!!',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Contraseña incorrecta',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }else if(encontrarUsuario == undefined){
          Swal.fire({
            icon: 'error',
            title: 'Usuario no registrado',
            showConfirmButton: false,
            timer: 1500
          })
          this.formLogin.reset();
        }
      })
    }


  }
}
