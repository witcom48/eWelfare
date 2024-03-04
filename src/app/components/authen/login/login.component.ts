import { Component, OnInit } from '@angular/core';

import { AppConfig } from '../../../config/config';
import { InitialCurrent } from '../../../config/initial_current';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.onLogin()
  }

  initail_current: InitialCurrent = new InitialCurrent();
  onLogin(){
    this.initail_current = new InitialCurrent()
    this.initail_current.Token = "sdfReTwqqsf3fsfsdfxcvggdf#dgsdgcxbxbefdhdfhxcbwdsgsdeeeegdvvDfssgsgsWWFdwww"
    this.initail_current.Usertype = "USER"
    this.initail_current.Username = "Admin"
    this.initail_current.Language = "TH"                         
              
    //-- Local storage
    localStorage.setItem(AppConfig.LOCALInitial, this.initail_current.doGetJSONInitialCurrent())  
    this.router.navigateByUrl('admin/benefit');
  }

}
