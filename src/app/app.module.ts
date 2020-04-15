import { BrowserModule, makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// plugins

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
import { LegalDisclaimerComponent } from './pages/legal-disclaimer/legal-disclaimer.component';

// partials
import { HeaderComponent } from './pages/index/header/header.component';
import { FooterComponent } from './pages/index/footer/footer.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

// export class TranslateBrowserLoader implements TranslateLoader {
//   constructor(
//     private prefix: string = 'i18n',
//     private suffix: string = '.json',
//     private transferState: TransferState,
//     private http: HttpClient
//   ) { }

//   public getTranslation(lang: string): Observable<any> {
//     const key: StateKey<number> = makeStateKey<number>(
//       'transfer-translate-' + lang
//     );
//     const data = this.transferState.get(key, null);

//     // First we are looking for the translations in transfer-state, if none found, http load as fallback
//     if (data) {
//       return Observable.create((observer) => {
//         observer.next(data);
//         observer.complete();
//       });
//     } else {
//       return new TranslateHttpLoader(
//         this.http,
//         this.prefix,
//         this.suffix
//       ).getTranslation(lang);
//     }
//   }
// }

// export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState) {
//   return new TranslateBrowserLoader(
//     './assets/i18n/',
//     '.json?_t=' + new Date().getTime(),
//     transferState,
//     http
//   );
// }

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutComponent,
    ContactComponent,
    BuyComponent,
    LegalComponent,
    LegalDisclaimerComponent,

    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
