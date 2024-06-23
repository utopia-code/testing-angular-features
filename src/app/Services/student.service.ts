import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Papa } from 'ngx-papaparse';
import { Observable, catchError, map, of } from "rxjs";
import { StudentDTO } from "../Models/student.dto";

@Injectable({
    providedIn: 'root'
})

export class StudentService {
    private csvUrl = 'assets/notas_alumnos.csv';
    constructor(private papa: Papa, private http: HttpClient) {}

    getStudents(): Observable<StudentDTO[]> {
        return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
            map((data) => {
                const parsedData = this.papa.parse(data, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        console.log('Parsed: ', result);
                    }
                });

                const students: StudentDTO[] = parsedData.data.map((item: any) => ({
                    id: +item.ID_Alumno,
                    name: item.Nombre,
                    surname: item.Apellidos,
                    genre: item.Sexo,
                    note: +item.Nota_Final,
                    absences: +item.Faltas_Asistencia
                }));

                return students
            }),
            catchError((error) => {
                console.error('Error loading CSV file: ', error);
                return of([]);
            })
        )
    }
}