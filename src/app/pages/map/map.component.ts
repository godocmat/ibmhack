import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Pillar} from '../../model/pillar';
import {Observable, pipe} from 'rxjs';
import {flatMap, map, tap} from 'rxjs/operators';

// just an interface for type safety.
class Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
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
    console.log('init');
    this.pillarsCollection = this.afs.collection('data');
    this.pillars = this.pillarsCollection.valueChanges();
    this.pillars.pipe(
      flatMap((pillars: Pillar[]) => {
        return pillars.map((value1 => value1.geometry.coordinates));
      }),
      tap((pillar) => {
        this.markers.push(new Marker(pillar[0], pillar[1]));
      }),
      tap(() => console.log(this.markers))
    ).subscribe();

  }
}

