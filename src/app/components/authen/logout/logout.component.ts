import { Component, OnInit } from '@angular/core';
import { InitialCurrent } from '../../../config/initial_current';
import { AppConfig } from '../../../config/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }
  
  displayManage: boolean = true;
  progress: boolean = false;

  loading: boolean = true;
  ngOnInit(): void {    

    //-- test
              

    // setTimeout(() => {

    //   var initail_current = new InitialCurrent()
    //   initail_current.Username = "test"
    //   initail_current.Token = "ccvbrsffss"
    //   initail_current.Usertype = "ADM"
    //   localStorage.setItem(AppConfig.LOCALInitial, initail_current.doGetJSONInitialCurrent())
    //   this.router.navigateByUrl('admin');
    
    // }, 300);


  }

  doClose(){
    window.location.href = 'https://www.thaieasypass.com/';
  }

}
