import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgPipesRoutingModule } from './ag-pipes-routing.module';
import { MyServerComponent } from './my-server/my-server.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyServerComponent
  ],
  imports: [
    CommonModule,
    AgPipesRoutingModule,
    FormsModule
  ]
})
export class AgPipesModule { }
