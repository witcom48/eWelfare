import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { WelfareComponent } from './welfare/welfare.component';

@NgModule({
    imports: [RouterModule.forChild([                
        { path: '', component: DashboardComponent },
        { path: 'welfare', component: WelfareComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
