import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsgsDataType } from "./usgsdatatype";

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsgsService {

  constructor(private http : HttpClient ) { }

  private url = "./usgs"
  
  getData(): Observable< UsgsDataType > {
      return this.http.get<UsgsDataType>(this.url)
  }
}