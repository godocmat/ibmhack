import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import Item = firebase.analytics.Item;
import {Observable} from 'rxjs';
import {Pillar} from '../../model/pillar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.scss']
})
export class InfoWindowComponent implements OnInit, OnChanges {

  private pillarsCollection: AngularFirestoreCollection<Pillar>;
  pillars: Observable<Pillar[]>;
  images = [];


  // tslint:disable-next-line: no-input-rename
  @Input('data') data: any;

  constructor(private afs: AngularFirestore, private httpClient: HttpClient) {}

  ngOnInit() {
  }

  ngOnChanges() {
    this.images = this.data;
    console.log(this.images);
  }
}
