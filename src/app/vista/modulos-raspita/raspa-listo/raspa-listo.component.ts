import { Observable } from 'rxjs';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RaspasDTOService } from 'src/app/servicios/serviciosSiga/raspasDTO.service';
import { RaspasService } from 'src/app/servicios/raspas.service';
import { Raspas } from './../../../modelos/raspas';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { SigaRaspasService } from 'src/app/servicios/sigaRaspas.service';

@Component({
  selector: 'app-raspa-listo',
  templateUrl: './raspa-listo.component.html',
  styleUrls: ['./raspa-listo.component.css']
})
export class RaspaListoComponent implements OnInit {
  public formRaspita!: FormGroup;
  public listarExisteGecco: any = [];
  public listaCompleta: any = [];
  public listarExisteSiga: any = [];
  public listaRaspasSiga: any = [];
  public listaSiga: any = [];
  public listaGecco: any = [];
  public lista: any = [];
  public lista2: any = [];
  public lista3: any = [];

  public fecha: Date = new Date();
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public servicioRaspasDTO: RaspasDTOService,
    public servicioRaspaGecco: RaspasService,
    public servicioRaspaGeccoConsulta: ConsultasGeneralesService,
    public servicioSigaRaspaGecco: SigaRaspasService
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formRaspita = this.fb.group({
      id: 0,
      raspita: [null,Validators.required],
      fechaInicio: [null,Validators.required],
      fechaFinal: [null,Validators.required],
    });
  }

  existeRaspaGecco: boolean = false
  existeRaspaSiga: boolean = false
  public guardarRaspa(even:Event, key:any){
    if(key == 'Enter'){
      var fechaActual = ""
      const codRaspa = this.formRaspita.controls['raspita'].value;
      if(this.fecha.getMonth()+1<=9){
        if(this.fecha.getDate() <= 9){
          fechaActual = this.fecha.getFullYear()+""+("0"+(this.fecha.getMonth()+1))+""+("0"+this.fecha.getDate())
        }else{
          fechaActual = this.fecha.getFullYear()+""+("0"+(this.fecha.getMonth()+1))+""+this.fecha.getDate()
        }
      }else{
        if(this.fecha.getDate() <= 9){
          fechaActual = this.fecha.getFullYear()+""+(this.fecha.getMonth()+1)+""+("0"+this.fecha.getDate())
        }else{
          fechaActual = this.fecha.getFullYear()+""+(this.fecha.getMonth()+1)+""+this.fecha.getDate()
        }
      }
      var fechaInicio = '20220701'
      this.existeRaspaSiga = false
      this.existeRaspaGecco = false
      this.servicioRaspasDTO.listarPorId(fechaInicio, fechaActual, codRaspa).subscribe(resRaspaDTo=>{
        if(resRaspaDTo.length<1){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Este raspita no existe en siga!',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          this.servicioRaspaGeccoConsulta.listarRaspaGeco(codRaspa).subscribe(resRaspaGecco=>{
            console.log(resRaspaGecco)
            if(resRaspaGecco.length<1){
              this.servicioRaspasDTO.listarPorId(fechaInicio, fechaActual, codRaspa).subscribe(resRaspaDTo=>{
                console.log(resRaspaDTo)
                resRaspaDTo.forEach(element => {
                  let raspita : Raspas = new Raspas();
                  raspita.fecPago = element.fec_pago
                  raspita.fecVenta = element.fec_venta
                  if(element.ideEstado == 28){
                    raspita.estado = element.ideEstado
                    raspita.ideOficina = element.ideOficina
                    raspita.raspa = codRaspa
                    raspita.nombres = element.nombres
                    raspita.apellido1 = element.apellido1
                    raspita.emision_raspa = element.emision_raspa
                    const swalWithBootstrapButtons = Swal.mixin({
                      customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                      },
                      buttonsStyling: false
                    })
                    swalWithBootstrapButtons.fire({
                      title: 'Esta Seguro?',
                      text: "No tiene reversa esa petición!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Si, agregar!',
                      cancelButtonText: 'No, cancelar!',
                      reverseButtons: true
                    }).then((result) => {
                      if (result.isConfirmed) {
                        this.registrarRaspita(raspita)
                      } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                      ) {
                        swalWithBootstrapButtons.fire(
                          'Cancelado',
                          'No se registro el raspita',
                          'error'
                        )
                      }
                    })
                  }else{
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'Aun no ha sido entregado',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  }
                });
              })
            }else{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Este raspita ya existe en gecco!',
                showConfirmButton: false,
                timer: 1500
              })
            }
        })
        }
      })
    }
  }

  public registrarRaspita(raspita: Raspas){
    this.servicioRaspaGecco.registrar(raspita).subscribe(resRaspita=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha registrado el raspita!',
        showConfirmButton: false,
        timer: 1500
      })
      this.crearFormulario();
      window.location.reload()
    }, error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Hubo un error al agregar raspita!',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  num:any
  public reporte() {
    this.lista=[]
    // var fechaActual = ""
    const fechaI = new Date(this.formRaspita.controls['fechaInicio'].value);
    const fechaF = new Date(this.formRaspita.controls['fechaFinal'].value);
    fechaI.setDate(fechaI.getDate()+1)
    fechaF.setDate(fechaF.getDate()+1)
    var fechaInicio = fechaI.getFullYear()+""+(fechaI.getMonth()+1)+""+fechaI.getDate()
    var fechaFinal = fechaF.getFullYear()+""+(fechaF.getMonth()+1)+""+fechaF.getDate()
    if(fechaI.getMonth()<=9 ){
      if(fechaI.getDate()<=9){
        fechaInicio = fechaI.getFullYear()+""+("0"+(fechaI.getMonth()+1))+""+("0"+fechaI.getDate())
      }else{
        fechaInicio = fechaI.getFullYear()+""+("0"+(fechaI.getMonth()+1))+""+fechaI.getDate()
      }
    }
    if(fechaF.getMonth()<=9){
      if(fechaF.getDate()<=9){
        fechaFinal = fechaF.getFullYear()+""+("0"+(fechaF.getMonth()+1))+""+("0"+fechaF.getDate())
      }else{
        fechaFinal = fechaF.getFullYear()+""+("0"+(fechaF.getMonth()+1))+""+fechaF.getDate()
      }
    }
    console.log(fechaI.getFullYear())
    if(fechaI.getFullYear() == 1970 || fechaF.getFullYear() == 1970){
      Swal.fire({
        title: 'Las fechas no pueden estar vacias!',
        text: '',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      this.crearFormulario();
    }else{
      if(fechaI>fechaF){
        Swal.fire({
          title: 'Fechas inválidas!',
          text: '',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
        this.crearFormulario();
      }else{
        document.getElementById('snipper')?.setAttribute('style', 'display: block;')
        this.servicioRaspasDTO.listarTodos(fechaInicio, fechaFinal).subscribe(resRaspaSiga=>{
          this.listaRaspasSiga = resRaspaSiga
          if(this.listaRaspasSiga.length == 0){
            Swal.fire({
              title: 'No existen datos entre el rango de fechas!',
              text: '',
              icon: 'warning',
              confirmButtonText: 'Ok'
            })
            this.crearFormulario();
            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
          }else{
            this.servicioSigaRaspaGecco.registrar(this.listaRaspasSiga).subscribe(resRaspaSigaGecco=>{
              this.servicioRaspaGeccoConsulta.listarRaspaConsultaNoGecco().subscribe(resListaNoSiga=>{
                this.lista = resListaNoSiga
                this.lista.forEach(element => {
                  var fechaPago = new Date(element.fec_pago)
                  fechaPago.setDate(fechaPago.getDate()+2)
                  var fechaVenta = new Date(element.fec_venta)
                  fechaVenta.setDate(fechaVenta.getDate()+2)
                  var obj = {
                    id: element.id,
                    estado: element.estado,
                    fecha_pago: fechaPago,
                    fecha_venta: fechaVenta,
                    ideOficina: element.ide_oficina,
                    raspa: element.raspa,
                    emision_raspa: element.emision_raspa,
                    nombre_cajero: element.nombres+" "+element.apellido1
                  }
                  this.listaCompleta.push(obj)
                });
                this.exportToExcel(this.listaCompleta);
              })
            })
          }
        })
      }
    }
  }

  name = 'raspas.xlsx';
  public exportToExcel(lista:any): void {
    if (lista.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(lista);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "ExportExcel");
      });
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    this.crearFormulario();
    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
    this.servicioSigaRaspaGecco.eliminar().subscribe(resVacio=>{
    })

  }

}
