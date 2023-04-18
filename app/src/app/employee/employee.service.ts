import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  activatedEmmiter = new Subject<boolean>();
  constructor() { }
}
