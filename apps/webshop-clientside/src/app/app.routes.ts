import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./pages/products/products.component";
import {DetailsProductComponent} from "./pages/products/details/details.component";
import {UpdateProductComponent} from "./pages/products/update/update.component";
import {AboutComponent} from "./pages/about/about.component";
import {ManufacturerComponent} from "./pages/manufacturer/manufacturer.component";
import {DetailsManufacturerComponent} from "./pages/manufacturer/details/details.component";
import {UpdateManufacturerComponent} from "./pages/manufacturer/update/update.component";

const routes: Routes = [
  {path: 'products', component: ProductsComponent, children: [
      {path: ':id', pathMatch: 'full', component: DetailsProductComponent},
      {path: ':id/edit', pathMatch: 'full', component: UpdateProductComponent},
      {path: 'create', redirectTo: '', pathMatch: 'full'},
    ]},
  {
    path: 'manufacturers', component: ManufacturerComponent, children: [
      {path: ':id', pathMatch: 'full', component: DetailsManufacturerComponent},
      {path: ':id/edit', pathMatch: 'full', component: UpdateManufacturerComponent},
      {path: 'create', redirectTo: '', pathMatch: 'full'},
    ]
  },
  {path: 'about', pathMatch: 'full', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
