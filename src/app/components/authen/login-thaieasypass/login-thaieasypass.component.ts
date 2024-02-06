import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { AuthenService } from '../../../services/authen/authen.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerModel } from '../../../models/account/customer';

declare var login: any;
@Component({
  selector: 'app-login-thaieasypass',
  templateUrl: './login-thaieasypass.component.html',
  styleUrls: ['./login-thaieasypass.component.scss']
})
export class LoginThaieasypassComponent implements OnInit {
  langs: any = login;
  selectlang: string = "EN";
  constructor(
    private authenService: AuthenService,
    private router: Router,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) { }
 
  displayManage: boolean = true;
  progress: boolean = false;
  loading: boolean = true;
   
  initail_current: InitialCurrent = new InitialCurrent();
  ngOnInit(): void {

    //var encodedString = btoa("hello");
    //console.log(encodedString); 

   // var decodedString = atob("aHR0cHM6Ly93d3cudGhhaWVhc3lwYXNzLmNvbQ==");
//console.log(decodedString); 
    
    this.route.queryParams.subscribe(params => {      
      let login_token = params['login_token']
      let source_url = params['source_url']

      //console.log(source_url)

      if(source_url != undefined){
        source_url = atob(source_url)
      }
      else{
        source_url = ""
      }

      //console.log(source_url)
      
      setTimeout(() => {      
        if(login_token != ""){
          this.doLogin(login_token, source_url)
        } 
      }, 300);   

    });
    
  }
        
  async doLogin(login_token:string, source_url:string) {

    this.progress = true

    try{

      let dateNow = new Date()
      let transactionid = "T" + this.datePipe.transform(dateNow, 'yyyyMMdd') + "T00:00:00"
      
      this.doVerify(transactionid, login_token, source_url)     

    }    
    catch{}
    finally{
     
      setTimeout(() => {
        this.progress = false      
      }, 2000);

    }

  }   

  async doVerify(transactionid: string, login_token: string, source_url:string) {

    await this.authenService.getToken(transactionid).then(async (res) => {        
      
      if(res.status_code=="200"){
        
        let token = res.data.access_token
        
        setTimeout(() => {

          this.authenService.doVerify(token, transactionid, login_token).then(async (res) => {     
          
            let customer: CustomerModel = res.data;

            this.initail_current = new InitialCurrent()
            this.initail_current.Token = token
            this.initail_current.Usertype = "USER"
            this.initail_current.Username = customer.email
            this.initail_current.Language = "TH"                         
                      
            //-- Local storage
            localStorage.setItem(AppConfig.LOCALInitial, this.initail_current.doGetJSONInitialCurrent())
            localStorage.setItem(AppConfig.LOCALAccount, JSON.stringify(customer));

            this.router.navigateByUrl('customer/fee');
          
          })
          .catch((err) => {

            if(source_url != ""){
              window.location.href = source_url;
            }
            else{
              this.messageService.add({severity:'error', summary: 'Error', detail: "พบปัญหาในการทำรายการ โปรดทำรายการใหม่อีกครั้ง"});
            }

            
          })
        
        }, 300);
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: res.message});
      }           
            
    });  
  }


}
