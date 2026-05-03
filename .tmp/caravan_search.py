"""Find all caravan/wagon-related items in items.json + ICON folder."""
import json, sys, io, os, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'C:/Users/tr/Desktop/QuinWiki/public/data/items.json', encoding='utf-8') as f:
    d = json.load(f)

print('=== Tables with city/caravan refs ===')
for k in d.keys():
    if any(x in k for x in ['sehir', 'liman', 'kervan', 'portal']):
        print(f'  {k}: {len(d[k])}')

# Cities
if 'buyuk_sehir_tablosu' in d:
    print('\n=== buyuk_sehir_tablosu (büyük şehirler) ===')
    for it in d['buyuk_sehir_tablosu']:
        en = it.get('baslik_loc_English','') or ''
        tr = it.get('baslik_loc_Turkish','') or ''
        print(f"  id={str(it.get('id') or ''):<6} EN={en:<30} TR={tr}")

if 'kucuk_sehir_tablosu' in d:
    print('\n=== kucuk_sehir_tablosu (küçük şehirler) ===')
    for it in d['kucuk_sehir_tablosu'][:30]:
        en = it.get('baslik_loc_English','') or ''
        tr = it.get('baslik_loc_Turkish','') or ''
        print(f"  id={str(it.get('id') or ''):<6} EN={en:<30} TR={tr}")

if 'liman_tablosu' in d:
    print('\n=== liman_tablosu (limanlar) ===')
    for it in d['liman_tablosu']:
        en = it.get('baslik_loc_English','') or ''
        tr = it.get('baslik_loc_Turkish','') or ''
        print(f"  id={str(it.get('id') or ''):<6} EN={en:<30} TR={tr}")

# Search items for "caravan/package/wagon/trade"
print('\n=== Items with caravan/wagon/package/trade ===')
needle = re.compile(r'caravan|wagon|package|kervan|paket|tüccar|merchant|trade', re.I)
seen = 0
for table_key in ['item_tablosu', 'material_tablosu', 'prop_tablosu', 'binek_tablosu', 'craft_tablosu']:
    if table_key not in d: continue
    for it in d[table_key]:
        en = it.get('baslik_loc_English','') or ''
        tr = it.get('baslik_loc_Turkish','') or ''
        if needle.search(en) or needle.search(tr):
            icon = it.get('icon1', '')
            print(f"  [{table_key}] id={it.get('id','')}  EN={en:<40} TR={tr:<40} icon={icon}")
            seen += 1
            if seen >= 50: break
    if seen >= 50: break
