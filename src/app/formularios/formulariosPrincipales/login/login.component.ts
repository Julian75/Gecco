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
  }

  private crearFormulario() {
    this.formLogin = this.fb.group({
      username: [null,Validators.required],
      password: [null,Validators.required]
    });
  }

  ingresar(){
      this.servicioUsuario.listarTodos().subscribe(res=>{
        const username = this.formLogin.controls['username'].value;
        const password = this.formLogin.controls['password'].value;
        res.forEach(element => {
          if(element.documento == username){
            const contrasena = element.password.toString()
            var bytes  = CryptoJS.AES.decrypt(contrasena, 'secret key 123');
            var decryptedData = JSON.stringify(bytes.toString(CryptoJS.enc.Utf8));
            if(decryptedData == JSON.stringify(password)){
              if(element.idEstado.id == 11){
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Bienvenido(a)!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.usuario = element.documento
                this.id = element.id
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
            }else if(element.password != password){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Digitó la contraseña incorrecta!',
                showConfirmButton: false,
                timer: 1500
              })
            }
          }else if(username=="" || password==""){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Los campos estan vacios!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      })


  }
}
