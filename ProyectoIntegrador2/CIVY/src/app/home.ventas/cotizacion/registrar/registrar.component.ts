import { Component,ElementRef, OnInit } from "@angular/core";
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;

//TEMPLATE
@Component({
    templateUrl: './registrar.component.html',
    styleUrls: [ '../../../../../vendors/bootstrap/dist/css/dataTables.bootstrap.min.css']
})

export class RegistrarCotizacionComponent implements OnInit {

    rootNode: any;
    constructor(rootNode: ElementRef) {
        this.rootNode = rootNode;
    }

    ngOnInit() {
        var el = $(this.rootNode.nativeElement).find('example')[0];
        $('#example').DataTable();
    }

    
}