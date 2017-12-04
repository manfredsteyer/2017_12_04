import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExitGuardComponent } from "../../shared/exit/exit.guard";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit, ExitGuardComponent {
  
  id: string;
  showDetails: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });
  }

  sender: Observer<boolean>;
  showWarning: boolean = false;

  canDeactivate(): Observable<boolean> {
    return Observable.create((sender: Observer<boolean>) => { 
      this.showWarning = true;
      this.sender = sender;
    });
  }

  decide(decision: boolean): void {
    this.showWarning = false;
    this.sender.next(decision);
    this.sender.complete();
  }

}
