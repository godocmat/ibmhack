import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Pillar} from '../../model/pillar';
import {Observable} from 'rxjs';

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
// google maps zoom level
  zoom = 8;
  private pillarsCollection: AngularFirestoreCollection<Pillar>;
  pillars: Observable<Pillar[]>;

  markers: Marker[] = [];

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.pillarsCollection = this.afs.collection('data');
    this.pillars = this.pillarsCollection.valueChanges((res) => {
      this.markers.push(res);
    });
    this.pillars.subscribe((val) => {
      this.markers.push();
    })
  }
}

