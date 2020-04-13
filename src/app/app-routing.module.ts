import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// pages
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BuyComponent } from './pages/buy/buy.component';
import { LegalComponent } from './pages/legal/legal.component';
import { LegalDisclaimerComponent } from './pages/legal-disclaimer/legal-disclaimer.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'buy',
    component: BuyComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
  {
    path: 'legal-disclaimer',
    component: LegalDisclaimerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
