import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Service } from "src/app/services/service";
import { Grade } from "src/app/types/Grade.type";

@Component({
  selector: "app-grades",
  templateUrl: "./grades.component.html",
  styleUrls: ["./grades.component.css"],
})
export class GradesComponent implements OnInit {
  public gradeForm!: FormGroup;
  public action = "Crear";
  public onCreateMode = false;
  public grades: any = [];
  public schools: any = [];
  public selectedSchool = "all";
  constructor(private formBuilder: FormBuilder, private service: Service) {}

  public async ngOnInit(): Promise<void> {
    this.gradeForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      colegio: ["", Validators.required],
    });
    await this.getGrades("all");
    await this.getSchools();
  }

  public async getGrades(typeSearch = "all"): Promise<void> {
    console.log("typeSearch", typeSearch);
    return new Promise((resolve, reject) => {
      this.service.getGrades(typeSearch).subscribe((response: any[]) => {
        this.grades = response || [];
        resolve();
      });
    });
  }

  public toogleCreate(): void {
    this.action = this.action === "Crear" ? "Listar" : "Crear";
    this.onCreateMode = !this.onCreateMode;
  }

  public onSubmit(): void {
    if (this.gradeForm.invalid) {
      return;
    }

    const gradeData: Grade = {
      name: this.gradeForm.value.nombre,
      schoolId: this.gradeForm.value.colegio,
    };
    console.log(gradeData);

    this.service.createGrade(gradeData).subscribe((data) => {
      if (!data) {
        return alert("Ocurrio un error, intentelo de nuevo");
      }
      alert("Colegio registrado exitosamente!");
      this.gradeForm.reset();
      this.toogleCreate();
      this.getGrades("all");
    });
  }

  public async getSchools(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.service.getAllSchools().subscribe((response) => {
        this.schools = response || [];
        resolve();
      });
    });
  }

  public getSchoolName(colegioId: string): string {
    const school = this.schools.find((school: any) => school.id === colegioId);
    return school ? school.nombre : "No encontrado";
  }
}
