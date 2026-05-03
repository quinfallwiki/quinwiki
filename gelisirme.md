# Geliştirme Önerileri — QuinWiki Üzerine Eklenmesi Gerekenler

Belirttiğin 15 sayfa sağlam bir iskelet. Bu dosya, dünya çapında bir oyun wikisinde olması beklenen ek bölümleri ve özellikleri açıklamalarıyla listeler. Her madde "ne, neden, nasıl" formatında. Sen onaylarsan `todo.md`'ye taşınır.

---

## A. İçerik Sayfaları (Yeni)

### A1. Haritalar / Atlas
- **Ne:** Dünya haritası, bölge haritaları, NPC/quest/kaynak işaretleri.
- **Neden:** MMORPG wikilerinde en çok kullanılan sayfa. SEO ve kullanıcıyı sitede tutma açısından kritik.
- **Nasıl:** Pan/zoom destekli interaktif harita (Leaflet veya kendi canvas çözümü). Katmanlar: kaynaklar, bossler, NPC, görev başlangıçları.

### A2. Görevler (Quests)
- **Ne:** Ana hikâye, yan görev, günlük görev listesi; ödülleri, başlangıç/bitiş NPC'leri.
- **Neden:** Oyuncuların en sık aradığı şey. "X görevini nasıl bitiririm" araması büyük trafik getirir.
- **Nasıl:** Filtrelenebilir tablo + detay sayfası. Item/zindan sayfalarına çapraz bağ.

### A3. Beceriler / Yetenek Ağacı
- **Ne:** Sınıf bazlı beceri ağacı görselleştirici, planlayıcı (build planner).
- **Neden:** Build planlayıcı sayfası MMO wikilerinin en yapışkan içeriklerinden. Paylaşılabilir link → viral.
- **Nasıl:** SVG/Canvas tabanlı node graf, sürükle-bırak yok ama tıklayarak puan dağıtma var. URL'de seçimi serileştir.

### A4. Lore / Hikâye
- **Ne:** Dünya hikâyesi, ırklar, fraksiyonlar, tarih çizelgesi.
- **Neden:** Oyunun atmosferine giriş, yeni oyuncuyu çeker, premium hissi verir.
- **Nasıl:** Uzun-form makaleler (MDX), zaman çizelgesi bileşeni, ırklar arasında karşılaştırma kartları.

### A5. NPC'ler
- **Ne:** Önemli NPC listesi: konumu, sattığı, verdiği görevler.
- **Neden:** Quest sayfasının doğal tamamlayıcısı.
- **Nasıl:** Katalog + detay; harita işaretleyicilerine bağlanır.

### A6. PvP / Arena / Savaş Sistemi
- **Ne:** Oyunun PvP mekaniklerini, savaş sistemini açıklayan sayfa.
- **Neden:** Quinfall'un savaş sistemi pazarlamada öne çıkan unsur, ayrı bir başlık hak ediyor.
- **Nasıl:** Mekanik kartları + video/animasyon demoları + ipuçları.

### A7. Lonca / Klan Sistemi
- **Ne:** Lonca kurma, hak/sorumluluk, lonca aktiviteleri.
- **Neden:** Sosyal sistemler MMO'nun belkemiği, başlı başına sayfa hak ediyor.
- **Nasıl:** Açıklamalı rehber + lonca panel önerileri + lonca dizini (ileride).

### A8. Ekonomi / Pazar / Ticaret
- **Ne:** Para birimi, oyuncular arası ticaret, pazar yeri kuralları.
- **Neden:** Kervan sistemi sayfasıyla bağlanır, ekonomi-merkezli oyuncular için hayati.
- **Nasıl:** Açıklayıcı rehber + (ileride) fiyat takip aracı.

### A9. Ev / Arazi / Yerleşim
- **Ne:** Oyuncu evi, arazi sahipliği, dekorasyon.
- **Neden:** Sandbox/MMO wikilerinde sürekli aranır; yerleşim mekaniği varsa içerik zenginliği büyük.
- **Nasıl:** Mekanik açıklaması + tarif/dekor kataloğu.

### A10. Sezonlar / Etkinlikler / Yamalar
- **Ne:** Devam eden ve geçmiş etkinlikler, patch notları.
- **Neden:** Wikinin "yaşıyor" hissini veren bölüm. Düzenli güncelleme = düzenli ziyaretçi.
- **Nasıl:** Blog benzeri akış + filtreleme + RSS.

### A11. Başarımlar (Achievements)
- **Ne:** Tüm başarım listesi, koşulları, ödülleri.
- **Neden:** Tamamlamacı oyuncular için vazgeçilmez.
- **Nasıl:** Filtrelenebilir tablo + ilerleme takibi (kullanıcı hesabı sürümünde).

### A12. Yiyecek / İçecek / Tüketilebilirler
- **Ne:** Buff veren yenilebilir/içilebilir/iksir vb. listesi.
- **Neden:** Ayrı bir kategori, item sayfası içinde kaybolmamalı.
- **Nasıl:** Item kataloğunun alt görünümü ya da bağımsız sayfa.

### A13. Mob / Düşman Bestiarisi
- **Ne:** Oyundaki normal düşmanlar, level, bölge, drop.
- **Neden:** Boss sayfasının normal-mob muadili, level rehberini besler.
- **Nasıl:** Katalog + detay, harita ve drop tablosuna bağlı.

### A14. Klavye Kısayolları / Kontroller
- **Ne:** Tuş eşleme, kontroller cheatsheet.
- **Neden:** Yeni başlayanın aradığı ilk şeylerden biri.
- **Nasıl:** Kategorize edilmiş tablo + yazdırılabilir versiyon.

### A15. SSS (FAQ)
- **Ne:** Sık sorulan soruların kısa cevapları.
- **Neden:** SEO için kritik (FAQPage JSON-LD), destek yükünü düşürür.
- **Nasıl:** Akordiyon liste + arama.

### A16. Sözlük (Glossary)
- **Ne:** Oyun terminolojisi (kısaltmalar, slang, mekanik isimleri).
- **Neden:** Çok dilli wiki için özellikle değerli; uluslararası oyuncuların terim öğrenmesi.
- **Nasıl:** A-Z indeksli sözlük.

### A17. Hata / Sorun Giderme
- **Ne:** Yaygın launcher/oyun hataları ve çözümleri.
- **Neden:** Sistem gereksinimleri sayfasının doğal devamı.
- **Nasıl:** Kategori + arama + adım adım çözüm.

---

## B. Etkileşimli Araçlar

### B1. Damage / DPS Hesaplayıcı
- Build + ekipman seçilince DPS tahmini.

### B2. Build Karşılaştırıcı
- İki build URL'sini yan yana açan karşılaştırma.

### B3. Item Karşılaştırıcı
- Üç-dört itemi yan yana stat tablosuyla.

### B4. Tarif Optimizer
- Hedef item için en ucuz tarif zinciri.

### B5. Rota Planlayıcı
- Kervan / denizcilik için en kısa-en güvenli rota önerisi.

### B6. Sezon Sayacı
- Sezon başı/sonu, etkinlik geri sayımı (anasayfada widget).

---

## C. Topluluk ve Katkı

### C1. Wiki Editör Sistemi (v2)
- Markdown/MDX tabanlı, GitHub PR'a bağlı veya kendi backend'i.
- Onaylı katkıcı rolü, moderatör panel.

### C2. Yorum Sistemi
- Sayfa altı yorum (ileride). Spam koruması, moderasyon.

### C3. Geri Bildirim Butonu
- Her sayfada "yanlış bir şey gördün mü?" → kısa form.

### C4. Discord Entegrasyonu
- Anasayfa canlı sunucu durumu, kanal akışı (resmi izinle).

### C5. Resmi Sosyal Akış
- X / YouTube / Twitch widgetları (yalnızca opt-in, GDPR uyumlu).

---

## D. Kullanıcı Sistemi (v2'de)

### D1. Hesap
- Email/OAuth ile giriş; favoriler, build kaydetme, ilerleme takibi.

### D2. Favoriler
- Item, sınıf, build favorilemek.

### D3. Build Kütüphanesi
- Public build paylaşımı, oylama, etiket.

### D4. Karakter Kart Profili
- Kullanıcı oyun karakterini wiki profilinde sergileyebilir.

---

## E. Erişilebilirlik ve Gizlilik

### E1. Ekran Okuyucu Optimizasyonu
- Tüm interaktif öğelerin aria etiketleri test edilir; canlı bölgeler doğru duyurur.

### E2. Renk Körlüğü Modu
- Rarity ve harita renkleri için renk-körü güvenli paletler.

### E3. Yazı Boyutu / Kontrast Toggle
- Kullanıcı ayarları menüsünden.

### E4. Çerez / Gizlilik
- KVKK + GDPR uyumlu çerez bildirimi.
- Tracker'sız tasarım veya gizliliğe saygılı analytics (Plausible/Umami).

---

## F. Operasyon ve Güven

### F1. İçerik Sürümleme
- Her wiki yamada içerik versiyonu etiketlenir; eski sürümlere ulaşılabilir.

### F2. Sayfa Sahipliği
- Her sayfa "son güncelleyen", "doğrulanma tarihi" gösterir.

### F3. Doğrulanmamış İşareti
- Kaynağı tek olan veya henüz teyit edilmemiş bilgiler için sayfa içi rozet.

### F4. Çeviri Durumu
- Sayfa başına dil tamamlanma yüzdesi (yöneticiye görünür).

### F5. Status Page
- Wiki kendi uptime sayfasını barındırır (basit).

---

## G. Performans ve Teknik

### G1. PWA
- Çevrimdışı temel sayfalar, ana ekrana ekleme. Mobilde farkedilir UX kazancı.

### G2. CDN + Image Optimizer
- Cloudflare / Bunny CDN; otomatik AVIF/WebP.

### G3. Search-as-you-type
- Tüm site içi arama (item + sayfa içeriği). Algolia veya kendi indeks.

### G4. Klavye Komutları
- "/" tuşu arama, "g h" home, "g i" item gibi shortcut paleti.

### G5. Komut Paleti (Cmd+K)
- Sayfaya zıpla, item ara, dil değiştir, tema değiştir; tek menüden.

---

## H. Pazarlama ve Yapışkanlık

### H1. "Bugün Ne Var?"
- Anasayfada günlük dinamik içerik (etkinlik, indirim, dünya bossu).

### H2. İlk Ziyaret Tur
- Wikinin nasıl kullanıldığını gösteren mini tur (opt-in).

### H3. Paylaşılabilir Kartlar
- Item, build, başarım için "kart oluştur ve paylaş" (PNG export).

### H4. Tema Paketleri
- Sınıf temalarına göre site rengi (Savaşçı kırmızı, Büyücü mor vs.) — opsiyonel.

---

## Önceliklendirme Önerim

**v1 (lansman):** A1, A2, A3, A4, A5, A6, A14, A15, A16, B3, C3, E1, E4, F2, F3, F4, G3, G5
**v1.5:** A7, A8, A9, A10, A11, A12, A13, A17, B1, B2, B4, B5, B6, C4, C5
**v2:** C1, C2, D1, D2, D3, D4, G1, H1, H2, H3, H4

Lansmanda 15 + öncelikli ekler ile dolu, sağlam, profesyonel bir wiki çıkar; sonraki sürümlerde ekosistem genişler.
