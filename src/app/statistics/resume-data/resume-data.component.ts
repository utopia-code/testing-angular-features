import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { StudentDTO } from '../../Models/student.dto';
import { StudentService } from '../../Services/student.service';


@Component({
  selector: 'app-resume-data',
  templateUrl: './resume-data.component.html',
  styleUrl: './resume-data.component.css'
})

export class ResumeDataComponent implements OnInit {
  students: StudentDTO[] = [];
  chart: any = [];

  constructor( private studentService: StudentService) {
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
    })
  }

  showChart(data: Array<number>) {
    this.chart = new Chart('resume', {
      type: 'doughnut',
      data: {
        labels: ['Alumnos', 'Aprobados', 'Suspendidos'],
        datasets: [
          {
            label: 'Total',
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {}
    });
  }
  
}
