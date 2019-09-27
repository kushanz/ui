import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkflowComponent } from  './components/workflow/workflow.component';
import { FormsComponent } from './components/forms/forms.component';

const routes: Routes = [
    {path:"workflow",component:WorkflowComponent},
    {path:"forms",component:FormsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
