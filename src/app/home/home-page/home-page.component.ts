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

      data.forEach(item => {
        item.genre = this.getGenre(item.genre)
      });

      this.students = data;
      // this.students = [];
    })
  }

  getGenre(genre: string): string {
    switch (genre) {
      case 'M':
        return 'Masculino';
      case 'F': 
        return 'Femenino';
      default:
        return 'No binario';
    }
  }
}
