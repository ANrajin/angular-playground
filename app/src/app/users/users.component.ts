import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  defaultQuestion = 'pet';
  answer = '';
  genders = ['Male', 'Female'];
  submitted: boolean = false;
  user: any = {
    username: "",
    email: "",
    gender: "",
    secretQuestion: "",
    questionAnswer: ""
  }

  /**
   * accesscing form object
   */
  @ViewChild('f') userForm!: NgForm;
  onSubmit = () => {
    this.submitted = true;
    this.user.username = this.userForm.value.userData.username;
    this.user.email = this.userForm.value.userData.email;
    this.user.gender = this.userForm.value.userData.gender;
    this.user.secretQuestion = this.userForm.value.secret;
    this.user.questionAnswer = this.userForm.value.questionAnswer;
    this.userForm.reset();
  }

  // onSubmit = (form: NgForm) => {
  //   console.log(form);
  // }

  suggestUserNameHandler = () => {
    const suggestedName = "Jone Doe";

    ////To set value for whole form
    //this.userForm.setValue({});

    this.userForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }
}
