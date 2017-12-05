import { Component, OnInit, Input, EventEmitter, Output, AfterContentInit, QueryList, ContentChildren, ViewChild } from '@angular/core';
import { TabComponent } from "../tab/tab.component";
import { TabbedPaneService } from "../tabbed-pane.service";
import { PagerComponent } from "../pager/pager.component";

@Component({
  selector: 'tabbed-pane',
  templateUrl: './tabbed-pane.component.html',
  styleUrls: ['./tabbed-pane.component.css'],
  exportAs: 'tabbedPane',
  viewProviders: [TabbedPaneService]
})
export class TabbedPaneComponent implements OnInit, AfterContentInit {

  constructor(private service: TabbedPaneService) { 
  }

  ngOnInit() {
    this.service.nextPage$.subscribe(offset => {
      let idx = this.tabs.findIndex(t => t.id == this.activeId);
      let nextIdx = idx + offset;

      if (nextIdx >= this.tabs.length) return;
      if (nextIdx < 0) return;

      let nextTab = this.tabs[nextIdx];
      this.activate(nextTab.id);
    })
  }

  @Input() activeId: number;
  @Output() activeIdChange = new EventEmitter<number>();

  @ContentChildren(TabComponent)
  tabList: QueryList<TabComponent>;

  // Just for demonstration!
  // Try to avoid this and use data binding instead!
  @ViewChild('pager')
  pager: PagerComponent;

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
        this.pager.title = tab.title;
      }

    });
  }



}
