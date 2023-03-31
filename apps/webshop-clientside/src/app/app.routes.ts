import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./pages/products/products.component";
import {DetailsProductComponent} from "./pages/products/details/details.component";
import {UpdateProductComponent} from "./pages/products/update/update.component";
import {AboutComponent} from "./pages/about/about.component";
import {ManufacturerComponent} from "./pages/manufacturer/manufacturer.component";
import {DetailsManufacturerComponent} from "./pages/manufacturer/details/details.component";
import {UpdateManufacturerComponent} from "./pages/manufacturer/update/update.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ListProductComponent} from "./pages/products/list/list.component";
import {ListManufacturerComponent} from "./pages/manufacturer/list/list.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: DashboardComponent},
  {path: 'products', component: ProductsComponent, children: [
      {path: '', pathMatch: 'full', component: ListProductComponent},
      {path: ':id', pathMatch: 'full', component: DetailsProductComponent},
      {path: ':id/edit', pathMatch: 'full', component: UpdateProductComponent},
      {path: 'create', redirectTo: '', pathMatch: 'full'},
    ]},
  {
    path: 'manufacturers', component: ManufacturerComponent, children: [
      {path: '', pathMatch: 'full', component: ListManufacturerComponent},
      {path: ':id', pathMatch: 'full', component: DetailsManufacturerComponent},
      {path: ':id/edit', pathMatch: 'full', component: UpdateManufacturerComponent},
      {path: 'create', redirectTo: '', pathMatch: 'full'},
    ]
  },
  {path: 'about', pathMatch: 'full', component: AboutComponent},
  {path: 'login', pathMatch: 'full', component: LoginComponent},
  {path: 'register', pathMatch: 'full', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
