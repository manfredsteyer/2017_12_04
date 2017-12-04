

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FlightEditComponent } from "../../flight-booking/flight-edit/flight-edit.component";

export interface ExitGuardComponent {
    canDeactivate(): Observable<boolean>;
}

@Injectable()
export class ExitGuard implements CanDeactivate<ExitGuardComponent> {
    canDeactivate(
        component: ExitGuardComponent,
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
    
        return component.canDeactivate();
    
    }
}