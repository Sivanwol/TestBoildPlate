import { Injectable } from "@angular/core";
import { ID } from "@datorama/akita";
import { HttpClient } from "@angular/common/http";
import { tap, switchMap } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { BookResult, BookItem } from "../models/book.model";
import { BookStore } from "../store/book.store";
import { BookQuery, SearchMetaData } from "../queries/book.query";

@Injectable({ providedIn: "root" })
export class BookService {

  private lastSearchQuery = "";
  private lastSearchMetaData: SearchMetaData = null;
  private ApiURI = "https://www.googleapis.com/books/v1/volumes?q=";
  constructor(private bookStore: BookStore,
              private bookQuery: BookQuery,
              private http: HttpClient) {
  }
// har&startIndex=&maxResults=40&filter=ebooks
  getBooks(searchQuery: string , nextPage = false, onlyEbooks = false): Observable<Array<BookItem>> {
    return this.bookQuery.getSearchMetaData().pipe(
      tap(result => this.lastSearchMetaData = result),
      switchMap(result => {
        let startIndex = result.currentStartIndex;
        if (nextPage) {
          startIndex += result.pageSize;
        }
        let searchParams = `${searchQuery}&startIndex=${startIndex}&maxResults=40`;
        if (onlyEbooks) {
          searchParams += "&filter=ebooks";
        }
        const ApiURI = this.ApiURI + searchParams;
        if (startIndex === 0 && searchQuery !== this.lastSearchQuery) {
          this.bookStore.ClearSearch();
          this.lastSearchQuery = searchQuery;
        }
        if (this.lastSearchMetaData.maxStartIndex > startIndex) {
          return this.http.get<BookResult>(ApiURI).pipe(
            tap((result: BookResult) => {
              const pages = (result.totalItems / this.lastSearchMetaData.pageSize) + (result.totalItems % this.lastSearchMetaData.pageSize);
              const maxStartIndex = this.lastSearchMetaData.maxStartIndex > startIndex ? startIndex : this.lastSearchMetaData.maxStartIndex;
              this.bookStore.UpdateSearchPageData(pages, startIndex, maxStartIndex, result.items);
            }),
            switchMap(result => this.bookQuery.getStackBook(startIndex, this.lastSearchMetaData.pageSize))
          );
        } else {
          return this.bookQuery.getStackBook(startIndex, this.lastSearchMetaData.pageSize);
        }
      })
    );
  }

  getLastSearchMetaData(): Observable<SearchMetaData> {
    return this.bookQuery.getSearchMetaData();
  }
}
