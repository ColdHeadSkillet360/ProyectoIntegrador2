"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var app_component_1 = require("../app.component");
var home_ventas_component_1 = require("./home.ventas.component");
var HomeVentasModule = (function () {
    function HomeVentasModule() {
    }
    return HomeVentasModule;
}());
HomeVentasModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot([
                { path: '', component: app_component_1.AppComponent }
            ])
        ],
        declarations: [home_ventas_component_1.HomeVentasComponent, app_component_1.AppComponent],
        bootstrap: [home_ventas_component_1.HomeVentasComponent]
    })
], HomeVentasModule);
exports.HomeVentasModule = HomeVentasModule;
//# sourceMappingURL=home.ventas.module.js.map