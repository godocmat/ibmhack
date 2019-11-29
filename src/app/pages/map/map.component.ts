import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Pillar} from '../../model/pillar';
import {Observable, pipe, Subscription} from 'rxjs';
import {flatMap, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

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

  pillars: Pillar[] = [];
  pillarsObservable: Observable<Pillar[]>;
  markers: Marker[] = [];

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getPillars().subscribe(value => {
      value.map(val => {
        this.markers.push(new Marker(+val.coordinates[0], +val.coordinates[1]));
      });
    });
  }

  getPillars(): Observable<Pillar[]> {
    return this.httpClient.get<Pillar[]>('http://147.232.191.144:8087/pillar');
  }
}

