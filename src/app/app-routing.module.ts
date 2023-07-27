import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { RegisterComponent } from './core/vue/smart/register/register.component';
import { LoginComponent } from './core/vue/smart/login/login.component';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  { path: 'reservations',
    loadChildren: () => import('src/app/reservation/reservation.module').then(m => m.ReservationModule),
    canActivate: [AuthGuard]
  },
  { path: 'auth/login',
    component: LoginComponent
  },
  { path: 'auth/register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
