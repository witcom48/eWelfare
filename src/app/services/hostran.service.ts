import { Injectable } from '@angular/core';
import { AppConfig } from '../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InitialCurrent } from '../config/initial_current';

@Injectable({
  providedIn: 'root'
})
export class HostranService {

  public config:AppConfig = new AppConfig();  
  public initial_current:InitialCurrent = new InitialCurrent();  

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  constructor(private http:HttpClient, private router: Router, private datePipe: DatePipe) { 
    this.doGetInitialCurrent()
  }
  
  doGetInitialCurrent(){    
    this.initial_current = JSON.parse(localStorage.getItem(AppConfig.LOCALInitial) || '{}');
    if (this.initial_current) {
      this.httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.initial_current.Token
      });

      this.options = {
        headers: this.httpHeaders
      };

    }   
    else{
      this.router.navigateByUrl('login');
    } 
  }

  public getToken(){      
    let request = { 
      usr:this.config.ApiGetTokenUsername,
      pwd:this.config.ApiGetTokenPassword,          
    };

    return this.http.post<any>(this.config.ApiGetToken + '/verify', request).toPromise()   
      .then((res) => {
        //let message = JSON.parse(res);
        //console.log(res.message)
        return res.message;
      });
  }
       
  public welfare_summary(token:string, empid:string){ 
    
      this.httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': "Bearer " + token
      });

      this.options = {
        headers: this.httpHeaders
      };

      let request = {        
        empid:empid,         
      };

      return this.http.post<any>(this.config.ApiEwelfare + '/hostran/summary', request, this.options).toPromise()   
    .then((res) => {    
      return res;
    });
  }

  public welfare_detail(token:string, empid:string, paydate:Date){ 
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': "Bearer " + token
    });

    this.options = {
      headers: this.httpHeaders
    };

    let request = {        
      empid:empid,
      paydate:this.datePipe.transform(paydate, 'yyyy-MM-dd 00:00:00'),         
    };

    return this.http.post<any>(this.config.ApiEwelfare + '/hostran/detail', request, this.options).toPromise()   
  .then((res) => {    
    return res;
  });
}

  

}
