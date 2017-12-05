import { Component, OnInit } from '@angular/core';
import { TabbedPaneService } from "../tabbed-pane.service";

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  title: string;

  constructor(private service: TabbedPaneService) {
  }

  next(): void {
    this.service.next();
  }

  prev(): void {
    this.service.prev();
  }

  ngOnInit() {
  }

}
