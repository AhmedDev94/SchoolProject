import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  isLoggedIn() {
    const jwt = sessionStorage.getItem("token");
    // console.log("here jwt" , jwt)
    if (jwt) {
      const jwt = sessionStorage.getItem("token");
      return true;
    }
    return !!jwt;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isLoggedIn()) {
      return true;
    } else {
      // Redirect to login page or show an error message
      this.router.navigate(["/signin"]);
      return false;
    }
  }
}
