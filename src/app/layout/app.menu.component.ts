import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { InitialCurrent } from '../config/initial_current';
import { AppConfig } from '../config/config';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    constructor(
        public layoutService: LayoutService,
        private router: Router,
    ) { }
    
    public initial_current: InitialCurrent = new InitialCurrent();
    doGetInitialCurrent() {
        this.initial_current = JSON.parse(localStorage.getItem(AppConfig.LOCALInitial) || '{}');
        if (!this.initial_current.Token) {
            this.router.navigateByUrl('login');
        }
    }

    etaxpage(){
        window.open("https://etaxuat.exat.co.th/internal/login", "_blank");
    }

    etaxpage_user(){
        window.open("https://etax.exat.co.th/external/login", "_blank");
    }


    exatpage(){
        window.open("http://172.20.1.106/EXAT_FEE/main.jsp?PageID=REP01", "_blank");
    }

    logout() {
        localStorage.clear();
        this.router.navigateByUrl('login')
    }

    logout_customer() {
        localStorage.clear();

        this.router.navigateByUrl('login')
    }

    ngOnInit() {

        //this.doGetInitialCurrent();


        //if (this.initial_current.Usertype == "ADM") {
            this.model = [                
                
                {
                    label: 'ผู้ดูแลระบบ',
                    items: [                        
                        { label: 'หน้าแรก', routerLink: ['/admin'], icon: 'pi pi-fw pi-home' },   
                        { label: 'ข้อมูลสิทธิประโยชน์', routerLink: ['/admin/benefit'], icon: 'pi pi-fw pi-file' },   
                        { label: 'จัดการข้อมูลข่าวสาร', routerLink: ['/admin/benefit'], icon: 'pi pi-fw pi-file' },   
                       
                        { label: 'ออกจากระบบ', command: () => {
                            this.logout();
                        }, icon: 'pi pi-fw pi-sign-out' },
                                                
                    ]
                }              


            ];
        //}
        // if (this.initial_current.Usertype == "USER") {
        //     this.model = [
        //         {
        //             label: 'ลูกค้า',
        //             items: [                       
        //                 { label: 'ค่าธรรมเนียมการรักษาบัญชี', routerLink: ['/customer/fee'], icon: 'pi pi-fw pi-file' },
        //                 // { label: 'ระบบ E-Tax', command: () => {
        //                 //     this.etaxpage_user();
        //                 // }, icon: 'pi pi-fw pi-th-large' },
        //                 { label: 'ออกจากระบบ', command: () => {
        //                     this.logout_customer();
        //                 }, icon: 'pi pi-fw pi-sign-out' },
                        
        //             ]
        //         }
        //     ];
        // }

       
    }
}
