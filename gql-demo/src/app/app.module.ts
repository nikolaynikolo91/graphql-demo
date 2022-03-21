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
import { NativeGraphqlComponent } from './native-graphql/native-graphql.component';
import { StoreModule } from '@ngrx/store';

import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { NativeEffect } from './native-graphql/state/native-graphql.effects';
import { postsReducer } from './native-graphql/state/native-graphql.reducer';
// import { postReducer } from './postReducer.reducer';
import { MatIconModule } from '@angular/material/icon';
import { HttpBehaviorSubjectComponent } from './http-behavior-subject/http-behavior-subject.component';
import { HttpSimpleComponent } from './http-simple/http-simple.component';
@NgModule({
  declarations: [
    AppComponent,
    ApolloAngularComponent,
    HomeComponent,
    NativeGraphqlComponent,
    HttpBehaviorSubjectComponent,
    HttpSimpleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    ApolloAngularModule,
    HttpClientModule,
    MatTabsModule,
    FormsModule,

    EffectsModule.forRoot([NativeEffect]),
    StoreModule.forRoot({ posts: postsReducer }),
    MatIconModule,
  ],
  providers: [ApolloAngularService],
  bootstrap: [AppComponent],
})
export class AppModule {}
