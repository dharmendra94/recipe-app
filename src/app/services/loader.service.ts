import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderState: Subject<boolean> = new Subject<boolean>();

  loaderVisible$: Observable<boolean> = this.loaderState.asObservable();

  constructor() {}

  showProgressBar() {
    this.loaderState.next(true);
  }

  hideProgressBar() {
    this.loaderState.next(false);
  }
}
