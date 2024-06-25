import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { StudentDTO } from '../../Models/student.dto';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-general-results',
  templateUrl: './general-results.component.html',
  styleUrl: './general-results.component.css'
})
export class GeneralResultsComponent implements OnInit{
  students: StudentDTO[] = [];

  public barChartLabels: string[] = [
    'Aprobados',
    'Suspendidos'
  ]

  public barChartDatasets: ChartConfiguration<'bar'>['data']['datasets'] = [
    { data: [], label: '', backgroundColor: [], borderColor: [], borderWidth: 1 }
  ];

  public barChartOptions: ChartConfiguration<'bar'>['options'] =  {
    indexAxis: 'y'
  }
  
  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) {
    const start = Date.now();
    while (Date.now() - start < 3000) {}
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data

      const { totalPassStudents, totalFailStudents } = this.students.reduce(
        (acc, student) => {
          if (student.note >= 5) {
            acc.totalPassStudents += 1;
          } else {
            acc.totalFailStudents += 1;
          }

          return acc
        }, { totalPassStudents: 0, totalFailStudents: 0 }
      )

      this.showChart([totalPassStudents, totalFailStudents]);

      this.cdr.markForCheck();
    })
  }

  showChart(data: Array<number>) {
    this.barChartDatasets = [
      { 
        data: data, 
        label: 'Total',
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ], 
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)'
        ], 
        borderWidth: 1
      }
    ];
  }
}
