import { Component, OnInit } from '@angular/core';
import { Costo } from '../costo';
import { CostoService } from '../costo.service';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { TipologiaService } from '../tipologia.service';
import { Tipologia } from '../tipologia';


@Component({
  selector: 'app-admin-costo',
  templateUrl: './admin-costo.component.html',
  styleUrls: ['./admin-costo.component.css']
})
export class AdminCostoComponent implements OnInit {

  costo!: Costo;
  tipoTiempos: Array<Tipologia> = [];
  tipoVehiculos: Array<Tipologia> = [];
  costos: Array<Costo> = [];
  /*showCosto: Costo;*/
  isSelected: boolean = false;
  deletedCosto!: Costo;
  returnedMessage: string | undefined;
 

  /**
   * Constructing Http Costo Service
   * @param costoService 
   */
  constructor(private costoService: CostoService,
              private tipologiaService: TipologiaService,
                private messageService: MessageService) { }

  ngOnInit(): void {
    this.retrieveAllCostos();
    this.retrieveAllTipoVehiculos();
    this.retrieveAllTipoTiempos();
    this.costo = new Costo();
  }

  /**
   * Store a Costo to backend server
   */
  save() {
    this.costoService.createCosto(this.costo)
          .subscribe((message: Message) => {
            console.log(message);
            let costo = message.costos[0];
            let msg = "Success -> Post a Costo: " 
                + "<ul>"
                    + "<li>id: " + costo.id + "</li>"  
                    + "<li>Activo : " + costo.tipoVehiculo.descripcion + "</li>"
                    + "<li>Tipo Tiempo: " + costo.tipoTiempo.descripcion + "</li>"
                    + "<li>Valor: " + costo.valor + "</li>"
                + "</ul>";

            this.messageService.add(msg);
            this.retrieveAllCostos();
          }, error => {
            console.log(error);
            let msg = "Error! -> Action Posting a Costo:" 
                + "<ul>"
                    + "<li>id: " + this.costo.id + "</li>"  
                    + "<li>Activo : " + this.costo.tipoVehiculo.descripcion + "</li>"
                    + "<li>Password: " + this.costo.tipoTiempo.descripcion + "</li>"
                    + "<li>Tipo de Costo: " + this.costo.valor + "</li>"
                + "</ul>";

            this.messageService.add(msg);
          });
  }

  reset(){
    this.costo = new Costo();
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


  setCostoDetails(costo: Costo){
    this.isSelected=!this.isSelected;
    if(this.isSelected){
      Object.assign(this.costo = costo);
    }else{
       this.reset();
    }
  }

  /**
   * Set deletedCosto and reset returnedMessage = undefined
   * @param deleteCosto
   */
  prepareDeleteCosto(deleteCosto: Costo){
    //assign delete-Costo
    this.deletedCosto = deleteCosto;
    // reset returned-Message
    this.returnedMessage = undefined;
  }

  /**
   * Delete a Costo by ID
   */
  deleteCosto(){

    console.log("--- Access delelteCosto() function");

    this.costoService.deleteCosto(this.deletedCosto.id)
                      .subscribe((message: Message) => {
                          console.log(message);
                          // remove a deletedCosto from costos list on view
                          this.costos = this.costos.filter(costo => {
                            return costo.id != this.deletedCosto.id;
                          })

                          // set a showing message in delete modal
                          this.returnedMessage = message.message;

                          // just reset showCosto for not showing on view
                          //this.showCosto = undefined;
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
   * Update Costo function
   */
  updateCosto() {
    this.costoService.updateCosto(this.costo)
                      .subscribe((message: Message) => {
                        console.log(message);
                        // update costos list
                        this.costos.map(x => {
                          if(x.id == this.costo.id){
                            x = this.costo;
                          }
                        });

                        let msg: string = "Update Successfully! -> New Costo's properties: <br>"
                                          + "<ul>"
                                            + "<li>" + "id: " + this.costo.id + "</li>"
                                            + "<li>" + "tipovehiculo: " + this.costo.tipoVehiculo.descripcion + "</li>"
                                            + "<li>" +  "tipotiempo: " + this.costo.tipoTiempo.descripcion + "</li>"
                                            + "<li>" +  "valor: " + this.costo.valor + "</li>"
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
   * Retrieve all Costo from Backend
   */
  retrieveAllCostos() {
    this.costoService.retrieveAllCostos()
                  .subscribe((message: Message) => {
                    console.log(message);
                    this.costos = message.costos;
                  }
                  , (error) => {
                    console.log(error);
                  });
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
  retrieveAllTipoTiempos() {
    this.tipologiaService.retrieveAllTipoTiempos()
                  .subscribe((message: Message) => {
                    console.log(message);
                    this.tipoTiempos = message.tipologias;
                  }
                  , (error) => {
                    console.log(error);
                  });
  }

  compareByID(  itemOne: Tipologia, itemTwo: Tipologia) {
    return itemOne && itemTwo && itemOne.id === itemTwo.id &&   itemOne.descripcion === itemTwo.descripcion;
}
compareByID2(  itemOne2: Tipologia, itemTwo2: Tipologia) {
  return itemOne2 && itemTwo2 && itemOne2.id === itemTwo2.id  &&   itemOne2.descripcion === itemTwo2.descripcion;
}
  
 
}


