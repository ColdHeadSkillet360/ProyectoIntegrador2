import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { HomeInventarioComponent } from './home.inventario.component';

@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot([
            { path: '', component: AppComponent }
        ])
    ],
    declarations: [HomeInventarioComponent,AppComponent],
    bootstrap: [HomeInventarioComponent]
})

export class HomeInventarioModule { }