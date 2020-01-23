import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, switchMap, take } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { BookResult, BookItem } from "../models/book.model";
import { BookStore } from "../store/book.store";
import { BookQuery, SearchMetaData } from "../queries/book.query";

export enum BookPagingDirectorion {
  Next,
  Priv
}
@Injectable({ providedIn: "root" })
export class BookService {

  private lastSearchQuery = "";
  private lastSearchMetaData: SearchMetaData = {
    totalPage: 0,
    currentStartIndex: 0,
    maxStartIndex: 0,
    pageSize: 40
  };
  private ApiURI = "https://www.googleapis.com/books/v1/volumes?q=";
  constructor(private bookStore: BookStore,
              private bookQuery: BookQuery,
              private http: HttpClient) {
  }
// har&startIndex=&maxResults=40&filter=ebooks
  initalSearchParams() {
    this.bookStore.ClearSearch();
  }

  searchBooks(searchQuery: string , onlyEbooks = false): void {
    this.bookQuery.getSearchMetaData().pipe(
      take(1),
      tap(result => this.lastSearchMetaData = result),
      switchMap(result => {
        const startIndex = result.currentStartIndex;
        let searchParams = `${searchQuery}&startIndex=${startIndex}&maxResults=40`;
        if (onlyEbooks) {
          searchParams += "&filter=ebooks";
        }
        const ApiURI = this.ApiURI + searchParams;
        let newSearch = false;
        if (this.lastSearchQuery !== searchQuery ) {
          newSearch = true;
          this.bookStore.ClearSearch();
        }
        if (this.lastSearchMetaData.maxStartIndex > startIndex || newSearch) {
          this.lastSearchQuery = searchQuery;
          return this.http.get<BookResult>(ApiURI).pipe(
            take(1),
            tap((result: BookResult) => {
              // tslint:disable-next-line: max-line-length
              const pages = Math.ceil((result.totalItems / this.lastSearchMetaData.pageSize) + (result.totalItems % this.lastSearchMetaData.pageSize));
              const maxStartIndex = this.lastSearchMetaData.maxStartIndex > startIndex ? startIndex : this.lastSearchMetaData.maxStartIndex;
              this.bookStore.UpdateSearchPageData(pages, startIndex, maxStartIndex, result.items);
            })
          );
        }
      })
    );
  }

  updatePaging(pagingDirection: BookPagingDirectorion) {
    const startIndex = this.lastSearchMetaData.currentStartIndex;
    const pageSize = this.lastSearchMetaData.pageSize;
    if (pagingDirection === BookPagingDirectorion.Priv && startIndex > 0) {
      this.bookStore.UpdatePaging(startIndex - pageSize);
    } else {
      this.bookStore.UpdatePaging(startIndex + pageSize);
    }
  }
  getBooks(): Observable<Array<BookItem>> {
    const startIndex = this.lastSearchMetaData.currentStartIndex || 0;
    const pageSize = this.lastSearchMetaData.pageSize || 40;
    return this.bookQuery.getStackBook(startIndex, pageSize);
  }
}
