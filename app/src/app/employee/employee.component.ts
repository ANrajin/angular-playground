import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, skip, skipWhile } from 'rxjs';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  public counter: any;
  public isComplete: boolean = false;
  private mySubscriber!: Subscription;
  public isActivated!: boolean;
  private activateSubscription!: Subscription;

  constructor(private employeeService: EmployeeService) { }

  //This lifecycle hook will be called, on component initialization
  ngOnInit(): void {
    //we can subscribe to an observable
    // this.mySubscriber = interval(1000).subscribe((count) => {
    //   console.log(count);
    // })

    //creating custom observable
    const customObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);

        //Completing the observable, the observale will dies immediatly
        if (count > 5) { observer.complete(); }

        //Throwing an error. When an observable throws error it immediatly dies
        if (count > 10) { observer.error(new Error('Count is greater than 5')) }

      }, 1000);
    });

    /**
     * Rxjs Operators
     * Observable has lot of operators that is used to manipulate
     * data before sending it to the subscriber
     * 
     * For more - https://www.learnrxjs.io/learn-rxjs/operators
     */

    this.mySubscriber = customObservable.pipe(
      skipWhile(val => val == 0),
      map(data => {
        return `Round - ${data}`;
      }))
      .subscribe((data) => {
        this.counter = data;
      }, error => {
        //we can catch the error returned by observable and show alert
        console.error(error);
        alert(error.message);
      }, () => {
        //we can perform task when the observable is completed
        this.isComplete = true;
      })


    // this.mySubscriber = customObservable.subscribe((data) => {
    //   this.counter = data;
    // }, error => {
    //   //we can catch the error returned by observable and show alert
    //   console.error(error);
    //   alert(error.message);
    // }, () => {
    //   //we can perform task when the observable is completed
    //   this.isComplete = true;
    // })

    //Observable subject
    this.activateSubscription = this.employeeService.activatedEmmiter.subscribe(didActivate => {
      this.isActivated = didActivate;
    })
  }

  //This lifecycle hook will be called, on component destroy
  ngOnDestroy(): void {
    //we can unsubscribe from an objservable
    this.mySubscriber.unsubscribe();
    this.activateSubscription.unsubscribe();
  }

  onActivate = () => {
    this.employeeService.activatedEmmiter.next(true);
  }
}
