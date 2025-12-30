# GitHub'a Yükleme Talimatları

## 1. GitHub Repository Oluşturma

1. GitHub.com'a giriş yapın
2. Sağ üstteki "+" butonuna tıklayın > "New repository"
3. Repository adı: `DartCheckoutGame` (veya istediğiniz isim)
4. **Public** seçin
5. "Initialize this repository with a README" seçeneğini **işaretlemeyin** (zaten README var)
6. "Create repository" butonuna tıklayın

## 2. Projeyi GitHub'a Yükleme

Terminal/PowerShell'de proje klasöründe şu komutları çalıştırın:

```bash
# Git repository başlat (eğer yapılmadıysa)
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit: Dart 501 Checkout Master"

# GitHub repository'nizi remote olarak ekleyin
# [username] yerine GitHub kullanıcı adınızı yazın
git remote add origin https://github.com/[username]/DartCheckoutGame.git

# Main branch'e push edin
git branch -M main
git push -u origin main
```

## 3. GitHub Pages Ayarlama

1. GitHub repository sayfanıza gidin
2. **Settings** sekmesine tıklayın
3. Sol menüden **Pages** seçin
4. **Source** bölümünde:
   - Branch: `main` seçin
   - Folder: `/ (root)` seçin
5. **Save** butonuna tıklayın

## 4. Uygulamaya Erişim

Birkaç dakika sonra uygulamanız şu adresten erişilebilir olacak:

```
https://[username].github.io/DartCheckoutGame/
```

**Not:** İlk deployment 1-2 dakika sürebilir.

## 5. PWA Icon'ları Ekleme (Opsiyonel)

`icons/` klasörüne icon dosyalarını ekleyin:
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `apple-touch-icon.png` (180x180)

Icon'ları ekledikten sonra:
```bash
git add icons/
git commit -m "Add PWA icons"
git push
```

## 6. Mobil Cihazdan Kullanım

1. Mobil tarayıcıda uygulama linkini açın
2. Tarayıcı menüsünden "Add to Home Screen" seçin
3. Uygulama ana ekranınıza eklenecek
4. Artık offline olarak kullanabilirsiniz!

## Sorun Giderme

### Service Worker Çalışmıyor
- HTTPS gereklidir (GitHub Pages otomatik sağlar)
- Tarayıcı cache'ini temizleyin

### Icon'lar Görünmüyor
- Icon dosyalarının `icons/` klasöründe olduğundan emin olun
- `manifest.json` dosyasındaki path'lerin doğru olduğunu kontrol edin

### Sayfa Yüklenmiyor
- GitHub Pages'in aktif olduğunu kontrol edin (Settings > Pages)
- Repository'nin public olduğundan emin olun

