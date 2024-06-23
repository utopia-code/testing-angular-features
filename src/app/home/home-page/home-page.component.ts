import { Component } from '@angular/core';
import { StudentDTO } from '../../Models/student.dto';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  students: StudentDTO[] = [];
  columnsTable: string[] = ['Nombre', 'Género', 'Nota', 'Ausencias'];
  
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
      // this.students = [];
    })
  }
}
