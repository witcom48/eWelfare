import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { BenefitComponent } from './benefit/benefit.component';
import { TopicComponent } from './topic/topic.component';


@NgModule({
    imports: [RouterModule.forChild([ 

        { path: 'benefit', component: BenefitComponent },
        { path: 'topic', component: TopicComponent },
        

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
