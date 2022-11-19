import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ListComponent } from './pages/products/list/list.component';
import { CreateComponent } from './pages/products/create/create.component';
import { DetailsComponent } from './pages/products/details/details.component';
import { UpdateComponent } from './pages/products/update/update.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    ListComponent,
    CreateComponent,
    DetailsComponent,
    UpdateComponent,
    AboutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
