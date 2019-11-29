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
  imgArray?: string[] = [];
  constructor(lat, lng, label?, imgArray?) {
    this.lat = lat;
    this.lng = lng;
    this.label = label;
    this.imgArray = imgArray;
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
  lat = 48.6759244780318;
  lng = 21.3396421711475;
  pilarImages = [];


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
 /*   console.log('test');
    this.getPillars().pipe(
      flatMap((pillars: Pillar[]) => {
        //this.pillars = pillars;
        return pillars.map((value1 => value1.coordinates));
          }),
      tap((pillar) => {
        this.markers.push(new Marker(pillar[1], pillar[0],));
      }),
      tap(() => console.log(this.markers))
    ).subscribe();
*/


    this.getPillars().subscribe(value => {
      value.map(val => {
        // tslint:disable-next-line: max-line-length
        this.markers.push(new Marker(+val.coordinates[1], +val.coordinates[0], val.images == null ? '' : val.images.length.toString(), val.images));
      });
    });

    // console.log('init');
    // this.pillarsCollection = this.afs.collection('data');
    // this.pillars = this.pillarsCollection.valueChanges();
    // this.pillars.pipe(
    //   flatMap((pillars: Pillar[]) => {
    //     return pillars.map((value1 => value1.geometry.coordinates));
    //   }),
    //   tap((pillar) => {
    //     this.markers.push(new Marker(pillar[0], pillar[1]));
    //   }),
    //   tap(() => console.log(this.markers))
    // ).subscribe();

  }

  getPillars(): Observable<Pillar[]> {
    return this.httpClient.get<Pillar[]>('http://147.232.191.144:8087/pillar');
  }
}

