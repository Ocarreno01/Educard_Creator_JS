import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Service } from "../../services/service";
import { School } from "../../types/School.type";
@Component({
  selector: "app-schools",
  templateUrl: "./schools.component.html",
  styleUrls: ["./schools.component.css"],
})
export class SchoolsComponent implements OnInit {
  public schoolForm!: FormGroup;
  public action = "Crear";
  public onCreateMode = false;
  public schools: any = [];
  constructor(private formBuilder: FormBuilder, private service: Service) {}

  ngOnInit(): void {
    this.schoolForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      ciudad: ["", Validators.required],
      direccion: ["", Validators.required],
      estado: ["activo", Validators.required],
    });
    this.getSchools();
  }

  public async onSubmit(): Promise<void> {
    if (this.schoolForm.invalid) {
      return;
    }

    const schoolData: School = {
      name: this.schoolForm.value.nombre,
      city: this.schoolForm.value.ciudad,
      address: this.schoolForm.value.direccion,
      status: this.schoolForm.value.estado,
    };
    console.log(schoolData);
    this.service.createSchool(schoolData).subscribe((data) => {
      alert("Colegio registrado exitosamente!");
      this.schoolForm.reset();
      this.toogleCreate();
      this.getSchools();
    });
  }

  public async getSchools(): Promise<void> {
    this.service.getAllSchools().subscribe((response) => {
      this.schools = response || [];
    });
  }

  public toogleCreate(): void {
    this.action = this.action === "Crear" ? "Listar" : "Crear";
    this.onCreateMode = !this.onCreateMode;
  }
}
