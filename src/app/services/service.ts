import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, catchError, map, of } from "rxjs";
import { School } from "../types/School.type";

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
}
