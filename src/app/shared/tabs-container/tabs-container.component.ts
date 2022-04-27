import { Component, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();

  constructor() { }

  ngAfterContentInit(): void {
    const activeTab = this.tabs?.filter(
      tab => tab.active
    )

    if(!activeTab || activeTab.length === 0) {
      this.selectTab(this.tabs!.first)
    }
  }

  classGenerator(active: boolean) {
    if (active) {
      return 'hover:text-white text-white bg-indigo-400';
    }
    return 'hover:text-indigo-400'
  }

  selectTab(Tab: TabComponent) {
    this.tabs.forEach(
      tab => {
        tab.active = false
      })
    Tab.active = true;

    return false
  }

}
