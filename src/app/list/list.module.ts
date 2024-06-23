import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { ListPageComponent } from './list-page/list-page.component';
import { ListRoutingModule } from './list-routing.module';

@NgModule({
  declarations: [ListPageComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    ScrollingModule
  ]
})
export class ListModule { }
