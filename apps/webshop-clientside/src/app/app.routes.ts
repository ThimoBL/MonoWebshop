import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./pages/products/products.component";
import {DetailsComponent} from "./pages/products/details/details.component";
import {UpdateComponent} from "./pages/products/update/update.component";

const routes: Routes = [
  {
    path: 'products', component: ProductsComponent, children: [
      {path: ':id', pathMatch: 'full', component: DetailsComponent},
      {path: ':id/edit', pathMatch: 'full', component: UpdateComponent},
      {path: 'create', redirectTo: '', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
