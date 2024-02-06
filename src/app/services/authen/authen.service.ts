import { Injectable } from '@angular/core';

import { AppConfig } from '../../config/config';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  public config: AppConfig = new AppConfig();

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  });

  options = {
    headers: this.httpHeaders
  };

  //-- Authen thai easypass
  
  public getToken(transactionid: string) {
    
    let dateNow = new Date()
    this.httpHeaders = new HttpHeaders({
      'transactionid': transactionid,     
      'requestdate': dateNow.toISOString(),     
      'system': 'exat_it',     
      'source': 'web',     
      'type': 'user',     
      'language': 'en',     
      'content-type': 'application/json;charset=utf-8;' 
    });

    this.options = {
      headers: this.httpHeaders
    };

    var data = {
      user_name: this.config.ApiExatAuthUsername,
      password: this.config.ApiExatAuthPassword,
      get_access_list: "0"
    };

    return this.http.post<any>(this.config.ApiExatAuth + '/access_token', data, this.options).toPromise()     
      .then((res) => {     
        return res;
      });
  }

  public getTokenLogin(token: string, email: string, transactionid: string ) {    
    let dateNow = new Date()
    this.httpHeaders = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'transactionid': transactionid,     
      'requestdate': dateNow.toISOString(),     
      'system': 'exat_it',     
      'source': 'web',     
      'type': 'user',     
      'language': 'en',     
      'content-type': 'application/json;charset=utf-8;' 
    });

    this.options = {
      headers: this.httpHeaders
    };

    var data = {
      by: "email",
      keyword: email,
      login_token_expire_minute: "5"
    };

    return this.http.post<any>(this.config.ApiExatMember + '/login_token_gen', data, this.options).toPromise()      
      .then((res) => {   
        return res;
      });
  }

  public doVerify(token: string, transactionid: string, login_token: string ) {    
    let dateNow = new Date()
    this.httpHeaders = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'transactionid': transactionid,     
      'requestdate': dateNow.toISOString(),     
      'system': 'exat_it',     
      'source': 'web',     
      'type': 'user',     
      'language': 'en',     
      'content-type': 'application/json;charset=utf-8;' 
    });

    this.options = {
      headers: this.httpHeaders
    };

    var data = {
      by: "login_token",
      keyword: login_token
    };

    return this.http.post<any>(this.config.ApiExatMember + '/search', data, this.options).toPromise()      
      .then((res) => {   

        //console.log(res)

        return res;
      });
  }


}
