import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usersData } from './users-mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  post;
  users;
  newUsers;

  constructor(private httpClient: HttpClient) {
    const keys: string[] = Object.keys(usersData);
    const pairs = this.setPairs(keys);
    this.newUsers = keys.map(key => {
      const currentUser = usersData[key];
      const matches: {}[] = [];
      const matchesKeys = Object.keys(currentUser.matches);
      matchesKeys.map(keyMatch => {
        matches.push({
          id: pairs[keyMatch],
          date: null,
          rate: null,
          cancelMessage: null,
          cancelMessageToHHRR: null,
        });
      });

      if (currentUser.currentMatch) {
        matches.push({
          id: pairs[currentUser.currentMatch],
          date: null,
          rate: null,
          cancelMessage: null,
          cancelMessageToHHRR: null,
        });
      }

      return {
        id: pairs[key],
        availabe: currentUser.active,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: '1234',
        area: 'Developer',
        phone: '3158324055',
        interests: ['Movies', 'Food'],
        description: 'Front-End developer',
        location: currentUser.location,
        currentMatch: null,
        matches,
      };
    });
    console.log(this.newUsers);
  }

  setPairs(keys: any) {
    const pairs = {};
    keys.forEach((key, index) => {
      pairs[key] = index;
    });
    return pairs;
  }

  refresh() {
    this.users = this.httpClient.get('api/users');
  }
  addUser() {
    this.post = this.httpClient.post('api/users', { name: 'Esteban' });
  }
}
