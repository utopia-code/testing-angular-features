import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { StudentDTO } from '../../Models/student.dto';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.css'
})
export class GenderComponent implements OnInit {
  students: StudentDTO[] = [];

  public pieChartLabels: string[] = [
    'Masculino',
    'Femenino'
  ]

  public pieChartDatasets: ChartConfiguration<'pie'>['data']['datasets'] = [
    { data: [], label: '' }
  ];

  public pieChartOptions: ChartConfiguration<'pie'>['options'];

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) {
    const start = Date.now();
    while (Date.now() - start < 3000) {}
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    
      console.log(this.students)

      const { totalMen, totalWomen } = this.students.reduce(
        (acc, student) => {
          if (student.genre == 'Masculino') {
            acc.totalMen += 1;
          } else {
            acc.totalWomen += 1;
          }

          return acc
        }, { totalMen: 0, totalWomen: 0 }
      )

      this.pieChartDatasets = [
        { data: [totalMen, totalWomen], label: 'Total' }
      ]

      this.cdr.markForCheck();
    })
  }
}
