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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { ManufacturerComponent } from './pages/manufacturer/manufacturer.component';
import { CreateManufacturerComponent } from './pages/manufacturer/create/create.component';
import { DetailsManufacturerComponent } from './pages/manufacturer/details/details.component';
import { ListManufacturerComponent } from './pages/manufacturer/list/list.component';
import { UpdateManufacturerComponent } from './pages/manufacturer/update/update.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ManufacturerService } from './services/manufacturer/manufacturer.service';
import { UserService } from './services/user/user.service';
import { ProductService } from './services/product/product.service';
import { AuthService } from './services/auth/auth.service';
import { ReviewComponent } from './pages/review/review.component';
import { ReviewService } from './services/review/review.service';
import { OrderService } from './services/order/order.service';
import { CreateComponent } from './pages/review/create/create.component';
import { DeleteComponent } from './pages/review/delete/delete.component';
import { EditComponent } from './pages/review/edit/edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from './services/generic/jwtHelper.service';
import { ListOrdersComponent } from './pages/orders/list/list.component';
import { DetailsOrdersComponent } from './pages/orders/details/details.component';
import { OrdersComponent } from './pages/orders/orders.component';

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
    ReviewComponent,
    CreateComponent,
    DeleteComponent,
    EditComponent,
    DashboardComponent,
    ListOrdersComponent,
    DetailsOrdersComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ManufacturerService,
    UserService,
    ProductService,
    AuthService,
    ReviewService,
    OrderService,
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
