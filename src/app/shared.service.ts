import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl="http://localhost:9000/api";
  // readonly APIUrlSiga="http://localhost:7000/api";

  // readonly APIUrl="http://10.192.110.105:9000/api";
  readonly APIUrlSiga="http://10.192.110.105:7000/api";

  constructor() { }
}
