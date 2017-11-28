import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { HomeConsignadorComponent } from './home.consignador.component';

@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot([
            { path: '', component: AppComponent }
        ])
    ],
    declarations: [HomeConsignadorComponent,AppComponent],
    bootstrap: [HomeConsignadorComponent]
})

export class HomeConsignadorModule { }