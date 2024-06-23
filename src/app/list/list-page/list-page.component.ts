import { Component } from '@angular/core';
import { StudentDTO } from '../../Models/student.dto';
import { StudentService } from '../../Services/student.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent {
  students: StudentDTO[] = [];
  gridHead: string[] = ['Nombre', 'Género', 'Nota', 'Ausencias'];
  
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    })
  }
}
