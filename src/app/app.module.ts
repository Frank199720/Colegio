import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { ErrorComponent } from './shared/error/error.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import 'ag-grid-enterprise';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
