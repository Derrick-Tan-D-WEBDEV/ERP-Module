import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = 'Greatech ERP.S';
  
  constructor(private _authService:AuthService,private titleService: Title, private metaService: Meta,private router: Router) {


      this.titleService.setTitle(this.title);
      this.metaService.addTags([
        {name: 'description', content: 'Analyze your statistics. Data visualization. Analytics.'},
        {name: 'tagline', content: 'Analyze your statistics.'}
      ]);

     this.router.events.subscribe((event: Event) => {
         if (event instanceof NavigationStart) {
             // Show loading indicator
             window.scrollTo(0,0);
         }

         if (event instanceof NavigationEnd) {
             // Hide loading indicator
         }

         if (event instanceof NavigationError) {
             // Hide loading indicator

             // Present error to user
             console.log(event.error);
         }
     });


     
   }
}
