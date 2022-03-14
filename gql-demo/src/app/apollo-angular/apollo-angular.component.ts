import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApolloBachingService } from './apollo-baching.service';
import { ApolloAngularService } from './apollo.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
];

@Component({
  selector: 'app-apollo-angular',
  templateUrl: './apollo-angular.component.html',
  styleUrls: ['./apollo-angular.component.scss'],
})
export class ApolloAngularComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'author',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private apolloService: ApolloAngularService) {}

  viewContent() {
    this.apolloService.getSimpleData().subscribe(console.log);
  }

  getData($event: any) {
    console.log($event);
  }
  getSingleCourse() {
    this.apolloService.getSingleCourseWithId().subscribe(console.log);
  }

  getCoursesByTopic() {
    this.apolloService.getCoursesByTopic().subscribe(console.log);
  }

  // getBatching() {
  //   this.batching;
  // }

  ngOnInit(): void {}
}
