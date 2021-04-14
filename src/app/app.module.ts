import { KonvaModule } from 'ng2-konva';
import { GraphQLModule } from './graphql.module';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { TagInputModule } from "ngx-chips";
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    TagInputModule,
    GraphQLModule,
    KonvaModule,
    DragDropModule,
    DataTablesModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, UserLayoutComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
