import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ListPageComponent } from './list-page/list-page.component';
import { ListRoutingModule } from './list-routing.module';

@NgModule({
  declarations: [ListPageComponent],
  imports: [
    CommonModule,
    ListRoutingModule
  ]
})
export class ListModule { }
