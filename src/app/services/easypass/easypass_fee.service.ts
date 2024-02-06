import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { InitialCurrent } from '../../config/initial_current';
import { EasypassFeeModel } from '../../models/easypass/easypass_fee';

@Injectable({
  providedIn: 'root'
})
export class EasypassFeeService {

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
       
  public fee_get(token:string, status:string, tax_id:string, fromdate:Date, todate:Date){ 
    
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

      return this.http.post<any>(this.config.ApiEasypassFeeModule + '/fee/get', request, this.options).toPromise()   
    .then((res) => {
      //let message = JSON.parse(res);
      //console.log(res)
      return res;
    });
  }

  public fee_fillter(token:string, status:string, by:string, keyword:string){ 
    
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
      status:status,
      by:by,
      keyword:keyword,    
    };

    return this.http.post<any>(this.config.ApiEasypassFeeModule + '/fee/fillter', request, this.options).toPromise()   
  .then((res) => {   
    return res;
  });
  }

  public fee_status(token:string, model:EasypassFeeModel){ 
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': "Bearer " + token
    });

    this.options = { headers: this.httpHeaders };

    let request = { 
      fee_doc:model.fee_doc,
      etax_doc:model.etax_doc,
      fee_status:'F',
         
    };

    return this.http.post<any>(this.config.ApiEasypassFeeModule + '/fee/status', request, this.options).toPromise()   
    .then((res) => {
      //let message = JSON.parse(res);
      //console.log(res)
      return res;
    });
  }
 
  public fee_summary_amount(token:string){ 
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': "Bearer " + token
    });

    this.options = { headers: this.httpHeaders };
    let request = { status:"A" };

    return this.http.post<any>(this.config.ApiEasypassFeeModule + '/fee/summary_month', request, this.options).toPromise()   
  .then((res) => {   
    return res;
  });
  }

  public fee_summary_status(token:string){ 
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': "Bearer " + token
    });

    this.options = { headers: this.httpHeaders };
    let request = { status:"A" };

    return this.http.post<any>(this.config.ApiEasypassFeeModule + '/fee/status_month', request, this.options).toPromise()   
  .then((res) => {   
    return res;
  });
  }


  public fee_cancel(token:string, model:EasypassFeeModel){ 
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': "Bearer " + token
    });

    this.options = { headers: this.httpHeaders };

    let request = { 
      fee_doc:model.fee_doc,
      etax_doc:model.etax_doc,
      fee_status:'W',
         
    };

    return this.http.post<any>(this.config.ApiEasypassFeeModule + '/fee/status', request, this.options).toPromise()   
    .then((res) => {    
      return res;
    });
  }

}
