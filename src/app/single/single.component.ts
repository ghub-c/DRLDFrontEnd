import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})

export class SingleComponent {

  private Url= '/api/';
  private test:any ={};
  private tests:any=[{}];

  testForm: FormGroup;
  constructor(private http: Http, private fb: FormBuilder) {

    this.test='';

		this.testForm = fb.group({
			'destination' : '',
			'weights': '',
      'episodes':''
		});
	}


	private newTest(test) {
    let body = JSON.stringify(test);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(body);
    return this.http
      .post(`${this.Url}/test`, body, options)
      .map((res: Response) => res.json())
      .subscribe(data => {
       console.log(data);
      });
	}
}
