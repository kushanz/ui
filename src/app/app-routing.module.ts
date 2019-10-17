import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guards/auth-guard';

import { WorkflowComponent } from  './components/workflow/workflow.component';
import { FormsComponent } from './components/forms/forms.component';

const routes: Routes = [
    {path:"workflow",component:WorkflowComponent,canActivate: [AuthGuardService]},
    {path:"forms",component:FormsComponent,canActivate: [AuthGuardService]},
    { path:"",redirectTo: "/workflow",pathMatch: 'full',canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
