import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {ChatPageComponent} from './chat-page/chat-page.component';
import {LoginPageComponent} from './login-page/login-page.component';


const routes: Routes = [
    {path: '', component: LoginPageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'chat', component: ChatPageComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {
}
