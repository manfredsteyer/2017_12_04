import { Component, OnInit } from '@angular/core';
import { Flight } from '../../entities/flight';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FlightService } from './flight.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  // providers: [FlightService]
})
export class FlightSearchComponent implements OnInit {

  from: string;
   to: string;
  // flights: Array<Flight> = [];
   date: string = '2017-12-05T17:00:00.0000+01:00';


  get flights() {
    return this.flightService.flights;
  }


  selectedFlight: Flight;

  basket: object = {
    "3": true,
    "5": true
  };

  // private http: HttpClient;

  constructor(
    private translate: TranslateService,
    private flightService: FlightService) {
    // this.http = http;
  }

  ngOnInit() {
    let txt = this.translate.instant('FLIGHT.found', {count: 47});
    this.translate.get('FLIGHT.found', {count: 47}).subscribe(txt => console.debug(txt));

    this.translate.setTranslation('de', { 'ERROR': 'Ups!' }, true);
  }

  search(): void {

    if (!this.from || !this.to) return;

    this.flightService
        .load(this.from, this.to);

    /*
    this.flights.push({
      id: 4711,
      from: 'Graz',
      to: 'Kognito',
      date: '2017-11-13T17:00'
    });

    this.flights.push({
      id: 4712,
      from: 'Graz',
      to: 'Flagranti',
      date: '2017-11-13T17:30'
    });

    this.flights.push({
      id: 4713,
      from: 'Graz',
      to: 'Hamburg',
      date: '2017-11-13T18:00'
    });
    */
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

}
