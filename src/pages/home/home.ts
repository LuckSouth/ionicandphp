import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
// import { ActivatedRoute } from '@angular/router';


import { person } from './model';
import { PhpProvider } from '../../providers/php/php';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  public items : Array<any> = [];



  constructor(public navCtrl: NavController,
              public http   : HttpClient)
  {

  }




  /**
   * Triggered when template view is about to be entered
   * Returns and parses the PHP data through the load() method
   *
   * @public
   * @method ionViewWillEnter
   * @return {None}
   */
  ionViewWillEnter() : void
  {
     this.load();
  }




  /**
   * Retrieve the JSON encoded data from the remote server
   * Using Angular's Http class and an Observable - then
   * assign this to the items array for rendering to the HTML template
   *
   * @public
   * @method load
   * @return {None}
   */
  load() : void
  {
     this.http
     .get('http://localhost/retrieve-data.php')
     .subscribe((data : any) =>
     {
        console.dir(data);
        this.items = data;
     },
     (error : any) =>
     {
        console.dir(error);
     });
  }




  /**
   * Allow navigation to the AddTechnologyPage for creating a new entry
   *
   * @public
   * @method addEntry
   * @return {None}
   */
  addEntry() : void
  {
     this.navCtrl.push('AddTechnologyPage');
  }




  /**
   * Allow navigation to the AddTechnologyPage for amending an existing entry
   * (We supply the actual record to be amended, as this method's parameter,
   * to the AddTechnologyPage
   *
   * @public
   * @method viewEntry
   * @param param 		{any} 			Navigation data to send to the next page
   * @return {None}
   */
  viewEntry(param : any) : void
  {
     this.navCtrl.push('AddTechnologyPage', param);
  }

  
}

