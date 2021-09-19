import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPropietarioComponent } from './admin-propietario/admin-propietario.component';
import { AdminVehiculoComponent } from './admin-vehiculo/admin-vehiculo.component';
import { AdminUsuarioComponent } from './admin-usuario/admin-usuario.component';
import { AdminCostoComponent } from './admin-costo/admin-costo.component';
import { AdminParqueoComponent } from './admin-parqueo/admin-parqueo.component';

const routes: Routes = [
  { 
    path: 'adminPropietarios', 
    component: AdminPropietarioComponent 
    
  },
  {
    
    path: 'adminVehiculos', 
    component: AdminVehiculoComponent 

  },
  {
    
    path: 'adminUsuarios', 
    component: AdminUsuarioComponent 

  },
  {
    
    path: 'adminCostos', 
    component: AdminCostoComponent 

  },
  {
    
    path: 'adminParqueos', 
    component: AdminParqueoComponent 

  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
