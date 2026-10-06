import { Routes } from "@angular/router";
import { DashboardMainPageComponent } from "./components/dashboardMain/dashboardMain.component";


export const dashboardRoutes: Routes = [
  { path: "", redirectTo: "main", pathMatch: "full" },
  { path: "main", loadComponent: () => import("./components/dashboardMain/dashboardMain.component").then((m) => m.DashboardMainPageComponent) },
  { path: 'medicines', loadComponent: () => import("./components/medicine-list/medicine-list").then((m) => m.MedicineListComponent) },
  { path: 'create-medicine', loadComponent: () => import("./components/create-medicine/create-medicine").then((c) => c.CreateMedicine) },
  { path: 'categories', loadComponent: () => import("./components/categories/categories").then((c) => c.CategoriesComponent) },
  { path: 'history', loadComponent: () => import("./components/history/history").then((c) => c.HistoryComponent) },

  { path: 'notification', loadComponent: () => import("./components/notificationComp/notificationComp").then((c) => c.NotificationComp) },
  { path: 'emergency', loadComponent: () => import("./components/emergency/emergency").then((c) => c.Emergency) },

  { path: 'profile', loadComponent: () => import("./components/profile/profile.component").then((p) => p.ProfileComponent) },
  {
    path: 'settings',
    loadComponent: () => import('./components/settings/settings').then((s) => s.SettingsComponent)
  },
];

