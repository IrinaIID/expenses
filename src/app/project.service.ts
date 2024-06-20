import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Project  {
  name: string,
  date: string
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  firestore = inject(Firestore);
  projectCollection = collection(this.firestore, 'project');

  getProjectInfo(): Observable<Project[]> {
    return collectionData(this.projectCollection) as Observable<Project[]>
  }

}
