import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Parqueo } from '../parqueo';
import { ParqueoService } from '../parqueo.service';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { PropietarioService } from '../propietario.service';
import { VehiculoService } from '../vehiculo.service';
import { UsuarioService } from '../usuario.service';
import { Vehiculo } from '../vehiculo';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Usuario } from '../usuario';


//import { TipologiaService } from '../tipologia.service';
//import { Tipologia } from '../tipologia';

@Component({
  selector: 'app-admin-parqueo',
  templateUrl: './admin-parqueo.component.html',
  styleUrls: ['./admin-parqueo.component.css']
  
})
export class AdminParqueoComponent implements OnInit {
 
  parqueo!: Parqueo;
 
  //tipoDocumentos: Array<Tipologia> = [];
  parqueos: Array<Parqueo> = [];
  /*showParqueo: Parqueo;*/
  isSelected: boolean = false;
  popupVehiculo: boolean = false;
  popupListaVehiculos: Array<Vehiculo> = [];
  deletedParqueo!: Parqueo;
  returnedMessage: string | undefined;

  placaVehiculo!: string;
  usuario1: string | undefined;
  usuario2: string | undefined;

  @ViewChild('closeBtn')
  closeBtn!: ElementRef;

  /**
   * Constructing Http Parqueo Service
   * @param parqueoService 
   */
  constructor(private parqueoService: ParqueoService,
              private usuarioService: UsuarioService,
              private vehiculoService: VehiculoService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.retrieveAllParqueos();
    //this.retrieveAllTipoDocumentos();
    this.parqueo = new Parqueo();
    this.parqueo.vehiculo= new Vehiculo();
    this.parqueo.usuarioRegistraIngreso= new Usuario();
    this.parqueo.usuarioRegistraSalida= new Usuario();
  }

  /**
   * Store a Parqueo to backend server
   */
  save() {
    this.parqueoService.createParqueo(this.parqueo)
          .subscribe((message: Message) => {
            console.log(message);
            let parqueo = message.parqueos[0];
            let msg = "Success -> Post a Parqueo: " 
                + "<ul>"
                    + "<li>id: " + parqueo.id + "</li>"  
                    + "<li>Vehiculo : " + parqueo.vehiculo.placa + "</li>"
                    + "<li>Observacion: " + parqueo.observacion + "</li>"
                    + "<li>Fecha Ingreso: " + parqueo.fechaIngreso + "</li>"
                    + "<li>Usuario Ingreso: " + parqueo.usuarioRegistraIngreso.usuario + "</li>"
                    + "<li>Fecha Salida: " + parqueo.fechaSalida + "</li>"
                    + "<li>Usuario Salida: " + (parqueo.usuarioRegistraSalida? 'ok1':'ok2') + "</li>"
                + "</ul>";

            this.messageService.add(msg);
            this.retrieveAllParqueos();
            this.reset();
          }, error => {
            console.log(error);
            let msg = "Error! -> Action Posting a Parqueo:" 
                + "<ul>"
                    + "<li>id: " + this.parqueo.id + "</li>"  
                    + "<li>vehiculo : " + this.parqueo.vehiculo.placa + "</li>"
                    + "<li>Observacion: " + this.parqueo.observacion + "</li>"
                    + "<li>Fecha Ingreso: " + this.parqueo.fechaIngreso + "</li>"
                    + "<li>Usuario Ingreso: " + this.parqueo.usuarioRegistraIngreso.usuario + "</li>"
                    + "<li>Fecha Salida: " + this.parqueo.fechaSalida + "</li>"
                    + "<li>Usuario Salida: " + (this.parqueo.usuarioRegistraSalida? 'ok1':'ok2') + "</li>"
                + "</ul>";

            this.messageService.add(msg);
            this.reset();

          });
          
  }

  focusOutFunction(evento:any){
    this.usuarioService.buscarUsuarioXNombre(evento.target.value).subscribe(data => 
      this.parqueo.usuarioRegistraIngreso = data.usuarios[0]);
  }

  focusOutFunction2(evento:any){
    this.usuarioService.buscarUsuarioXNombre(evento.target.value).subscribe(data => 
      this.parqueo.usuarioRegistraSalida = data.usuarios[0]);
      
  }

  reset(){
    this.parqueo = new Parqueo();
    this.parqueo.vehiculo=new Vehiculo();
    this.usuario1 = '';
    this.usuario2 = '';

  }


  /**
   * Function handles form submitting
   */
  onSubmit() {
     this.save();
    this.reset();
   
  
    
  }

  clear(){
   this.reset();
  }



  setParqueoDetails(parqueo: Parqueo){
    this.isSelected=!this.isSelected;
    if(this.isSelected){
      Object.assign(this.parqueo, parqueo);
    }else{
       this.reset();
    }
  }

  /**
   * Set deletedParqueo and reset returnedMessage = undefined
   * @param deleteParqueo
   */
  prepareDeleteParqueo(deleteParqueo: Parqueo){
    //assign delete-Parqueo
    this.deletedParqueo = deleteParqueo;
    // reset returned-Message
    this.returnedMessage = undefined;
  }

  /**
   * Delete a Parqueo by ID
   */
  deleteParqueo(){

    console.log("--- Access delelteParqueo() function");

    this.parqueoService.deleteParqueo(this.deletedParqueo.id)
                      .subscribe((message: Message) => {
                          console.log(message);
                          // remove a deletedParqueo from parqueos list on view
                          this.parqueos = this.parqueos.filter(parqueo => {
                            return parqueo.id != this.deletedParqueo.id;
                          })

                          // set a showing message in delete modal
                          this.returnedMessage = message.message;

                          // just reset showParqueo for not showing on view
                          //this.showParqueo = undefined;
                          this.reset();

                          // add the delete message to message app for showing
                          this.messageService.add(message.message);
                        },
                        (error) => {
                          console.log(error);
                          let errMsg: string = "Error! Details: " + error;
                          this.messageService.add(errMsg);
                        });
  }

  /**
   * Update Parqueo function
   */
  updateParqueo() {
    this.parqueoService.updateParqueo(this.parqueo)
                      .subscribe((message: Message) => {
                        console.log(message);
                        // update parqueos list
                        this.parqueos.map(x => {
                          if(x.id == this.parqueo.id){
                            x = this.parqueo;
                          }
                        });

                        let msg: string = "Update Successfully! -> New Parqueo's properties: <br>"
                                          + "<ul>"
                                            + "<li>" +  "id: " + this.parqueo.id + "</li>"
                                            + "<li>" +  "vehiculo: " + this.parqueo.vehiculo.placa + "</li>"
                                            + "<li>" +  "observacion: " + this.parqueo.observacion + "</li>"
                                            + "<li>" +  "fechaIngreso: " + this.parqueo.fechaIngreso + "</li>"
                                            + "<li>" +  "usuarioIngreso: " + this.parqueo.usuarioRegistraIngreso.usuario + "</li>"
                                            + "<li>" +  "fechaSalida: " + this.parqueo.fechaSalida + "</li>"
                                            + "<li>" +  "usuarioSalida: " + (this.parqueo.usuarioRegistraSalida? 'ok1': 'ok2') + "</li>"
                                          + "</ul>";
                        this.messageService.add(msg);
                      }
                      , (error) => {
                        console.log(error);
                        let errMsg = "Update Fail ! Error = " + error;
                        this.messageService.add(errMsg);
                      });
  }

  /**
   * Retrieve all Parqueo from Backend
   */
  retrieveAllParqueos() {
    this.parqueoService.retrieveAllParqueos()
                  .subscribe((message: Message) => {
                    console.log(message);
                    this.parqueos = message.parqueos;
                  }
                  , (error) => {
                    console.log(error);
                  });
  }

  
  retrieveVehiculosByPlacaVehiculo() {
    let valoresAceptados = /^[0-9,a-z]+$/;
    if (this.placaVehiculo.match(valoresAceptados)){
      this.vehiculoService.findByPlaca(String(this.placaVehiculo))
                  .subscribe((message: Message) => {
                    console.log(message);
                    this.popupListaVehiculos = message.vehiculos;
                  }
                  , (error) => {
                    console.log(error);
                  });
    } else {
      alert ("la identificacion debe ser alfanumerica");
   }

    
  }

  
  
  setVehiculoDetails(){
    this.popupVehiculo=true;
    this.placaVehiculo="";
    this.parqueo.vehiculo=new Vehiculo();
    this.popupListaVehiculos=[];
    }

  setVehiculo(vehi: Vehiculo){
    this.parqueo.vehiculo=vehi;
    this.popupVehiculo=false;
    this.closeBtn.nativeElement.click();
    }  
  
}
