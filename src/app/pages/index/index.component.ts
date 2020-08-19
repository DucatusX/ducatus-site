import { Component, OnInit, OnDestroy } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import Swiper from 'swiper';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  public mySwiper;
  public lang = 'eng';

  public slider = [
    {
      eng: {
        title: 'Ducatus Coin',
        text: 'Inspired by the ancient Roman trading coin and fuelled by the revolutionary spirit that created digital money, Ducatus Coin presents an alternative form of financial exchange – one that is inclusive, unique and offers boundless possibilities.',
        button: 'Download Whitepaper',
        image: 'slide-1.png',
        image_mob: 'slide-1-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      ita: {
        title: 'Ducatus Coin',
        text: 'Ispirato all\'antica moneta di scambio romana e alimentato dallo spirito rivoluzionario che ha creato la moneta digitale, Ducatus Coin presenta una forma alternativa di scambio finanziario - inclusiva, unica e che offre possibilità illimitate.',
        button: 'Scarica il white paper',
        image: 'slide-1.png',
        image_mob: 'slide-1-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      deu: {
        title: 'Ducatus Coin',
        text: 'Inspiriert von der antiken römischen Handelsmünze und angetrieben vom revolutionären Geist, der digitales Geld geschaffen hat, bietet Ducatus Coin eine alternative Form des Finanzaustauschs - eine, die inklusiv, einzigartig und grenzenlos möglich ist.',
        button: 'Whitepaper herunterladen',
        image: 'slide-1.png',
        image_mob: 'slide-1-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      vie: {
        title: 'Ducatus Coin',
        text: 'Lấy cảm hứng từ đồng tiền giao dịch La Mã cổ đại và được thúc đẩy bởi tinh thần cách mạng đã tạo ra tiền kỹ thuật số, Ducatus Coin đưa ra một hình thức giao dịch tài chính thay thế - một hình thức bao quát, độc đáo và mang đến khả năng vô biên.',
        button: 'Tải xuống Whitepaper',
        image: 'slide-1.png',
        image_mob: 'slide-1-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
    },
    {
      eng: {
        title: 'Cryptocurrency for everyday living',
        text: 'Enjoy the freedom of cashless, borderless and secure everyday transactions, from buying your morning coffee to purchasing your dream home, now all possible with Ducatus Coin.',
        button: 'Download Whitepaper',
        image: 'slide-2.png',
        image_mob: 'slide-2-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      ita: {
        title: 'Criptovaluta per la vita di tutti i giorni',
        text: 'Goditi la libertà di transazioni quotidiane senza contanti, senza confini e sicure, dall\'acquisto del caffè del mattino all\'acquisto della casa dei tuoi sogni, ora tutto possibile con Ducatus Coin.',
        button: 'Scarica il white paper',
        image: 'slide-2.png',
        image_mob: 'slide-2-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      deu: {
        title: 'Kryptowährung für das tägliche Leben',
        text: 'Genießen Sie die Freiheit bargeldloser, grenzenloser und sicherer Transaktionen im Alltag, vom Kauf Ihres Morgenkaffees bis zum Kauf Ihres Traumhauses, all das jetzt möglich mit Ducatus Coin.',
        button: 'Whitepaper herunterladen',
        image: 'slide-2.png',
        image_mob: 'slide-2-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      vie: {
        title: 'Tiền mã hoá cho cuộc sống hàng ngày',
        text: 'Tận hưởng sự tự do của các giao dịch hàng ngày không tiền mặt, không biên giới và an toàn, từ mua cà phê buổi sáng đến mua ngôi nhà mơ ước của bạn, giờ đây tất cả đều có thể với Ducatus Coin.',
        button: 'Tải xuống Whitepaper',
        image: 'slide-2.png',
        image_mob: 'slide-2-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
    },
    {
      eng: {
        title: 'Championing the crypto-economy',
        text: 'With Distribution, Convertibility and Usability (DUC) at its core, Ducatus Coin encourages the practical use and application of cryptocurrency in real life. These traits are instrumental in helping build a solid crypto-economy for the future.',
        button: 'Download Whitepaper',
        image: 'slide-3.jpg',
        image_mob: 'slide-3-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      ita: {
        title: 'Sostenere l\'economia digitale',
        text: 'Con la distribuzione, la convertibilità e l\'usabilità (DUC) al centro, Ducatus Coin incoraggia l\'uso pratico e l\'applicazione della criptovaluta nella vita quotidiana.  Questi tratti sono fondamentali per aiutare a costruire una solida criptoeconomia per il futuro.',
        button: 'Scarica il white paper',
        image: 'slide-3.jpg',
        image_mob: 'slide-3-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      deu: {
        title: 'Verfechter der digitalen Wirtschaft',
        text: 'Mit Distribution, Convertibility and Usability (DUC) im Mittelpunkt fördert Ducatus Coin die praktische Verwendung und Anwendung von Kryptowährung im realen Leben. Diese Eigenschaften tragen maßgeblich zum Aufbau einer soliden Kryptoökonomie für die Zukunft bei.',
        button: 'Whitepaper herunterladen',
        image: 'slide-3.jpg',
        image_mob: 'slide-3-mob.png',
        file: 'ducatus-coin-white-paper.pdf'
      },
      vie: {
        title: 'Ủng hộ nền kinh tế kỹ thuật số',
        text: 'Với việc phân phối, khả năng chuyển đổi và khả năng sử dụng (DUC) là cốt lõi, Ducatus Coin khuyến khích sử dụng thực tế và ứng dụng tiền mã hoá trong cuộc sống thực. Những đặc điểm này là công cụ giúp xây dựng nền kinh tế tiền mã hoá vững chắc cho tương lai.',
        button: 'Tải xuống Whitepaper',
        image: 'slide-3.jpg',
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
