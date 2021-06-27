import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { StarwarsService } from "../services/starwars.service";

@Component({
  selector: "app-starships",
  templateUrl: "./starships.component.html",
  styleUrls: ["./starships.component.scss"],
})
export class StarshipsComponent implements OnInit {
  starships: any[];
  starshipsSubscription: Subscription;

  constructor(private starwarsService: StarwarsService) {}

  ngOnInit(): void {
    this.starshipsSubscription = this.starwarsService.starships.subscribe(
      (starships) => (this.starships = starships)
    );
  }
}
