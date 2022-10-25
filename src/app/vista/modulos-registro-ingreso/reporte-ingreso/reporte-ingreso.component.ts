import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IngresoPersonalEmpresaService } from 'src/app/servicios/ingresoPersonalEmpresa.service';
import Swal from 'sweetalert2';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-reporte-ingreso',
  templateUrl: './reporte-ingreso.component.html',
  styleUrls: ['./reporte-ingreso.component.css']
})
export class ReporteIngresoComponent implements OnInit {
  public lista:any = []
  public validar:any = []
  public reporte : any = []
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(
    private servicioRegistro : IngresoPersonalEmpresaService,
  ) { }

  ngOnInit(): void {
  }

  star: any;
  end: any;
  capturar(){
    this.lista = []
    this.validar = []
    this.reporte = []
    if(this.range.value.start == null || this.range.value.end == null){
      this.range.value.start = null
      this.range.value.end = null
    }else{
      this.star = this.range.value.start.toISOString().slice(0,10)
      this.end = this.range.value.end.toISOString().slice(0,10)
    }
    if(this.range.value.end != null){
      this.servicioRegistro.listarTodos().subscribe(res=>{
        console.log(this.star)
        console.log(this.end)
        res.forEach(element => {
          if(element.fecha >= this.star && element.fecha <= this.end){
            console.log(element.fecha)
            var obj = {
              nombre: element.nombre + " " + element.apellido,
              sede: element.idSedes.descripcion,
              documento: element.documento,
              tipoDocumento: element.idTipoDocumento.descripcion,
              oficina: element.ideOficina,
              area: element.idArea.descripcion,
              eps: element.eps,
              rh: element.rh,
              arl: element.arl,
              telefono: element.telefono,
              fecha: element.fecha,
              horaIng: element.horaIngreso,
              horaSal: element.horaSalida,
            }
            this.lista.push(obj)
          }
        });
        if(this.lista.length > 0){
          import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.lista);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "ExportExcel");
          });
          this.range.reset()
        }else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No hay datos para exportar!',
            showConfirmButton: false,
            timer: 1500
          })
          this.range.reset()
        }
      })
    }else{
      this.end = null
    }


  }
  name = 'listaRegistros.xlsx';
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}


