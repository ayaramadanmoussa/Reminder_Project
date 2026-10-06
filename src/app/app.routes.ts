import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

import { guestGuard } from './guards/guest-guard';
import { userGuard } from './guards/user-guard';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: Home },
    { path: "services", loadComponent: () => import("./components/pages/services-component/services-component").then((c) => c.ServicesComponent) },
    { path: "contact-us", loadComponent: () => import("./components/pages/contact/contact").then((c) => c.ContactComponent) },

    { path: "auth", canActivate: [guestGuard], loadComponent: () => import("./components/auth/auth.component").then((c) => c.AuthComponent), loadChildren: () => import("./components/auth/authRoutes").then((m) => m.authRoutes) },
    {
        path: 'settings',
        loadComponent: () => import('./components/pages/dashboard/components/settings/settings').then((c) => c.SettingsComponent)
    },
    { path: "dashboard", canActivate: [userGuard], loadComponent: () => import("./components/pages/dashboard/dashboard.component").then((c) => c.DashboardComponent), loadChildren: () => import("./components/pages/dashboard/dashboardRoutes").then((c) => c.dashboardRoutes) }
];
