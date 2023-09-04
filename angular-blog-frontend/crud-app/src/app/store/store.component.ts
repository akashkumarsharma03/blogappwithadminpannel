import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  apidata: any;
  val: boolean | undefined;

  constructor(private ApiService: ApiService ) {}

  ngOnInit(): void {

    this.ApiService.getservice().subscribe((data: any) => {
      this.apidata = data;

      if(this.apidata){
        this.val = false
      }

    }, () => {
      console.log("An error accessing Service");
    })
  }

}
