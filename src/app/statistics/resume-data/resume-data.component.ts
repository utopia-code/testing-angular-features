import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { StudentDTO } from '../../Models/student.dto';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-resume-data',
  templateUrl: './resume-data.component.html',
  styleUrl: './resume-data.component.css'
})

export class ResumeDataComponent implements OnInit {
  students: StudentDTO[] = [];

  public doughnutChartLabels: string[] = [
    'Alumnos',
    'Aprobados',
    'Suspendidos'
  ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [], label: '' },
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'];

  constructor(
    private studentService: StudentService, 
    private cdr: ChangeDetectorRef
  ) {
    console.log('LoadingSlowComponent');

    const start = Date.now();
    while (Date.now() - start < 3000) {}

  }

  ngOnInit(): void {
    
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;

      const totalStudents = this.students.length;

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

      this.showChart([totalStudents, totalPassStudents, totalFailStudents]);
      
      this.cdr.markForCheck();
    })
  }

  showChart(data: Array<number>) {
    this.doughnutChartDatasets = [
      { data: data, label: 'Total' },
    ];
  }
}
