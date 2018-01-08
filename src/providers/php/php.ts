import { Injectable, Component } from '@angular/core';
import { Http, Response } from '@angular/http';

import { person } from '../../pages/home/model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'




@Component({
  selector: 'as',
  template: `<ul>
		<li *ngFor="let person of data">
		   {{person.id}} - {{person.first_name}}
		</li>
	     </ul>`
})



@Injectable()
export class PhpProvider {


  constructor(public http: Http) {
    console.log('Hello PhpProvider Provider');
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    return this.http.get('http://localhost/dados.php').map((res: Response) => res.json());

  }
}

