import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {ChatPageComponent} from './chat-page/chat-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {Logo2Component} from './chat-page/logo2/logo2.component';


const routes: Routes = [
    {path: '', component: LoginPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'chat', component: ChatPageComponent},
    {path: 'logo2', component: Logo2Component}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {
}
