import { Component, OnInit } from '@angular/core';
import { UploadChangeParam, NzMessageService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
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

  customReq = (item: UploadXHRArgs) => {


    const path = `test/${Date.now()}_${item.name}`;

      // Reference to storage bucket
    const ref = this.storage.ref(path);

      // The main task
    this.task = this.storage.upload(path, item.file);

      // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.task.snapshotChanges().pipe(
      map(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
      }),
      tap((value) => {
        this.http.post('http://localhost:3005/images/', {
          image: this.downloadURL
        }).subscribe((val) => console.log('respone', val));
      })
      ).subscribe();
    //     map(
    //     finalize( async () =>  {
    //       this.downloadURL = await ref.getDownloadURL().toPromise();

    //       this.db.collection('files').add( { downloadURL: this.downloadURL, path }).finally(() => {
    //         console.log('test');

    //       });
    //       return this.downloadURL
    //     }),
    //   )
    // ),
    // tap((tap) =>


    

}


  ngOnInit() {
  }
}
