# QuinWiki — Yapılacaklar Listesi

Aşamalara bölünmüş, sıralı, her madde teslim edilebilir bir parça. Bittiğinde `[x]` işaretlenir.

---

## Aşama 0 — Hazırlık ve Karar

- [ ] Tech stack onayı (varsayılan öneri: Vite + React 18 + TypeScript + Tailwind + Framer Motion + react-router + Zustand + i18next)
- [ ] Backend ihtiyacı netleşir (statik mi, ileride API mı?)
- [ ] Hosting hedefi belirlenir (Vercel / Netlify / kendi sunucu / GitHub Pages)
- [ ] Domain bilgisi alınır
- [ ] Logo, marka renk paleti, tipografi (oyunun resmi kaynaklarından) toplanır
- [ ] `gelisirme.md` üzerinden kapsam genişletmesi onaylanır
- [ ] İçerik doğrulama kaynakları (oyun resmi sitesi, sosyal kanallar) kullanıcıdan netlenir

## Aşama 1 — Proje İskeleti

- [ ] Vite + React + TS projesi kurulur
- [ ] ESLint, Prettier, Husky, lint-staged
- [ ] Tailwind + tema değişkenleri (renk, tipografi, motion, radius, shadow)
- [ ] Klasör yapısı `rules.md` 1.2'ye göre kurulur
- [ ] Router kurulur, `/:lang/:page` yapısı çalışır
- [ ] Layout: navbar, footer, sayfa kabuğu, sidebar (gerekiyorsa)
- [ ] Tema toggle (dark öncelik), `prefers-reduced-motion` desteği

## Aşama 2 — i18n Altyapısı

- [ ] i18next + react-i18next kurulur
- [ ] 13 dil için boş namespace dosyaları açılır (`tr`, `en`, `de`, `ru`, `fr`, `it`, `es`, `pt`, `pl`, `uk`, `zh`, `ja`, `ko`)
- [ ] Dil seçici bileşeni (bayraklı, klavye erişilebilir)
- [ ] URL ↔ dil senkronizasyonu
- [ ] Fallback ve eksik anahtar uyarı sistemi
- [ ] Item/material için `getLocalized(field, lang)` helper'ı

## Aşama 3 — Veri Katmanı

- [ ] `item_kaynak_db.json` için TypeScript şeması ve Zod doğrulayıcısı
- [ ] `src/data/items.ts`: filtreleme, arama, kategoriye göre listeleme
- [ ] `getIconPath()` helper'ı, ikonların `public/assets/icons/` altına taşınması
- [ ] Tembel yükleme: items DB sadece gerektiğinde fetch edilir
- [ ] Memoize'lı arama indeksi (Fuse.js veya basit token index)

## Aşama 4 — Tasarım Sistemi (UI Atomları)

- [ ] Button, IconButton
- [ ] Card, Panel, Section
- [ ] Tooltip, Popover, Modal, Drawer
- [ ] Tabs, Accordion, Breadcrumb
- [ ] Input, Select, Combobox, SearchBar
- [ ] Badge (rarity), Stat row, KeyValue list
- [ ] Skeleton ve Spinner
- [ ] PageHeader, EmptyState, ErrorBoundary
- [ ] Animasyon utilleri (FadeIn, Stagger, Reveal)

## Aşama 5 — Sayfalar (her biri ayrı dosya, ayrı PR)

### 5.1 Ana Sayfa
- [ ] Hero (video/parallax + logo + slogan + CTA)
- [ ] Hızlı erişim kartları (15 sayfa için kategori grid)
- [ ] Son güncellemeler / haber akışı bölmesi
- [ ] Topluluk istatistikleri (varsa)
- [ ] Newsletter / Discord CTA

### 5.2 Rehber
- [ ] İç route yapısı: `/rehber/:konu`
- [ ] Yeni başlayan rehberi, ileri seviye rehberi, mini rehberler
- [ ] İçerik için MDX desteği (görsel + metin karışık)
- [ ] İçindekiler tablosu, kaydırmaya göre aktif başlık

### 5.3 Sınıflar
- [ ] Sınıf listesi (kart grid)
- [ ] Sınıf detay sayfası (ikon, lore, beceriler, build önerileri)
- [ ] Sınıf karşılaştırma aracı

### 5.4 Crafting / Gathering
- [ ] Meslek listesi
- [ ] Tarif sistemi (recipe browser, filtre, arama)
- [ ] Kaynak haritası (varsa konum verisi)

### 5.5 Zindanlar / Bosslar
- [ ] Zindan listesi (zorluk, level)
- [ ] Boss detay sayfası (mekanikler, drop tablosu, yetenekler)
- [ ] Drop tablosu item DB ile bağlanır

### 5.6 İtemler
- [ ] Item kataloğu (kategori filtresi, level filtresi, arama)
- [ ] Detay sayfası: stats, tooltip, eşdeğerler
- [ ] Karşılaştırma aracı (yan yana iki item)

### 5.7 Craft Hesaplama
- [ ] Tarif seçici
- [ ] Miktar girişi, alt-tarif zinciri çözümü
- [ ] Toplam materyal listesi + maliyet tahmini
- [ ] Sonucu paylaşılabilir link olarak çıkar

### 5.8 Binekler / Petler
- [ ] Liste + detay (binek)
- [ ] Liste + detay (pet)
- [ ] Skill / passive görüntüleme

### 5.9 Denizcilik
- [ ] Gemi tipleri
- [ ] Deniz mekanikleri rehberi
- [ ] Harita (varsa)

### 5.10 Kervan Sistemi
- [ ] Kervan kuralları açıklaması
- [ ] Rota / mesafe / risk hesaplayıcısı

### 5.11 Level Kasma Sistemi
- [ ] Level rehberi (1–max aralık aralık)
- [ ] Bölge önerileri, görev zinciri

### 5.12 Galeri
- [ ] Görsel grid (lightbox, zoom, fullscreen)
- [ ] Video bölümü
- [ ] Kullanıcı yüklemesi (sonraki sürüm)

### 5.13 Sistem Gereksinimleri / Optimizasyon
- [ ] Min / Önerilen tablo
- [ ] Ayar önerileri (donanım sınıfına göre)
- [ ] FPS artırma rehberi

### 5.14 Vawraek Technology Hakkında
- [ ] Stüdyo özeti (kuruluş, ekip, projeler)
- [ ] Zaman çizelgesi (oyun gelişim aşamaları)

### 5.15 İletişim
- [ ] Resmi kanal listesi (Discord, sosyal medya)
- [ ] Geri bildirim formu (statik mailto veya form servisi)
- [ ] Wiki katkı çağrısı

## Aşama 6 — Etkileşim ve Animasyon

- [ ] Sayfa geçiş animasyonu
- [ ] Hero parallax / particle (anasayfa)
- [ ] Item kartı hover (3D tilt veya glow)
- [ ] Tooltip animasyonu (rarity'ye göre renk)
- [ ] Loading shimmer
- [ ] Easter egg (kullanıcı isterse)

## Aşama 7 — SEO ve Paylaşım

- [ ] react-helmet ile meta yönetimi
- [ ] hreflang etiketleri 13 dil için
- [ ] sitemap.xml ve robots.txt üretimi
- [ ] OG image üretici (sayfa başına)
- [ ] JSON-LD structured data

## Aşama 8 — Performans

- [ ] Route bazlı code splitting
- [ ] Görselleri WebP'ye dönüştürme + sprite
- [ ] Bundle analiz, ağır bağımlılıkları kırp
- [ ] Lighthouse 90+ hepsi

## Aşama 9 — Test ve Yayın

- [ ] Vitest + Testing Library smoke testleri
- [ ] CI (GitHub Actions): lint, typecheck, test, build
- [ ] Staging deploy
- [ ] İçerik doğrulama turu
- [ ] Production deploy

## Aşama 10 — Sürüm Sonrası

- [ ] Açık tema
- [ ] Topluluk katkı sistemi (PR akışı / wiki editor)
- [ ] Analytics (gizliliğe saygılı, örn. Plausible)
- [ ] Yorum sistemi (opsiyonel)
- [ ] Kullanıcı hesabı / favori (opsiyonel)
