import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./routing/app-routing.module";
import { StarshipsComponent } from "./components/starships.component";

@NgModule({
  declarations: [StarshipsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [StarshipsComponent],
})
export class AppModule {}
