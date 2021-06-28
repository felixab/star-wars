import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./routing/app-routing.module";
import { StarshipsComponent } from "./components/starships/starships.component";
import { PilotComponent } from "./components/pilot/pilot.component";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [StarshipsComponent, PilotComponent, AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
