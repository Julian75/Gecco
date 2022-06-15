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
  public encontrado = "";
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
      res.forEach(element => {
        if(element.documento == username){
          if(element.password == password){
            this.encontrado = "iniciar sesion"
            this.usuario = element.documento
          }else if(element.password != password){
            this.encontrado = "contraseña incorrecta"
          }
        }else if(username=="" || password==""){
          this.encontrado = "vacios"
        }else if(username != element.documento && password!= element.password){
          this.encontrado = "no registrado"
        }
      });
      if(this.encontrado == "iniciar sesion"){
        var varSesion = sessionStorage.setItem('usuario', this.usuario);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bienvenido(a)!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/vista']);
      }
      if(this.encontrado == "contraseña incorrecta"){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Digito la contraseña incorrecta!',
          showConfirmButton: false,
          timer: 1500
        })
      }
      if(this.encontrado == "no registrado"){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Este usuario no esta registrado!',
          showConfirmButton: false,
          timer: 1500
        })
      }
      if(this.encontrado == "vacios"){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Los campos estan vacios!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

}
