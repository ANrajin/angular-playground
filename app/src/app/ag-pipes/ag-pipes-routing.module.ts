import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyServerComponent } from './my-server/my-server.component';

const routes: Routes = [
  {
    path: '',
    component: MyServerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgPipesRoutingModule { }
