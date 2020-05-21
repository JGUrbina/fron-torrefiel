import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentModalComponent } from './components/content-modal/content-modal.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SetpasswordComponent } from './components/setpassword/setpassword.component';
import { AlertComponent } from './components/alert/alert.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { DeliveryNoteComponent } from './components/jobs/delivery-note/delivery-note.component';
import { BillComponent } from './components/jobs/bill/bill.component';
import { CalendarComponent } from './components/jobs/calendar/calendar.component';
import { ChatComponent } from './components/jobs/chat/chat.component';
import { ImagesComponent } from './components/jobs/images/images.component';
import { FirmComponent } from './components/jobs/firm/firm.component';
import { NoteComponent } from './components/jobs/note/note.component';
import { CreateServicesComponent } from './components/create-services/create-services.component';
import { ClientsComponent } from './components/admin/clients/clients.component';
import { UsersComponent } from './components/admin/users/users.component';
import { DataComponent } from './components/admin/data/data.component';
import { SummaryComponent } from './components/admin/summary/summary.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { FilterComponent } from './components/filter/filter.component';
import { IconComponent } from './components/utils/icon/icon.component';
import { InformationComponent } from './components/utils/information/information.component';
import { InfoCheckComponent } from './components/utils/info-check/info-check.component';
import { DescriptionComponent } from './components/utils/description/description.component';
import { NotificationComponent } from './components/utils/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FormComponent,
    ContentModalComponent,
    ResetPassComponent,
    ErrorPageComponent,
    SetpasswordComponent,
    AlertComponent,
    HeaderComponent,
    MainComponent,
    DeliveryNoteComponent,
    BillComponent,
    CalendarComponent,
    ChatComponent,
    ImagesComponent,
    FirmComponent,
    NoteComponent,
    CreateServicesComponent,
    ClientsComponent,
    UsersComponent,
    DataComponent,
    SummaryComponent,
    ProfileComponent,
    NotificationsComponent,
    FilterComponent,
    IconComponent,
    InformationComponent,
    InfoCheckComponent,
    DescriptionComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MomentModule,
    routing,
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
