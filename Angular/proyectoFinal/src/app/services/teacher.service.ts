import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Asigments } from '../interfaces/asigments-data';
import { LoginData } from '../interfaces/login-data.interface';
import { TeachersData } from '../interfaces/profesores-data.interface';
import { RespuestaServidor } from '../interfaces/respuesta-servidor';
import { UserData } from '../interfaces/users-data.interface';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  user: LoginData = { email: '', password: '' };
  token: string = "";
  apiURL: string = "http://127.0.0.1:8000/api";
  teacher: TeachersData | undefined;

  constructor(
    private http: HttpClient
  ) { }

  login(data: LoginData) : Observable<RespuestaServidor> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let options = { headers: headers };
    console.log(data);


    return this.http.post<RespuestaServidor>(`${this.apiURL}/login/teacher`, data,options);
  }
  getTeacher(id:number): Observable<TeachersData> {
    return this.http.get<TeachersData>(`${this.apiURL}/teacher/get/${id}`);
  }
  
  saveUser(teacher: TeachersData): Observable<any> {
    return this.http.put(`${this.apiURL}/teacher/update`, teacher);
  }
  register(data: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    let options = { headers: headers };

    return this.http.post(`${this.apiURL}/register/teacher`, data, options);
  }

    // Método disponible solo para profesores
    createAssignment(assignment: Asigments): Observable<Asigments> {
      // Agregar lógica para crear la tarea
      return this.http.get<Asigments>(`${this.apiURL}/teacher/get/${assignment}`);
    }

    isTeacher(): boolean {
      const user = JSON.parse(localStorage.getItem(this.teacher?.name));
      return user && user.role === 'teacher';
    }
}
