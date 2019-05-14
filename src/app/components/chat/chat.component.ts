import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {


  mensaje: string;
  elemento: any;

  constructor(
    public _chatService: ChatService
  ) { }

  ngOnInit() {

    this.mensaje = '';
    this._chatService.cargarMensajes()
      .subscribe(()=>{
        setTimeout(() => {
          
          this.elemento.scrollTop = this.elemento.scrollHeight;
        },200);
      });

      this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    console.log(this.mensaje);

    if (this.mensaje != '') {
      this._chatService.agregarMensaje(this.mensaje)
        .then(() => console.log('mensaje enviado'))
        .catch((err) => console.log(`Error al guardar el msj ${err}`));
    }
    this.mensaje = '';



  }

}
