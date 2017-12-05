import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class TabbedPaneService {

    constructor() { }

    public nextPage$ = new Subject<void>();

    next(): void {
        this.nextPage$.next();
    }

}

