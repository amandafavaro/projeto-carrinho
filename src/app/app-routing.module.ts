import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    loadChildren: () => import('./users/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthService],
    children: [
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AuthService]
      },
      {
        path: 'users/:id',
        loadChildren: () => import('./users/update/update.module').then(m => m.UpdateModule),
        canActivate: [AuthService]
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
        canActivate: [AuthService]
      },
      {
        path: 'products/add',
        loadChildren: () => import('./products/add/add.module').then(m => m.AddModule),
        canActivate: [AuthService]
      },
      {
        path: 'products/:id',
        loadChildren: () => import('./products/update-product/update-product.module').then(m => m.UpdateProductModule),
        canActivate: [AuthService]
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
        canActivate: [AuthService]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
