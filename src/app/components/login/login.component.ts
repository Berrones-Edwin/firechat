import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
   private _chatService:ChatService
  ) { }

  ngOnInit() {
  }

  ingresar(plataforma:string){
   
    console.log(plataforma);
    
    this._chatService.login(plataforma);

  }

  logout(){
    this._chatService.logout();
  }


}
