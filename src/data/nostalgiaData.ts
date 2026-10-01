/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TvMemory,
  CassetteTrack,
  VhsFilm,
  ArcadeGame,
  PolaroidPhoto,
  PhoneQuote,
  TimelineYearData,
  UserMemory,
} from '../types/index.ts';

/**
 * ============================================================================
 * 80'LER VERİ MERKEZİ - DÜZENLEME REHBERİ
 * ============================================================================
 * Bu dosyada yer alan tüm film, müzik, televizyon ve yıl bilgileri merkezi
 * olarak buradan düzenlenebilir.
 * 
 * - Televizyon programları ve çizgi filmleri: `TV_MEMORIES`
 * - Kasetler ve şarkılar: `CASSETTE_TRACKS`
 * - VHS Filmleri ve kategorileri: `VHS_FILMS`
 * - Atari ve Arcade oyunları: `ARCADE_GAMES`
 * - Polaroid fotoğraf hatıraları: `POLAROID_PHOTOS`
 * - Çevirmeli telefon nostalji mesajları: `PHONE_QUOTES`
 * - 1980 - 1989 Yıllık Tarihçe: `TIMELINE_DATA`
 * - Mahalle Bakkalı başlangıç anıları: `INITIAL_MEMORIES`
 * 
 * Dış bağlantılar telifsiz ve güvenli arama adreslerine (YouTube, IMDb, TRT Arşiv)
 * yönlendirilmiştir. Dilerseniz searchUrl alanlarını doğrudan güncelleyebilirsiniz.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. TÜPLÜ TELEVİZYON: EKRAN HATIRALARI
// ----------------------------------------------------------------------------
export const TV_MEMORIES: TvMemory[] = [
  {
    id: 'tv-he-man',
    title: 'He-Man ve Kâinatın Hâkimleri',
    category: 'Çizgi Film',
    years: '1983 – 1988',
    description: 'Eternia krallığı, Gölgelerin Şatosu ve İskeletor\'a karşı mücadele. Kılıcını havaya kaldırıp "Gölgelerin gücü adına! Güç bende artık!" diye bağırmayan 80\'ler çocuğu neredeyse yoktu.',
    trivia: 'Prens Adam korkak kaplanı Cringer\'ı sihirli kılıcıyla Atılgan\'a dönüştürürdü. Bölüm sonlarında çocuklara verilen ahlaki öğütler unutulmazdı.',
    searchUrl: 'https://www.youtube.com/results?search_query=He-Man+Türkçe+dublaj+TRT+nostalji',
    searchLabel: 'YouTube’da Ara & İzle',
  },
  {
    id: 'tv-susam-sokagi',
    title: 'Susam Sokağı (TRT Dönemi)',
    category: 'Çizgi Film',
    years: '1989 – 1990’lar',
    description: 'Edi ile Büdü, Kurabiye Canavarı, Kırpık, Minik Kuş ve mahallenin manavı Tahsin Usta. Çocuklara paylaşmayı, harfleri ve sayıları şarkılarla öğreten altın dönemin başyapıtı.',
    trivia: 'Edi\'nin sürekli Büdü\'nün sabrını zorlaması, Kurabiye Canavarı\'nın çılgın kurabiye yiyişi hafızalara kazınmıştı.',
    searchUrl: 'https://www.youtube.com/results?search_query=Susam+Sokağı+TRT+Edi+Büdü',
    searchLabel: 'YouTube’da Ara & İzle',
  },
  {
    id: 'tv-tsubasa',
    title: 'Kaptan Tsubasa',
    category: 'Çizgi Film',
    years: '1983 – 1986',
    description: 'Uçsuz bucaksız görünen, kaleye koşmanın 3 bölüm sürdüğü futbol sahaları! Tsubasa Ozora, Kojiro Hyuga ve Genzo Wakabayashi\'nin efsanevi kurtarışları.',
    trivia: 'Direkten dönen şutlar havada dakikalarca döner, top duvara saplanır, kartal vuruşları mahalle maçlarında taklit edilirdi.',
    searchUrl: 'https://www.youtube.com/results?search_query=Kaptan+Tsubasa+TRT+nostalji',
    searchLabel: 'YouTube’da Ara & İzle',
  },
  {
    id: 'tv-voltran',
    title: 'Voltran: Evrenin Savunucusu',
    category: 'Çizgi Film',
    years: '1984 – 1988',
    description: 'Beş mekanik aslanın birleşerek efsanevi devi oluşturduğu çizgi film: "Bacaklar, kollar ve baş! Voltran oluşturuldu!"',
    trivia: 'Mahallede oyun oynarken kimin hangi aslan olacağı konusunda kıyasıya kavgalar edilirdi.',
    searchUrl: 'https://www.youtube.com/results?search_query=Voltran+TRT+Türkçe+çizgi+film',
    searchLabel: 'YouTube’da Ara & İzle',
  },
  {
    id: 'tv-perihan-abla',
    title: 'Perihan Abla',
    category: 'Dizi',
    years: '1986 – 1988',
    description: 'Perran Kutman ve Şevket Altuğ\'un unutulmaz rolleriyle Kuzguncuk mahallesinin sıcacık dayanışma, komşuluk ve aşk hikâyesi.',
    trivia: 'Şakir\'in Perihan Abla\'ya duyduğu temiz aşk ve mahalle bakkalından kahvehanesine uzanan samimi komşuluk kültürü 80\'lerin simgesiydi.',
    searchUrl: 'https://www.youtube.com/results?search_query=Perihan+Abla+TRT+nostalji',
    searchLabel: 'YouTube’da Ara & İzle',
  },
  {
    id: 'tv-bizimkiler',
    title: 'Bizimkiler',
    category: 'Dizi',
    years: '1989 – 2002',
    description: '80\'lerin sonunda başlayan ve Türk televizyon tarihinin en uzun soluklu aile dizisi. Kapıcı Cafer, "Buyruuun!", Sabri Bey ve bir apartmanın tüm renkleri.',
    trivia: 'Pazar akşamları banyodan sonra sobada kurutulan saçlar eşliğinde ailecek izlenen Türk aile klasiğiydi.',
    searchUrl: 'https://www.youtube.com/results?search_query=Bizimkiler+1.+Bölüm+TRT',
    searchLabel: 'YouTube’da Ara & İzle',
  },
  {
    id: 'tv-kara-simsek',
    title: 'Kara Şimşek (Knight Rider)',
    category: 'Dizi',
    years: '1982 – 1986',
    description: 'Michael Knight ve konuşan, kurşun geçirmez, kırmızı burnunu gezdiren yapay zekâlı efsanevi siyah Pontiac Trans Am otomobili KITT.',
    trivia: 'Michael\'ın kolundaki saatle "KITT, beni buradan al!" demesi o zamanlar teknolojinin zirvesi olarak görülürdü.',
    searchUrl: 'https://www.youtube.com/results?search_query=Kara+Şimşek+KITT+TRT+nostalji',
    searchLabel: 'YouTube’da Ara & İzle',
  },
  {
    id: 'tv-baris-manco',
    title: 'Barış Manço ile 7’den 77’ye',
    category: 'Program',
    years: '1988 – 1998',
    description: 'Pazar sabahları ekrana kilitlenilen muazzam kültür hazinesi. "Adam Olacak Çocuk", "Dönence", dünya seyahatleri ve süt içme nasihatleri.',
    trivia: '"Dişler fırçalanacak, ıspanak yenecek, büyüklerin sözü dinlenecek!" Barış Abi\'nin 10 puan, 10 puan, 10 puan! dağıtışı hafızalarda.',
    searchUrl: 'https://www.youtube.com/results?search_query=Barış+Manço+7den+77ye+Adam+Olacak+Çocuk',
    searchLabel: 'YouTube’da Ara & İzle',
  },
  {
    id: 'tv-uzay-yolu',
    title: 'Uzay Yolu (Star Trek)',
    category: 'Dizi',
    years: '1980’ler TRT Gösterimleri',
    description: 'Kaptan Kirk, sivri kulaklı mantık timsali Mister Spock ve Atılgan (Enterprise) gemisinin bilinmeyene doğru yolculuğu: "Işınla bizi Scotty!"',
    trivia: 'Spock\'ın meşhur Vulcan selamı ve duygulardan arınmış mantık yürütmeleri Türk gençliğinin zihnine kazınmıştı.',
    searchUrl: 'https://www.youtube.com/results?search_query=Star+Trek+Uzay+Yolu+TRT+nostalji',
    searchLabel: 'YouTube’da Ara & İzle',
  },
  {
    id: 'tv-ziyaretciler',
    title: 'Ziyaretçiler (V)',
    category: 'Dizi',
    years: '1983 – 1985',
    description: 'Kırmızı tulumlarıyla dost gibi gelip aslında insan yüzü maskesi takan fare yiyen sürüngen uzaylılar! 80\'ler çocuklarının en büyük kabusuydu.',
    trivia: 'Diana\'nın canlı fareyi ağzına atıp yuttuğu sahne Türk televizyonunda ertesi gün okullarda konuşulan tek konuydu.',
    searchUrl: 'https://www.youtube.com/results?search_query=Ziyaretçiler+V+dizisi+TRT+nostalji',
    searchLabel: 'YouTube’da Ara & İzle',
  },
  {
    id: 'tv-trt-kapanis',
    title: 'TRT Renkli Test Kartı ve İstiklal Marşı Kapanışı',
    category: 'TRT Klasiği',
    years: '1980 – 1989',
    description: 'Gece saat 24.00 civarında İstiklal Marşı çalar, ardından ekrana Philips PM5544 renkli test kartı gelir ve cızırtılı bir frekans sesiyle yayın biterdi.',
    trivia: 'Televizyonun sabaha kadar açık kalıp "karıncalanması" ve çıkardığı beyaz gürültü evin sessizliğine eşlik ederdi.',
    searchUrl: 'https://www.youtube.com/results?search_query=TRT+1980ler+kapanış+test+kartı+nostalji',
    searchLabel: 'YouTube’da Ara & İzle',
  },
];

// ----------------------------------------------------------------------------
// 2. KASETÇALAR: KASET RAFI VE MÜZİK
// ----------------------------------------------------------------------------
export const CASSETTE_TRACKS: CassetteTrack[] = [
  // Türkçe Pop
  {
    id: 'cas-sezen',
    title: 'Sen Ağlama',
    artist: 'Sezen Aksu',
    album: 'Sen Ağlama',
    year: 1984,
    category: 'turkce-pop',
    duration: '5:42',
    labelColor: '#ec4899', // Pink
    searchUrl: 'https://www.youtube.com/results?search_query=Sezen+Aksu+Sen+Ağlama+1984',
  },
  {
    id: 'cas-mfo',
    title: 'Ele Güne Karşı',
    artist: 'MFÖ (Mazhar Fuat Özkan)',
    album: 'Ele Güne Karşı Yapayalnız',
    year: 1984,
    category: 'turkce-pop',
    duration: '3:15',
    labelColor: '#06b6d4', // Cyan
    searchUrl: 'https://www.youtube.com/results?search_query=MFÖ+Ele+Güne+Karşı+1984',
  },
  {
    id: 'cas-nilufer',
    title: 'Esmer Günler',
    artist: 'Nilüfer',
    album: 'Esmer Günler',
    year: 1988,
    category: 'turkce-pop',
    duration: '4:10',
    labelColor: '#8b5cf6', // Purple
    searchUrl: 'https://www.youtube.com/results?search_query=Nilüfer+Esmer+Günler+1988',
  },
  {
    id: 'cas-kayahan',
    title: 'Geceler',
    artist: 'Kayahan',
    album: 'Geceler & Yağmur',
    year: 1988,
    category: 'turkce-pop',
    duration: '3:50',
    labelColor: '#f59e0b', // Amber
    searchUrl: 'https://www.youtube.com/results?search_query=Kayahan+Geceler+nostalji',
  },

  // Arabesk
  {
    id: 'cas-muslum',
    title: 'Küskünüm',
    artist: 'Müslüm Gürses',
    album: 'Küskünüm',
    year: 1986,
    category: 'arabesk',
    duration: '6:12',
    labelColor: '#ef4444', // Red
    searchUrl: 'https://www.youtube.com/results?search_query=Müslüm+Gürses+Küskünüm+1986',
  },
  {
    id: 'cas-ferdi',
    title: 'Yuvasız Kuşlar',
    artist: 'Ferdi Tayfur',
    album: 'Yuvasız Kuşlar',
    year: 1980,
    category: 'arabesk',
    duration: '4:45',
    labelColor: '#b45309', // Brown amber
    searchUrl: 'https://www.youtube.com/results?search_query=Ferdi+Tayfur+Yuvasız+Kuşlar+1980',
  },
  {
    id: 'cas-orhan',
    title: 'Leyla ile Mecnun',
    artist: 'Orhan Gencebay',
    album: 'Leyla ile Mecnun',
    year: 1981,
    category: 'arabesk',
    duration: '5:30',
    labelColor: '#dc2626',
    searchUrl: 'https://www.youtube.com/results?search_query=Orhan+Gencebay+Leyla+ile+Mecnun+1981',
  },
  {
    id: 'cas-bergen',
    title: 'Acıların Kadını',
    artist: 'Bergen',
    album: 'Acıların Kadını',
    year: 1986,
    category: 'arabesk',
    duration: '4:20',
    labelColor: '#e11d48',
    searchUrl: 'https://www.youtube.com/results?search_query=Bergen+Acıların+Kadını+1986',
  },

  // Rock / Anadolu Rock
  {
    id: 'cas-baris',
    title: 'Dönence',
    artist: 'Barış Manço & Kurtalan Ekspres',
    album: 'Sözüm Meclisten Dışarı',
    year: 1981,
    category: 'rock',
    duration: '6:07',
    labelColor: '#10b981', // Emerald
    searchUrl: 'https://www.youtube.com/results?search_query=Barış+Manço+Dönence+1981',
  },
  {
    id: 'cas-erkin',
    title: 'Çöpçüler',
    artist: 'Erkin Koray',
    album: 'Ceylan',
    year: 1985,
    category: 'rock',
    duration: '4:15',
    labelColor: '#14b8a6', // Teal
    searchUrl: 'https://www.youtube.com/results?search_query=Erkin+Koray+Çöpçüler+1985',
  },
  {
    id: 'cas-cem',
    title: 'Tamirci Çırağı',
    artist: 'Cem Karaca',
    album: 'Yoksulluk Kader Olamaz',
    year: 1980,
    category: 'rock',
    duration: '5:02',
    labelColor: '#6366f1', // Indigo
    searchUrl: 'https://www.youtube.com/results?search_query=Cem+Karaca+Tamirci+Çırağı',
  },

  // Yabancı Hit
  {
    id: 'cas-mj',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    year: 1982,
    category: 'yabanci',
    duration: '4:54',
    labelColor: '#3b82f6', // Blue
    searchUrl: 'https://www.youtube.com/results?search_query=Michael+Jackson+Billie+Jean+Official',
  },
  {
    id: 'cas-moderntalking',
    title: 'Cheri Cheri Lady',
    artist: 'Modern Talking',
    album: 'Let\'s Talk About Love',
    year: 1985,
    category: 'yabanci',
    duration: '3:45',
    labelColor: '#a855f7',
    searchUrl: 'https://www.youtube.com/results?search_query=Modern+Talking+Cheri+Cheri+Lady+1985',
  },
  {
    id: 'cas-aha',
    title: 'Take On Me',
    artist: 'A-ha',
    album: 'Hunting High and Low',
    year: 1985,
    category: 'yabanci',
    duration: '3:48',
    labelColor: '#0ea5e9',
    searchUrl: 'https://www.youtube.com/results?search_query=A-ha+Take+On+Me+Official+Video',
  },
  {
    id: 'cas-europe',
    title: 'The Final Countdown',
    artist: 'Europe',
    album: 'The Final Countdown',
    year: 1986,
    category: 'yabanci',
    duration: '5:09',
    labelColor: '#f97316',
    searchUrl: 'https://www.youtube.com/results?search_query=Europe+The+Final+Countdown+Official',
  },

  // Çocukluk Şarkıları
  {
    id: 'cas-arkadasim-esek',
    title: 'Arkadaşım Eşek',
    artist: 'Barış Manço',
    album: 'Sözüm Meclisten Dışarı',
    year: 1981,
    category: 'cocukluk',
    duration: '3:10',
    labelColor: '#84cc16', // Lime
    searchUrl: 'https://www.youtube.com/results?search_query=Barış+Manço+Arkadaşım+Eşek',
  },
  {
    id: 'cas-susam-sarki',
    title: 'Gün Güneşli İnsanlar Neşeli',
    artist: 'Susam Sokağı Korosu',
    album: 'TRT Çocuk Kuşağı',
    year: 1989,
    category: 'cocukluk',
    duration: '2:15',
    labelColor: '#facc15',
    searchUrl: 'https://www.youtube.com/results?search_query=Susam+Sokağı+Gün+Güneşli+İnsanlar+Neşeli',
  },
];

// ----------------------------------------------------------------------------
// 3. VHS KASETLİĞİ: FİLM GECESİ
// ----------------------------------------------------------------------------
export const VHS_FILMS: VhsFilm[] = [
  {
    id: 'vhs-bttf',
    title: 'Geleceğe Dönüş',
    originalTitle: 'Back to the Future',
    year: 1985,
    director: 'Robert Zemeckis',
    category: 'bilim-kurgu',
    badge: '1.21 GIGAWATTS',
    synopsis: 'Marty McFly ve çılgın bilim insanı Dr. Emmett Brown\'un DeLorean zaman makinesiyle 1955 yılına uzanan efsanevi zaman yolculuğu.',
    searchUrl: 'https://www.imdb.com/title/tt0088763/',
  },
  {
    id: 'vhs-et',
    title: 'E.T. the Extra-Terrestrial',
    originalTitle: 'E.T. the Extra-Terrestrial',
    year: 1982,
    director: 'Steven Spielberg',
    category: 'aile',
    badge: 'PHONE HOME',
    synopsis: 'Dünyada unutulan sevimli bir uzaylı ile Elliott adındaki küçük çocuğun gökyüzünde bisikletle uçtuğu unutulmaz dostluk.',
    searchUrl: 'https://www.imdb.com/title/tt0083866/',
  },
  {
    id: 'vhs-rocky4',
    title: 'Rocky IV',
    originalTitle: 'Rocky IV',
    year: 1985,
    director: 'Sylvester Stallone',
    category: 'aksiyon',
    badge: 'NO PAIN',
    synopsis: 'Apollo Creed\'in intikamı için Sibirya\'nın karlarında odun kırıp dağa tırmanarak dev Sovyet boksör Ivan Drago\'ya hazırlanan Rocky Balboa.',
    searchUrl: 'https://www.imdb.com/title/tt0089927/',
  },
  {
    id: 'vhs-ghostbusters',
    title: 'Hayalet Avcıları',
    originalTitle: 'Ghostbusters',
    year: 1984,
    director: 'Ivan Reitman',
    category: 'komedi',
    badge: 'WHO YA GONNA CALL?',
    synopsis: 'New York sokaklarını basan hayaletleri proton paketleriyle yakalayan üç çılgın parapsikolog ve dev Hatmi Adam!',
    searchUrl: 'https://www.imdb.com/title/tt0087332/',
  },
  {
    id: 'vhs-karate-kid',
    title: 'Karate Kid',
    originalTitle: 'The Karate Kid',
    year: 1984,
    director: 'John G. Avildsen',
    category: 'macera',
    badge: 'WAX ON, WAX OFF',
    synopsis: 'Daniel LaRusso\'ya çit boyatarak ve araba cilalatarak sabrı ve kung fu/karate sanatını öğreten efsanevi Bay Miyagi ve turnuva şampiyonluğu.',
    searchUrl: 'https://www.imdb.com/title/tt0087538/',
  },
  {
    id: 'vhs-indiana-jones',
    title: 'Kutsal Hazine Avcıları',
    originalTitle: 'Raiders of the Lost Ark',
    year: 1981,
    director: 'Steven Spielberg',
    category: 'macera',
    badge: 'ARCHAEOLOGY HERO',
    synopsis: 'Fötr şapkası, deri ceketi ve kırbacıyla kaybolan Ahit Sandığı\'nın peşindeki efsanevi arkeolog Indiana Jones.',
    searchUrl: 'https://www.imdb.com/title/tt0082971/',
  },
  {
    id: 'vhs-terminator',
    title: 'Terminatör',
    originalTitle: 'The Terminator',
    year: 1984,
    director: 'James Cameron',
    category: 'aksiyon',
    badge: 'I\'LL BE BACK',
    synopsis: 'Gelecekteki direniş lideri John Connor\'ın annesini yok etmek üzere 1984 yılına gönderilen acımasız sibernetik suikastçı T-800.',
    searchUrl: 'https://www.imdb.com/title/tt0088247/',
  },
  {
    id: 'vhs-sekerpare',
    title: 'Şekerpare',
    originalTitle: 'Şekerpare (Yeşilçam)',
    year: 1983,
    director: 'Atıf Yılmaz',
    category: 'yesilcam',
    badge: 'YEŞİLÇAM KLASİĞİ',
    synopsis: 'Şener Şen (Ziver Bey) ve İlyas Salman\'ın (Cumali) Galata zaptiyeleri ve tatlı komedisiyle 80\'ler VHS kiralama dükkânlarının en gözde yerli kaseti.',
    searchUrl: 'https://www.imdb.com/title/tt0263991/',
  },
  {
    id: 'vhs-davaro',
    title: 'Davaro',
    originalTitle: 'Davaro (Yeşilçam)',
    year: 1981,
    director: 'Kartal Tibet',
    category: 'yesilcam',
    badge: 'KAN DAVASI KOMEDİSİ',
    synopsis: 'Kemal Sunal (Memo) ve Şener Şen\'in (Sülo) sahte mezar ve hortlak numaralarıyla kan davasını alt üst ettiği efsanevi Türk komedisi.',
    searchUrl: 'https://www.imdb.com/title/tt0263255/',
  },
  {
    id: 'vhs-tosun-pasa',
    title: 'Tosun Paşa (80’ler Kuşağı)',
    originalTitle: 'Tosun Paşa',
    year: 1980,
    director: 'Kartal Tibet',
    category: 'yesilcam',
    badge: 'HAKİKİ TOSUN PAŞA',
    synopsis: 'Tellioğulları ve Seferoğulları\'nın Yeşil Vadi mücadelesi ve sahte Tosun Paşa Şaban\'ın "Ben hakiki Tosun Paşayım!" çıkışı.',
    searchUrl: 'https://www.imdb.com/title/tt0253828/',
  },
];

// ----------------------------------------------------------------------------
// 4. ATARİ & PİKSEL DÜNYASI
// ----------------------------------------------------------------------------
export const ARCADE_GAMES: ArcadeGame[] = [
  {
    id: 'arc-pacman',
    name: 'Pac-Man',
    releaseYear: 1980,
    publisher: 'Namco',
    genre: 'Maze / Arcade',
    description: 'Labirentte sarı noktaları ve meyveleri toplayıp Blinky, Pinky, Inky ve Clyde hayaletlerinden kaçtığımız jeton yutucu efsane.',
    tagline: 'WAKKA WAKKA WAKKA!',
  },
  {
    id: 'arc-tetris',
    name: 'Tetris',
    releaseYear: 1984,
    publisher: 'Alexey Pajitnov',
    genre: 'Bulmaca',
    description: 'Düşen geometrik blokları sıra doldurarak patlatma sanatı. Kulaklardan hiç silinmeyen Korobeiniki melodisi!',
    tagline: '4 SATIR TEK HAMLEDE!',
  },
  {
    id: 'arc-space-invaders',
    name: 'Space Invaders',
    releaseYear: 1980,
    publisher: 'Taito / Atari',
    genre: 'Shoot ’em up',
    description: 'Gökyüzünden yavaşça inip hızlanan piksel uzaylı dalgalarını barikatların ardından lazerle vurma mücadelesi.',
    tagline: 'DÜNYAYI SAVUN!',
  },
  {
    id: 'arc-mario',
    name: 'Super Mario Bros.',
    releaseYear: 1985,
    publisher: 'Nintendo',
    genre: 'Platform',
    description: 'Prenses Peach\'i kurtarmak için mantarları yiyip borulardan geçen İtalyan muslukçu kardeşler Mario ve Luigi.',
    tagline: 'THANK YOU MARIO, BUT OUR PRINCESS IS IN ANOTHER CASTLE!',
  },
  {
    id: 'arc-duck-hunt',
    name: 'Duck Hunt',
    releaseYear: 1984,
    publisher: 'Nintendo',
    genre: 'Işık Tabancası (Zapper)',
    description: 'Tüplü televizyona doğrultulan Zapper tabancasıyla uçan ördekleri vurma oyunu. Iskalayınca çalıların arasından kıkırdayan meşhur köpek!',
    tagline: 'GÜLEN KÖPEĞE DİKKAT!',
  },
  {
    id: 'arc-galaga',
    name: 'Galaga',
    releaseYear: 1981,
    publisher: 'Namco',
    genre: 'Space Shooter',
    description: 'Çift gemi kilidi açmak için uzaylı traktör ışınına bilinçli olarak yakalanıp sonra kurtarma taktiği.',
    tagline: 'FIGHTER CAPTURED!',
  },
];

// ----------------------------------------------------------------------------
// 5. POLAROİD FOTOĞRAF ALBÜMÜ
// ----------------------------------------------------------------------------
export const POLAROID_PHOTOS: PolaroidPhoto[] = [
  {
    id: 'pol-1',
    title: 'Mahallede Saklambaç ve İstop',
    dateLabel: 'Temmuz 1984',
    location: 'Gültepe Mahallesi, Çıkmaz Sokak',
    caption: 'Dizlerimizde kabuk bağlamış yaralar, akşam ezanı okunana kadar süren çanak çömlek patladı sesleri.',
    handwrittenNote: '“Hava kararmadan hemen önce son tur saklambaç...”',
    category: 'Sokak & Oyun',
    aspectColor: 'from-amber-600/30 to-orange-900/30',
  },
  {
    id: 'pol-2',
    title: 'Bakkal Mehmet Amca ve Leblebi Tozu',
    dateLabel: 'Eylül 1986',
    location: 'Huzur Bakkaliyesi',
    caption: 'Pipetiyle birlikte çekilen, ilk nefeste insanı öksürten leblebi tozu, cam şişe Elvan gazoz ve meybuz.',
    handwrittenNote: '“Gazoz kapağını taşla ezip koleksiyon yapardık.”',
    category: 'Mahalle Bakkalı',
    aspectColor: 'from-pink-600/30 to-purple-900/30',
  },
  {
    id: 'pol-3',
    title: 'Kırmızı Deri İlkokul Çantası ve Siyah Önlük',
    dateLabel: 'Ekim 1983',
    location: 'Cumhuriyet İlkokulu',
    caption: 'Kola kolalı beyaz dantel yaka, siyah önlük ve sırtta taşınan köşeli kırmızı deri okul çantası.',
    handwrittenNote: '“Beslenme çantasında haşlanmış yumurta ve üçgen peynir.”',
    category: 'Okul Günleri',
    aspectColor: 'from-blue-600/30 to-indigo-900/30',
  },
  {
    id: 'pol-4',
    title: 'Kasetçide Karışık Kaset Doldurtmak',
    dateLabel: 'Mayıs 1987',
    location: 'Melodi Plak & Kaset Evi',
    caption: 'Kareli defter yaprağına elle yazılmış şarkı listesini uzatıp 60’lık veya 90’lık boş kasete çektirmek.',
    handwrittenNote: '“Raks veya Basf kaset tercihimizdi, kurşun kalemle sarardık.”',
    category: 'Müzik Tutkusu',
    aspectColor: 'from-cyan-600/30 to-blue-900/30',
  },
  {
    id: 'pol-5',
    title: 'Yazlık Akşamları Balkonda Çay & Çekirdek',
    dateLabel: 'Ağustos 1985',
    location: 'Erdek / Ayvalık Sahili',
    caption: 'Mavi plastik sandalyeler, çinko demlikte demlenen tavşan kanı çay ve çıt çıt çıtlayan siyah ayçiçeği.',
    handwrittenNote: '“Radyoda hafif müzik ve komşuların sohbet kahkahaları.”',
    category: 'Yaz Hatırası',
    aspectColor: 'from-yellow-600/30 to-amber-900/30',
  },
  {
    id: 'pol-6',
    title: 'Pazar Banyosu ve Parliament Sinema Kulübü',
    dateLabel: 'Kasım 1988',
    location: 'Bizim Salon / Soba Başı',
    caption: 'Güğümde ısıtılan suyla leğende yıkanış, sobada portakal kabukları kokusu ve akşam TV karşısı mayışması.',
    handwrittenNote: '“Pazar akşamı hüznü ve pazartesi okul telaşı...”',
    category: 'Ev Halleri',
    aspectColor: 'from-emerald-600/30 to-teal-900/30',
  },
  {
    id: 'pol-7',
    title: 'Dantelli Sehpa ve Kristal Küllük',
    dateLabel: 'Nisan 1982',
    location: 'Misafir Odası',
    caption: 'Yılda iki kez kapısı bayramda açılan misafir odası, kadife koltuklar, dantel örtülü vitrin ve ağır kristal küllük.',
    handwrittenNote: '“Vitrine ancak annemiz izin verirse dokunabilirdik.”',
    category: 'Ev Kültürü',
    aspectColor: 'from-rose-600/30 to-pink-900/30',
  },
  {
    id: 'pol-8',
    title: 'Çift Kale Plastik Top Maçı',
    dateLabel: 'Haziran 1989',
    location: 'Boş Arsa',
    caption: 'İki taş arası kale, patlayan plastik topu bıçakla kesip diğer topun içine geçirerek yapılan "çift katlı" sağlam top.',
    handwrittenNote: '“Top sahibi oyundan çıkarsa maç biterdi!”',
    category: 'Mahalle Maçı',
    aspectColor: 'from-violet-600/30 to-fuchsia-900/30',
  },
];

// ----------------------------------------------------------------------------
// 6. ESKİ ÇEVİRMELİ TELEFON: 80'LERDEN MESAJ VAR
// ----------------------------------------------------------------------------
export const PHONE_QUOTES: PhoneQuote[] = [
  {
    id: 1,
    text: '“Akşam ezanı okunduğunda sokaktan eve dönme vakti geldi demektir.”',
    context: 'Mahallenin yazılı olmayan kuralı',
  },
  {
    id: 2,
    text: '“Bakkaldan bir cam şişe gazoz, yanında leblebi tozu ve patlayan şeker aldın mı dünyalar senindi.”',
    context: 'Çocukluk ikramiyesi',
  },
  {
    id: 3,
    text: '“Kasetin A yüzü bitti... Kurşun kalemi dişliye sokup B yüzüne geri sar bakalım!”',
    context: 'Pilden tasarruf yöntemi',
  },
  {
    id: 4,
    text: '“Sokak lambaları sarı sarı yanınca oyun biterdi, anneler balkonlardan adımızı haykırırdı.”',
    context: 'Günün son düdüğü',
  },
  {
    id: 5,
    text: '“Anten ayarı bozulunca balkondaki çocuğa ‘Oldu muuu?’ diye bağırmak milli refleksimizdi.”',
    context: 'TRT 1 canlı yayın operasyonu',
  },
  {
    id: 6,
    text: '“Tüplü televizyonun üzerindeki danteli hafif kenara sıyırmadan düğmeyi çeviremezdin.”',
    context: 'Salon estetiği kanunu',
  },
  {
    id: 7,
    text: '“Telefon çaldığında kimin aradığını bilmeden açmanın o heyecanı ve nezaketi başkaydı.”',
    context: 'Çevirmeli PTT santrali',
  },
  {
    id: 8,
    text: '“Pazar akşamı leğende banyo yapılıp sobada portakal kabuğu kokusuyla yarınki derslere çalışılırdı.”',
    context: 'Pazar akşamı klasiği',
  },
  {
    id: 9,
    text: '“Plastik top patlayınca atılmazdı; ortadan kesilip sağlam topun içine geçirilirdi.”',
    context: 'Mahalle mucitliği',
  },
  {
    id: 10,
    text: '“Atari kasetini takmadan önce yuvasına var gücünle üflemen gerekirdi, yoksa görüntü karlı gelirdi!”',
    context: 'Analog tamir bilimi',
  },
  {
    id: 11,
    text: '“Tek kanallı günlerde İstiklal Marşı çaldıktan sonra çıkan o renkli test kartı gecenin bekçisiydi.”',
    context: 'Gece kapanışı',
  },
  {
    id: 12,
    text: '“Karışık kaset doldurturken en sevdiğin şarkı kasetin sonuna denk gelip yarıda kesilirse canın yanardı.”',
    context: 'Kaset dükkânı trajedisi',
  },
];

// ----------------------------------------------------------------------------
// 7. DUVAR TAKVİMİ: 1980 - 1989 YILLIK TARİHÇE
// ----------------------------------------------------------------------------
export const TIMELINE_DATA: TimelineYearData[] = [
  {
    year: 1980,
    theme: 'Yeni Onyılın Başlangıcı ve Zorlu Dönemeç',
    accentColor: '#38bdf8',
    tech: 'Sony Walkman dünyaya yayılmaya başladı; Pac-Man ilk kez arcade salonlarında belirdi.',
    cinema: 'Yıldız Savaşları: İmparatorluk Yeniden Doğuyor, Tosun Paşa televizyon ekranlarında.',
    tv: 'Türkiye’de tek kanal TRT siyah-beyaz yayın dönemi; Dallas dizisi Türkiye’de ilk kez gösterimde.',
    music: 'Ferdi Tayfur "Yuvasız Kuşlar", Orhan Gencebay, John Lennon’ın zamansız kaybı.',
    dailyLife: 'Kuyruklar, gaz lambaları, sokakta seksek ve yakartop oynayan çocuklar.',
    keyHighlight: 'Türkiye’de 12 Eylül dönemi ve televizyonda Dallas rüzgârı.',
  },
  {
    year: 1981,
    theme: 'Anadolu Rock’ın Zirvesi ve Renkli TV Denemeleri',
    accentColor: '#4ade80',
    tech: 'IBM ilk kişisel bilgisayarını (IBM 5150 PC) tanıttı; MTV Amerika’da yayına başladı.',
    cinema: 'Raiders of the Lost Ark (Indiana Jones), Şerif Gören ve Yılmaz Güney’den Yol çekimleri.',
    tv: 'TRT yılbaşı gecesinde ilk kez kısmi renkli yayın denemesine geçti; ekran rengarenk oldu.',
    music: 'Barış Manço "Dönence" ve "Arkadaşım Eşek" albümüyle tüm Türkiye’nin kalbini fethetti.',
    dailyLife: 'Renkli televizyona geçiş hazırlıkları, vitrinlere konan ilk renkli cihazlar.',
    keyHighlight: 'TRT’nin ilk renkli yılbaşı yayını ve Barış Manço’nun "Dönence"si.',
  },
  {
    year: 1982,
    theme: 'Thriller Çılgınlığı ve E.T. Mucizesi',
    accentColor: '#ec4899',
    tech: 'Commodore 64 satışa sunuldu; tarihin en çok satan kişisel ev bilgisayarı oldu.',
    cinema: 'Steven Spielberg imzalı E.T. the Extra-Terrestrial gişe rekorlarını altüst etti.',
    tv: 'Kara Şimşek (Knight Rider) ABD’de yayına başladı; TRT’de yabancı diziler popülerleşti.',
    music: 'Michael Jackson "Thriller" albümünü çıkardı; ay yürüyüşü (Moonwalk) doğdu.',
    dailyLife: 'Evlerde kasetçalar furyası, dantel kaplı sehpaların altına sığan ses kasetleri.',
    keyHighlight: 'Michael Jackson Thriller çağı ve Commodore 64 bilgisayarları.',
  },
  {
    year: 1983,
    theme: 'Gölgelerin Gücü Adına: Çizgi Film Rönesansı',
    accentColor: '#f59e0b',
    tech: 'İlk ticari cep telefonu Motorola DynaTAC 8000X ("Tuğla telefon") piyasaya sürüldü.',
    cinema: 'Star Wars: Return of the Jedi, Türk sinemasında Şekerpare ve Kılıbık.',
    tv: 'He-Man ve Kâinatın Hâkimleri ekranlarda; TRT’de Cumartesi sabahı çizgi film kuşağı bayram ettirdi.',
    music: 'Çetin Alp "Opera" ile Eurovision’da yarıştı; pop ve arabesk kasetleri rekor kırdı.',
    dailyLife: 'Genel seçimlerle Turgut Özal dönemi başladı; piyasaya ithal mallar girmeye başladı.',
    keyHighlight: 'He-Man efsanesinin başlaması ve Türkiye’de serbest piyasaya geçiş adımları.',
  },
  {
    year: 1984,
    theme: 'Renkli TV Çağı Resmen Başladı',
    accentColor: '#a855f7',
    tech: 'Apple ilk Macintosh bilgisayarı meşhur "1984" reklamıyla tanıttı; Tetris oyunu kodlandı.',
    cinema: 'Terminator, Ghostbusters (Hayalet Avcıları), Karate Kid ve Beverly Hills Cop.',
    tv: 'TRT 15 Mart 1984’te tamamen renkli yayına geçti! Tüplü televizyonlara renk hücumu.',
    music: 'Sezen Aksu "Sen Ağlama" albümüyle Türkçe pop müziğin seyrini değiştirdi; MFÖ "Ele Güne Karşı".',
    dailyLife: 'Taksitli renkli televizyon kuyrukları; mahallede renkli TV olan eve toplanan komşular.',
    keyHighlight: 'TRT tamamen renkli yayına geçti, Sezen Aksu ve MFÖ fırtınası koptu.',
  },
  {
    year: 1985,
    theme: 'Geleceğe Dönüş ve Walkman Salgını',
    accentColor: '#06b6d4',
    tech: 'Nintendo Entertainment System (NES) Batı\'da çıktı; Windows 1.0 piyasaya sunuldu.',
    cinema: 'Geleceğe Dönüş (Back to the Future), Rocky IV, Rambo: İlk Kan 2.',
    tv: 'TRT’de Voltran ve Kaptan Tsubasa rüzgârı; mahallede aslanlara bölünme tartışmaları.',
    music: 'Live Aid konseri düzenlendi; Modern Talking "You\'re My Heart, You\'re My Soul", Erkin Koray "Çöpçüler".',
    dailyLife: 'Kulaklıkla kaset dinleme çılgınlığı, köşe başlarında video kaset kiralama kulüpleri.',
    keyHighlight: 'Geleceğe Dönüş sinemalarda, VHS video kulüpleri her semtte açıldı.',
  },
  {
    year: 1986,
    theme: 'İkinci Kanal TRT 2 ve Kuzguncuk Esintisi',
    accentColor: '#ef4444',
    tech: 'Çernobil felaketi yaşandı; ilk bilgisayar virüslerinden Brain yayıldı.',
    cinema: 'Top Gun (Tom Cruise), Platoon, Aliens, Yeşilçam’da Ah Belinda ve Değirmen.',
    tv: 'TRT 2 resmen yayına başladı; Türkiye iki kanallı televizyon devrine adım attı. Perihan Abla başladı.',
    music: 'Müslüm Gürses "Küskünüm" ile milyonlar sattı; Bergen "Acıların Kadını" fırtınası.',
    dailyLife: 'Kuzguncuk sokaklarında çekilen Perihan Abla’nın sıcak komşuluk ortamı ekranlara kilitledi.',
    keyHighlight: 'TRT 2 açıldı, Perihan Abla dizisi başladı, Top Gun vizyona girdi.',
  },
  {
    year: 1987,
    theme: 'Karışık Kasetler ve Cep Herkülü',
    accentColor: '#10b981',
    tech: 'Amiga 500 satışa çıktı, efsanevi ev oyunları ve grafik tasarım devrimi başladı.',
    cinema: 'Predator, Robocop, Wall Street; Türk sinemasında Muhsin Bey (Şener Şen, Uğur Yücel).',
    tv: 'Uzay Yolu: Yeni Nesil başladı; TRT akşam bültenlerinde Naim Süleymanoğlu haberleri coşkusu.',
    music: 'Michael Jackson "Bad", Whitney Houston, Nilüfer ve Kayahan şarkıları radyolarda.',
    dailyLife: 'Teyp kasetleri, Raks marka boş kasetler, Walkman pili bittiğinde kalemle elle sarma adeti.',
    keyHighlight: 'Naim Süleymanoğlu dünya rekorları kırdı, Amiga 500 bilgisayarları eve girdi.',
  },
  {
    year: 1988,
    theme: 'Barış Manço ile 7’den 77’ye Başladı',
    accentColor: '#f97316',
    tech: 'İlk kıtalararası fiber optik kablo TAT-8 döşendi; el konsolu Game Boy prototipleri üretildi.',
    cinema: 'Zor Ölüm (Die Hard), Yağmur Adam (Rain Man), Who Framed Roger Rabbit.',
    tv: 'Barış Manço ile "7’den 77’ye" TRT 1’de ilk bölümüyle yayına girdi; Pazar sabahları şölene döndü.',
    music: 'Kayahan "Geceler", Nilüfer "Esmer Günler", Sezen Aksu "Sezen Aksu\'88".',
    dailyLife: 'Pazar sabahı kahvaltısı, "Adam Olacak Çocuk" izlerken tabağındaki ıspanağı bitiren çocuklar.',
    keyHighlight: 'Barış Manço ile 7’den 77’ye başladı; Seul Olimpiyatları’nda tarihi altın madalyalar.',
  },
  {
    year: 1989,
    theme: 'Berlin Duvarı’nın Yıkılışı ve Bizimkiler Çağı',
    accentColor: '#e11d48',
    tech: 'Tim Berners-Lee World Wide Web (WWW) önerisini sundu; Game Boy dünyayı sardı.',
    cinema: 'Batman (Tim Burton & Michael Keaton), Indiana Jones ve Son Haçlı Seferi, Ölü Ozanlar Derneği.',
    tv: 'Bizimkiler dizisi yayına başladı (13 yıl sürecek efsane); TRT 3 ve TRT GAP yayına geçti; Susam Sokağı başladı.',
    music: 'Madonna "Like a Prayer", Ajda Pekkan, Aşkın Nur Yengi çıkış hazırlıkları.',
    dailyLife: 'Berlin Duvarı yıkıldı, Soğuk Savaş bitti; 90’ların arifesinde umut dolu renkli bir dünya.',
    keyHighlight: 'Berlin Duvarı yıkıldı; Bizimkiler dizisi ve Susam Sokağı Türk televizyonunda başladı.',
  },
];

// ----------------------------------------------------------------------------
// 8. MAHALLE HATIRALARI (BAKKAL KUTUSU) BAŞLANGIÇ ANILARI
// ----------------------------------------------------------------------------
export const INITIAL_MEMORIES: UserMemory[] = [
  {
    id: 'mem-1',
    author: 'Cemil (Kadıköy)',
    era: '1984 Yazı',
    tag: 'Mahalle Maçı',
    memoryText: 'İki taş koyup kale yapardık. Karşı apartmanın birinci katındaki teyzenin camını kırdığımızda topu kaptırmamak için çil yavrusu gibi dağılırdık!',
    createdAt: 1711900000000,
  },
  {
    id: 'mem-2',
    author: 'Zeynep (İzmir / Karşıyaka)',
    era: '1987 Kışı',
    tag: 'Soba & TV',
    memoryText: 'Pazar akşamları sobanın üzerinde güğüm kaynar, mandalina kabukları çıtır çıtır tüterdi. Bizimkiler başlamadan önce banyo biter, saçlar sobada kurutulurdu.',
    createdAt: 1711950000000,
  },
  {
    id: 'mem-3',
    author: 'Murat (Ankara / Bahçelievler)',
    era: '1986 İlkbahar',
    tag: 'Kaset Doldurma',
    memoryText: 'Kasetçiye 90’lık boş BASF kaset verip listeyi uzatırdım. B yüzünün sonunda şarkı sığmayınca son parçayı fade-out yapardı usta kasetçi.',
    createdAt: 1712000000000,
  },
  {
    id: 'mem-4',
    author: 'Elif (Bursa)',
    era: '1989',
    tag: 'Susam Sokağı',
    memoryText: 'Edi ile Büdü’yü izlerken elime aldığım bisküvileri Kurabiye Canavarı gibi yemeye çalışıp halıyı kırıntı yapardım, annem süpürgeyle kovalardı.',
    createdAt: 1712050000000,
  },
];
