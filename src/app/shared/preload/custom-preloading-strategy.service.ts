import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { delay } from "rxjs/operators/delay";
import { switchMap } from "rxjs/operators/switchMap";

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {


    constructor() { }

    preload(route: Route, fn: () => Observable<any>): Observable<any> {
        
        if (route.data && route.data['preload']) {
            return fn();
        }
        return of(null);
        
        /*
        return of(true).pipe(
            delay(700),
            switchMap(_ => fn())
        );
        */
    }
}