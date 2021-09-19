import { Component, OnInit } from '@angular/core';
import { Propietario } from '../propietario';
import { PropietarioService } from '../propietario.service';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { TipologiaService } from '../tipologia.service';
import { Tipologia } from '../tipologia';

@Component({
  selector: 'app-admin-propietario',
  templateUrl: './admin-propietario.component.html',
  styleUrls: ['./admin-propietario.component.css'],
})
export class AdminPropietarioComponent implements OnInit {
  propietario!: Propietario;
  tipoDocumentos: Array<Tipologia> = [];
  propietarios: Array<Propietario> = [];
  /*showPropietario: Propietario;*/
  isSelected: boolean = false;
  deletedPropietario!: Propietario;
  returnedMessage: string | undefined;


  /**
   * Constructing Http Propietario Service
   * @param propietarioService
   */
  constructor(
    private propietarioService: PropietarioService,
    private tipologiaService: TipologiaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.retrieveAllPropietarios();
    this.retrieveAllTipoDocumentos();
    this.propietario = new Propietario();
  }

  /**
   * Store a Propietario to backend server
   */
  save() {
    this.propietarioService.createPropietario(this.propietario).subscribe(
      (message: Message) => {
        console.log(message);
        let propietario = message.propietarios[0];
        let msg =
          'Success -> Post a Propietario: ' +
          '<ul>' +
          '<li>id: ' +
          propietario.id +
          '</li>' +
          '<li>nombre : ' +
          propietario.nombre +
          '</li>' +
          '<li>Tipo de Documento: ' +
          propietario.tipoDocumento.descripcion +
          '</li>' +
          '<li>Numero de Documento: ' +
          propietario.numeroDocumento +
          '</li>' +
          '<li>Telefono: ' +
          propietario.telefono +
          '</li>' +
          '</ul>';

        this.messageService.add(msg);
        this.retrieveAllPropietarios();
      },
      (error) => {
        console.log(error);
        let msg =
          'Error! -> Action Posting a Propietario:' +
          '<ul>' +
          '<li>id: ' +
          this.propietario.id +
          '</li>' +
          '<li>nombre : ' +
          this.propietario.nombre +
          '</li>' +
          '<li>Tipo de Documento: ' +
          this.propietario.tipoDocumento.descripcion +
          '</li>' +
          '<li>Numero de Documento: ' +
          this.propietario.numeroDocumento +
          '</li>' +
          '<li>Telefono: ' +
          this.propietario.telefono +
          '</li>' +
          '</ul>';

        this.messageService.add(msg);
      }
    );
  }

  reset() {
    this.propietario = new Propietario();
  }

  /**
   * Function handles form submitting
   */
  onSubmit() {
    this.save();
    this.reset();
  }

  clear() {
    this.reset();
  }

  setPropietarioDetails(propietario: Propietario) {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      Object.assign(this.propietario, propietario);
    } else {
      this.reset();
    }
  }

  /**
   * Set deletedPropietario and reset returnedMessage = undefined
   * @param deletePropietario
   */
  prepareDeletePropietario(deletePropietario: Propietario) {
    //assign delete-Propietario
    this.deletedPropietario = deletePropietario;
    // reset returned-Message
    this.returnedMessage = undefined;
  }

  /**
   * Delete a Propietario by ID
   */
  deletePropietario() {
    console.log('--- Access deleltePropietario() function');

    this.propietarioService
      .deletePropietario(this.deletedPropietario.id)
      .subscribe(
        (message: Message) => {
          console.log(message);
          // remove a deletedPropietario from propietarios list on view
          this.propietarios = this.propietarios.filter((propietario) => {
            return propietario.id != this.deletedPropietario.id;
          });

          // set a showing message in delete modal
          this.returnedMessage = message.message;

          // just reset showPropietario for not showing on view
          //this.showPropietario = undefined;
          this.reset();

          // add the delete message to message app for showing
          this.messageService.add(message.message);
        },
        (error) => {
          console.log(error);
          let errMsg: string = 'Error! Details: ' + error;
          this.messageService.add(errMsg);
        }
      );
  }

  /**
   * Update Propietario function
   */
  updatePropietario() {
    this.propietarioService.updatePropietario(this.propietario).subscribe(
      (message: Message) => {
        console.log(message);
        // update propietarios list
        this.propietarios.map((x) => {
          if (x.id == this.propietario.id) {
            x = this.propietario;
          }
        });

        let msg: string =
          "Update Successfully! -> New Propietario's properties: <br>" +
          '<ul>' +
          '<li>' +
          'id: ' +
          this.propietario.id +
          '</li>' +
          '<li>' +
          'nombre: ' +
          this.propietario.nombre +
          '</li>' +
          '<li>' +
          'numeroDocumento: ' +
          this.propietario.numeroDocumento +
          '</li>' +
          '<li>' +
          'telefono: ' +
          this.propietario.telefono +
          '</li>' +
          '<li>' +
          'tipoDocumento: ' +
          this.propietario.tipoDocumento.descripcion +
          '</li>' +
          '</ul>';
        this.messageService.add(msg);
      },
      (error) => {
        console.log(error);
        let errMsg = 'Update Fail ! Error = ' + error;
        this.messageService.add(errMsg);
      }
    );
  }

  /**
   * Retrieve all Propietario from Backend
   */
  retrieveAllPropietarios() {
    this.propietarioService.retrieveAllPropietarios().subscribe(
      (message: Message) => {
        console.log(message);
        this.propietarios = message.propietarios;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  retrieveAllTipoDocumentos() {
    this.tipologiaService.retrieveAllTipoDocumentos().subscribe(
      (message: Message) => {
        console.log(message);
        this.tipoDocumentos = message.tipologias;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  compareByID(itemOne: Tipologia, itemTwo: Tipologia) {
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
  }
}
