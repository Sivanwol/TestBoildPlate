import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BookItem } from "../../models/book.model";

@Component({
  selector: "app-book-list-item",
  templateUrl: "./book-list-item.component.html",
  styleUrls: ["./book-list-item.component.scss"]
})
export class BookListItemComponent implements OnInit {

  public title: string;
  public description: string;
  public thubnail: string;
  @Input()
  public bookItem: BookItem;

  @Output()
  public bookSelected: EventEmitter<BookItem> = new EventEmitter<BookItem>();
  constructor() { }

  ngOnInit() {
    this.title = this.bookItem.volumeInfo.title;
    this.description = this.bookItem.volumeInfo.subtitle;
    this.thubnail = this.bookItem.volumeInfo.imageLinks.smallThumbnail;
  }

}
