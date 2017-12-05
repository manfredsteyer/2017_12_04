import { Component, OnInit } from '@angular/core';
import { Flight } from '../../entities/flight';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FlightService } from './flight.service';
import { TranslateService } from "@ngx-translate/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { validateCityWithParams, validateCity, validateRoundTrips, validateCityAsync } from "../../shared/validation/city-validators";

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  // providers: [FlightService]
})
export class FlightSearchComponent implements OnInit {

  // from: string;
  // to: string;
  // flights: Array<Flight> = [];
  // date: string = '2017-12-05T17:00:00.0000+01:00';

  filter: FormGroup;

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
    private fb: FormBuilder,
    private translate: TranslateService,
    private flightService: FlightService) {
    // this.http = http;
  }

  metadata = [
    { name: 'from', labelKey: 'FLIGHTS.from', type: "text" },
    { name: 'to', labelKey: 'FLIGHTS.to', type: "text" },
    { name: 'date', labelKey: 'Date', type: "date" }
  ];

  ngOnInit() {

    // init form

    this.filter = this.fb.group({
      from: [
        'Graz', 
        [
          validateCityWithParams(['Graz', 'Hamburg', 'Zürich']), 
          Validators.required, 
          Validators.minLength(3)
        ]
      ],
      to: [
        'Hamburg', 
        [
          // validateCity
        ],
        [
          validateCityAsync(this.flightService)
        ]
      ],
      date: ['2017-11-05']
    }, { updateOn: 'blur'});

    this.filter.setValidators(validateRoundTrips);

    

    this.filter.valueChanges.subscribe(v => {
      console.debug('filter changed', v);
      console.debug('\tfilter changed', v.from);
      console.debug('\tfilter changed', v.to);
      console.debug('\tfilter changed', v.date);
    })

    // init ngx-translate
    let txt = this.translate.instant('FLIGHT.found', {count: 47});
    this.translate.get('FLIGHT.found', {count: 47}).subscribe(txt => console.debug(txt));

    this.translate.setTranslation('de', { 'ERROR': 'Ups!' }, true);
  }

  search(): void {

    if (!this.filter.value.from || !this.filter.value.to) return;

    this.flightService
        .load(this.filter.value.from, this.filter.value.to);

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
