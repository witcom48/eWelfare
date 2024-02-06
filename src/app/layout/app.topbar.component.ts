import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';

import { InitialCurrent } from '../config/initial_current';
import { AppConfig } from '../config/config';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    account_name: string = ""

    constructor(
        public layoutService: LayoutService,
        private router: Router,) { }

    logout() {
        localStorage.clear();
        this.router.navigateByUrl('login')
    }

    public initial_current: InitialCurrent = new InitialCurrent();
    doGetAccount() {
        this.initial_current = JSON.parse(localStorage.getItem(AppConfig.LOCALInitial) || '{}');
        if (!this.initial_current.Username) {
            this.router.navigateByUrl('login');
        }
        else{
            this.account_name = this.initial_current.Description
        }
    }

    ngOnInit() {
        //this.doGetAccount()
    }
}
