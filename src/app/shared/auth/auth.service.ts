import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    userName: string;

    logIn() {
        this.userName = 'Max';
    }

    logOut() {
        this.userName = null;
    }

}