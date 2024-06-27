import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { StudentDTO } from '../../Models/student.dto';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.css',
})
export class GenderComponent implements OnInit {
  students: StudentDTO[] = [];
  chart: any = [];

  constructor(private studentService: StudentService) {
    const start = Date.now();
    while (Date.now() - start < 3000) {}
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;

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

      this.showChart([totalMen, totalWomen])
    })
  }

  showChart(data: Array<number>) {
    this.chart = new Chart('gender', {
      type: 'pie',
      data: {
        labels: ['Masculino', 'Femenino'],
        datasets: [
          {
            label: 'Total',
            data: data,
          },
        ],
      },
      options: {}
    });
  }

}
