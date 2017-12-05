import { Component, OnInit, Input, Optional } from '@angular/core';
import { TabbedPaneComponent } from "../tabbed-pane/tabbed-pane.component";
import { TabbedPaneService } from "../tabbed-pane.service";

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent  {

  @Input() title: string;
  @Input() id: number;
  visible: boolean = true;

  constructor(private service: TabbedPaneService) {
  }

  next(): void {
    this.service.next();
  }

}
