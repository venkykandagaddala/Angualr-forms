import { Component, OnInit } from '@angular/core';
import { UserSettings} from "../data/user.settings"
import { NgForm, NgModel } from "@angular/forms"
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  }
  postError = false;
  postErrormessage = "";

  userSettings: UserSettings = { ...this.originalUserSettings };
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onHttpError(errorResponse: any){
    console.log('Error::', errorResponse);
    this.postError = true;
    this.postErrormessage = errorResponse.error.errorMessage;
  }
  onSubmit(form: NgForm){
    console.log("On submit:", form.valid);
    if (form.valid){
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log("Success:",result),
        error => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrormessage = "Please fix above errors";
    }
    
  }
  onBlur(filed: NgModel){
    console.log("On Blur:"+ filed.valid);
  }
}
