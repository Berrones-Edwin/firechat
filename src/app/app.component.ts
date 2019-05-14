import { Component } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './services/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  title = 'firechat';
  items: Observable<Item[]>;
  item: Item = new Item('');

  private itemCollection: AngularFirestoreCollection<Item>;

  constructor(
    db: AngularFirestore,
    private _chatService:ChatService

  ) {

    console.log(this._chatService.usuario);
    

    this.itemCollection = db.collection<Item>('items');
    // this.items = db.collection('items').valueChanges();
    this.items = this.itemCollection.valueChanges();
  }

  addItem(item: Item) {
    this.itemCollection.add(item)
      .then(data => console.log(data))
      .catch(err => console.log(err));

  }

  logout() {

    this._chatService.logout();
  }
}

export class Item {
  nombre: string;

  constructor(
    nombre: string
  ) {
    this.nombre = nombre;
  }
}
