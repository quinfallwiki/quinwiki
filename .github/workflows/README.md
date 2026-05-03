# Otomatik Patch Notları Yenileme

Bu klasördeki `refresh-patch-notes.yml` workflow'u **Steam haber feed'ini günde
bir kez otomatik çekip çevirir** — herhangi bir manuel komut çalıştırmana gerek
kalmaz.

## Nasıl çalışır

```
03:15 UTC her gün
   ↓
GitHub Actions workflow tetiklenir
   ↓
1) python scripts/fetch-patch-notes.py
       — Steam'den 4 dilde RSS çeker
       — Eksik/İngilizce kalan diller için Google Translate ücretsiz
         endpoint'i ile EN → TR/DE/RU çeviri yapar
2) public/data/patch-notes.json'da değişiklik var mı kontrol eder
3) Varsa → quinwiki-bot adıyla otomatik commit + push
   ↓
Push, hosting sağlayıcına (Vercel/Netlify/Cloudflare Pages) yeni deploy
tetikletir → site dakikalar içinde güncel patch'lerle canlı olur.
```

`[skip ci]` etiketi commit message'a eklendiği için kendi kendini sonsuz
döngüye sokmaz.

## Kurulum

1. Repo'yu GitHub'a push'la (henüz değilse):
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin git@github.com:<KULLANICI>/<REPO>.git
   git push -u origin main
   ```
2. **Hiçbir manuel adım gerekmez** — workflow GitHub'a push'tan sonra otomatik
   görünür ve `cron` tetikleyicisi çalışmaya başlar. İlk testi
   _Actions → Refresh Steam patch notes → Run workflow_ ile manuel başlat.

## Manuel tetikleme

GitHub web arayüzünde:
- Actions sekmesi → "Refresh Steam patch notes" workflow'u → "Run workflow"
butonu

Veya CLI ile:
```bash
gh workflow run refresh-patch-notes.yml
```

## Yerel olarak da çekmek istersen

```bash
python -X utf8 scripts/fetch-patch-notes.py
```
Çıktı: `public/data/patch-notes.json` (~78 KB, son 30 patch × 4 dil).

## Hosting otomatik deploy ayarı

Workflow JSON dosyasını commit ettiğinde push tetikleneceği için
hosting sağlayıcının "auto-deploy on main push" özelliğinin açık olması yeter:

- **Vercel**: default davranış, hiçbir ayar gerekmez
- **Netlify**: Site Settings → Build & deploy → Continuous Deployment → varsayılan ayarda zaten açık
- **Cloudflare Pages**: Build configuration → "Production branch deployments"
  açık olmalı (varsayılan)

## Maliyet

- **Public repo**: GitHub Actions sınırsız ücretsiz dakika
- **Private repo**: Ayda 2000 ücretsiz dakika; bu workflow ~30 saniye sürer →
  yılda ~3 saat = sınırın çok altında
- Google Translate public endpoint ücretsiz, anahtarsız

Yani sıfır maliyetle çalışır.
