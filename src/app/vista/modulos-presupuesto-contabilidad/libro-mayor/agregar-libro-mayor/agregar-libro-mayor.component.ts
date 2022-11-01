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
    private servicioConsultasGenerales: ConsultasGeneralesService
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
  public guardar() {
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
        console.log(this.excelData)
        this.excelData.forEach(elementData => {
          let libroMayor : LibroMayor = new LibroMayor();
          var fecha = this.formLibroMayor.value.fecha.split('-');
          libroMayor.fecha = new Date(fecha[0],(fecha[1]-1),1)
          libroMayor.valor = elementData.valor
          this.servicioConsultasGenerales.listarCuenta(Number(elementData.codigo)).subscribe(resCuenta=>{
            resCuenta.forEach(elementCuenta => {
              this.servicioCuentas.listarPorId(elementCuenta.id).subscribe(resCuenta=>{
                libroMayor.idCuenta = resCuenta
                console.log(libroMayor)
                // this.servicioLibroMayor.registrar(libroMayor).subscribe(resLibroMayor=>{
                  //   document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                  //   Swal.fire({
                  //     position: 'center',
                  //     icon: 'success',
                  //     title: 'Libro Mayor Registrado!',
                  //     showConfirmButton: false,
                  //     timer: 1500
                  //   })
                  //   window.location.reload();

                  // }, error => {
                  //   document.getElementById('snipper')?.setAttribute('style', 'display: none;')
                  //   Swal.fire({
                  //     position: 'center',
                  //     icon: 'error',
                  //     title: 'Hubo un error al agregar!',
                  //     showConfirmButton: false,
                  //     timer: 1500
                  //   })
                // });
              })
            });
          })
        });
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

  public registrarLibroMayor(libroMayor: LibroMayor) {
    console.log(libroMayor)
    this.servicioLibroMayor.registrar(libroMayor).subscribe(res=>{
      document.getElementById('snipper')?.setAttribute('style', 'display: none;')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Libro Mayor Registrado!',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();

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

}
