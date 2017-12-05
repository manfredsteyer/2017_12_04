import { Injectable } from '@angular/core';
import { OAuthService } from "angular-oauth2-oidc";

@Injectable()
export class AuthService {

    constructor(private oauthService: OAuthService) {
    }

    // userName: string;
    get userName() {
        let claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        return claims['given_name'];
    }

    logIn() {
        this.oauthService.initImplicitFlow();
    }

    logOut() {
        this.oauthService.logOut();
    }

}