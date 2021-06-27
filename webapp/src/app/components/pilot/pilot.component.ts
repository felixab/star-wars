import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { StarwarsService } from "../../services/starwars.service";

@Component({
  selector: "app-pilot",
  templateUrl: "./pilot.component.html",
  styleUrls: ["./pilot.component.scss"],
})
export class PilotComponent implements OnInit {
  people: any[];
  peopleSubscription: Subscription;

  constructor(private starwarsService: StarwarsService) {}

  ngOnInit(): void {}
}
