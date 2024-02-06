import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

import { VerifyComponent } from './components/authen/verify/verify.component';

import { LoginSsoComponent } from './components/authen/login-sso/login-sso.component';
import { LoginThaieasypassComponent } from './components/authen/login-thaieasypass/login-thaieasypass.component';
import { LogoutComponent } from './components/authen/logout/logout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    
                    { path: 'customer', loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule) },
                    { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },                    
                    { path: 'sec', loadChildren: () => import('./components/authen/authen.module').then(m => m.AuthenModule) }

                ]
            },
            //{ path: 'login', component: VerifyComponent, },
            { path: 'login', component: LogoutComponent, },
            { path: 'logout', component: LogoutComponent, },
            
            { path: 'login_sso/:login_token', component: LoginSsoComponent, },           
            { path: 'login_easypass', component: LoginThaieasypassComponent, },
            

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
