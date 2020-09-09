import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// pages
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { IndexNewComponent } from './pages/index-new/index-new.component';
import { BuyComponent } from './pages/buy/buy.component';
import { LegalComponent } from './pages/legal/legal.component';
import { LegalDisclaimerComponent } from './pages/legal-disclaimer/legal-disclaimer.component';
import { GoldLotteryComponent } from './pages/gold-lottery/gold-lottery.component';
import { ErrorPageComponent } from './pages/errorpage/errorpage.component';
import { DucatusxComponent } from './pages/ducatusx/ducatusx/ducatusx.component';
import { TicketsComponent } from './pages/buy/tikcets/tickets.component';
import { VoucherComponent } from './pages/voucher/voucher.component';
import { LoginComponent } from './pages/login/login.component';
import { UserResolver } from './resolvers';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'new',
    component: IndexNewComponent
  },
  {
    path: 'about',
    component: AboutComponent,
    // data: { animation: 'isRight' }
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
    path: 'buy/entries',
    component: TicketsComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
  {
    path: 'legal-disclaimer',
    component: LegalDisclaimerComponent,
  },
  {
    path: 'gold-lottery',
    component: GoldLotteryComponent,
  },
  {
    path: 'ducatusx',
    component: DucatusxComponent,
  },
  {
    path: 'admin',
    resolve: {
      user: UserResolver
    },
    redirectTo: 'admin/login',
  },
  {
    path: 'admin/voucher',
    component: VoucherComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
