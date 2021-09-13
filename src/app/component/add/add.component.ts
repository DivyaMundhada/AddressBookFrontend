import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Addressbook } from 'src/app/model/addressbook';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public addressBook: Addressbook = new Addressbook;
  public addressBookFormGroup: FormGroup = new FormGroup({});
  public leftButton: string = "Add";
  public rightButton: string = "Reset";
  public states: Array<any> = [];
  public cities: Array<any> = [];
  public stateDetails: Array<any> = [];
  id: any;

  /**
  * Added Validation to the Address Book Fields.
  */
  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar,
    private dataService: DataService) {
    this.addressBookFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{1}[a-zA-Z\\s]{2,}$")]),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{6}$")]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")])
    })
  }

  /**
  * Method to set value of a particular Address Book Id in the AddressBook FormBuilder.
  * This method is called when update button is hit on the HOME page.
  */

  ngOnInit(): void {
    
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.leftButton = "Update";
      this.rightButton = "Cancel";
      this.id = this.activatedRoute.snapshot.params['id']
      this.httpService.getAddressBookDetailsByID(this.id).subscribe(x => {
        console.log(x.data);
        this.addressBookFormGroup.patchValue(x.data);
        if (x.data.state) {
          this.getCity(x.data.state);
        }
      });
    }
    this.getState();
  }

  /**
   * Method to call http service functions for Update and Add of Data.
   * These methods are called when add button is hit.
   */
  submit(): void {

    console.log(this.addressBookFormGroup);
    this.addressBook = this.addressBookFormGroup.value;

    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.httpService.updateAddressBook(this.activatedRoute.snapshot.params['id'], this.addressBook).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/home');
        this.snackBar.open(" User Data Updated Successfully", "Updated", { duration: 3000 });
      });
    }
    else {
      this.httpService.addAddressBook(this.addressBook).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/home');
        this.snackBar.open("User Data Submitted Successfully", "Submitted", { duration: 3000 });
      
     
      // }, error => {
      //   this.snackBar.open("Phone Number already exists", "Change Number", { duration: 8000 })
    });
  
}
  }

getCity(state: any) {
  // console.log("hi");
  for (let i = 0; i < this.stateDetails.length; i++) {
    if (this.stateDetails[i]?.state === state) {
      this.cities = this.stateDetails[i]?.city;
      console.log(this.stateDetails[i]?.city);
    }
  }
}

getState(): void {
  this.httpService.getStateDetails().subscribe(data => {
    this.stateDetails = data.data;
    console.log(this.stateDetails);
    for (let i = 0; i < this.stateDetails.length; i++) {
      this.states.push(this.stateDetails[i]?.state);
    }
  });
}

  /**
   * Method to show error when validating the input by the user.
   */
  public checkError = (controlName: string, errorName: string) => {
    return this.addressBookFormGroup.controls[controlName].hasError(errorName);
  }
}