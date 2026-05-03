"""Cities use different field names."""
import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'C:/Users/tr/Desktop/QuinWiki/public/data/items.json', encoding='utf-8') as f:
    d = json.load(f)

print('=== buyuk_sehir_tablosu sample fields ===')
print(list(d['buyuk_sehir_tablosu'][0].keys()))

print('\n=== buyuk_sehir_tablosu items ===')
for it in d['buyuk_sehir_tablosu']:
    print(f"  {it}")

print('\n=== liman_tablosu items ===')
for it in d['liman_tablosu']:
    print(f"  {it}")

print('\n=== kucuk_sehir_tablosu items (first 5) ===')
for it in d['kucuk_sehir_tablosu'][:5]:
    print(f"  {it}")

# Quick check: do these have icons?
print('\n=== buyuk_sehir keys with values ===')
for it in d['buyuk_sehir_tablosu'][:3]:
    for k, v in it.items():
        if v:
            print(f'  {k} = {v}')
    print('---')
