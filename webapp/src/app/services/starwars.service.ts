import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../utils/const";

@Injectable({ providedIn: 'root' })
export class StarwarsService {
  private starshipsSource = new BehaviorSubject<any[]>([]);
  starships = this.starshipsSource.asObservable();

  private peopleSource = new BehaviorSubject<any[]>([]);
  people = this.peopleSource.asObservable();

  constructor(private http: HttpClient) {
    this.getAllStarships();
    this.getAllPeople();
  }

  private async getAllStarships(): Promise<void> {
    let pageNumber = 1;
    let nextPage = "";
    let starshipsResults: any[] = [];
    while (nextPage !== null) {
      const starshipsPage: any = await this.getStarshipsAPI(pageNumber);
      starshipsResults = [...starshipsResults, ...starshipsPage.results];
      nextPage = starshipsPage.next;
      pageNumber++;
    }
    this.getPilotsFromURL(starshipsResults);
    this.starshipsSource.next(starshipsResults);
  }

  private getStarshipsAPI(pageNumber: number): Promise<any[]> {
    return this.http.get<any[]>(`${API_URL}/starships/?page=${pageNumber}`).toPromise();
  }

  private getPilotsFromURL(starshipsResults: any[]) {
    starshipsResults.forEach((starship) => {
      starship.pilots.forEach(async (pilotURL: string, index: number) => {
        starship.pilots[index] = (await this.getPilotAPI(pilotURL)).name;
      });
    });
  }

  private async getPilotAPI(pilotURL: string): Promise<any> {
    return this.http.get<any[]>(pilotURL).toPromise();
  }

  private async getAllPeople(): Promise<void> {
    let pageNumber = 1;
    let nextPage = "";
    let peopleResults: any[] = [];
    while (nextPage !== null) {
      const peoplePage: any = await this.getPeopleAPI(pageNumber);
      peopleResults = [...peopleResults, ...peoplePage.results];
      nextPage = peoplePage.next;
      pageNumber++;
    }
    console.log(peopleResults);
    this.peopleSource.next(peopleResults);
  }

  private async getPeopleAPI(pageNumber: number): Promise<any[]> {
    return this.http.get<any[]>(`${API_URL}/people/?page=${pageNumber}`).toPromise();
  }
}
