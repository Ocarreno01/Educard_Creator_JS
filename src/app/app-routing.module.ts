import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { SchoolsComponent } from "./components/schools/schools.component";
import { GradesComponent } from "./components/grades/grades.component";
import { StudentsComponent } from "./components/students/students.component";
import { UploadPhotosComponent } from "./components/upload-photos/upload-photos.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "schools", component: SchoolsComponent },
  { path: "grades", component: GradesComponent },
  { path: "students", component: StudentsComponent },
  { path: "photos", component: UploadPhotosComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
