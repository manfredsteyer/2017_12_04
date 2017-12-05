import { Component, OnInit, Input, EventEmitter, Output, AfterContentInit, QueryList, ContentChildren } from '@angular/core';
import { TabComponent } from "../tab/tab.component";
import { TabbedPaneService } from "../tabbed-pane.service";

@Component({
  selector: 'tabbed-pane',
  templateUrl: './tabbed-pane.component.html',
  styleUrls: ['./tabbed-pane.component.css'],
  exportAs: 'tabbedPane',
  providers: [TabbedPaneService]
})
export class TabbedPaneComponent implements OnInit, AfterContentInit {

  constructor(private service: TabbedPaneService) { 
  }

  ngOnInit() {
    this.service.nextPage$.subscribe(_ => {
      let idx = this.tabs.findIndex(t => t.id == this.activeId);
      if (idx >= this.tabs.length -1) return;
      let nextIdx = idx + 1;
      let nextTab = this.tabs[nextIdx];
      this.activate(nextTab.id);
    })
  }

  @Input() activeId: number;
  @Output() activeIdChange = new EventEmitter<number>();

  @ContentChildren(TabComponent)
  tabList: QueryList<TabComponent>;

  // tabs: TabComponent[] = [];

  get tabs() {
    if (!this.tabList) return [];
    return this.tabList.toArray();
  }

  activeTab: TabComponent;

  ngAfterContentInit(): void {
    this.activate(this.activeId);
  }

  activate(id: number) {
    this.activeId = id;
    this.activeIdChange.next(id);

    this.tabs.forEach(tab => {
      tab.visible = (tab.id === this.activeId);
      
      if (tab.id == this.activeId) {
        this.activeTab = tab;
      }

    });
  }



}
