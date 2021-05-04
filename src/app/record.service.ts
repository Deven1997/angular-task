import { Injectable, PipeTransform } from '@angular/core';
// import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { Record } from './record';


@Injectable({
  providedIn: 'root'
})
export class RecordService {
  public RECORDS: Record[] = [];
  constructor() { }

  getRecord(){
    return(this.RECORDS);
  }
  
  addRecord(record:Record){
    this.RECORDS.push(record);
    console.log(this.RECORDS);
  }

  updateRecord(record:Record, id:number){
    this.RECORDS.splice(id, 1, record);
  }

  deleteRecord(id:number){
    this.RECORDS.splice(id, 1);
  }

  sort(fieldName:string){
    let n = this.RECORDS.length;
    if(fieldName==='bookName')
      this.sortByBookName(n);
    if(fieldName==='author')
      this.sortByAuthor(n);
    if(fieldName === 'ratings')
      this.sortByRatings(n);
    if(fieldName == 'price')
      this.sortByPrice(n);
    if(fieldName === 'pages')
      this.sortByPages(n);
  }

  sortByBookName(n:number){
    for (let i = 1; i < n; i++) {
      let current = this.RECORDS[i];
      let j = i-1;  
      while ((j > -1) && (current.bookName.localeCompare(this.RECORDS[j].bookName) !== 1)) {
        this.RECORDS[j+1] = this.RECORDS[j];
          j--;
      }
      this.RECORDS[j+1] = current;
    }
  }
  sortByAuthor(n:number){
    for (let i = 1; i < n; i++) {
      let current = this.RECORDS[i];
      let j = i-1;  
      while ((j > -1) && (current.author.localeCompare(this.RECORDS[j].author) !== 1)) {
        this.RECORDS[j+1] = this.RECORDS[j];
          j--;
      }
      this.RECORDS[j+1] = current;
    }
  }
  sortByRatings(n:number){
    for (let i = 1; i < n; i++) {
      let current = this.RECORDS[i];
      let j = i-1;  
      while ((j > -1) && (current.ratings < this.RECORDS[j].ratings)) {
        this.RECORDS[j+1] = this.RECORDS[j];
          j--;
      }
      this.RECORDS[j+1] = current;
    }
  }
  sortByPrice(n:number){
    for (let i = 1; i < n; i++) {
      let current = this.RECORDS[i];
      let j = i-1;  
      while ((j > -1) && (current.price < this.RECORDS[j].price)) {
        this.RECORDS[j+1] = this.RECORDS[j];
          j--;
      }
      this.RECORDS[j+1] = current;
    }
  }

  sortByPages(n:number){
    for (let i = 1; i < n; i++) {
      let current = this.RECORDS[i];
      let j = i-1;  
      while ((j > -1) && (current.pages < this.RECORDS[j].pages)) {
        this.RECORDS[j+1] = this.RECORDS[j];
          j--;
      }
      this.RECORDS[j+1] = current;
    }
  }

}


