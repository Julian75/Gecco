import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SolicitudBajasArticulosService } from 'src/app/servicios/solicitudBajasArticulos.service';
import { MatDialog } from '@angular/material/dialog';
import { EstadoService } from 'src/app/servicios/estado.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-lista-actas-bajas',
  templateUrl: './lista-actas-bajas.component.html',
  styleUrls: ['./lista-actas-bajas.component.css']
})
export class ListaActasBajasComponent implements OnInit {
  dtOptions: any = {};
  public listarSolicitudesBajas: any = [];

  displayedColumns = ['id', 'fecha', 'observacion', 'usuario', 'idDetalleArticulo', 'estado', 'opciones'];
  dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private serviceSolicitudBajasArticulos: SolicitudBajasArticulosService,
    private serviceEstado: EstadoService,
    private servicioConfiguracion: ConfiguracionService,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.listarTodos()
  }

  public listarTodos(){
    this.listarSolicitudesBajas = []
    this.serviceSolicitudBajasArticulos.listarTodos().subscribe(resTodoSolicitudesBajas=>{
      resTodoSolicitudesBajas.forEach(element => {
        if(element.idEstado.id == 82){
          this.listarSolicitudesBajas.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.listarSolicitudesBajas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  nombreEmpresa:any;
  nitEmpresa: any;
  abrirPdf(idSolicitudBajaArticulo){
    this.servicioConfiguracion.listarTodos().subscribe(resConfiguracion=>{
      resConfiguracion.forEach(element => {
        if(element.nombre == 'nombre_entidad'){
          this.nombreEmpresa = element.valor
        }
        if(element.nombre == 'nit_empresa'){
          this.nitEmpresa = element.valor
        }
      });
      const pdfDefinition: any = {
        content: [
          // {
          //   image: await this.getBase64ImageFromURL(
          //     'assets/logo/suchance.png'
          //   ),
          //   relativePosition: {x: 0, y: 0},
          //   width: 150,
          // },
          {
            text: 'Nombre Empresa: '+this.nombreEmpresa,
            bold: true,
            margin: [0, 80, 0, 10]
          },
          {
            text: 'Nit Empresa: '+this.nitEmpresa,
            margin: [0, 0, 0, 10]
          },
          {
            text: 'Codigo acta: ',
            margin: [0, 0, 0, 10]
          },
          {
            text: 'Fecha: ',
            margin: [0, 0, 0, 10]
          },
          {
            text: 'Intervinieron: ',
            margin: [0, 0, 0, 10]
          },
          {
            text: 'Solicito: ',
            relativePosition: {x: 250, y: -25},
            margin: [0, 0, 0, 20]
          },
           {
            text: 'Compras Autorizo: ',
            relativePosition: {x: 250, y: -25},
            margin: [0, 0, 0, 20]
          },
           {
            text: 'Control Interno Confirmo: ',
            relativePosition: {x: 250, y: -25},
            margin: [0, 0, 0, 20]
          },
          {
            text: 'ARTICULOS DE BAJA',
            bold: true,
            fontSize: 20,
            alignment: 'center',
            margin: [0, 0]
          },{
            table: {
              widths: ['*', '*'],
              body: [
                [
                  'Articulo',
                  'Cantidad',
                ],
              ]
            },
            margin: [0, 0]
          },
          {
            table: {
              widths: ['*', '*'],
              // body: body
            },
            margin: [0, 0]
          }
        ]
      }
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();

    })
    this.serviceSolicitudBajasArticulos.listarPorId(idSolicitudBajaArticulo).subscribe(resSolicitudBajaArticulo=>{

    })
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  name = 'listaActasBajas.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('actasBajas');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }


}
