import { Component } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-multiple',
	templateUrl: './multiple.component.html',
	styleUrls: ['./multiple.component.css']
})
export class MultipleComponent {
	private Url= '/api/multiple/';
	private subjects:any=[{}];
	private subject:any ={};
	private students:any=[{}];
	private allStudents:any=[{}];
	private results:any=[{}];

	searchForm: FormGroup;
	addStudent: FormGroup;

	constructor(private http: Http, private fb: FormBuilder) {
		this.getSubjects();
		this.getStudents();

		this.subject='';
		this.students='';

		this.searchForm = fb.group({
			'filter' : '',
			'parameter':''

		});

		this.addStudent = fb.group({
			'student' : ''

		});
	}

	private addSubject(subject){
		let body = JSON.stringify(subject);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http
		.post(`${this.Url}/add`, body, options)
		.map((res: Response) => res.json())
		.subscribe(data => {
			this.subjects.push(data);
			this.searchForm.reset();
		});

	}


	private deleteStudent(student){
		let tempStudent={phones: [student]}
		let body = JSON.stringify(tempStudent);
		var tempId=this.subject._id;
		var tempId2=student._id;
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http
		.delete(`${this.Url}/student/${tempId}/${tempId2}`,options)
		.map((res: Response) => res.json())
		.subscribe(data => {
			var index = this.students.indexOf(this.subject);
			this.subjects[index] = data;
			this.subject=data;
			var index = this.students.indexOf(student);
			this.students.splice(index, 1);
		});

	}

	private searchSubject(params){
		console.log(params)
		let filter=params.filter;
		let param=params.parameter;

		if(filter=="all")
			this.showAll();

		else if(filter=='name'){
			console.log("name");
			this.searchByName(param)
		}

		else if(filter=="studies"){
			console.log("studies")
			this.searchByStudies(param);
		}

		else if(filter=="semester"){
			console.log("semester")
			this.searchBySemester(param);
		}

		else if(filter=="order"){
			console.log("order")
			this.order();
		}
	}

	private showAll(){
		this.results=this.subjects;
	}

	private searchByName(name){
		this.results=this.subjects.filter(x => x.name == name);
	}

	private searchByStudies(studies){
		this.results=this.subjects.filter(x => x.studies == studies);
	}

	private searchBySemester(studies){
		this.results=this.subjects.filter(x => x.semester == studies);
	}

	private order(){
		this.results=this.subjects.sort(function(a, b) { return a.name > b.name});
	}

	private addStudents(student,subject){
		console.log(student);

		var tempId=subject._id;
		let newStudent={students: student.student._id}
		let body = JSON.stringify(newStudent);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http
		.post(`${this.Url}/student/${tempId}`, body, options)
		.map((res: Response) => res.json())
		.subscribe(data => {
			var index = this.subjects.indexOf(subject);
			this.subjects[index] = data;
			this.subject=data;
			console.log(this.subject);
			this.students=this.subject.students;
			this.addStudent.reset();
		});
	}

	private delete(subject){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		var tempId=subject._id;

		return this.http
		.delete(`${this.Url}/${tempId}`)
		.map((res: Response) => res.json())
		.subscribe(data => {
			var index = this.subjects.indexOf(subject);
			this.subjects.splice(index, 1);
			this.students=null;
		});

	}

	private showSubject(subject){
		this.subject=subject;
		this.students=subject.students;
	}

	private getSubjects() {
		return this.http.get(`${this.Url}/all`)
		.map((res: Response) => res.json())
		.subscribe(data => {
			this.subjects=data;
			this.results=this.subjects;
			console.log(this.subjects);
		});
	}

	private getStudents(){
		return this.http.get(`/api/student/all`)
		.map((res: Response) => res.json())
		.subscribe(data => {
			this.allStudents=data;
			console.log(this.allStudents);
		});
	}
}
