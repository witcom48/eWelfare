import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { WelfareComponent } from './welfare/welfare.component';
import { BenefitComponent } from './benefit/benefit.component';
import { TopicComponent } from './topic/topic.component';

@NgModule({
    imports: [RouterModule.forChild([                
        { path: '', component: DashboardComponent },
        { path: 'welfare', component: WelfareComponent },
        { path: 'benefit', component: BenefitComponent },
        { path: 'topic', component: TopicComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
