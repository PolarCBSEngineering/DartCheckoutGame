# Dart 501 Checkout Master - Geliştirme Planı

## 📋 Genel Bakış

**Proje:** Dart 501 Checkout Master  
**Hedef:** GitHub'a yüklenmiş, PWA olarak çalışan, mobil cihazlardan erişilebilir web uygulaması  
**Deployment:** GitHub Pages veya Netlify (ücretsiz hosting)

---

## ⏱️ Zaman Tahmini

### Toplam Süre: **8-12 saat** (1-2 gün yoğun çalışma)

### Faz Bazında Tahminler:

| Faz | İş | Süre | Notlar |
|-----|-----|------|--------|
| **Faz 0** | Proje Kurulumu & GitHub Setup | 30 dk | Git repo, dosya yapısı, .gitignore |
| **Faz 1** | İskelet & Board | 2-3 saat | HTML yapısı, SVG dart tahtası, CSS bölgeler |
| **Faz 2** | Oyun Mantığı | 2-3 saat | Skor hesaplama, bust kontrolü, game shot |
| **Faz 3** | Checkout Veritabanı | 1-2 saat | JSON veritabanı hazırlama (131 sayı) |
| **Faz 4** | Zoom & Input Arayüzü | 2 saat | Modal/overlay, S/D/T butonları |
| **Faz 5** | Değerlendirme Algoritması | 1-2 saat | 4 kriterli puanlama sistemi |
| **Faz 6** | PWA & Deployment | 1-2 saat | Service Worker, manifest, GitHub Pages |
| **Test & Polish** | Bug fix, mobil test | 1 saat | Cross-browser test, mobil optimizasyon |

---

## 📁 Dosya Yapısı

```
DartCheckoutGame/
├── index.html              # Ana HTML dosyası
├── styles.css              # CSS stilleri
├── game.js                 # Oyun mantığı
├── checkout-db.js          # Checkout veritabanı (JSON)
├── sw.js                   # Service Worker (PWA)
├── manifest.json           # PWA manifest
├── icons/                  # PWA iconları
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
├── PRD.md                  # Ürün gereksinim belgesi
├── README.md               # Proje açıklaması
├── .gitignore
└── .github/
    └── workflows/
        └── deploy.yml      # Otomatik deployment (opsiyonel)
```

---

## 🚀 Geliştirme Adımları

### Faz 0: Proje Kurulumu (30 dk)

**Görevler:**
- [ ] Git repository başlat
- [ ] Dosya yapısını oluştur
- [ ] `.gitignore` dosyası ekle
- [ ] `README.md` hazırla
- [ ] GitHub'da public repository oluştur

**Komutlar:**
```bash
git init
git add .
git commit -m "Initial commit: Project setup"
git remote add origin https://github.com/[username]/DartCheckoutGame.git
git push -u origin main
```

---

### Faz 1: İskelet & Board (2-3 saat)

**Görevler:**
- [ ] `index.html` temel yapısı (Header, Main, Footer)
- [ ] SVG dart tahtası çizimi (20 dilim + bull)
- [ ] CSS ile 5 bölge tanımlama (çeyrekler + bull)
- [ ] Responsive tasarım (mobile-first)
- [ ] Tıklama event'leri (konsola log)

**Deliverables:**
- Çalışan HTML sayfası
- Tıklanabilir dart tahtası bölgeleri
- Responsive layout

---

### Faz 2: Oyun Mantığı (2-3 saat)

**Görevler:**
- [ ] Rastgele sayı üretimi (40-170, bogey hariç)
- [ ] Skor takip sistemi
- [ ] Dart atış simülasyonu
- [ ] Bust kontrolü (FR-03)
- [ ] Game Shot kontrolü
- [ ] Tur yönetimi (max 3 dart)

**Deliverables:**
- Çalışan oyun döngüsü
- Skor hesaplama
- Bust/Game Shot mantığı

---

### Faz 3: Checkout Veritabanı (1-2 saat)

**Görevler:**
- [ ] 40-170 arası tüm sayılar için optimal yollar
- [ ] Alternatif yollar (varsa)
- [ ] JSON formatında yapılandırma
- [ ] `checkout-db.js` dosyası oluşturma

**Not:** Bu faz için checkout stratejileri veritabanı hazır olmalı. Eğer yoksa, temel bir yapı oluşturup sonra genişletilebilir.

**Deliverables:**
- `checkout-db.js` dosyası
- En azından temel checkout yolları (örn: 170, 121, vb.)

---

### Faz 4: Zoom & Input Arayüzü (2 saat)

**Görevler:**
- [ ] Modal/Overlay sistemi
- [ ] Çeyrek görünümü (sayılar + S/D/T butonları)
- [ ] Bull görünümü (SB/DB butonları)
- [ ] "Geri" butonu
- [ ] Animasyonlar (zoom, fade)

**Deliverables:**
- Çalışan zoom & select arayüzü
- Mobil uyumlu butonlar

---

### Faz 5: Değerlendirme Algoritması (1-2 saat)

**Görevler:**
- [ ] 4 kriterli puanlama sistemi:
  - Kriter 1: Checkout uygunluğu (50 puan)
  - Kriter 2: Dart sayısı (25 puan)
  - Kriter 3: Setup kalitesi (15 puan)
  - Kriter 4: Bitiriş başarısı (10 puan)
- [ ] Sonuç ekranı
- [ ] "Devam Et" butonu

**Deliverables:**
- Çalışan puanlama sistemi
- Sonuç gösterimi

---

### Faz 6: PWA & Deployment (1-2 saat)

**Görevler:**
- [ ] `manifest.json` oluştur
- [ ] PWA iconları hazırla (192x192, 512x512)
- [ ] `sw.js` Service Worker yaz
- [ ] Offline cache stratejisi
- [ ] GitHub Pages ayarları
- [ ] HTTPS kontrolü (GitHub Pages otomatik sağlar)

**Deliverables:**
- PWA olarak yüklenebilir uygulama
- Offline çalışma
- GitHub Pages'de canlı link

---

### Test & Polish (1 saat)

**Görevler:**
- [ ] Cross-browser test (Chrome, Firefox, Safari)
- [ ] Mobil test (iOS, Android)
- [ ] PWA install testi
- [ ] Offline test
- [ ] Bug fix'ler
- [ ] Performans optimizasyonu

---

## 🌐 Deployment Seçenekleri

### Seçenek 1: GitHub Pages (Önerilen - Ücretsiz)

**Avantajlar:**
- Ücretsiz
- HTTPS otomatik
- Kolay kurulum
- Otomatik deployment

**Adımlar:**
1. GitHub repository'de Settings > Pages
2. Source: `main` branch, `/root` folder
3. URL: `https://[username].github.io/DartCheckoutGame/`

### Seçenek 2: Netlify (Alternatif - Ücretsiz)

**Avantajlar:**
- Daha hızlı CDN
- Otomatik HTTPS
- Custom domain desteği

**Adımlar:**
1. Netlify'e GitHub ile bağlan
2. Repository seç
3. Build command: (gerek yok, static site)
4. Publish directory: `/`

---

## 📱 Kullanıcı Erişimi

### Mobil Cihazdan Kullanım:

1. **Tarayıcıdan:**
   - Kullanıcı linki açar: `https://[username].github.io/DartCheckoutGame/`
   - Tarayıcı menüsünden "Add to Home Screen" seçer
   - Uygulama ana ekrana eklenir

2. **PWA Install Prompt:**
   - Uygulama ilk açılışta "Install App" önerisi gösterir
   - Kullanıcı onaylar
   - Uygulama ana ekrana eklenir

### Desktop'tan Kullanım:
- Doğrudan tarayıcıdan açılır
- PWA olarak yüklenebilir (Chrome, Edge)

---

## ✅ Checklist - Başlamadan Önce

- [ ] GitHub hesabı var mı?
- [ ] Git kurulu mu?
- [ ] Code editor hazır mı?
- [ ] Checkout veritabanı hazır mı? (yoksa temel yapı ile başlanabilir)

---

## 🎯 Hızlı Başlangıç (MVP - Minimum Viable Product)

Eğer hızlı bir MVP istiyorsanız:

1. **Faz 1-2-4** (Temel oyun) - 4-5 saat
2. **Basit puanlama** (sadece başarı/başarısız) - 30 dk
3. **GitHub Pages deployment** - 30 dk
4. **Toplam: ~6 saat**

Sonra kalan özellikler eklenebilir.

---

## 📝 Notlar

- Checkout veritabanı en kritik kısım. Eğer hazır değilse, önce temel sayılar (170, 121, 100, vb.) ile başlanabilir.
- SVG dart tahtası çizimi zaman alabilir. Alternatif: Basit bir görsel ile başlayıp sonra SVG'ye geçilebilir.
- PWA özellikleri için HTTPS zorunlu (GitHub Pages otomatik sağlar).

---

## 🚦 Başlamaya Hazır mısınız?

Eğer onaylarsanız, şu sırayla ilerleyebiliriz:
1. Proje kurulumu (Faz 0)
2. Temel HTML/CSS yapısı (Faz 1)
3. Oyun mantığı (Faz 2)
4. ... ve devamı

**Soru:** Hangi fazdan başlamak istersiniz? Yoksa tüm projeyi adım adım birlikte mi geliştirelim?

