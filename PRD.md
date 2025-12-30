# Product Requirements Document (PRD)

## Project Information

- **Project Name:** Dart 501 Checkout Master
- **Version:** 1.0
- **Date:** 30 Aralık 2025
- **Platform:** Web (Mobile-First, PWA, Offline-Capable)
- **Technology:** HTML5, CSS3, Vanilla JavaScript (Tek Dosya veya Modüler)
- **Author(s):**
- **Status:** Onaylandı / Geliştirmeye Hazır

---

## 1. Executive Summary

Bu proje, dart oyuncularının 501 oyunundaki en kritik evre olan "Double Out" bitirişlerini (40-170 arası) simüle eden, interaktif ve eğitici bir web uygulamasıdır. Uygulama, kullanıcının matematiksel karar verme yetisini geliştirmeyi hedefler. Tamamen çevrimdışı çalışabilen (Offline-First), HTML5 ve Vanilla JavaScript tabanlı, mobil uyumlu bir eğitim aracıdır.

---

## 2. Project Overview

### 2.1 Problem Statement

Dart oyuncuları, 501 oyununda "Double Out" bitirişlerinde (40-170 arası skorlar) optimal stratejileri öğrenmek ve pratik yapmak için etkili bir eğitim aracına ihtiyaç duymaktadır. Mevcut çözümler genellikle çevrimiçi bağımlılığı olan veya mobil uyumlu olmayan yapılardır.

### 2.2 Solution Overview

Tamamen çevrimdışı çalışabilen, interaktif dart tahtası simülasyonu ile kullanıcıların checkout stratejilerini öğrenmesini ve pratik yapmasını sağlayan bir web uygulaması. Sistem, kullanıcının performansını 4 kriterli bir algoritma ile değerlendirerek geri bildirim sağlar.

### 2.3 Goals and Objectives

- Dart oyuncularının 40-170 arası checkout stratejilerini öğrenmesini sağlamak
- Matematiksel karar verme yetisini geliştirmek
- Tamamen çevrimdışı çalışabilen bir eğitim aracı sunmak
- Mobil uyumlu, kullanıcı dostu bir arayüz sağlamak

---

## 3. Target Audience

### 3.1 Primary Users

- Başlangıç ve orta seviye dart oyuncuları
- 501 oyunu oynayan ve checkout stratejilerini geliştirmek isteyen kullanıcılar
- Dart eğitmenleri ve antrenörler

### 3.2 User Needs

- Checkout stratejilerini öğrenme ve pratik yapma ihtiyacı
- Çevrimdışı erişim ihtiyacı (internet bağlantısı olmadan kullanım)
- Mobil cihazlardan rahatça kullanım ihtiyacı (otobüs, metro, antrenman sahası)
- Performans değerlendirmesi ve geri bildirim alma ihtiyacı
- Profesyonel (PDC/WDF) standartlara göre analiz edilme ihtiyacı

### 3.3 Usage Scenario

Oyuncu otobüste, metroda veya antrenman sahasında internetsiz bir şekilde telefonunu açar, "Başla" der ve önüne gelen 121 sayısını en doğru yoldan bitirmeye çalışır.

---

## 4. User Stories

- As a dart player, I want to practice checkout scenarios (40-170) so that I can improve my finishing skills
- As a user, I want to use the app offline so that I can practice anywhere without internet connection
- As a mobile user, I want an easy-to-use dart board interface so that I can make selections quickly and accurately
- As a learner, I want to receive scoring feedback so that I can understand if my strategy was optimal
- As a player, I want to see my performance score (0-100) so that I can track my improvement over time

---

## 5. Functional Requirements

### 5.1 Core Features

- İnteraktif Dart Tahtası (5 Bölge Yapısı - Zoom & Select)
- Rastgele Hedef Skor Üretimi (40-170 arası, Bogey sayıları hariç)
- Dart Atış Simülasyonu (Single, Double, Treble seçimi)
- Skor Takibi ve Durum Kontrolü (Bust, Game Shot)
- Puanlama Algoritması (4 kriterli değerlendirme - PDC/WDF standartları)
- Checkout Veritabanı Entegrasyonu

### 5.2 Game Engine Requirements

**FR-01 (Senaryo Üretimi):** Sistem 40-170 arasında rastgele bir tamsayı üretmelidir.

- İstisna: Bogey sayıları (169, 168, 166, 165, 163, 162, 159) başlangıç değeri olarak verilmemelidir.

**FR-02 (Oyun Döngüsü):** Her tur maksimum 3 dart atışından oluşur.

**FR-03 (Bust Kontrolü):**

- Kalan Skor < 0 ise: BUST (Skor eski haline döner)
- Kalan Skor == 1 ise: BUST
- Kalan Skor == 0 ve son atış Double değilse: BUST
- Kalan Skor == 0 ve son atış Double ise: GAME SHOT (Başarılı)

### 5.3 Feature Details

#### Feature 1: İnteraktif Dart Tahtası (5 Bölge Yapısı - Zoom & Select)

- Description: Kullanıcı deneyimi "Zoom & Select" (Yakınlaştır ve Seç) mantığına dayanacaktır. Görsel karmaşayı önlemek ve mobil kullanımı kolaylaştırmak için tahta 5 ana tıklama bölgesine ayrılacaktır:
  - **Üst Çeyrek:** 12 - 5 - 20 - 1 - 18
  - **Sağ Çeyrek:** 4 - 13 - 6 - 10 - 15
  - **Alt Çeyrek:** 2 - 17 - 3 - 19 - 7
  - **Sol Çeyrek:** 16 - 8 - 11 - 14 - 9
  - **Bull Alanı:** SB (25), DB (50)
- Acceptance Criteria:
  - **Ana Görünüm (FR-04):** Tam dart tahtası görünür
  - **Bölge Seçimi (FR-05):** Kullanıcı tahtanın 4 çeyreğinden birine veya Bull alanına tıklar. Tıklanan bölge animasyonla ekranı kaplar (Modal veya Overlay)
  - **Hassas Seçim (FR-06):**
    - Çeyrek Görünümü: Seçilen çeyrekteki sayılar (örn: 12, 5, 20, 1, 18) yan yana butonlar halinde listelenir. Her sayı için S (Single), D (Double), T (Treble) alt seçenekleri çıkar
    - Bull Görünümü: Sadece SB (25) ve DB (50) butonları çıkar
  - **İptal (FR-07):** Yanlış bölge seçilirse "Geri" butonu ile ana tahtaya dönülür

#### Feature 2: Oyun Döngüsü (The Throw Loop)

- Description: Her tur (Visit) maksimum 3 dart atışından oluşur. Kullanıcı dart tahtası üzerinde hedefleme yapar, detay seçimi yapar ve atış sonucu kalan skordan düşülür.
- Acceptance Criteria:
  - Her tur maksimum 3 dart atışı içerir
  - Skor > 1 ise sonraki dart atılır
  - Bust durumu: Skor < 0, Skor == 1 veya (Skor == 0 ve son atış Double değilse) - Tur iptal edilir, puanlar geri alınır
  - Game Shot: Skor == 0 ve son atış Double (veya Bullseye) ise tur başarıyla biter

#### Feature 3: Puanlama Algoritması (Core Logic)

- Description: Sistem, tur sonunda kullanıcıya 0-100 arası bir puan verir. Kullanıcının seçimleri profesyonel (PDC/WDF) standartlara göre analiz edilir.
- Acceptance Criteria:
  - **Kriter 1: Resmi Checkout Uygunluğu (Max 50 Puan)**
    - Kullanıcının atış dizisi (Path), veritabanındaki "Optimal Path" ile birebir aynıysa: 50 Puan
    - Alternatif ama geçerli (Matematiksel olarak doğru ve risk içermeyen) bir yol ise: 35 Puan
    - Geçersiz veya mantıksız yol (Örn: D20 bırakmak yerine D7 bırakmak): 10 Puan
  - **Kriter 2: Dart Sayısı (Max 25 Puan)**
    - 1 Dart: 25 Puan
    - 2 Dart: 20 Puan
    - 3 Dart: 15 Puan
    - Bitirilemedi/Bust: 0 Puan
  - **Kriter 3: Setup Kalitesi (Max 15 Puan)**
    - İlk dart bir "Setup Dart" ise (Skoru 170 altına indirmek veya double bırakmak için):
      - Büyük Treble (T20, T19, T18): 15 Puan
      - Küçük Treble veya Single ile doğru setup: 10 Puan
      - Hatalı setup (Bogey sayısı bırakan atış): 0 Puan
  - **Kriter 4: Bitiriş Başarısı (Max 10 Puan)**
    - Leg bitti mi? Evet: 10 Puan, Hayır: 0 Puan

#### Feature 4: Rastgele Hedef Skor Üretimi

- Description: Başlangıçta veya "Devam Et" butonuna tıklandığında 40-170 arası rastgele bir hedef skor atanır
- Acceptance Criteria:
  - Başlangıç skoru "Bogey Sayıları" (169, 168, 166, 165, 163, 162, 159) olamaz
  - Skor 40-170 aralığında olmalıdır
  - Her yeni tur için yeni rastgele skor üretilir

---

## 6. Non-Functional Requirements

### 6.1 Performance

- Sayfa yükleme süresi < 2 saniye
- Dart seçimi ve skor hesaplama anında gerçekleşmeli (< 100ms)
- Animasyonlar akıcı olmalı (60 FPS)

### 6.2 Scalability

- Checkout veritabanı (40-170 arası 131 sayı) localStorage'da verimli şekilde saklanmalı
- Uygulama tek kullanıcı için tasarlanmıştır (scalability gereksinimi yok)

### 6.3 Security

- Tüm veriler client-side'da saklanır (sunucu gereksinimi yok)
- localStorage kullanımı güvenli şekilde yapılmalı

### 6.4 Usability

- Mobil cihazlarda dokunmatik kullanım için büyük tıklama alanları
- Sezgisel arayüz, minimal öğrenme eğrisi
- Görsel geri bildirimler (yeşil/kırmızı efektler, animasyonlar)
- Opsiyonel ses efektleri (sessize alma özelliği ile)

### 6.5 Compatibility

- Modern tarayıcılar (Chrome, Firefox, Safari, Edge - son 2 versiyon)
- Mobil cihazlar (iOS Safari, Chrome Mobile)
- PWA desteği ile offline çalışma
- Responsive tasarım (mobil, tablet, desktop)

---

## 7. Technical Requirements

### 7.1 Technology Stack

- **Frontend:** Saf HTML5, CSS3 (Flexbox/Grid), JavaScript (ES6+)
- **Kütüphane:** Framework kullanılmayacak (React/Vue yok, native performans için)
- **Görselleştirme:** SVG (Scalable Vector Graphics). Dart tahtasının dilimleri matematiksel yollar (`<path>`) ile çizilecek
- **Depolama:** localStorage (Kullanıcı istatistikleri, geçmiş oyunlar ve ayarlar için)
- **Offline:** Service Worker (sw.js) kullanılarak PWA (Progressive Web App) standartlarında "Install to Home Screen" özelliği

### 7.2 Architecture

- Uygulama tek bir HTML dosyası içinde veya modüler yapıda geliştirilebilir
- Dağıtım kolaylığı için tek dosya (inline CSS/JS) tercih edilebilir
- Dosya yapısı:
  - `index.html`: Ana yapı
  - `styles.css`: Responsive tasarım, animasyonlar
  - `game.js`: Oyun mantığı, hesaplamalar
  - `sw.js`: Offline cache yönetimi

### 7.3 Integration Requirements

- Harici API veya üçüncü taraf entegrasyonu yok
- Tamamen standalone çalışan uygulama

### 7.4 Data Requirements

**Checkout Tablosu (JSON):**

Uygulamanın beyni olan "Optimal Checkout Tablosu" şu formatta bir JSON objesi olarak kod içinde saklanacaktır:

```json
const CHECKOUT_DB = {
  "170": {
    "path": ["T20", "T20", "DB"],
    "alternatives": [],
    "desc": "The Big Fish - Tek yol."
  },
  "132": {
    "path": ["T20", "T18", "D18"],
    "alternatives": ["T20", "T16", "D20"],
    "desc": "Alternatif yollar mevcut."
  },
  "121": {
    "path": ["T11", "T18", "D20"],
    "alternatives": [["S11", "T18", "DB"]], // S11 gelirse Bull'a dön
    "desc": "Bullseye'dan kaçınmak için T11 tercih edilir."
  },
  //... 40'a kadar tüm sayılar
};
```

- 40-170 arası tüm checkout senaryoları için optimal yollar (`path`)
- Alternatif yollar (`alternatives`) - varsa
- Açıklamalar ve strateji notları (`desc`)
- localStorage'da önbelleklenir

---

## 8. User Experience (UX) Requirements

### 8.1 Design Principles

- **Renk Paleti (CSS Variables):**
  - `--bg-color: #2c3e50` (Koyu Arduvaz - Odaklanma için)
  - `--board-black: #1a1a1a`
  - `--board-white: #ecf0f1`
  - `--board-red: #e74c3c`
  - `--board-green: #27ae60`
  - `--accent-gold: #f1c40f` (Skor vurguları için)
- **Tipografi:** Okunabilir, büyük, sans-serif fontlar (Örn: Roboto veya Open Sans)
- **Geri Bildirim:**
  - Başarılı atışlarda "Yeşil" parlama efekti
  - Bust durumunda ekranın sarsılması ve "Kırmızı" uyarı
  - Ses efektleri (Opsiyonel, sessize alma özelliği ile)

### 8.2 Screen Layout

**Header:**

- Büyük Skor: Ortada devasa "126" yazısı
- Kalan Dart: Sağ üstte 3 tane ok ikonu (atıldıkça sönükleşir)

**Main (Board):**

- Ekranın %60'ını kaplayan SVG Dart Tahtası
- Bölge sınırları belirgin (CSS hover efektleri)

**Footer (Action Bar):**

- Dart Log: Atılan son dartlar yan yana kutucuklarda (Örn: [T20] [T18] [D20])
- Mesaj Alanı: Anlık uyarılar ("Bogey Uyarısı!", "Bust!")

### 8.3 User Flow

#### 2.1 Başlangıç Ekranı

- Kullanıcı uygulamayı açtığında doğrudan oyun ekranı ile karşılaşır
- "Başla" butonu veya otomatik olarak 40-170 arasında rastgele bir Hedef Skor (Checkout) atanır
- Kısıtlama: Başlangıç skoru "Bogey Sayıları" (169, 168, 166, 165, 163, 162, 159) olamaz

#### 2.2 Oyun Döngüsü (The Throw Loop)

1. **Hedefleme:** Kullanıcı dart tahtası görseli üzerinde bir bölgeye tıklar
2. **Detay Seçimi (Zoom):** Tıklanan bölge büyür ve hassas seçim menüsü açılır (Single, Double, Treble)
3. **Atış Sonucu:** Seçilen puan kalan skordan düşülür
4. **Durum Kontrolü:**
   - **Devam:** Skor > 1 ise sonraki dart atılır
   - **Bust (Yanma):** Skor < 0, Skor == 1 veya (Skor == 0 ve son atış Double değilse). Tur iptal edilir, puanlar geri alınır
   - **Game Shot (Bitiriş):** Skor == 0 ve son atış Double (veya Bullseye) ise tur başarıyla biter

#### 2.3 Sonuç ve Puanlama

- Tur bittiğinde (Başarı veya Bust), sistem 4 kriterli bir algoritma ile kullanıcıya 0-100 arası bir puan verir
- "Devam Et" butonu ile yeni sayı üretilir

### 8.4 Wireframes/Mockups

- Dart tahtası merkezde, 5 tıklanabilir bölge ile
- Üstte hedef skor ve kalan skor gösterimi
- Altta dart sayacı ve seçim butonları
- Sonuç ekranı: Puan gösterimi ve "Devam Et" butonu

---

## 9. Success Metrics

### 9.1 Key Performance Indicators (KPIs)

<!-- Define measurable success criteria -->

-
-

### 9.2 Analytics Requirements

<!-- Define what metrics need to be tracked -->

- ***

## 10. Timeline and Milestones

### 10.1 Phases

- **Faz 1: İskelet & Board**

  - Deliverables: HTML yapısını kur, SVG dart tahtasını çiz ve CSS ile 5 bölgeye ayır (tıklama olaylarını konsola yazdır)
  - Timeline:

- **Faz 2: Oyun Mantığı**

  - Deliverables: 40-170 arası sayı üretme, dart puanlarını düşme ve 0'a ulaşma (Game Shot) / Bust mantığını kodla
  - Timeline:

- **Faz 3: Checkout Veritabanı**

  - Deliverables: Araştırma raporundaki verileri JSON formatına dök ve sisteme entegre et
  - Timeline:

- **Faz 4: Zoom & Input Arayüzü**

  - Deliverables: Çeyrek dilimlere tıklayınca açılan detaylı seçim menüsünü (S/D/T butonları) yap
  - Timeline:

- **Faz 5: Değerlendirme Algoritması**

  - Deliverables: Puanlama mantığını (50/25/15/10) kodla ve sonuç ekranını tasarla
  - Timeline:

- **Faz 6: Cila & Offline**

  - Deliverables: CSS animasyonları ekle, Service Worker yaz ve mobil tarayıcılarda test et
  - Timeline:

### 10.2 Dependencies

- Checkout veritabanının hazırlanması (Faz 3) - Faz 5 için gerekli
- Dart tahtası görselinin ve bölge yapısının tamamlanması (Faz 1) - Faz 2 için gerekli
- Oyun mantığının tamamlanması (Faz 2) - Faz 4 ve Faz 5 için gerekli
- Zoom & Input arayüzünün tamamlanması (Faz 4) - Faz 5 için gerekli

---

## 11. Risks and Assumptions

### 11.1 Risks

- **Risk:** Checkout veritabanının hazırlanması zaman alabilir

  - **Impact:** Faz 3 ve 4'ün gecikmesi
  - **Mitigation:** Veritabanı hazırlığını paralel olarak başlatmak

- **Risk:** SVG dart tahtasının mobil cihazlarda performans sorunları

  - **Impact:** Kullanıcı deneyimi kötüleşebilir
  - **Mitigation:** Optimize edilmiş SVG kullanımı ve performans testleri

- **Risk:** PWA özelliklerinin tüm tarayıcılarda desteklenmemesi
  - **Impact:** Offline özellikler bazı cihazlarda çalışmayabilir
  - **Mitigation:** Graceful degradation ve fallback mekanizmaları

### 11.2 Assumptions

- Kullanıcılar modern tarayıcılar kullanıyor
- localStorage desteği mevcut
- SVG desteği mevcut
- Kullanıcılar dart oyunu kurallarını temel seviyede biliyor
- ***

## 12. Out of Scope

- Multiplayer/online özellikleri
- Kullanıcı hesapları ve cloud senkronizasyonu
- Turnuva modu veya lig sistemi
- Ses efektleri zorunlu değil (opsiyonel)
- 40'dan küçük checkout senaryoları (bu versiyonda)
- ***

## 13. Edge Cases

### 13.1 Bogey Tuzağı

Kullanıcı eğer 169, 168, 166, 165, 163, 162, 159 sayılarından birine düşerse, sistem bir sonraki turda "Checkout İmkansız" uyarısı vermeli ama oyunu bitirmemelidir (kullanıcının setup yapmasına izin verilmeli).

### 13.2 Negatif Setup

Kullanıcı 50 puanı varken T20 (60) denerse anında BUST olur. Sistem bu durumda puanlama yaparken "Risk Yönetimi"nden puan kırmalıdır.

### 13.3 Alternatif Yol Değerlendirmesi

Kullanıcı optimal yol yerine alternatif bir yol izlediğinde, sistem bu yolun matematiksel olarak geçerli ve risk içermediğini kontrol etmelidir. Örneğin, D20 yerine D16 bırakmak geçerli bir alternatif olabilir, ancak D7 bırakmak mantıksız bir seçimdir.

---

## 14. Open Questions

- Checkout veritabanındaki alternatif yolların tam listesi hazır mı?
- Ses efektleri için hangi formatlar tercih edilmeli? (MP3, WAV, OGG)
- PWA için özel icon ve splash screen tasarımları gerekli mi?
- ***

## 15. Appendix

### 15.1 Glossary

- **Checkout:** 501 oyununda skoru 0'a indirme işlemi
- **Double Out:** Skoru çift sayı ile bitirme kuralı
- **Bogey Sayıları:** Bitirilemeyen sayılar (169, 168, 166, 165, 163, 162, 159)
- **Bust:** Skorun 0'ın altına düşmesi veya 1'de kalması durumu
- **Visit:** Bir tur (maksimum 3 dart atışı)
- **SB:** Single Bull (25 puan)
- **DB:** Double Bull / Bullseye (50 puan)
- **Single (S):** Tek sayı puanı
- **Double (D):** Çift sayı puanı (x2)
- **Treble (T):** Üçlü sayı puanı (x3)
- **Setup:** Skoru bitirilebilir bir sayıya indirmek için yapılan hazırlık atışı

### 15.2 References

- Dart 501 oyun kuralları
- Optimal checkout stratejileri araştırma raporu

---

## Revision History

| Version | Date | Author | Changes       |
| ------- | ---- | ------ | ------------- |
| 1.0     |      |        | Initial draft |
