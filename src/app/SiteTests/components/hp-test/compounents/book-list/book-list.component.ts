import { Component, OnInit } from "@angular/core";
import { BookService } from "../../services/book.service";
import { Observable } from 'rxjs';
import { BookItem } from '../../models/book.model';

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent implements OnInit {
  public items$: Observable<Array<BookItem>>;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.items$ = this.bookService.getBooks();
  }

  OnBookSelected(item) {
    console.log("Item Selected ", item);
  }

}
