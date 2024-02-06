import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BenefitComponent } from './benefit/benefit.component';

@NgModule({
    imports: [RouterModule.forChild([ 

        { path: 'benefit', component: BenefitComponent },
        { path: '', component: DashboardComponent },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
