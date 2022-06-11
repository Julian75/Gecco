import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl="http://localhost:9000/api";

  constructor() { }
}
