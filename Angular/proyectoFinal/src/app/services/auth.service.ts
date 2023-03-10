import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private role: string;

  constructor() { }

  // Función para verificar las credenciales del usuario
  login(username: string, password: string): boolean {
    // Lógica para verificar las credenciales del usuario
    if (username === 'profesor' && password === '1234') {
      this.isLoggedIn = true;
      this.role = 'profesor';
      return true;
    } else if (username === 'alumno' && password === '5678') {
      this.isLoggedIn = true;
      this.role = 'alumno';
      return true;
    } else {
      return false;
    }
  }

  // Función para cerrar sesión
  logout(): void {
    this.isLoggedIn = false;
    this.role = '';
  }

  // Función para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // Función para verificar si el usuario es profesor
  isProfesor(): boolean {
    return this.role === 'profesor';
  }

  // Función para verificar si el usuario es alumno
  isAlumno(): boolean {
    return this.role === 'alumno';
  }
}
