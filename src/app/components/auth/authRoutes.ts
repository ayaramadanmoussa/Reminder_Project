import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login";
import { Register } from "./components/register/register";
import { ResetPassword } from "./components/reset-password/reset-password";


export const authRoutes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register", component: Register },
    { path: "reset-password", component: ResetPassword },
];