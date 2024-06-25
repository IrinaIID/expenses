import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from './project.service';
import { Observable } from 'rxjs';

interface Project  {
  name: string;
  date: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'expense-tracker';
  user!: Project | undefined;

  projectFirebaseService = inject(ProjectService);
  projectInfo$!: Observable<Project[]>;

  ngOnInit(): void {
    console.log('onInit')
    // this.projectFirebaseService.getProjectInfo().subscribe(info => {
    //   console.log(info)
    // })
  }
}
