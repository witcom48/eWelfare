import { Injectable } from '@angular/core';
import { AppConfig } from '../../config/config';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';

import { InitialCurrent } from '../../config/initial_current';
import { EasypassFeeModel } from '../../models/easypass/easypass_fee';
import { EtaxModel } from '../../models/etax/etax';

import { EasypassFeeService } from '../../services/easypass/easypass_fee.service';


@Injectable({
  providedIn: 'root'
})
export class EasypassInvoiceService {

  public config:AppConfig = new AppConfig();  
  public initial_current:InitialCurrent = new InitialCurrent();  

  httpHeaders = new HttpHeaders({});
  options = {
    headers: this.httpHeaders
  };

  constructor(private http:HttpClient, private router: Router, private datePipe: DatePipe, private easypassFeeService: EasypassFeeService) { 
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
     
  public invoice_get(token:string, type:string, tax_id:string, fromdate:Date, todate:Date){ 
    
      this.httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': "Bearer " + token
      });

      this.options = {
        headers: this.httpHeaders
      };

      console.log(this.datePipe.transform(fromdate, 'yyyy-MM-dd 00:00:00'))

      let request = { 
        etax_type:type,
        fromdate:this.datePipe.transform(fromdate, 'yyyy-MM-dd 00:00:00'),
        todate:this.datePipe.transform(todate, 'yyyy-MM-dd 00:00:00'),       
        tax_id:tax_id,        
      };

      return this.http.post<any>(this.config.ApiEasypassFeeModule + '/invoice/fillter', request, this.options).toPromise()   
    
      .then((res) => {
      //let message = JSON.parse(res);
      //console.log(res)
      return res;
    });
  }

  public invoice_get_bydoc(token:string, fee_doc:string){ 
    
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
      fee_doc:fee_doc  
    };

      return this.http.post<any>(this.config.ApiEasypassFeeModule + '/invoice/get_doc', request, this.options).toPromise()   
    .then((res) => {   
      return res;
    });
  }

  public invoice_nextid(token:string){ 

    var dateNow = new Date() 
    var prefix = "OEE" + this.datePipe.transform(dateNow, 'yyMMdd')
    
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
      prefix:prefix
    };

      return this.http.post<any>(this.config.ApiEasypassFeeModule + '/invoice/nextid', request, this.options).toPromise()   
    .then((res) => {   
      return res;
    });
  }

  public invoice_record(token:string, type:string, fee:EasypassFeeModel, etax:EtaxModel){ 
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': "Bearer " + token
    });

    this.options = {
      headers: this.httpHeaders
    };

    let dateNow = new Date()

    let request = { 
      fee_doc:fee.fee_doc,
      fee_date:this.datePipe.transform(fee.fee_date, 'yyyy-MM-dd'),
      fee_amount:fee.fee_amount,
      etax_doc:etax.ETax_doc,
      etax_type:type,
      etax_data:etax,
      create_by:this.initial_current.Username,
      create_date:dateNow.toISOString(),     
    };

    return this.http.post<any>(this.config.ApiEasypassFeeModule + '/invoice/record', request, this.options).toPromise()   
    .then((res) => {
      //let message = JSON.parse(res);
      //console.log(res)
      return res;
    });
  }


  public invoice_delete(token:string, type:string, fee:EasypassFeeModel){ 
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization': "Bearer " + token
    });

    this.options = {
      headers: this.httpHeaders
    };

    let dateNow = new Date()

    let request = { 
      fee_doc:fee.fee_doc,
      fee_date:this.datePipe.transform(fee.fee_date, 'yyyy-MM-dd'),
      fee_amount:fee.fee_amount,      
      etax_type:type,      
      create_by:this.initial_current.Username,
      create_date:dateNow.toISOString(),     
    };

    return this.http.post<any>(this.config.ApiEasypassFeeModule + '/invoice/delete', request, this.options).toPromise()   
    .then((res) => {     
      return res;
    });
  }


  doGetNextID() {

    return new Promise(resolve => {
      this.easypassFeeService.getToken().then(async (res) => {                  
        let token = res;
        this.invoice_nextid(token).then(async (res) => { 

          if(res.success == true){
            resolve(res.data.etax_doc)    
          }
          else{
            resolve("")    
          }                
        });             
      }); 
    });
  }
 

}
