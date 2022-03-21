import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../http-behavior-subject/http-behavior-subject.service';
import { HttpSimpleService } from './http-simple.service';

@Component({
  selector: 'app-http-simple',
  templateUrl: './http-simple.component.html',
  styleUrls: ['./http-simple.component.scss'],
})
export class HttpSimpleComponent implements OnInit {
  course: any;
  posts: any;

  constructor(private service: HttpSimpleService) {}

  ngOnInit(): void {
    this.service.getPosts().subscribe((res) => {
      console.log(res);
      this.posts = res;
    });
  }

  getCourseById(id: number) {
    this.service.getCourse(id).subscribe((res) => {
      this.course = res;
    });
  }

  updateTopic(id: number, topic: string) {
    this.service.updateTopic(id, topic).subscribe((res) => {
      console.log(res);
      let updatedPosts = this.posts.map((obj: CourseModel) =>
        res.id === obj.id ? res : obj
      );
      this.posts = updatedPosts;

      if (res.id === this.course.id) {
        this.course = res;
      }
    });
  }
  fetchMore() {
    this.service.getPosts().subscribe((res) => {
      console.log(res);
      this.posts = this.posts.concat(res);
    });
  }
}
