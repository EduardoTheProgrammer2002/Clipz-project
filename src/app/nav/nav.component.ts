import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    public modal: ModalService,
    public auth: AuthService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  openModal($event: Event, id: string):void {
    $event.preventDefault();
    this.modal.toggleModal(id);
  }

  async logout($Event: Event) {
    $Event.preventDefault();
    await this.afAuth.signOut();
  }

}
