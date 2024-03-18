import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { SchoolsComponent } from "./components/schools/schools.component";
import { GradesComponent } from './components/grades/grades.component';
import { StudentsComponent } from './components/students/students.component';
import { UploadPhotosComponent } from './components/upload-photos/upload-photos.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    MenuBarComponent,
    SchoolsComponent,
    GradesComponent,
    StudentsComponent,
    UploadPhotosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
