import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  dtOptions: any = {};
  public listarUsuarios: any = [];

  displayedColumns = ['id', 'nombre', 'correo', 'tipoDocumento', 'estado', 'rol', 'opciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private servicioUsuario: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos () {
    this.servicioUsuario.listarTodos().subscribe( res =>{
      this.listarUsuarios = res;
      this.dataSource = new MatTableDataSource(this.listarUsuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // Filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  name = 'listaUsuarios.xlsx';
  listadoUsuarios: any = [];
  listaUsuariosCompletos: any = []
  exportToExcel(): void {
    this.listaUsuariosCompletos = []
    this.servicioUsuario.listarTodos().subscribe(resUsuarios=>{
      this.listadoUsuarios = resUsuarios
      for (let index = 0; index < this.listadoUsuarios.length; index++) {
        const element = this.listadoUsuarios[index];
        var obj = {
          "Id": element.id,
          "Nombre": element.nombre+" "+element.apellido,
          "Tipo de Documento": element.idTipoDocumento.descripcion,
          Documento: element.documento,
          Correo: element.correo,
          Rol: element.idRol.descripcion,
          "Ide Oficina": element.ideOficina,
          "Ide SubZona": element.ideSubzona,
          Estado: element.idEstado.descripcion
        }
        this.listaUsuariosCompletos.push(obj)
      }
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listaUsuariosCompletos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "listaUsuarios");
      });
    })
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
