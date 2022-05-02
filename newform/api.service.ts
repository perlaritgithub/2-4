import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  Api = 'http://localhost:9876/nodeapp/'

  constructor(private Http: HttpClient) { }

  postform(data: any) {
    console.log('serr', data);
    return this.Http.post<any>(this.Api + `postingdata`, data).pipe(map(res => {
      return res;
    }, (error: any) => {
      return error;

    }));
  }
  //get
  getform() {
    return this.Http.get<any>(this.Api + `getsubmitdata`).pipe(map(res => {
      return res;
    }, (error: any) => {
      return error;

    }));
  }
  //delete
  /*remove (id:any){
    return this.Http.get<any>(this.Api + `deletedata/` + id).pipe(map(res => {
      return res;
    }))
  }*/
}

