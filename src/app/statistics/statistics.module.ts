import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GenderComponent } from './gender/gender.component';
import { GeneralResultsComponent } from './general-results/general-results.component';
import { ResumeDataComponent } from './resume-data/resume-data.component';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [
    StatisticsPageComponent, 
    ResumeDataComponent, 
    GenderComponent, 
    GeneralResultsComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    BaseChartDirective
  ],
})
export class StatisticsModule { }
