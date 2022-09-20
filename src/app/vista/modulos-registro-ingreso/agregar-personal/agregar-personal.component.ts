import { Component, Inject, OnInit } from '@angular/core';
import { OficinasService } from 'src/app/servicios/serviciosSiga/oficinas.service';
import { EstadoService } from 'src/app/servicios/estado.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoPersonalEmpresaService } from 'src/app/servicios/ingresoPersonalEmpresa.service';
import { IngresoPersonalEmpresa } from 'src/app/modelos/ingresoPersonalEmpresa';
import { TipoDocumentoService } from 'src/app/servicios/tipoDocumento.service';
import { AreaService } from 'src/app/servicios/area.service';
import { SedeService } from 'src/app/servicios/sedes.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject, Observer } from 'rxjs';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregar-personal',
  templateUrl: './agregar-personal.component.html',
  styleUrls: ['./agregar-personal.component.css']
})
export class AgregarPersonalComponent implements OnInit {

  public formPersonal!: FormGroup;
  public listaOficinas: any = [];
  public listaArea: any = [];
  public listaSede: any = [];
  public listarExiste:any =[]
  color = ('primary');
  public encontrado = false;
  public listaTipoDocumentos: any = [];
  public fecha: Date = new Date();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private servicioEstado : EstadoService,
    private servicioPersonal : IngresoPersonalEmpresaService,
    private servicioOficinas : OficinasService,
    private servicioAreas : AreaService,
    private servicioSedes : SedeService,
    private servicioTipoDocumento : TipoDocumentoService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog
  ) {
    this.windowOPen = false;
  }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarTipoDocumentos();
    this.listarOficinas();
    this.listarAreas();
    this.listarSedes();
    this.validar();
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multiplesCamarasDisponibles = mediaDevices && mediaDevices.length > 1;
      });
  }

  private crearFormulario() {
    this.formPersonal = this.fb.group({
      id: 0,
      nombre: [null,Validators.required],
      apellido: [null,Validators.required],
      tipoDocumento: [null,Validators.required],
      documento: [null,Validators.required],
      area: [null,Validators.required],
      sede: [null,Validators.required],
      oficina: [null,Validators.required],
      rh: [null,Validators.required],
      telefono: [null,Validators.required],
      eps: [null,Validators.required],
      arl: [null,Validators.required],
    });
  }

  public listarTipoDocumentos() {
    this.servicioTipoDocumento.listarTodos().subscribe(res => {
      this.listaTipoDocumentos = res
      this.formPersonal.controls['documento'].setValue(this.data);
    });
  }

  public listarAreas() {
    this.servicioAreas.listarTodos().subscribe(res => {
      this.listaArea = res
    });
  }

  public listarSedes() {
    this.servicioSedes.listarTodos().subscribe(res => {
      this.listaSede = res
    });
  }

  public listarOficinas() {
    this.servicioOficinas.listarTodos().subscribe(res => {
      this.listaOficinas = res;
    });
  }

  public validar(){
    if(typeof(this.data) === 'object'){
      document.getElementById("nom").setAttribute("style", "display: none;");
      document.getElementById("tipoDoc").setAttribute("style", "display: none;");
      document.getElementById("apell").setAttribute("style", "display: none;");
      document.getElementById("doc").setAttribute("style", "display: none;");
      document.getElementById("ofic").setAttribute("style", "display: none;");
      document.getElementById("webCam").setAttribute("style", "display: none;");
      document.getElementById("sangre").setAttribute("style", "display: none;");
      document.getElementById("telef").setAttribute("style", "display: none;");
      document.getElementById("epsPer").setAttribute("style", "display: none;");
      document.getElementById("arlPer").setAttribute("style", "display: none;");
    }
  }

  public guardar() {
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    let personal : IngresoPersonalEmpresa = new IngresoPersonalEmpresa();
    if(typeof(this.data) === 'object'){
      const idArea = this.formPersonal.controls['area'].value;
      const idSede = this.formPersonal.controls['sede'].value;
      if(idArea==null || idSede==null || idArea==undefined || idSede==undefined){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Los campos estan vacios!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        personal.nombre = this.data['nombre'];
        personal.apellido = this.data['apellido'];
        personal.documento = this.data['documento'];
        personal.fecha = this.fecha
        personal.idTipoDocumento = this.data['idTipoDocumento'];
        personal.ideOficina = this.data['ideOficina'];
        personal.nombreImagen = this.data['nombreImagen']
        personal.rh = this.data['rh']
        personal.telefono = this.data['telefono']
        personal.eps = this.data['eps']
        personal.arl = this.data['arl']
        this.servicioEstado.listarPorId(72).subscribe(resEstado => {
          personal.idEstado = resEstado
          this.servicioAreas.listarPorId(idArea).subscribe(resArea => {
            personal.idArea = resArea
            this.servicioSedes.listarPorId(idSede).subscribe(resSede => {
              personal.idSedes = resSede
              if(this.fecha.getMinutes() < 10){
                personal.horaIngreso= this.fecha.getHours()+":0"+this.fecha.getMinutes()
              }else{
                personal.horaIngreso = this.fecha.getHours()+":"+this.fecha.getMinutes()
              }
              personal.horaSalida = ""
              this.registrarPersonal2(personal);
            })
          })
        });
      }
    }else{
      this.listarExiste = []
      if(this.formPersonal.valid && (this.imagenWebcam != null || this.imagenWebcam != undefined)){
        this.createBlobImageFileAndShow();
        const nombre = this.formPersonal.controls['nombre'].value;
        const apellido = this.formPersonal.controls['apellido'].value;
        const nombres = nombre.split(" ");
        const apellidos = apellido.split(" ");
        for (let i = 0; i < nombres.length; i++) {
          nombres[i] = nombres[i].charAt(0).toUpperCase() + nombres[i].substring(1).toLowerCase();
          personal.nombre = nombres.join(" ");
        }
        for (let i = 0; i < apellidos.length; i++) {
          apellidos[i] = apellidos[i].charAt(0).toUpperCase() + apellidos[i].substring(1).toLowerCase();
          personal.apellido = apellidos.join(" ");
        }
        personal.ideOficina = Number(this.formPersonal.controls['oficina'].value);
        const documento = this.formPersonal.controls['documento'].value;
        this.servicioPersonal.listarTodos().subscribe(res=>{
          for (let i = 0; i < res.length; i++) {
            if(res[i].documento == documento){
              this.encontrado = true
            }else{
              this.encontrado = false
            }
            this.listarExiste.push(this.encontrado)
          }
          const existe = this.listarExiste.includes(true)
          if(existe == false){
            personal.documento = this.formPersonal.controls['documento'].value;
            personal.rh = this.formPersonal.controls['rh'].value;
            personal.telefono = this.formPersonal.controls['telefono'].value;
            personal.eps = this.formPersonal.controls['eps'].value;
            personal.arl = this.formPersonal.controls['arl'].value.toUpperCase();
            this.servicioEstado.listarPorId(72).subscribe(res => {
              personal.idEstado = res
              const idTipoDocumento = this.formPersonal.controls['tipoDocumento'].value;
              this.servicioTipoDocumento.listarPorId(idTipoDocumento).subscribe(res => {
                personal.idTipoDocumento = res
                const idArea = this.formPersonal.controls['area'].value;
                this.servicioAreas.listarPorId(idArea).subscribe(res => {
                  personal.idArea = res
                  const idSede = this.formPersonal.controls['sede'].value;
                  this.servicioSedes.listarPorId(idSede).subscribe(res => {
                    personal.idSedes = res
                    personal.horaSalida = ""
                    personal.fecha = this.fecha
                    personal.nombreImagen = this.imagen.name
                    if(this.fecha.getMinutes() < 10){
                      personal.horaIngreso = this.fecha.getHours()+":"+("0"+this.fecha.getMinutes())
                    }else{
                      personal.horaIngreso = this.fecha.getHours()+":"+this.fecha.getMinutes()
                    }
                    if(personal.nombre==null || personal.apellido==null || personal.documento<=0 || personal.nombre=="" || personal.apellido=="" || personal.idEstado==null || personal.idTipoDocumento==null || personal.idArea==null || personal.idSedes==null || personal.idEstado==undefined || personal.idTipoDocumento==undefined || personal.idArea==undefined || personal.idSedes==undefined){
                      Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'El campo esta vacio!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    }else{
                      this.registrarPersonal(personal);
                    }
                  })
                });
              })
            })
          }
          if(existe == true){
            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ya existe un personal registrado con ese número de documento!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }else{
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Campos Vacios!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  public registrarPersonal(personal: IngresoPersonalEmpresa) {
    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    this.servicioPersonal.registrar(personal).subscribe(res=>{
      this.uploadFiles();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Personal Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
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

  public registrarPersonal2(personal: IngresoPersonalEmpresa) {
    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    this.servicioPersonal.registrar(personal).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Personal Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload()
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

  percentDone: number;
  uploadSuccess: boolean;
  uploadFiles(){
    var formData = new FormData();
    var lista = []
    lista.push(this.imagen)
    Array.from(lista).forEach(f => formData.append('imagenes',f))
    this.http.post('http://localhost:9000/api/Pdf/subirImagen', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          window.location.reload();
        }
    });
  }

  //Camara

  // Hacer Toogle on/off
  public mostrarWebcam = true;
  public permitirCambioCamara = true;
  public multiplesCamarasDisponibles = false;
  public dispositivoId: string;
  public opcionesVideo: MediaTrackConstraints = {
    //width: {ideal: 1024};
    //height: {ideal: 576}
  }

  // Errores al iniciar la cámara
  public errors: WebcamInitError[] = [];

  // Ultima captura o foto
  public imagenWebcam: WebcamImage = null;

  // Cada Trigger para una nueva captura o foto
  public trigger: Subject<void> = new Subject<void>();

  // Cambiar a la siguiente o anterior cámara
  private siguienteWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public triggerCaptura(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.mostrarWebcam = !this.mostrarWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOnDeviceId: boolean|string): void {
    this.siguienteWebcam.next(directionOnDeviceId);
  }

  public handleImage(imagenWebcam: WebcamImage): void {
    this.imagenWebcam = imagenWebcam;
  }

  public cameraSwitched(dispositivoId: string): void {
    this.dispositivoId = dispositivoId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.siguienteWebcam.asObservable();
  }

  //Convertir base64 a imagen

  generatedImage: string;
  windowOPen: boolean;
  public imagen: any;

  /**Method that will create Blob and show in new window */
  createBlobImageFileAndShow(): void {
    this.dataURItoBlob(this.imagenWebcam.imageAsBase64).subscribe((blob: Blob) => {
      const imageBlob: Blob = blob;
      const imageName: string = this.generateName();
      const imageFile: File = new File([imageBlob], imageName, {
        type: 'image/jpeg',
      });
      this.imagen = imageFile
      this.generatedImage = window.URL.createObjectURL(imageFile);
      // on demo image not open window
      if (this.windowOPen) {
        window.open(this.generatedImage);
      }
    });
  }

  /**Method to Generate a Name for the Image */
  generateName(): string {
    let nombreImagen: string = '';
    const nombre = this.formPersonal.controls['nombre'].value;
    const apellido = this.formPersonal.controls['apellido'].value;
    const documento = this.formPersonal.controls['documento'].value;
    nombreImagen += documento+"-"+nombre+"-"+apellido
    // Replace extension according to your media type like this
    return nombreImagen + '.jpeg';
  }

  /* Method to convert Base64Data Url as Image Blob */
  dataURItoBlob(dataURI: string): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      observer.next(blob);
      observer.complete();
    });
  }

}
