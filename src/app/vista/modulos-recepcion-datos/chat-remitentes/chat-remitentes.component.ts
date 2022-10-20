import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HistorialSolicitudesService } from 'src/app/servicios/historialSolicitudes.service';
import { ChatRemitente } from 'src/app/modelos/chatRemitente';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { SolicitudSCService } from 'src/app/servicios/solicitudSC.service';
import { ChatRemitenteService } from 'src/app/servicios/chatRemitente.service';
import { Correo } from 'src/app/modelos/correo';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { CorreoService } from 'src/app/servicios/Correo.service';
import { HistorialSolicitudes } from 'src/app/modelos/historialSolicitudes';
import { EstadoService } from 'src/app/servicios/estado.service';

@Component({
  selector: 'app-chat-remitentes',
  templateUrl: './chat-remitentes.component.html',
  styleUrls: ['./chat-remitentes.component.css']
})
export class ChatRemitentesComponent implements OnInit {

  public formChat!: FormGroup;
  public listaUsuario: any = [];
  public fechaActual: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private servicioHistorial: HistorialSolicitudesService,
    private servicioUsuario: UsuarioService,
    private servicioSolicitud: SolicitudSCService,
    private servicioChat: ChatRemitenteService,
    private servicioConfiguracion: ConfiguracionService,
    private servicioCorreo: CorreoService,
    private servicioEstado: EstadoService,
    public dialogRef: MatDialogRef<ChatRemitentesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarUsuarios();
  }

  private crearFormulario() {
    this.formChat = this.fb.group({
      id: 0,
      usuario: [null,Validators.required],
      asunto: [null,Validators.required],
      mensaje: [null,Validators.required],
    });
  }

  public listarUsuarios(){
    this.servicioHistorial.listarTodos().subscribe(res=>{
      res.forEach(element => {
        if(element.idSolicitudSC.id == Number(this.data) && element.observacion == ""){
          this.listaUsuario.push(element)
        }
      });
    })
  }

  public guardar(){
    document.getElementById("snipper").setAttribute("style", "display: block;");
    if(this.formChat.valid){
      var usuario = this.formChat.controls['usuario'].value;
      var asunto = this.formChat.controls['asunto'].value;
      var mensaje = this.formChat.controls['mensaje'].value;
      var logeado = sessionStorage.getItem("id");
      let chatRemitente : ChatRemitente = new ChatRemitente();
      this.servicioUsuario.listarPorId(usuario).subscribe(resRecibe=>{
        chatRemitente.idUsuarioRecibe = resRecibe
        this.servicioUsuario.listarPorId(Number(logeado)).subscribe(resEnvia=>{
          chatRemitente.idUsuarioEnvia = resEnvia
          this.servicioSolicitud.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
            chatRemitente.idSolicitudSC = resSolicitud
            chatRemitente.asunto = asunto
            chatRemitente.mensaje = mensaje
            chatRemitente.fecha = this.fechaActual
            this.guardarChat(chatRemitente);
          })
        })
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Los campos no pueden estar vacios!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("snipper").setAttribute("style", "display: none;");
    }
  }

  correo: any
  contrasena: any
  listaChat: any
  public guardarChat(chatRemitente: ChatRemitente){
    this.servicioChat.registrar(chatRemitente).subscribe(res=>{
      let historial : HistorialSolicitudes = new HistorialSolicitudes();
      historial.observacion = 'Se ha enviado un correo por parte del usuario '+chatRemitente.idUsuarioEnvia.nombre+" "+chatRemitente.idUsuarioEnvia.apellido+" para el usuario "+chatRemitente.idUsuarioRecibe.nombre+" "+chatRemitente.idUsuarioRecibe.apellido+", con el siguiente asunto y mensaje: *Asunto: "+chatRemitente.asunto+". *Mensaje: "+chatRemitente.mensaje+"."
      this.servicioSolicitud.listarPorId(Number(this.data)).subscribe(resSolicitud=>{
        historial.idSolicitudSC = resSolicitud
        this.servicioEstado.listarPorId(66).subscribe(resEstado=>{
          historial.idEstado = resEstado
          this.servicioUsuario.listarPorId(Number(sessionStorage.getItem("id"))).subscribe(resUsuario=>{
            historial.idUsuario = resUsuario
            this.registrarHistorial(historial, res)
          })
        })
      })
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar el chat!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("snipper").setAttribute("style", "display: none;");
    })
  }

  registrarHistorial(historial: HistorialSolicitudes,res){
    this.servicioHistorial.registrar(historial).subscribe(resHistorial=>{
      this.listaChat = res
      let correo : Correo = new Correo();
      this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
        resConfiguracion.forEach(elementConfi => {
          if(elementConfi.nombre == "correo_gecco"){
            this.correo = elementConfi.valor
          }
          if(elementConfi.nombre == "contraseña_correo"){
            this.contrasena = elementConfi.valor
          }
        });
        correo.correo = this.correo
        correo.contrasena = this.contrasena
        correo.to = this.listaChat.idUsuarioRecibe.correo
        correo.subject = this.listaChat.asunto
        correo.messaje = "<!doctype html>"
        +"<html>"
        +"<head>"
        +"<meta charset='utf-8'>"
        +"</head>"
        +"<body>"
        +"<h3 style='color: black;'>Revisar la solictud PQRS #"+this.listaChat.idSolicitudSC.id+"</h3>"
        +"<br>"
        +"<h3 style='color: black;'>"+this.listaChat.mensaje+"</h3>"
        +"<br>"
        +"<img src='https://i.ibb.co/JdW99PF/logo-suchance.png' style='width: 400px;'>"
        +"</body>"
        +"</html>";
        this.enviarCorreo(correo);
      })
    }, error => {
      document.getElementById("snipper").setAttribute("style", "display: none;");
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar el historial de correo!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public enviarCorreo(correo: Correo){
    this.servicioCorreo.enviar(correo).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El correo se envio exitosamente!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("snipper").setAttribute("style", "display: none;");
      this.dialogRef.close()
      window.location.reload()
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar el chat!',
        showConfirmButton: false,
        timer: 1500
      })
      document.getElementById("snipper").setAttribute("style", "display: none;");
    })
  }

}
