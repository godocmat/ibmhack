import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Image } from 'src/app/model/image';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  timeFrom: Date;
  timeUntil: Date;
  imagesCollection: AngularFirestoreCollection<Image>;
  images: Observable<Image[]>;

  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  ngOnInit() {
  }

  onChange(result: Date): void {
    this.timeFrom = result[0];
    this.timeUntil = result[1];
  /*  this.http.post(link,{
      time_from: this.timeFrom,
      time_until: this.timeUntil
    }).subscribe(); */


  }

}
