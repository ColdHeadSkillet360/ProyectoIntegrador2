import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { HomeVentasComponent } from './home.ventas.component';

@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot([
            { path: '', component: AppComponent }
        ])
    ],
    declarations: [HomeVentasComponent,AppComponent],
    bootstrap: [HomeVentasComponent]
})

export class HomeVentasModule { }