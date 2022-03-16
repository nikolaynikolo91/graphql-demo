import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { ApolloAngularComponent } from './apollo-angular/apollo-angular.component';
import { ApolloAngularModule } from './apollo-angular/apollo.module';
import { ApolloAngularService } from './apollo-angular/apollo.service';
import { HttpClientModule } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './home/home.component';
import {
  HttpBatchLink,
  HttpBatchLinkModule,
} from 'apollo-angular-link-http-batch';
import { NativeGraphqlComponent } from './native-graphql/native-graphql.component';

@NgModule({
  declarations: [AppComponent, ApolloAngularComponent, HomeComponent, NativeGraphqlComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    ApolloAngularModule,
    HttpClientModule,
    MatTabsModule,
  ],
  providers: [ApolloAngularService],
  bootstrap: [AppComponent],
})
export class AppModule {}
