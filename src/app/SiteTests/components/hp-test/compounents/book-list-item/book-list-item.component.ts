import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BookItem } from "../../models/book.model";

@Component({
  selector: "app-book-list-item",
  templateUrl: "./book-list-item.component.html",
  styleUrls: ["./book-list-item.component.scss"]
})
export class BookListItemComponent implements OnInit {

  public title: string;
  public hasEbook: string;
  public hasSelected = false;
  @Input()
  public bookItem: BookItem;

  @Output()
  public bookSelected: EventEmitter<BookItem> = new EventEmitter<BookItem>();
  constructor() { }

  ngOnInit() {
    this.title = this.bookItem.volumeInfo.title;
    this.hasEbook = (this.bookItem.saleInfo.isEbook) ? "Has Digital Form" : "Print Only";
  }

  onSelectBook() {
    this.bookSelected.emit(this.bookItem);
  }

}
