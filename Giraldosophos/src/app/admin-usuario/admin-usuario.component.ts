import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { TipologiaService } from '../tipologia.service';
import { Tipologia } from '../tipologia';


@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuarioComponent implements OnInit {

  usuario!: Usuario;
  tipoUsuarios: Array<Tipologia> = [];
  usuarios: Array<Usuario> = [];
  /*showUsuario: Usuario;*/
  isSelected: boolean = false;
  deletedUsuario!: Usuario;
  returnedMessage: string | undefined;
 

  /**
   * Constructing Http Usuario Service
   * @param usuarioService 
   */
  constructor(private usuarioService: UsuarioService,
              private tipologiaService: TipologiaService,
                private messageService: MessageService) { }

  ngOnInit(): void {
    this.retrieveAllUsuarios();
    this.retrieveAllTipoUsuarios();
    this.usuario = new Usuario();
  }

  /**
   * Store a Usuario to backend server
   */
  save() {
    this.usuarioService.createUsuario(this.usuario)
          .subscribe((message: Message) => {
            console.log(message);
            let usuario = message.usuarios[0];
            let msg = "Success -> Post a Usuario: " 
                + "<ul>"
                    + "<li>id: " + usuario.id + "</li>"  
                    + "<li>Activo : " + usuario.activo + "</li>"
                    + "<li>Password: " + usuario.password + "</li>"
                    + "<li>Tipo de Usuario: " + usuario.tipoUsuario.descripcion + "</li>"
                    + "<li>Usuario: " + usuario.usuario + "</li>"
                + "</ul>";

            this.messageService.add(msg);
            this.retrieveAllUsuarios();
          }, error => {
            console.log(error);
            let msg = "Error! -> Action Posting a Usuario:" 
                + "<ul>"
                    + "<li>id: " + this.usuario.id + "</li>"  
                    + "<li>Activo : " + this.usuario.activo + "</li>"
                    + "<li>Password: " + this.usuario.password + "</li>"
                    + "<li>Tipo de Usuario: " + this.usuario.tipoUsuario.descripcion + "</li>"
                    + "<li>Usuario: " + this.usuario.usuario + "</li>"
                + "</ul>";

            this.messageService.add(msg);
          });
  }

  reset(){
    this.usuario = new Usuario();
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



  setUsuarioDetails(usuario: Usuario){
    this.isSelected=!this.isSelected;
    if(this.isSelected){
      Object.assign(this.usuario, usuario);
    }else{
       this.reset();
    }
  }

  /**
   * Set deletedUsuario and reset returnedMessage = undefined
   * @param deleteUsuario
   */
  prepareDeleteUsuario(deleteUsuario: Usuario){
    //assign delete-Usuario
    this.deletedUsuario = deleteUsuario;
    // reset returned-Message
    this.returnedMessage = undefined;
  }

  /**
   * Delete a Usuario by ID
   */
  deleteUsuario(){

    console.log("--- Access delelteUsuario() function");

    this.usuarioService.deleteUsuario(this.deletedUsuario.id)
                      .subscribe((message: Message) => {
                          console.log(message);
                          // remove a deletedUsuario from usuarios list on view
                          this.usuarios = this.usuarios.filter(usuario => {
                            return usuario.id != this.deletedUsuario.id;
                          })

                          // set a showing message in delete modal
                          this.returnedMessage = message.message;

                          // just reset showUsuario for not showing on view
                          //this.showUsuario = undefined;
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
   * Update Usuario function
   */
  updateUsuario() {
    this.usuarioService.updateUsuario(this.usuario)
                      .subscribe((message: Message) => {
                        console.log(message);
                        // update usuarios list
                        this.usuarios.map(x => {
                          if(x.id == this.usuario.id){
                            x = this.usuario;
                          }
                        });

                        let msg: string = "Update Successfully! -> New Usuario's properties: <br>"
                                          + "<ul>"
                                            + "<li>" + "id: " + this.usuario.id + "</li>"
                                            + "<li>" + "activo: " + this.usuario.activo + "</li>"
                                            + "<li>" +  "password: " + this.usuario.password + "</li>"
                                            + "<li>" +  "tipousuario: " + this.usuario.tipoUsuario.descripcion + "</li>"
                                            + "<li>" +  "usuario: " + this.usuario.usuario+ "</li>"
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
   * Retrieve all Usuario from Backend
   */
  retrieveAllUsuarios() {
    this.usuarioService.retrieveAllUsuarios()
                  .subscribe((message: Message) => {
                    console.log(message);
                    this.usuarios = message.usuarios;
                  }
                  , (error) => {
                    console.log(error);
                  });
  }
  retrieveAllTipoUsuarios() {
    this.tipologiaService.retrieveAllTipoUsuarios()
                  .subscribe((message: Message) => {
                    console.log(message);
                    this.tipoUsuarios = message.tipologias;
                  }
                  , (error) => {
                    console.log(error);
                  });
  }
  compareByID(  itemOne: Tipologia, itemTwo: Tipologia) {
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
}
}


