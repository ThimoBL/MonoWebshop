import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ListProductComponent } from './pages/products/list/list.component';
import { CreateProductComponent } from './pages/products/create/create.component';
import { DetailsProductComponent } from './pages/products/details/details.component';
import { UpdateProductComponent } from './pages/products/update/update.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { ManufacturerComponent } from './pages/manufacturer/manufacturer.component';
import { CreateManufacturerComponent } from './pages/manufacturer/create/create.component';
import { DetailsManufacturerComponent } from './pages/manufacturer/details/details.component';
import { ListManufacturerComponent } from './pages/manufacturer/list/list.component';
import { UpdateManufacturerComponent } from './pages/manufacturer/update/update.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    ListProductComponent,
    CreateProductComponent,
    DetailsProductComponent,
    UpdateProductComponent,
    AboutComponent,
    ManufacturerComponent,
    CreateManufacturerComponent,
    DetailsManufacturerComponent,
    ListManufacturerComponent,
    UpdateManufacturerComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
