

import { AbstractControl, ValidatorFn, AsyncValidatorFn, ValidationErrors, FormGroup } from "@angular/forms";
import { FlightService } from "../../flight-booking/flight-search/flight.service";
import { of } from "rxjs/observable/of";

export let validateCity: ValidatorFn = function (c: AbstractControl): ValidationErrors {
    if (c.value == 'Graz' || c.value == 'Hamburg') {
        return {};
    }
    return { city: true }
}

export function validateCityWithParams(allowedCities: string[]): ValidatorFn {
    return (c: AbstractControl) => {
        if (allowedCities.indexOf(c.value) > -1) {
            return {}
        }
        return {city: true}
    }
}

export let validateRoundTrips: ValidatorFn = function (c: AbstractControl): ValidationErrors {
    
    let group = c as FormGroup;

    let fromCtrl = group.controls['from'];
    let toCtrl = group.controls['to'];

    if (fromCtrl.value == toCtrl.value) {
        return {
            roundTrip: true
        }
    }

    return {};
}




export function validateCityAsync(flightService: FlightService): AsyncValidatorFn {
    return (c: AbstractControl) => {
        return flightService.find(c.value, '').map(flights => {
            if (flights.length > 0) return {};
            return {asyncCity: true};
        });
    }
}