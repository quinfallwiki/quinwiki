# Geliştirme Kuralları — QuinWiki

Bu dosya projenin tamamı boyunca uyulması gereken mühendislik ve kalite kurallarını tanımlar. Her kararda önce bu dosyaya bakılır.

---

## 1. Mimarî Kurallar

1.1. **Tek dosyada her şey yasak.** Her sayfa, her bölüm, her büyük bileşen kendi dosyasında yaşar. 300 satırı aşan bileşen bölünür.

1.2. **Klasör yapısı sorumluluk bazlıdır:**
   - `src/pages/` — yalnızca sayfa-seviyesi (route) bileşenleri
   - `src/components/` — yeniden kullanılabilir UI parçaları
   - `src/components/ui/` — atomik öğeler (Button, Card, Tooltip, Modal, ...)
   - `src/features/<özellik>/` — bir alana ait bileşen + hook + util topluluğu (örn. `features/craft-calc/`)
   - `src/data/` — statik veri ve JSON yükleyiciler
   - `src/i18n/` — çeviri dosyaları ve dil motoru
   - `src/hooks/` — yeniden kullanılabilir custom hook'lar
   - `src/lib/` — saf yardımcı fonksiyonlar (formatter, parser, math)
   - `src/styles/` — global stil ve tema değişkenleri
   - `src/assets/` — ikon, logo, video, ses

1.3. **Bir bileşen bir iş yapar.** Veri çekme + UI + state yönetimi tek bileşende olmaz; ayrı katmanlara bölünür (custom hook + presentational component).

1.4. **Sayfalar yalnızca yerleşim ve veri akışını koordine eder.** Asıl iş özellik bileşenlerinde yapılır.

1.5. **Magic number ve magic string kullanma.** Sabitler `src/constants/` altında veya ilgili modülde `const` olarak adlandırılır.

---

## 2. Kod Kalitesi

2.1. Her dosyanın en üstünde import sırası: 1) framework, 2) üçüncü parti, 3) iç modüller, 4) tipler, 5) stiller. Aralarda boş satır.

2.2. Bileşen isimleri PascalCase, hook'lar `useXyz`, util fonksiyonları camelCase, sabitler UPPER_SNAKE_CASE.

2.3. **Erken çıkış kullan**, derin nesting yasak. 3 seviyeden derin if/else görüldüğünde refactor zorunludur.

2.4. **TypeScript zorunlu.** `any` kullanımı yasak; gerekiyorsa `unknown` + type guard. JSON'dan yüklenen veriler tipleri tanımlanmış arayüzlere parse edilir.

2.5. Saf fonksiyonlar tercih edilir. Yan etkiler ve global state mümkün olduğunca dar kapsamlıdır.

2.6. Türkçe değişken adı yok. Kod İngilizce, içerik (i18n string) çok dilli.

2.7. Yorum yazılmaz; isimlendirme ile anlam taşınır. Sadece "neden" gerçekten gerekiyorsa kısa yorum eklenir.

---

## 3. Stil ve Görsellik

3.1. Tasarım sistemi tek bir tema dosyasından yönetilir: renk paleti, tipografi, spacing, radius, shadow, motion süreleri tek kaynaktan.

3.2. **Dark theme öncelikli**, "fantasy MMORPG" estetiği. Açık tema bir sürüm sonra gelir, mimari engellemez.

3.3. CSS yöntemi: utility (Tailwind) + tema değişkenleri. Inline style yasak (bir dinamik değer hariç).

3.4. Animasyon kütüphanesi tek bir araçla yapılır (Framer Motion). Birden fazla animasyon kütüphanesi karıştırılmaz.

3.5. **Performans için animasyon:**
   - 60fps hedef. Drop algılanırsa animasyon basitleştirilir.
   - `prefers-reduced-motion` desteklenir, kullanıcının seçimi onurlandırılır.
   - Ağır parallax/particle efektleri yalnızca düşük yüklü sayfalarda.

3.6. Responsive zorunlu: 360px (mobil), 768px (tablet), 1280px (desktop), 1920px (geniş). Her sayfa üç kırılımda da test edilir.

3.7. Görseller `loading="lazy"` ve uygun boyut/format. PNG ikonlar atlas/sprite veya `<img>` ile; tercihen WebP'ye dönüştürülmüş kopya da bulundurulur.

---

## 4. Çoklu Dil (i18n)

4.1. **Hardcoded metin yasak.** UI'daki her metin `t('anahtar.yolu')` veya eşdeğeri ile gelir.

4.2. Desteklenen diller (öncelik sırası): Türkçe, İngilizce, Almanca, Rusça, Fransızca, İtalyanca, İspanyolca, Portekizce, Lehçe, Ukraynaca, Çince, Japonca, Korece. Toplam 13.

4.3. Item/material isimleri `item_kaynak_db.json` içindeki `..._loc_<Dil>` alanlarından okunur — UI çevirileri ile karıştırılmaz.

4.4. URL yapısı `/:lang/:page` şeklindedir. Dil değişimi sayfa değiştirmez, sadece prefiksi günceller.

4.5. Eksik çeviri varsa İngilizce'ye fallback; konsola log düşer, sayfada bir şey kırılmaz.

4.6. Tarih/sayı formatları `Intl` API ile dile göre.

---

## 5. Veri Katmanı

5.1. Büyük JSON (`item_kaynak_db.json`) sayfa açılışında değil, ilgili sayfa istendiğinde tembel yüklenir (dynamic import veya fetch).

5.2. JSON katmanı için bir veri erişim modülü: `src/data/items.ts` — `getItemById`, `searchItems`, `getItemsByType` gibi fonksiyonlar dışa açılır. Sayfalar JSON yapısını doğrudan bilmez.

5.3. JSON şeması TypeScript arayüzü olarak tanımlanır; runtime'da Zod (veya benzeri) ile doğrulanır.

5.4. İkon yolu çözümü tek bir helper'dan: `getIconPath(item.icon1)` → `/assets/icons/<dosya>.png`. Tek noktadan değiştirilir.

5.5. Çoklu fitre/arama indeksleri `useMemo` veya bir worker ile build edilir. Render içinde `O(n)`'den ağır iş yasak.

---

## 6. Performans

6.1. İlk yüklemede 200KB JS gz'lenmiş üzeri görüldüğünde refactor. Route bazlı code splitting zorunlu.

6.2. Büyük listelerde virtualization (react-virtuoso veya benzeri).

6.3. Görseller WebP + lazy + `srcset`.

6.4. Lighthouse hedefleri: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.

---

## 7. Erişilebilirlik

7.1. Renk kontrastı WCAG AA minimum.

7.2. Klavye navigasyonu her sayfada çalışır. Focus ring görünür.

7.3. `alt`, `aria-label`, `role` doğru kullanılır.

7.4. Modal ve dropdown'lar focus-trap'lidir, ESC ile kapanır.

---

## 8. SEO

8.1. Her sayfada benzersiz `<title>`, `<meta description>`, OpenGraph, Twitter card.

8.2. JSON-LD structured data (oyun, makale, FAQ türlerinde uygun yerlerde).

8.3. `sitemap.xml` ve `robots.txt` üretilir; `hreflang` etiketleri tüm dillere konur.

8.4. Görsellerin `alt` metni dile uyar.

---

## 9. Test ve Doğrulama

9.1. Her özellik bileşeninin en az bir smoke testi olur (Vitest + Testing Library).

9.2. JSON yükleyici ve i18n motoru için unit test zorunlu.

9.3. PR'a girmeden önce: `tsc --noEmit`, `eslint`, `prettier --check`, `vitest run` hepsi yeşil.

---

## 10. Yasaklar

10.1. Yapay zekâ kaynak referansı yasak. Kodda, yorumda, içerikte, commit mesajında "AI", "ChatGPT", "Claude", "GPT" gibi geçmez.

10.2. Alıntı/site URL'i içerikte belirtilmez. Bilgiler doğrulanır ama kaynak listesi sayfaya konmaz.

10.3. Doğrulanmamış veri yayımlanmaz. Bir bilgi en az iki bağımsız kaynaktan teyit edilir; teyit edilemezse "TBD" olarak işaretlenir, kullanıcıya sorulur.

10.4. `console.log` production build'e sızmaz.

10.5. Kullanıma alınmamış kod, ölü import, yorum satırına alınmış blok yasak.

10.6. Spagetti yasak: bir bileşen başka bileşenin internal state'ine elini sokmaz; iletişim props/context/event ile.

---

## 11. Git ve Süreç

11.1. Anlamlı, küçük commit'ler. Bir commit bir mantıksal değişiklik.

11.2. Branch isimleri: `feat/...`, `fix/...`, `refactor/...`, `chore/...`.

11.3. PR açıklamasında: ne, neden, nasıl test edildi.

11.4. Geri alınması zor işlemler (force push, hard reset, prod deploy) kullanıcıya sorulmadan yapılmaz.

---

## 12. İçerik Doğruluğu

12.1. Oyun içeriği (sınıflar, bosslar, eşyalar, sistemler) yayımlamadan önce iki bağımsız kaynaktan doğrulanır.

12.2. Resmi olmayan/spekülatif bilgi etiketlenir veya yayımlanmaz.

12.3. Kullanıcı düzeltme verirse içerik anında güncellenir; ilgili dosya `data/` altında tek noktadan yönetilir.

12.4. Ekran görüntüsü, video, logo gibi telif barındırabilecek varlıklar yalnızca açık izinli kullanılır.
