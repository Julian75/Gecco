import { Component, OnInit } from '@angular/core';
import { SubirPdfService } from 'src/app/servicios/subirPdf.service';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Firmas } from 'src/app/modelos/firmas';
import { FirmasService } from 'src/app/servicios/Firmas.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-firmas',
  templateUrl: './agregar-firmas.component.html',
  styleUrls: ['./agregar-firmas.component.css']
})
export class AgregarFirmasComponent implements OnInit {

  public listaUsuarios: any = [];
  public encontrados: any = [];

  color = ('primary');
  public formFirmas!: FormGroup;
  // PDF
  //Lista de archivos seleccionados
  selectedFiles!: FileList;
  public listaArchivos: any = []
  public listaArchivos2: any = []
  public idCotizacion: any = []
  public nombresExistentes: any = []
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  public progressInfo: any = []
  public encontrado: boolean = false
  public listarExiste: any = []
  public listarExiste2: any = []
  public encontrado2: boolean = false
  public encontrado3: boolean = false
  //Mensaje que almacena la respuesta de las Apis
  public message: String = '';
  //Nombre del archivo para usarlo posteriormente en la vista html
  public fileName: String = "";
  fileInfos!: Observable<any>;

  constructor(
    private servicioSubirPdf : SubirPdfService,
    private fb: FormBuilder,
    private http: HttpClient,
    private servicioUsuarios: UsuarioService,
    private servicioFirma: FirmasService,
    public dialogRef: MatDialogRef<AgregarFirmasComponent>,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.listarUsuarios();
    this.fileInfos = this.servicioSubirPdf.listarTodos();
  }

  private crearFormulario() {
    this.formFirmas = this.fb.group({
      id: 0,
      usuario: [null,Validators.required],
    });
  }

  public listarUsuarios(){
    this.servicioUsuarios.listarTodos().subscribe(res=>{
      this.listaUsuarios = res
    })
  }

  public w: any
  selectFiles(event): void {
    var w = event.target.files
    this.w = w
    this.listaArchivos = []
    this.listaArchivos.push(w)
    this.listaArchivos2 = []
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.listaArchivos.forEach(element => {
      for (let index = 0; index < element.length; index++) {
        const element1 = element[index];
        this.listaArchivos2.push(element1.name)
      }
    });
  }

  percentDone: number;
  uploadSuccess: boolean;
  uploadFiles(files: File[]){
    console.log(this.w)
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('files',f))
    // http://localhost:9000/api/Pdf/guardarFirma
    // http://10.192.110.105:8080/geccoapi-2.7.0/api/Pdf/guardarFirma
    this.http.post('http://localhost:9000/api/Pdf/subirFirma', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          this.dialogRef.close();
          window.location.reload();
        }
    });
  }

  public guardar(){
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.encontrados = [];
    let firmas : Firmas = new Firmas();
    const usuario = this.formFirmas.controls['usuario'].value;
    console.log(this.w)
    if(usuario != null || usuario != undefined && this.w != null || this.w != undefined){
      this.servicioFirma.listarTodos().subscribe(resFirma => {
        resFirma.forEach(element => {
          if(this.formFirmas.value.usuario == element.idUsuario.id){
            this.encontrado = true;
          }else{
            this.encontrado = false;
          }
          this.encontrados.push(this.encontrado);
        })
        const encontrado = this.encontrados.includes(true);
        if(encontrado == true){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La firma de ese usuario ya existe!',
            showConfirmButton: false,
            timer: 1500
          })
          this.dialogRef.close();
          window.location.reload();
        }else{
          this.servicioUsuarios.listarPorId(usuario).subscribe(resUsuario=>{
            firmas.idUsuario = resUsuario;
            for (let i = 0; i < this.listaArchivos2.length; i++) {
              const element = this.listaArchivos2[i];
              firmas.firma = element
              console.log(element)
              this.registrarFirma(firmas);
            }
          })
        }
      })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El campo está vacio o no ha subido alguna firma!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public registrarFirma(firma: Firmas) {
    this.servicioFirma.registrar(firma).subscribe(res=>{
      this.uploadFiles(this.w);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Firma Registrado!',
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
      this.dialogRef.close();
      window.location.reload();
    });
  }

}
