import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { StarwarsService } from "../../services/starwars.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-pilot",
  templateUrl: "./pilot.component.html",
  styleUrls: ["./pilot.component.scss"],
})
export class PilotComponent implements OnInit {
  pilotName: any;
  person: any;
  people: any;
  peopleSubscription: Subscription;

  constructor(
    private starwarsService: StarwarsService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.pilotName = params["id"];
    });
    this.peopleSubscription = this.starwarsService.people.subscribe(
      (people) => {
        this.people = people;
        this.person = this.people.find((person: any) => {
          return person.name === this.pilotName;
        });
      }
    );
  }

  back(): void {
    this.location.back();
  }
}
