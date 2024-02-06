import { Component, OnInit } from '@angular/core';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { AuthenService } from '../../../services/authen/authen.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { MessageService } from 'primeng/api';

import { CustomerModel } from '../../../models/account/customer';

declare var login: any;
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  langs: any = login;
  selectlang: string = "EN";
  constructor(
    private authenService: AuthenService,
    private router: Router,
    private datePipe: DatePipe,
    private messageService: MessageService,
  ) { }

 

  displayManage: boolean = true;
  progress: boolean = false;

  loading: boolean = true;
  token: string = "";
  user: string = "develop.ebiz.exat@gmail.com";
  pass: string = "";
   
  initail_current: InitialCurrent = new InitialCurrent();
  ngOnInit(): void {
    
    setTimeout(() => {

      window.close()
    
    }, 300);

  }
    
  changelang(lang: string) {
    this.selectlang = lang;
    if (lang == "TH") {
      
    } else {
      
    }
  }
  
  async doLogin() {

    this.progress = true

    try{

      let dateNow = new Date()
      let transactionid = "T" + this.datePipe.transform(dateNow, 'yyyyMMdd') + "T00:00:00"
      
      await this.authenService.getToken(transactionid).then(async (res) => {        
        
        if(res.status_code=="200"){
          
          let token = res.data.access_token
          
          setTimeout(() => {

            this.doGetLoginToken(token, transactionid)
          
          }, 300);
        }
        else{        
          this.messageService.add({severity:'error', summary: 'Error', detail: res.message});
          
        }           
              
      });  
    }    
    catch{}
    finally{
     
      setTimeout(() => {
        this.progress = false      
      }, 2000);

    }

  }
  
  async doGetLoginToken(token: string, transactionid: string) {
            
    await this.authenService.getTokenLogin(token, this.user, transactionid).then(async (res) => {        
      
      if(res.status_code=="200"){        
        let login_token = res.data.login_token        
        setTimeout(() => {
          this.doVerify(transactionid, login_token)
        
        }, 300);
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: res.message});
      }           
            
    });   

  }  


  async doVerify(transactionid: string, login_token: string) {

    await this.authenService.getToken(transactionid).then(async (res) => {        
      
      if(res.status_code=="200"){
        
        let token = res.data.access_token
        
        setTimeout(() => {

          this.authenService.doVerify(token, transactionid, login_token).then(async (res) => {     
            //console.log(res.data)
            console.log("Verify...")

            let customer: CustomerModel = res.data;

            //console.log(customer.cs_cust_id)
            //console.log(JSON.stringify(customer))
            //LOCALAccount

            this.initail_current = new InitialCurrent()
            this.initail_current.Token = "ccvbrsffss"

            if(customer.email=="develop.ebiz.exat@gmail.com"){
              this.initail_current.Usertype = "ADM"
            }
            else{
              this.initail_current.Usertype = "USER"
            }
            this.initail_current.Username = customer.email
            this.initail_current.Language = "TH"                           
           
           
            //-- Local storage
            localStorage.setItem(AppConfig.LOCALInitial, this.initail_current.doGetJSONInitialCurrent())
            localStorage.setItem(AppConfig.LOCALAccount, JSON.stringify(customer));


            if(customer.email=="develop.ebiz.exat@gmail.com"){
              this.router.navigateByUrl('admin');
            }
            else{
              this.router.navigateByUrl('customer/fee');
            }

            
          
          });  

        
        }, 300);
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: res.message});
      }           
            
    });  
  }


}
