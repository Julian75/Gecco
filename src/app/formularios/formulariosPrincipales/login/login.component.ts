import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

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
      for (let index = 0; index < res.length; index++) {
        const element = res[index];
        if(element.documento == username){
          const usuario = element
          if(usuario.password == password){

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Bienvenido(a)!',
              showConfirmButton: false,
              timer: 1500
            })
            this.usuario = usuario.documento
            sessionStorage.setItem('usuario',this.usuario)
            this.router.navigate(['/vista']);
            break
          }else if(element.password != password){
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Digito la contraseña incorrecta!',
              showConfirmButton: false,
              timer: 1500
            })
            break
          }
          break
        }else if(username=="" || password==""){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Los campos estan vacios!',
            showConfirmButton: false,
            timer: 1500
          })
          break
        }else if(username !== element.documento){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Este usuario no esta registrado!',
            showConfirmButton: false,
            timer: 1500
          })
          break
        }
        break
      }
    })
  }

}
