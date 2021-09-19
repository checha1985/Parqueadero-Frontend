import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { TipologiaService } from '../tipologia.service';
import { Tipologia } from '../tipologia';
import { Propietario } from '../propietario';
import { PropietarioService } from '../propietario.service';


@Component({
  selector: 'app-admin-vehiculo',
  templateUrl: './admin-vehiculo.component.html',
  styleUrls: ['./admin-vehiculo.component.css']
  
})
export class AdminVehiculoComponent implements OnInit {
 
  vehiculo!: Vehiculo;
  
  tipoVehiculos: Array<Tipologia> = [];
  vehiculos: Array<Vehiculo> = [];
  /*showVehiculo: Vehiculo;*/
  isSelected: boolean = false;
  popupPropietario: boolean = false;
  popupListaPropietarios: Array<Propietario> = [];
  deletedVehiculo!: Vehiculo;
  returnedMessage: string | undefined;

  numDocPropietario!: string;

  @ViewChild('closeBtn')
  closeBtn!: ElementRef;
  /**
   * Constructing Http Vehiculo Service
   * @param vehiculoService 
   */
  constructor(private vehiculoService: VehiculoService,
              private tipologiaService: TipologiaService,
              private propietarioService: PropietarioService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.retrieveAllVehiculos();
    this.retrieveAllTipoVehiculos();
    this.vehiculo = new Vehiculo();
    this.vehiculo.propietario=new Propietario();
  }

  /**
   * Store a Vehiculo to backend server
   */
  save() {
    this.vehiculoService.createVehiculo(this.vehiculo)
          .subscribe((message: Message) => {
            console.log(message);
            let vehiculo = message.vehiculos[0];
            let msg = "Success -> Post a Vehiculo: " 
                + "<ul>"
                    + "<li>id: " + vehiculo.id + "</li>"  
                    + "<li>propietario : " + vehiculo.propietario.nombre + "</li>"
                    + "<li>Tipo de Vehicuo: " + vehiculo.tipoVehiculo.descripcion + "</li>"
                    + "<li>Placa: " + vehiculo.placa + "</li>"
                + "</ul>";

            this.messageService.add(msg);
            this.retrieveAllVehiculos();
          }, error => {
            console.log(error);
            let msg = "Error! -> Action Posting a Vehiculo:" 
                + "<ul>"
                    + "<li>id: " + this.vehiculo.id + "</li>"  
                    + "<li>propietario: " + this.vehiculo.propietario.nombre + "</li>"
                    + "<li>Tipo de Vehiculo: " + this.vehiculo.tipoVehiculo.descripcion + "</li>"
                    + "<li>Placa: " + this.vehiculo.placa + "</li>"
                + "</ul>";

            this.messageService.add(msg);
          });
  }

  reset(){
    this.vehiculo = new Vehiculo();
    this.vehiculo.propietario=new Propietario();
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



  setVehiculoDetails(vehiculo: Vehiculo){
    this.isSelected=!this.isSelected;
    if(this.isSelected){
      Object.assign(this.vehiculo, vehiculo)
    }else{
       this.reset();
    }
  }

  /**
   * Set deletedVehiculo and reset returnedMessage = undefined
   * @param deleteVehiculo
   */
  prepareDeleteVehiculo(deleteVehiculo: Vehiculo){
    //assign delete-Vehiculo
    this.deletedVehiculo = deleteVehiculo;
    // reset returned-Message
    this.returnedMessage = undefined;
  }

  /**
   * Delete a Vehiculo by ID
   */
  deleteVehiculo(){

    console.log("--- Access deleteVehiculo() function");

    this.vehiculoService.deleteVehiculo(this.deletedVehiculo.id)
                      .subscribe((message: Message) => {
                          console.log(message);
                          // remove a deletedVehiculo from vehiculos list on view
                          this.vehiculos = this.vehiculos.filter(vehiculo => {
                            return vehiculo.id != this.deletedVehiculo.id;
                          })

                          // set a showing message in delete modal
                          this.returnedMessage = message.message;

                          // just reset showVehiculo for not showing on view
                          //this.showVehiculo = undefined;
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
   * Update Vehiculo function
   */
  updateVehiculo() {
    this.vehiculoService.updateVehiculo(this.vehiculo)
                      .subscribe((message: Message) => {
                        console.log(message);
                        // update vehiculos list
                        this.vehiculos.map(x => {
                          if(x.id == this.vehiculo.id){
                            x = this.vehiculo;
                          }
                        });

                        let msg: string = "Update Successfully! -> New Vehiculo's properties: <br>"
                                          + "<ul>"
                                            + "<li>" +  "id: " + this.vehiculo.id + "</li>"
                                            + "<li>" +  "propietario: " + this.vehiculo.propietario.nombre + "</li>"
                                            + "<li>" +  "tipoVehiculo: " + this.vehiculo.tipoVehiculo.descripcion + "</li>"
                                            + "<li>" +  "placa: " + this.vehiculo.placa + "</li>"
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
   * Retrieve all Vehiculo from Backend
   */
  retrieveAllVehiculos() {
    this.vehiculoService.retrieveAllVehiculos()
                  .subscribe((message: Message) => {
                    console.log(message);
                    this.vehiculos = message.vehiculos;
                  }
                  , (error) => {
                    console.log(error);
                  });
  }

  retrievePropietariosByNumeroDocumento() {
    let valoresAceptados = /^[0-9]+$/;
    if (this.numDocPropietario.match(valoresAceptados)){
      this.propietarioService.findByNumeroDocumento(Number(this.numDocPropietario))
                  .subscribe((message: Message) => {
                    console.log(message);
                    this.popupListaPropietarios = message.propietarios;
                  }
                  , (error) => {
                    console.log(error);
                  });
    } else {
      alert ("la identificacion debe ser numerica");
   }

    
  }
  retrieveAllTipoVehiculos() {
    this.tipologiaService.retrieveAllTipoVehiculos()
                  .subscribe((message: Message) => {
                    console.log(message);
                    this.tipoVehiculos = message.tipologias;
                  }
                  , (error) => {
                    console.log(error);
                  });
  }

compareByID(  itemOne: Tipologia, itemTwo: Tipologia) {
  return itemOne && itemTwo && itemOne.id == itemTwo.id;
}

setPropietarioDetails(){
  this.popupPropietario=true;
  this.numDocPropietario="";
  this.vehiculo.propietario=new Propietario();
  this.popupListaPropietarios=[];
  }

  setPropietarioVehiculo(propie: Propietario){
    this.vehiculo.propietario=propie;
    this.popupPropietario=false;
    this.closeBtn.nativeElement.click();
    }
}







