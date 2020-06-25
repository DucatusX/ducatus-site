import { BrowserModule, makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { environment } from '../environments/environment';

// plugins
import { QRCodeModule } from 'angularx-qrcode';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// pages
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BuyComponent } from './pages/buy/buy.component';
import { LegalComponent } from './pages/legal/legal.component';
import { GoldLotteryComponent } from './pages/gold-lottery/gold-lottery.component';
import { LegalDisclaimerComponent } from './pages/legal-disclaimer/legal-disclaimer.component';
import { ErrorPageComponent } from './pages/errorpage/errorpage.component';
import { DucatusxComponent } from './pages/ducatusx/ducatusx/ducatusx.component';
import { VaucherComponent } from './pages/vaucher/vaucher.component';

// partials
import { HeaderComponent } from './pages/index/header/header.component';
import { FooterComponent } from './pages/index/footer/footer.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutComponent,
    ContactComponent,
    BuyComponent,
    LegalComponent,
    LegalDisclaimerComponent,
    GoldLotteryComponent,
    ErrorPageComponent,
    DucatusxComponent,
    VaucherComponent,

    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    FormsModule,
    Ng2TelInputModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
