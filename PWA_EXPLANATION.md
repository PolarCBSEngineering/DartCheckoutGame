# PWA (Progressive Web App) Install Özelliği Nedir?

## 📱 PWA Nedir?

PWA (Progressive Web App), web uygulamalarını mobil uygulama gibi kullanmanızı sağlayan bir teknolojidir. Uygulamanızı telefonunuzun ana ekranına ekleyebilir, offline çalıştırabilir ve native uygulama gibi deneyim yaşayabilirsiniz.

## ✨ PWA Install Özelliği

### Nasıl Çalışır?

1. **Otomatik Tespit:**
   - Tarayıcı uygulamanızı ziyaret ettiğinizde, PWA özelliklerini kontrol eder
   - `manifest.json` dosyası ve Service Worker varsa, "Install App" önerisi gösterir

2. **Install Butonu:**
   - Chrome/Edge: Adres çubuğunda install ikonu görünür
   - Safari (iOS): "Add to Home Screen" menü seçeneği
   - Android Chrome: Banner veya menüden "Install App"

3. **Ana Ekrana Ekleme:**
   - Tıkladığınızda uygulama ana ekranınıza eklenir
   - Kendi icon'u ve ismi ile görünür
   - Tıkladığınızda tam ekran açılır (tarayıcı çubukları yok)

### Avantajları

✅ **Offline Çalışma:** İnternet olmadan kullanabilirsiniz  
✅ **Hızlı Erişim:** Ana ekrandan tek tıkla açılır  
✅ **Native Görünüm:** Uygulama gibi görünür ve davranır  
✅ **Güncellemeler:** Otomatik güncelleme alır  
✅ **Bildirimler:** (İsteğe bağlı) Push notification desteği

### Bu Projede

- ✅ `manifest.json` - Uygulama bilgileri
- ✅ `sw.js` - Service Worker (offline cache)
- ✅ Responsive tasarım
- ⚠️ Icon dosyaları (opsiyonel, eklenebilir)

### Test Etmek İçin

1. **Chrome/Edge:**
   - Uygulamayı açın
   - Adres çubuğunda install ikonuna tıklayın
   - "Install" butonuna basın

2. **Safari (iOS):**
   - Menüden "Add to Home Screen" seçin
   - İsim verin ve "Add" butonuna basın

3. **Android Chrome:**
   - Menüden "Install App" seçin
   - Veya otomatik banner'ı kabul edin

### Offline Test

1. Uygulamayı bir kez açın (internet ile)
2. Service Worker cache'i oluşturur
3. İnterneti kapatın
4. Uygulamayı tekrar açın - çalışmaya devam eder!

---

**Not:** İlk yüklemede internet gerekir, sonrasında offline çalışır.

