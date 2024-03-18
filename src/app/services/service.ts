import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, catchError, map, of } from "rxjs";
import { School } from "../types/School.type";
import { Grade } from "../types/Grade.type";
import { Student } from "../types/Student.type";

@Injectable({
  providedIn: "root",
})
export class Service {
  private apiUrl = environment.nodeServer;
  private headers = new HttpHeaders({
    "Content-Type": "application/json",
  });

  constructor(private http: HttpClient) {}

  public createSchool(schoolData: School): Observable<any | boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/api/createSchool`, schoolData, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          console.log("response", response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public getAllSchools(): Observable<any | boolean> {
    return this.http
      .get<School[]>(`${this.apiUrl}/api/gelAllSchools`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          console.log("response", response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public getGrades(typeSearch: string): Observable<any | boolean> {
    return this.http
      .get<School[]>(`${this.apiUrl}/api/getGrades/${typeSearch}`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          console.log("response", response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public createGrade(gradeData: Grade): Observable<any | boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/api/createGrade`, gradeData, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          console.log("response", response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public getStudents(idGrade: string): Observable<any | boolean> {
    return this.http
      .get<Student[]>(`${this.apiUrl}/api/getStudents/${idGrade}`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          console.log("response", response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public getPhotos(idGrade: string): Observable<any | boolean> {
    return this.http
      .get<Student[]>(`${this.apiUrl}/api/getPhotos/${idGrade}`, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          console.log("response", response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public manageStudents(
    excelData: any[],
    selectedGrade: string
  ): Observable<any | boolean> {
    return this.http
      .post<any>(
        `${this.apiUrl}/api/manageStudents`,
        { excelData, selectedGrade },
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((response) => {
          console.log("response", response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  public uploadPhotos(data: any): Observable<any | boolean> {
    return this.http
      .post<any>(`${this.apiUrl}/api/uploadPhotos`, data, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          console.log("response", response);
          return response || false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }
}
