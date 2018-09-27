import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ChatPageComponent} from './chat-page/chat-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AppRoutingModule} from './app-routing.module';
import {LogoComponent} from './chat-page/logo/logo.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Logo2Component } from './chat-page/logo2/logo2.component';

@NgModule({
    declarations: [
        AppComponent,
        ChatPageComponent,
        LoginPageComponent,
        LogoComponent,
        Logo2Component
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
   // providers: [HttpClient],
    bootstrap: [AppComponent]
})
export class AppModule {
}
