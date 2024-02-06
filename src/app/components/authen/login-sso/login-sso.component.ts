import { Component, OnInit } from '@angular/core';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { AuthenService } from '../../../services/authen/authen.service';
import { SSOService } from '../../../services/authen/sso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';


declare var login: any;
@Component({
  selector: 'app-login-sso',
  templateUrl: './login-sso.component.html',
  styleUrls: ['./login-sso.component.scss']
})
export class LoginSsoComponent implements OnInit {
  langs: any = login;
  selectlang: string = "EN";
  constructor(   
    private router: Router,    
    private messageService: MessageService,
    private SSOService: SSOService,
    private route: ActivatedRoute,
  ) { }

 
  displayManage: boolean = true;
  progress: boolean = false;
  loading: boolean = true;  
  user: string = "";
  pass: string = "";
   
  initail_current: InitialCurrent = new InitialCurrent();
  ngOnInit(): void {

    localStorage.clear();

    setTimeout(() => {
      this.processLogin()
    }, 200);
    
  }

  async processLogin(){
    
    this.route.paramMap.subscribe(params => {      
      let login_token = params.get('login_token')?.toString()

      setTimeout(() => {
        this.doLoginToken(login_token || '')              
      }, 500);

    });
      
  }

  async doLoginToken(token : string) {
    
    try{
           
      await this.SSOService.doLoginToken(token).then(async (res) => {  
        
        if(res.success==true){

          var data = res.data        
          this.initail_current = new InitialCurrent()
          this.initail_current.Token = "ccvbrsffss"
          this.initail_current.Usertype = "ADM"
          this.initail_current.Username = data.U_ID
          this.initail_current.Language = "TH"        
          this.initail_current.Description = data.U_Prefix + data.U_Fname + " " + data.U_Lname       
          localStorage.setItem(AppConfig.LOCALInitial, this.initail_current.doGetJSONInitialCurrent())

          this.router.navigateByUrl('admin');
          
        }
        else{
          this.messageService.add({severity:'error', summary: 'Error', detail: res.message});
        }
              
      });  
    }    
    catch{}
    
  }

        
  async doLogin() {

    this.progress = true

    try{
        
      await this.SSOService.doLogin(this.user, this.pass).then(async (res) => {  
        
        if(res.success==true){

          var data = res.data
         
          this.initail_current = new InitialCurrent()
          this.initail_current.Token = "ccvbrsffss"
          this.initail_current.Usertype = "ADM"
          this.initail_current.Username = data.U_ID
          this.initail_current.Language = "TH"        
          this.initail_current.Description = data.U_Prefix + data.U_Fname + " " + data.U_Lname       
          localStorage.setItem(AppConfig.LOCALInitial, this.initail_current.doGetJSONInitialCurrent())

          this.router.navigateByUrl('admin');          

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
  
  changelang(lang: string) {
    this.selectlang = lang;
    if (lang == "TH") {
      
    } else {
      
    }
  }


}
