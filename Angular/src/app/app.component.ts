import { Component, OnInit } from '@angular/core';
import { UsgsService } from './usgs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  filterCity : string = "California";
  filterMagnitude : number = 0.0 ;
  isNotLoaded : boolean = true;
  
  usgsDataArray = [];

  usgsFormattedDataArray = [];

  constructor( private usgsService : UsgsService ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.usgsService.getData()
    .subscribe(data => {
      this.usgsDataArray = data.features;
      this.usgsDataArray.forEach(element => {
        if (element.properties.place.split(' ').indexOf(this.filterCity) > -1 ){
          this.usgsFormattedDataArray.push(element.properties)
        }
      });
      this.usgsFormattedDataArray.sort((a,b)=>{
        return a.time - b.time
      })
      this.isNotLoaded = false;
    });
    
  }
  
}
