import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PilotComponent } from "../components/pilot/pilot.component";
import { StarshipsComponent } from "../components/starships/starships.component";

const routes: Routes = [
  { path: "starships", component: StarshipsComponent },
  { path: "people/:id", component: PilotComponent },
  { path: "**", component: StarshipsComponent, redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
