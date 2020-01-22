import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-book-search-bar',
  templateUrl: './book-search-bar.component.html',
  styleUrls: ['./book-search-bar.component.scss']
})
export class BookSearchBarComponent implements OnInit {
  public form = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initalForm();
  }
  initalForm() {
    this.form = this.fb.group({
      query: [
        "",[Validators.required, Validators.minLength(2)]
      ],
      onlyEbook: [""]
    });
  }

}
