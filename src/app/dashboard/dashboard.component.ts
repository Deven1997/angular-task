import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { Record } from '../record';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DecimalPipe]
})

export class DashboardComponent implements OnInit {
  public records:Record[];

  allrecords$: Observable<Record[]>;
  filter = new FormControl('');

  editRecordId: number = 0;
  isDisabled:boolean = false;

  constructor(
    private modalService: NgbModal, 
    private _recordService: RecordService, 
    private pipe: DecimalPipe,
    private _snackBar: MatSnackBar
    ) { 
    this.records = [];

    this.allrecords$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, this.pipe))
    );
  }
 
  ngOnInit(): void {
    this.records = this._recordService.getRecord();
    this.isDisabled = this.records.length === 0;
  } 

  modalRef: any;
  openModal(modalId:any) {
    this.modalRef = this.modalService.open(modalId, { centered: true });
  } 

  modalRef2: any;
  openEditModal(editRecordModel:any, id:number){
    this.editRecordId = id;
    this.modalRef2 = this.modalService.open(editRecordModel, { centered: true });
    console.log("Record no : "+ id);
  }

  search(text: string, pipe: PipeTransform): Record[] {
    return this.records.filter(rec => {
      const term = text.toLowerCase();
      return rec.bookName.toLowerCase().includes(term)
          || rec.author.toLowerCase().includes(term)
          || pipe.transform(rec.ratings).includes(term)
          || pipe.transform(rec.price).includes(term)
          || pipe.transform(rec.pages).includes(term);
    });
  }
  
  addRecord(newRecord:Record) {    
      this._recordService.addRecord(newRecord);
      this.modalRef.close();
      console.log("Record added");
      this.filterChanges();
    this.openSnackBar("Record Added", "close");
    this.isDisabled = this.records.length === 0;
  }

  updateRecord(changes:Record, id:number){
    this._recordService.updateRecord(changes, id);
    this.modalRef2.close();
    this.filterChanges();
    this.openSnackBar("Record #"+(id+1)+" Updated", "close");
    console.log(changes);
  }

  deleteRecord(id:number){
    this._recordService.deleteRecord(id);
    this.filterChanges();
    this.openSnackBar("Record #"+(id+1)+" Deleted", "close");
    this.isDisabled = this.records.length === 0;
  }

  sortBy(fieldName:any){
    this._recordService.sort(fieldName);
    this.filterChanges();
  }

  filterChanges(){
    this.allrecords$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, this.pipe))
    ); 
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
