import { AfterContentChecked, AfterContentInit, AfterRenderRef, AfterViewInit, Component, inject, OnChanges, OnInit } from "@angular/core";
import { OnSameUrlNavigation, Router, RouterOutlet } from "@angular/router";
import { leftPanelDatas, LeftsidAuth } from "../../services/leftsid-auth";

@Component({
    selector: "app-auth",
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: "auth.component.html",
    styleUrl: "auth.component.css"
})



export class AuthComponent implements OnInit {
    constructor() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
    private leftPanelData = inject(LeftsidAuth);
    private router = inject(Router);
    ngOnInit(): void {
        this.data = this.leftPanelData.loadData(this.router.url) ?? { title: "Not Found", desc: "Not Found", headCard: "Not Found", descCard: "Not Found" };
    }
    data!: leftPanelDatas;

}