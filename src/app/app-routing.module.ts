import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './pages/upload/upload.component';
import { MapComponent } from './pages/map/map.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: 'upload' , component: UploadComponent},
  { path: 'map' , component: MapComponent},
  { path: 'admin' , component: AdminComponent},
  { path: '' , component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
