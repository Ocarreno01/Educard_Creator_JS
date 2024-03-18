import { Component, OnInit } from "@angular/core";
import { Service } from "src/app/services/service";

@Component({
  selector: "app-upload-photos",
  templateUrl: "./upload-photos.component.html",
  styleUrls: ["./upload-photos.component.css"],
})
export class UploadPhotosComponent implements OnInit {
  public schools: any[] = []; // Asegúrate de inicializar estas variables
  public grades: any[] = [];
  public photos: any[] = [];
  public selectedSchool: string = "";
  public selectedGrade: string = "";
  public searched = false;
  public loading = false;

  constructor(private service: Service) {}

  public async ngOnInit(): Promise<void> {
    await this.getSchools();
  }

  public async getSchools(): Promise<void> {
    return new Promise((resolve) => {
      this.service.getAllSchools().subscribe((response) => {
        this.schools = response || [];
        resolve();
      });
    });
  }

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    console.log("file", file);
    if (file) {
      const reader: FileReader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result;
        const data = {
          base64,
          gradeId: this.selectedGrade,
        };
        this.service.uploadPhotos(data).subscribe(async (response) => {
          console.log("response uploadPhotos", response);
          this.loading = false;
          if (response) {
            console.log("response", response);
            if (response.status) {
              await this.searchPhotos();
            } else {
              alert(response.message);
            }
          } else {
            alert("Ocurrio un error, por favor intentelo de nuevo");
          }
        });
      };
      this.searched = false;
      reader.readAsDataURL(file);
    }
  }

  public async onSelectedShool(): Promise<void> {
    return new Promise((resolve) => {
      this.service.getGrades(this.selectedSchool).subscribe((response) => {
        console.log("this.grades", response);
        this.grades = response || [];
        this.searched = false;
        this.photos = [];
        this.selectedGrade = "";
        resolve();
      });
    });
  }

  public onSelecteGrade(): void {
    this.searched = false;
    this.photos = [];
  }

  public async searchPhotos(): Promise<void> {
    if (this.selectedSchool && this.selectedGrade) {
      console.log(this.selectedSchool, this.selectedGrade);
      this.searched = true;
      this.service.getPhotos(this.selectedGrade).subscribe((response) => {
        this.photos = response || [];
        this.searched = true;
      });
    }
  }
}
