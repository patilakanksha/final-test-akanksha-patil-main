import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Third-party Modules
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';

// Custom Modules
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { GuestRegistrationComponent } from './modules/guest-registration/guest-registration.component';
import { NotAuthorizedComponent } from './shared/components/not-authorized/not-authorized.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { RoleAuthGuard } from './shared/helper/role-auth.guard';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

// Function to get JWT token from local storage
export function tokenGetter() {
  return localStorage.getItem('jwt');
}

// Routes
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'guest-registration', component: GuestRegistrationComponent },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [RoleAuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [RoleAuthGuard],
    data: { roles: ['user', 'manager', 'admin'] },
  },
  {
    path: 'manager',
    loadChildren: () => import('./modules/manager/manager.module').then((m) => m.ManagerModule),
    canActivate: [RoleAuthGuard],
    data: { roles: ['Manager'] },
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GuestRegistrationComponent,
    NotAuthorizedComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7299'],
        disallowedRoutes: [],
      },
    }),
    ToastrModule.forRoot(),
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
