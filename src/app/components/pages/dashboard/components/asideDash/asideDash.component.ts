import { Component } from "@angular/core";
import { RouterLink,RouterLinkActive} from "@angular/router";

@Component({
    selector: "app-dashboard-aside",
    standalone: true,
    imports: [RouterLink,RouterLinkActive],
    templateUrl: "asideDash.component.html",
    styleUrl: "asideDash.component.css"
})

export class AsideDashboardComponent { }