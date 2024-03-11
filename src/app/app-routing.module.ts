import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { SchoolsComponent } from "./components/schools/schools.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "schools", component: SchoolsComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
