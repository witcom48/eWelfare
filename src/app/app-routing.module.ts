import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

import { LogoutComponent } from './components/authen/logout/logout.component';
import { LoginComponent } from './components/authen/login/login.component';


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
            { path: 'login', component: LoginComponent, },
            { path: 'logout', component: LogoutComponent, },   

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
