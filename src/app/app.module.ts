import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PalletComponent } from './pallet/pallet.component';
import { SummaryComponent } from './summary/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    PalletComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
