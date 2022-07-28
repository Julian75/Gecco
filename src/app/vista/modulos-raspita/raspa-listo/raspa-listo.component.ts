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

@Component({
  selector: 'app-raspa-listo',
  templateUrl: './raspa-listo.component.html',
  styleUrls: ['./raspa-listo.component.css']
})
export class RaspaListoComponent implements OnInit {
  public formRaspita!: FormGroup;
  public listarExisteGecco: any = [];
  public listarExisteSiga: any = [];
  public listaRaspasSiga: any = [];
  public lista: any = [];
  public fecha: Date = new Date();
  color = ('primary');
  constructor(
    private fb: FormBuilder,
    public servicioRaspasDTO: RaspasDTOService,
    public servicioRaspaGecco: RaspasService,
    public servicioRaspaGeccoConsulta: ConsultasGeneralesService,
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formRaspita = this.fb.group({
      id: 0,
      raspita: [null,Validators.required],
    });
  }

  existeRaspaGecco: boolean = false
  existeRaspaSiga: boolean = false
  public guardarRaspa(even:Event, key:any){
    if(key == 'Enter'){
      var fechaActual = ""
      const codRaspa = this.formRaspita.controls['raspita'].value;
      if(this.fecha.getMonth()+1<=9){
        fechaActual = this.fecha.getFullYear()+""+("0"+(this.fecha.getMonth()+1))+""+this.fecha.getDate()
      }else{
        fechaActual = this.fecha.getFullYear()+""+(this.fecha.getMonth()+1)+""+this.fecha.getDate()
      }
      this.existeRaspaSiga = false
      this.existeRaspaGecco = false
      this.servicioRaspasDTO.listarPorId(fechaActual, codRaspa).subscribe(resRaspaDTo=>{
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
              this.servicioRaspasDTO.listarPorId(fechaActual, codRaspa).subscribe(resRaspaDTo=>{
                console.log(resRaspaDTo)
                resRaspaDTo.forEach(element => {
                  let raspita : Raspas = new Raspas();
                  raspita.fecPago = element.fec_pago
                  raspita.fecVenta = element.fec_venta
                  if(element.ideEstado == 28){
                    raspita.estado = element.ideEstado
                    raspita.ideOficina = element.ideOficina
                    raspita.raspa = codRaspa
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
        title: 'Se ha resgitrado el raspita!',
        showConfirmButton: false,
        timer: 1500
      })
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

  public reporte() {
    var verificar = false
    this.lista=[]
    var fechaActual = ""
    if(this.fecha.getMonth()+1<=9){
      fechaActual = this.fecha.getFullYear()+""+("0"+(this.fecha.getMonth()+1))+""+this.fecha.getDate()
    }else{
      fechaActual = this.fecha.getFullYear()+""+(this.fecha.getMonth()+1)+""+this.fecha.getDate()
    }
    document.getElementById('snipper')?.setAttribute('style', 'display: block;')
    this.servicioRaspasDTO.listarTodos(fechaActual).subscribe(resRaspaSiga=>{
      for (let index = 0; index < resRaspaSiga.length; index++) {
        const elementSiga = resRaspaSiga[index];
        this.servicioRaspaGecco.listarTodos().subscribe(resRaspaGecco=>{
          for (let index = 0; index < resRaspaGecco.length; index++) {
            const elementGecco = resRaspaGecco[index];
            if (elementSiga.raspa != elementGecco.raspa) {
              var objeto = {
                fechaVenta: elementSiga.fec_venta,
                fechaPago: elementSiga.fec_pago,
                idOficina: elementSiga.ideOficina,
                idEstado: elementSiga.ideEstado,
                raspa: elementSiga.raspa
              }
              this.lista.push(objeto)
            }else if(elementSiga.raspa == elementGecco.raspa){
              Swal.fire({
                title: 'Ya estan',
                text: '',
                icon: 'warning',
                confirmButtonText: 'Ok'
              })
            }
            break
          }
        })
      }
      if (this.lista.length == 0){
        Swal.fire({
          title: 'No se encontraron resultados',
          text: '',
          icon: 'warning',
          confirmButtonText: 'Ok'
        })
        document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      }else{
        this.exportToExcel(this.lista);
      }
    })
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
    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
  }

}
