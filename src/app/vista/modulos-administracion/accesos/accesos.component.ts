import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {
  dtOptions: any = {};
  public listarAccesoRol: any = [];
  public Rol: any;
  displayedColumns = ['id', 'descripcion', 'idModulo','idRol','Opciones'];
  dataSource!:MatTableDataSource<any>;
  constructor(
    // private servicioAccesoRol: ,
    public dialog: MatDialog,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    // this.listarTodos();
  }

  // public listarTodos(){
  //   this.route.paramMap.subscribe((params: ParamMap) => {
  //     const id = Number(params.get('id'));
  //     this.servicioAccesoRol.listarTodos().subscribe( res =>{
  //       res.forEach(element => {
  //         if(element.idModulo.id == id){
  //           this.listarAccesoRol.push(element)
  //           // this.Rol =
  //         }
  //       });
  //       console.log(this.listarAccesoRol)
  //       this.dataSource = new MatTableDataSource(this.listarAccesoRol);
  //     })
  //   })
  // }



}

