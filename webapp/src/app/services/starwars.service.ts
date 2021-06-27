import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../utils/const";

@Injectable({ providedIn: 'root' })
export class StarwarsService {
  private starshipsSource = new BehaviorSubject<any[]>([]);
  starships = this.starshipsSource.asObservable();

  constructor(private http: HttpClient) {
    this.getAllStarships();
  }

  private getStarshipsAPI(pageNumber: number): Promise<any[]> {
    return this.http.get<any[]>(`${API_URL}/starships/?page=${pageNumber}`).toPromise();
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
}
