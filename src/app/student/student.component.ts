import { Component } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-student',
	templateUrl: './student.component.html',
	styleUrls: ['./student.component.css']
})
export class StudentComponent {
	private Url= '/api/student';
	private students:any=[{}];
	private student:any ={};
	private phones:any=[{}];;
	private disabled=true;

	addForm: FormGroup;
	addPhone:FormGroup;
	updateForm:FormGroup;


	constructor(private http: Http, private fb: FormBuilder) {
		this.student='';
		this.phones='';
		this.addForm = fb.group({
			'name' : '',
			'address': ''

		});

		this.updateForm = fb.group({
			'name' : '',
			'address': ''

		});

		this.addPhone = fb.group({
			'phones' : ['']

		});
		this.getStudents();
	}

	private addStudent(student){
		let body = JSON.stringify(student);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http
		.post(`${this.Url}/add`, body, options)
		.map((res: Response) => res.json())
		.subscribe(data => {
			this.students.push(data);
			this.addForm.reset();
		});
		
	}

	private updateStudent(update,student){
		this.checkNullFields(student,update);
		let body = JSON.stringify(update);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		var tempId=student._id;

		return this.http
		.post(`${this.Url}/${tempId}`,update, options)
		.map((res: Response) => res.json())
		.subscribe(data => {
			console.log("data");
			console.log(data);

			var index = this.students.indexOf(student);
			this.students[index] = data;
			this.student=data;
			this.updateForm.reset();
		});
	}

	private checkNullFields(student,update){
		if(update.name.length==0)
			update.name=student.name;

		if (update.address.length==0)
			update.address=student.address;
	}

	private addPhones(phones,student){
		var tempId=student._id;
		let body = JSON.stringify(phones);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http
		.post(`${this.Url}/phone/${tempId}`, body, options)
		.map((res: Response) => res.json())
		.subscribe(data => {
			var index = this.students.indexOf(student);
			this.students[index] = data;
			this.student=data;
			this.phones=this.student.phones;
			this.addPhone.reset();
		});
	}

	private showStudent(student){
		this.student=student;
		this.phones=student.phones;
	}

	private delete(student){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		var tempId=student._id;

		return this.http
		.delete(`${this.Url}/${tempId}`)
		.map((res: Response) => res.json())
		.subscribe(data => {
			var index = this.students.indexOf(student);
			this.students.splice(index, 1);
			this.student='';
			this.phones=null;
		});

	}

	private deletePhone(phone){
		let tempPhone={phones: [phone]}
		let body = JSON.stringify(tempPhone);
		var tempId=this.student._id;
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers, body:body });
		
		return this.http
		.delete(`${this.Url}/phone/${tempId}`,options)
		.map((res: Response) => res.json())
		.subscribe(data => {
			var index = this.students.indexOf(this.student);
			this.students[index] = data;
			this.student=data;
			var index = this.phones.indexOf(phone);
			this.phones.splice(index, 1);
		});

	}

	private getStudents() {
		return this.http.get(`${this.Url}/all`)
		.map((res: Response) => res.json())
		.subscribe(data => {
			this.students=data;
			console.log(this.students);
		});
	}
}
