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
        console.log(username)
        const password = this.formLogin.controls['password'].value;
        console.log(password)
        res.forEach(element => {
          console.log(element)
          if(element.documento == username){
            const contrasena = element.password.toString()
            var bytes  = CryptoJS.AES.decrypt(contrasena, 'secret key 123');
            var decryptedData = JSON.stringify(bytes.toString(CryptoJS.enc.Utf8));
            console.log(decryptedData, JSON.stringify(password))
            if(decryptedData == JSON.stringify(password)){
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
            }else if(element.password != password){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Digito la contraseña incorrecta!',
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
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'No existe ese usuario!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      })


  }
}
