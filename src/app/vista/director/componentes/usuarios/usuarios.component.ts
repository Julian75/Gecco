import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079},
  {position: 2, name: 'Helium', weight: 4.0026 },
  {position: 3, name: 'Lithium', weight: 6.941},
  {position: 4, name: 'Beryllium', weight: 9.012 },
  {position: 5, name: 'Boron', weight: 10.811 },
  {position: 6, name: 'Carbon', weight: 12.0107 },
  {position: 7, name: 'Nitrogen', weight: 14.0067 },
  {position: 8, name: 'Oxygen', weight: 15.9994 },
  {position: 9, name: 'Fluorine', weight: 18.9984 },
  {position: 10, name: 'Neon', weight: 20.1797},
];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  dtOptions: any = {};

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable)
  table!: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 7,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'print', 'csv', 'pdf', 'excel', 'colvis'
      ]
    };
  }

}
