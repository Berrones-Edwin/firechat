import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { map } from 'rxjs/operators';

// FIREBASE
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

// INTERFACES
import { Mensaje } from '../interfaces/mensaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario:any = {}

  constructor(
    private afs: AngularFirestore,
    private  afAuth: AngularFireAuth,
    private router:Router
  ) { 

    this.afAuth.authState.subscribe((data:any)=>{
      if(!data){
        return;
      }
      console.log(data);

      this.usuario.displayName = data.displayName;
      this.usuario.uid = data.uid;

    })

  }

  cargarMensajes() {
    this.itemsCollection = this.afs
      .collection<Mensaje>('items',
        ref => ref.orderBy('fecha', 'desc')
                  .limit(5));

    return this.itemsCollection
      .valueChanges()
      .pipe(
        map((data: Mensaje[]) => {
            this.chats = [];
            for(let mensaje of data){
              this.chats.unshift(mensaje);
            }
          // this.chats = data;
        })
      );
  }

  agregarMensaje(mensaje: string) {
 
    let mensajeGuardar: Mensaje = {
      nombre: this.usuario.displayName,
      mensaje: mensaje,
      uid: this.usuario.uid,
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add(mensajeGuardar);
  }

  login(plataforma:string){
    if(plataforma === 'google'){
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());

    }else{
      this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }
  }

  logout(){
    
    this.afAuth.auth.signOut().then(()=>{
      this.usuario= {};
      this.router.navigate(['/']);
    });
  }
}
