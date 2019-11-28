import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import Item = firebase.analytics.Item;
import {Observable} from 'rxjs';
import {Pillar} from '../../model/pillar';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.scss']
})
export class InfoWindowComponent implements OnInit {

  private pillarsCollection: AngularFirestoreCollection<Pillar>;
  pillars: Observable<Pillar[]>;


  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    // this.pillarsCollection = this.afs.collection('data');
    // this.pillars = this.pillarsCollection.valueChanges();
  }

}
