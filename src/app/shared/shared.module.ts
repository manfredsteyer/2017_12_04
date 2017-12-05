import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './pipes/city.pipe';
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { ExitGuard } from "./exit/exit.guard";
import { CustomPreloadingStrategy } from "./preload/custom-preloading-strategy.service";
import { DateValueAccessor } from "./dates/date.directive";
import { TabComponent } from "./tabbed-pane/tab/tab.component";
import { TabbedPaneComponent } from "./tabbed-pane/tabbed-pane/tabbed-pane.component";
import { BadComponent } from "./tabbed-pane/bad/bad.component";
import { PagerComponent } from "./tabbed-pane/pager/pager.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CityPipe,
    DateValueAccessor,
    TabComponent,
    TabbedPaneComponent,
    BadComponent,
    PagerComponent
  ],
  providers: [/* No providers here*/],
  exports: [
    CityPipe,
    DateValueAccessor,
    TabComponent,
    TabbedPaneComponent,
    BadComponent,
    PagerComponent
  ]
})
export class SharedModule { 

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuard,
        ExitGuard,
        CustomPreloadingStrategy
    ]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    }

  }
}
