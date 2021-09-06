import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Addressbook } from 'src/app/model/addressbook';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public personDetails: Addressbook[] = [];

  constructor(private httpService: HttpService,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  /**
   * Method to get data on the home page
   */
  ngOnInit(): void {
    this.httpService.getAddressBookData().subscribe(response => {
      this.personDetails = response.data;
      console.log(this.personDetails);
    });
  }

  /**
   * Method to delete the data using Id when delete button is clicked.
   */
  remove(id: number) {
    this.httpService.deleteAddressBookData(id).subscribe(data => {
      console.log(data);
      this.ngOnInit();
      this.snackBar.open("User Data Deleted Successfully", "Deleted", { duration: 3000 });
    });
  }

  /**
   * Method to update the data of a particular Id and display it on the Home page.
   */
  update(addressbook: Addressbook): void {
    this.dataService.changeAddressBook(addressbook);
    this.router.navigateByUrl('/add/' + addressbook.id);
  }

}
