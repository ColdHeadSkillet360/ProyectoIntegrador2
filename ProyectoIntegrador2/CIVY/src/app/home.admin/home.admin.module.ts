import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { HomeAdminComponent } from './home.admin.component';

@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot([
            { path: '', component: AppComponent }
        ])
    ],
    declarations: [HomeAdminComponent, AppComponent],
    bootstrap: [HomeAdminComponent]
})

export class HomeAdminModule { }