import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ChatPageComponent} from './chat-page/chat-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AppRoutingModule} from './app-routing.module';
import {LogoComponent} from './login-page/logo/logo.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Logo2Component } from './login-page/logo2/logo2.component';
import { HeaderComponent } from './chat-page/header/header.component';
import { ConversationsComponent } from './chat-page/conversations/conversations.component';
import { ActiveUserListComponent } from './chat-page/active-user-list/active-user-list.component';

@NgModule({
    declarations: [
        AppComponent,
        ChatPageComponent,
        LoginPageComponent,
        LogoComponent,
        Logo2Component,
        HeaderComponent,
        ConversationsComponent,
        ActiveUserListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
   providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
