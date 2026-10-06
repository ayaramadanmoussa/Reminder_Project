import { Component } from "@angular/core";
import { AsideDashboardComponent } from "./components/asideDash/asideDash.component";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-dashboard",
    standalone: true,
    imports: [RouterOutlet, AsideDashboardComponent],
    templateUrl: "dashboard.component.html",
    styleUrl: "dashboard.component.css"
})

export class DashboardComponent { }