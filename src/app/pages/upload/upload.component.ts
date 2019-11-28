import { Component, OnInit } from '@angular/core';
import { UploadChangeParam, NzMessageService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {finalize, tap, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { async } from 'q';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {


  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;


  constructor(private msg: NzMessageService,
              private http: HttpClient,
              private storage: AngularFireStorage,
              private db: AngularFirestore) { }

  customReq = (item: UploadXHRArgs): Subscription => {


    const path = `test/${Date.now()}_${item.name}`;

      // Reference to storage bucket
    const ref = this.storage.ref(path);

      // The main task
    this.task = this.storage.upload(path, item.file);

      // Progress monitoring
    this.percentage = this.task.percentageChanges();

    return this.task.snapshotChanges().pipe(
      finalize(async () => {
        console.log('tusom');
        this.downloadURL = await ref.getDownloadURL().toPromise();
        console.log(this.downloadURL);
        this.db.collection('files').add({downloadURL: this.downloadURL, path});
        this.http.post('http://localhost:3005/images/', {
          image: this.downloadURL
        }, { responseType: 'text'}).subscribe((val) => console.log('respone', val), (err) => console.log('error', err.message));
      })
      ).subscribe((res) => {
      console.log(res);
    });
}


  ngOnInit() {
  }
}
