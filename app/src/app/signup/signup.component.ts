import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  genders = ['Male', 'Female'];
  signUpForm: any = FormGroup;
  forbiddenUsernames = ['John', 'Jane'];

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailsAsync as AsyncValidatorFn),
      }),
      'gender': new FormControl('Male'),
      'hobbies': new FormArray([])
    });

    //Check for value changes in form
    // this.signUpForm.valueChanges.subscribe((val: any) => console.log(val));

    //Check for form status
    // this.signUpForm.statusChanges.subscribe((val: any) => console.log(val));

    //set initial value to form fields
    this.signUpForm.setValue({
      'userData': {
        'username': 'Rajin',
        'email': 'rajin@gmail.com'
      },
      'gender': 'Male',
      'hobbies': []
    })

    //set form value partially
    this.signUpForm.patchValue({
      'userData': {
        'username': 'John Doe'
      }
    })
  }

  onAddHobbyHandler = () => {
    const hobbyControl = new FormControl(null, [Validators.required]);
    (<FormArray>this.signUpForm.get('hobbies')).push(hobbyControl);
  }

  forbiddenNames = (control: FormControl): { [s: string]: boolean } | null => {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  //async validator
  forbiddenEmailsAsync = (control: FormControl): Promise<any> | Observable<any> => {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'email@example.com') { resolve({ 'emailIsForbidden': true }) }
        else { resolve(null) }
      }, 1500);
    })

    return promise;
  }

  onSubmitHandler = () => {
    console.log(this.signUpForm);
  }
}
