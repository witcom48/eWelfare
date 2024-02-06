import { Injectable } from '@angular/core';
import { AppConfig } from '../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InitialCurrent } from '../config/initial_current';
import { BenefitModel } from '../models/benefit';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {

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
       
  public benefit_get(token:string, fromdate:Date, todate:Date){ 
    
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
        fromdate:this.datePipe.transform(fromdate, 'yyyy-MM-dd 00:00:00'),
        todate:this.datePipe.transform(todate, 'yyyy-MM-dd 00:00:00'),
        status:status,         
      };

      return this.http.post<any>(this.config.ApiEwelfare + '/benefit/get', request, this.options).toPromise()   
    .then((res) => {    
      return res;
    });
  }

  public benefit_record(token:string, model:BenefitModel){ 
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': "Bearer " + token
    });

    this.options = { headers: this.httpHeaders };

    let request = { 
      id:model.BENEFIT_ID,
      text:model.BENEFIT_TEXT,
      from:this.datePipe.transform(model.BENEFIT_FROM, 'yyyy-MM-dd 00:00:00'),
      to:this.datePipe.transform(model.BENEFIT_TO, 'yyyy-MM-dd 00:00:00'),
      edit_by:this.initial_current.Username
         
    };

    return this.http.post<any>(this.config.ApiEwelfare + '/benefit/record', request, this.options).toPromise()   
    .then((res) => {
      //let message = JSON.parse(res);
      //console.log(res)
      return res;
    });
  }

  public benefit_remove(token:string, id:string){ 
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': "Bearer " + token
    });

    this.options = { headers: this.httpHeaders };

    let request = { 
      id:id,     
      edit_by:this.initial_current.Username         
    };

    return this.http.post<any>(this.config.ApiEwelfare + '/benefit/remove', request, this.options).toPromise()   
    .then((res) => {
      //let message = JSON.parse(res);
      //console.log(res)
      return res;
    });
  }

}
