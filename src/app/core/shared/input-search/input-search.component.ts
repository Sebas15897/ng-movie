import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime } from 'rxjs';

@Component({
  selector: 'app-input-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
})

export class InputSearchComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  @Output() searchParams = new EventEmitter<string>();

  formSearch: FormGroup = null;

  constructor(private fb: FormBuilder) {
    this.formSearch = this.createForm();
  }

  ngOnInit() {
    this.subscribeForm();
  }

  subscribeForm() {
    this.formSearch
      .get('search')
      .valueChanges.pipe(debounceTime(300), takeUntil(this.destroy))
      .subscribe((resp) => {
        this.searchParams.emit(resp);
      });
  }

  createForm(): FormGroup {
    return this.fb.group({
      search: null,
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
