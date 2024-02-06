import { Injectable } from '@angular/core';

import { AppConfig } from '../../config/config';

import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { map, catchError } from 'rxjs/operators';

import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SSOService {

  public config: AppConfig = new AppConfig();

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  public doLogin(user:string, pass:string){      
    let request = { 
      usr:user,
      pwd:pass,          
    };

    return this.http.post<any>(this.config.ApiExatLoginSSO + "/login", request).toPromise()   
      .then((res) => {
        //let message = JSON.parse(res);
        //console.log(res)
        return res;
      });
  }


  public doLoginToken(token:string){      
    let request = { 
      login_token:token 
    };

    return this.http.post<any>(this.config.ApiExatLoginSSO + "/logintoken", request).toPromise()   
      .then((res) => {     
        //console.log(res)
        return res;
      });
  }
    

    

  
  


}
