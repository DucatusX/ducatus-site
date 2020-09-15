import { Component, OnInit, OnDestroy } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import Swiper from 'swiper';

@Component({
  selector: 'app-index-new',
  templateUrl: './index-new.component.html',
  styleUrls: ['./index-new.component.scss']
})
export class IndexNewComponent implements OnInit, OnDestroy {

  public mySwiper;
  public lang = 'eng';

  public slider = [
    {
      eng: {
        title: 'Ducatus Coin',
        text: 'Fueled by the revolutionary spirit that created digital money, DUC presents an alternative form of financial exchange - one that is inclusive, unique and offers boundless possibilities.',
        button: 'Download Whitepaper',
        image: 'slide-1.png',
        image_mob: 'slide-1-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      ita: {
        title: 'Ducatus Coin',
        text: 'Alimentato dallo spirito rivoluzionario che ha creato il denaro digitale, DUC presenta una forma alternativa di scambio finanziario, inclusiva, unica e che offre possibilità illimitate.',
        button: 'Scarica il white paper',
        image: 'slide-1.png',
        image_mob: 'slide-1-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      deu: {
        title: 'Ducatus-Münze',
        text: 'Angetrieben von dem revolutionären Geist, der digitales Geld geschaffen hat, präsentiert DUC eine alternative Form des Finanzaustauschs - eine, die inklusiv, einzigartig ist und grenzenlose Möglichkeiten bietet.  ',
        button: 'Whitepaper herunterladen',
        image: 'slide-1.png',
        image_mob: 'slide-1-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      vie: {
        title: 'Đồng xu Ducatus',
        text: 'Được thúc đẩy bởi tinh thần cách mạng đã tạo ra tiền kỹ thuật số, DUC giới thiệu một hình thức trao đổi tài chính thay thế - một hình thức trao đổi bao gồm, độc đáo và cung cấp khả năng vô hạn',
        button: 'Tải xuống Whitepaper',
        image: 'slide-1.png',
        image_mob: 'slide-1-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
    },
    {
      eng: {
        title: 'Cryptocurrency for everyday living',
        text: 'From buying coffee to purchasing a new home, you can now enjoy the practical freedom of cashless. borderless and secure everyday transactions.',
        button: 'Download Whitepaper',
        image: 'slide-2.png',
        image_mob: 'slide-2-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      ita: {
        title: 'Criptovaluta per la vita di tutti i giorni',
        text: 'Dall\'acquisto del caffè all\'acquisto di una nuova casa, ora puoi godere della pratica libertà del senza contanti. transazioni quotidiane senza confini e sicure.',
        button: 'Scarica il white paper',
        image: 'slide-2.png',
        image_mob: 'slide-2-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      deu: {
        title: 'Kryptowährung für den Alltag',
        text: 'Vom Kaffeekauf bis zum Kauf eines neuen Hauses können Sie jetzt die praktische Freiheit des bargeldlosen Geldes genießen. grenzenlose und sichere alltägliche Transaktionen.',
        button: 'Whitepaper herunterladen',
        image: 'slide-2.png',
        image_mob: 'slide-2-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      vie: {
        title: 'Tiền điện tử cho cuộc sống hàng ngày',
        text: 'Từ việc mua cà phê đến mua một ngôi nhà mới, giờ đây bạn có thể tận hưởng sự tự do thiết thực mà không cần tiền mặt. giao dịch hàng ngày không biên giới và an toàn.',
        button: 'Tải xuống Whitepaper',
        image: 'slide-2.png',
        image_mob: 'slide-2-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
    },
    {
      eng: {
        title: 'Championing the cashless economy',
        text: 'With Distribution, Convertibility, and Usability (DUC) at its core, Ducatus Coin possesses traits that are instrumental in building a solid cashless economy for the future.',
        button: 'Download Whitepaper',
        image: 'slide-3.png',
        image_mob: 'slide-3-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      ita: {
        title: 'Difendere l\'economia senza contanti',
        text: 'Con Distribution, Convertibility, and Usability (DUC) al centro, Ducatus Coin possiede caratteristiche che sono fondamentali per costruire una solida economia senza contanti per il futuro.',
        button: 'Scarica il white paper',
        image: 'slide-3.png',
        image_mob: 'slide-3-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      deu: {
        title: 'Für die bargeldlose Wirtschaft eintreten',
        text: 'Mit Distribution, Convertibility und Usability (DUC) im Mittelpunkt verfügt Ducatus Coin über Eigenschaften, die für den Aufbau einer soliden bargeldlosen Wirtschaft für die Zukunft von entscheidender Bedeutung sind.',
        button: 'Whitepaper herunterladen',
        image: 'slide-3.png',
        image_mob: 'slide-3-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      vie: {
        title: 'Thúc đẩy nền kinh tế không tiền mặt',
        text: 'Với cốt lõi là Phân phối, Khả năng chuyển đổi và Khả năng sử dụng (DUC), Ducatus Coin sở hữu những đặc điểm đóng vai trò quan trọng trong việc xây dựng một nền kinh tế không dùng tiền mặt vững chắc cho tương lai.',
        button: 'Tải xuống Whitepaper',
        image: 'slide-3.png',
        image_mob: 'slide-3-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      }
    },
  ];

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
    const defaultLng = (navigator.language || navigator['browserLanguage']).split('-')[0];
    const langToSet = window['jQuery']['cookie']('lng') || (['deu', 'eng', 'vie', 'ita'].includes(defaultLng) ? defaultLng : 'eng');

    this.lang = langToSet;

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });

    setTimeout(() => {
      this.mySwiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }, 1000);

  }

  ngOnDestroy() {
    this.mySwiper = undefined;
  }

}
