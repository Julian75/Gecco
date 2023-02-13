import { ModificarService } from './../../../../servicios/modificar.service';
import { ConsultasGeneralesService } from 'src/app/servicios/consultasGenerales.service';
import { startWith, Observable, map } from 'rxjs';
import { LibroMayor } from './../../../../modelos/libroMayor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { LibroMayorService } from 'src/app/servicios/libroMayor.service';
import Swal from 'sweetalert2';
import { Cuentas } from 'src/app/modelos/cuentas';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { LibroMayor2 } from 'src/app/modelos/modelos2/libroMayor2';
import { JerarquiaCuentasService } from 'src/app/servicios/jerarquiaCuentas.service';

@Component({
  selector: 'app-agregar-libro-mayor',
  templateUrl: './agregar-libro-mayor.component.html',
  styleUrls: ['./agregar-libro-mayor.component.css']
})
export class AgregarLibroMayorComponent implements OnInit {
  public formLibroMayor!: FormGroup;
  public listCuentas: any = [];
  public listaCuentas: any = [];
  public encontrados: any = [];
  public encontrado: any;
  myControl = new FormControl<string | Cuentas>("");
  color = ('primary');
  excelData: any

  constructor(
    private fb: FormBuilder,
    private servicioLibroMayor: LibroMayorService,
    private servicioCuentas: CuentasService,
    private servicioConsultasGenerales: ConsultasGeneralesService,
    private servicioModificar: ModificarService,
    private servicioJerarquiaCuenta: JerarquiaCuentasService,
  ) { }


  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.formLibroMayor = this.fb.group({
      id: 0,
      fecha: [null,Validators.required],
    });
  }

  file: any
  fileReader: any
  workBook: any
  sheetName: any
  public readExcel(event: any){
    this.file = event.target.files[0];

    this.fileReader = new FileReader();
    this.fileReader.readAsBinaryString(this.file);

    this.fileReader.onload = (e)=>{
      this.workBook = XLSX.read(this.fileReader.result,{type:'binary'})
      this.sheetName = this.workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(this.workBook.Sheets[this.sheetName[0]])
    }
  }

  cuentaList: any = []
  cuentasFaltantes: any = []
  public guardar() {
    if(this.excelData == undefined || this.formLibroMayor.value.fecha == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Campos Vacios!',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger mx-5'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro de cargar el archivo?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Subir!',
        cancelButtonText: 'No, Cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById('snipper')?.setAttribute('style', 'display: block;')
          for (let index = 0; index < this.excelData.length; index++) {
            console.log("leyendo excel")
            const elementData = this.excelData[index];
            let libroMayor : LibroMayor = new LibroMayor();
            let libroMayorActualizar : LibroMayor2 = new LibroMayor2();
            var fecha = this.formLibroMayor.value.fecha.split('-');
            var fechaLibroMayor = libroMayor.fecha.toISOString().slice(0,10)
            console.log(elementData)
            this.servicioConsultasGenerales.listarCuenta(Number(elementData.codigo)).subscribe(resCuenta=>{
              console.log("reviso si existe la cuenta", resCuenta)
              if(resCuenta.length > 0){
                console.log("Si existe la cuenta")
                this.registrarActualizarLibroMayor(resCuenta, libroMayor, libroMayorActualizar, fechaLibroMayor, elementData, index, fecha)
              }else{
                console.log("No existe la cuenta")
                var separarCodigo = String(elementData.codigo).split('')
                var idJerarquiaCuenta = 0
                if(separarCodigo.length == 1){
                  idJerarquiaCuenta = 1
                }else if(separarCodigo.length == 2){
                  idJerarquiaCuenta = 2
                }else if(separarCodigo.length == 4){
                  idJerarquiaCuenta = 3
                }else{
                  idJerarquiaCuenta = 4
                }
                this.servicioJerarquiaCuenta.listarPorId(idJerarquiaCuenta).subscribe(resJerarquiaCuentas=>{
                  let cuenta : Cuentas = new Cuentas();
                  cuenta.codigo = elementData.codigo
                  cuenta.descripcion = elementData.descripcion.toUpperCase()
                  cuenta.idJerarquiaCuentas = resJerarquiaCuentas
                  console.log("Datos de cuenta", cuenta)
                  this.servicioCuentas.registrar(cuenta).subscribe(resCuentasRegistrado=>{
                    console.log("Registro la cuenta", resCuentasRegistrado)
                    this.servicioConsultasGenerales.listarCuenta(Number(cuenta.codigo)).subscribe(resCuenta=>{
                      this.registrarActualizarLibroMayor(resCuenta, libroMayor, libroMayorActualizar, fechaLibroMayor, elementData, index, fecha)
                    })
                  }, error => {
                    document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'Hubo un error al agregar la cuenta '+elementData.codigo+'.',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  });
                })
              }
            })
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado!',
            '',
            'error'
          )
        }
      })
    }
  }

  public registrarActualizarLibroMayor(resCuenta, libroMayor, libroMayorActualizar, fechaLibroMayor, elementData, index, fecha){
    console.log("Ya vamos a registrar o actualizar la cuenta")
    resCuenta.forEach(elementCuenta => {
      this.servicioCuentas.listarPorId(elementCuenta.id).subscribe(resCuenta=>{
        libroMayor.fecha = new Date(fecha[0],(fecha[1]-1),1)
        libroMayor.idCuenta = resCuenta
        libroMayor.valor = elementData.valor
        this.servicioConsultasGenerales.listarLibrosMayor(resCuenta.id, fechaLibroMayor).subscribe(resLibroMayor=>{
          if(resLibroMayor.length >= 1){
            resLibroMayor.forEach(elementLibroMayor => {
              libroMayorActualizar.id = elementLibroMayor.id
              var fechaLibroActualizada = new Date(elementLibroMayor.fecha)
              libroMayorActualizar.fecha = fechaLibroActualizada
              libroMayorActualizar.idCuenta = elementLibroMayor.idCuenta
              libroMayorActualizar.valor = elementData.valor
              console.log("entre para actualizar", libroMayorActualizar)
              this.servicioModificar.actualizarLibroMayor(libroMayorActualizar).subscribe(resActualizado=>{
                console.log(resActualizado)
              }, error => {
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Hubo un error al modificar!',
                  showConfirmButton: false,
                  timer: 1500
                })
              });
            });
          }else{
            console.log("entre para registrar", libroMayor)
            this.servicioLibroMayor.registrar(libroMayor).subscribe(resLibroMayor=>{
              }, error => {
                document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Hubo un error al agregar!',
                  showConfirmButton: false,
                  timer: 1500
                })
            });
          }
          console.log(index, this.excelData.length)
          if((index+1) == this.excelData.length){
            console.log(libroMayorActualizar, libroMayor)
            document.getElementById('snipper')?.setAttribute('style', 'display: none;')
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Libro Mayor Registrado o Actualizado!',
              showConfirmButton: false,
              timer: 1500
            })
            // window.location.reload();
          }
        })
      })
    });
  }

}
