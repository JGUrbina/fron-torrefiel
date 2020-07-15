// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { routing, appRoutingProviders } from './app.routing';
import { MatIconModule } from '@angular/material/icon';
import { SocketIoModule } from 'ngx-socket-io';
import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DataTablesModule } from 'angular-datatables';

// Config
import { SocketConfig } from './config/config';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
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
import { ImageComponent } from './components/utils/image/image.component';
import { CloseSectionComponent } from './components/utils/close-section/close-section.component';
import { DownloadComponent } from './components/utils/download/download.component';
import { DateAndHourComponent } from './components/utils/date-and-hour/date-and-hour.component';
import { InputComponent } from './components/utils/input/input.component';
import { SelectComponent } from './components/utils/select/select.component';
import { AdminViewComponent } from './components/admin/admin-view/admin-view.component';
import { JobsViewComponent } from './components/jobs/jobs-view/jobs-view.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CreateIconComponent } from './components/create-icon/create-icon.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { CardCalendarComponent } from './components/card-calendar/card-calendar.component';
import { JobComponent } from './components/jobs/job/job.component';
import { MediumPieChartComponent } from './components/medium-pie-chart/medium-pie-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { SearchComponent } from './components/search/search.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AddNewComponent } from './components/admin/users/add-new/add-new.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    NotificationComponent,
    ImageComponent,
    CloseSectionComponent,
    DownloadComponent,
    DateAndHourComponent,
    InputComponent,
    SelectComponent,
    AdminViewComponent,
    JobsViewComponent,
    CreateIconComponent,
    PieChartComponent,
    CardCalendarComponent,
    JobComponent,
    MediumPieChartComponent,
    LineChartComponent,
    SearchComponent,
    AddNewComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MomentModule,
    routing,
    NoopAnimationsModule,
    MatIconModule,
    SocketIoModule.forRoot(SocketConfig),
    ChartsModule,
    FullCalendarModule,
    ReactiveFormsModule,
    DataTablesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [appRoutingProviders, MatIconModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
