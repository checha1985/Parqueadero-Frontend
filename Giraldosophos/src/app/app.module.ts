import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { AdminPropietarioComponent } from './admin-propietario/admin-propietario.component';
import { AdminUsuarioComponent } from './admin-usuario/admin-usuario.component';
import { AdminParqueoComponent } from './admin-parqueo/admin-parqueo.component';
import { AdminVehiculoComponent } from './admin-vehiculo/admin-vehiculo.component';
import { AdminCostoComponent } from './admin-costo/admin-costo.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    AdminPropietarioComponent,
    AdminUsuarioComponent,
    AdminParqueoComponent,
    AdminVehiculoComponent,
    AdminCostoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
