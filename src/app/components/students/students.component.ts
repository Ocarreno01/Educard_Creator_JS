import { Component, OnInit } from "@angular/core";
import { Service } from "src/app/services/service";
import * as XLSX from "xlsx";
@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"],
})
export class StudentsComponent implements OnInit {
  public schools: any[] = []; // Asegúrate de inicializar estas variables
  public grades: any[] = [];
  public students: any[] = [];
  public selectedSchool: string = "";
  public selectedGrade: string = "";
  public searched = false;
  public loading = false;

  constructor(private service: Service) {}

  public async ngOnInit(): Promise<void> {
    await this.getSchools();
  }

  public async searchStudents(): Promise<void> {
    if (this.selectedSchool && this.selectedGrade) {
      this.service.getStudents(this.selectedGrade).subscribe((response) => {
        this.students = response || [];
        this.searched = true;
      });
    }
  }

  public async getSchools(): Promise<void> {
    return new Promise((resolve) => {
      this.service.getAllSchools().subscribe((response) => {
        this.schools = response || [];
        resolve();
      });
    });
  }

  public async onSelectedShool(): Promise<void> {
    return new Promise((resolve) => {
      this.service.getGrades(this.selectedSchool).subscribe((response) => {
        console.log("this.grades", response);
        this.grades = response || [];
        this.searched = false;
        this.students = [];
        this.selectedGrade = "";
        resolve();
      });
    });
  }

  public onSelecteGrade(): void {
    this.searched = false;
    this.students = [];
  }

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.loading = true;
      return this.readExcel(file);
    }
  }

  public readExcel(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Manipula excelData para obtener los datos de cada columna de cada fila

      if (this.validateExcel(excelData)) {
        excelData.shift();
        this.service
          .manageStudents(excelData, this.selectedGrade)
          .subscribe((response: any) => {
            console.log("response manageStudents", response);
            this.loading = false;
            if (response) {
              this.searchStudents();
            } else {
              alert("Ocurrio un error, por favor intentelo de nuevo");
            }
          });
      } else {
        this.loading = false;
      }
      this.searched = false;
    };
    reader.readAsArrayBuffer(file);
  }

  public validateExcel(excelData: any[]): boolean {
    if (excelData && excelData.length > 2) {
      const headers = excelData[0];
      if (headers && headers[0] === "Nombre" && headers[1] === "Cedula") {
        // Validar desde la posicion 1 para saltar los encabezados
        for (let index = 1; index < excelData.length; index++) {
          const element: string[] = excelData[index];
          if (
            element.length === 2 &&
            typeof element[0] === "string" &&
            typeof element[1] === "string"
          ) {
            return true;
          } else {
            alert("Por favor verifique los datos de los estudiantes");
          }
          console.log("element", element);
        }
      } else {
        alert(
          "Por favor valide que los encabezados sean 'Nombre' y 'Cedula'. Y se encuentren en la primera fila"
        );
      }
    } else {
      alert("Por favor valide que el excel contenga datos");
    }

    return false;
  }
}
