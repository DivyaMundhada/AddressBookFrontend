import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Addressbook } from '../model/addressbook';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private addressBookSource = new BehaviorSubject(new Addressbook);
  currentAddressBook = this.addressBookSource.asObservable();

  constructor() { }

  changeAddressBook(addressBook: Addressbook) {
    this.addressBookSource.next(addressBook);
  }
}
