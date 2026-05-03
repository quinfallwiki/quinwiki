import json
with open(r'C:/Users/tr/Desktop/QuinWiki/public/data/items.json', encoding='utf-8') as f:
    d = json.load(f)

print('--- TABLE KEYS ---')
print(list(d.keys()))

# Inspect pet_tablosu
if 'pet_tablosu' in d:
    print(f"\n--- pet_tablosu ({len(d['pet_tablosu'])} items) ---")
    for it in d['pet_tablosu']:
        en = it.get('baslik_loc_English', '') or ''
        tr = it.get('baslik_loc_Turkish', '') or ''
        icon = it.get('icon1', '')
        print(f"  id={it.get('id','')} EN={en} | TR={tr} | icon={icon}")

# Search all tables for mount/horse/etc
needles = {
    'horse': 'horse|at\\b|mount',
    'donkey': 'donkey|esek|eşek',
    'camel': 'camel|deve',
    'elephant': 'elephant|fil',
    'fox': 'fox|tilki',
    'rabbit': 'rabbit|tavsan|tavşan',
    'rhino': 'rhino|gergedan',
    'bee': 'bee\\b|ari\\b|arı',
}
import re
print('\n--- SEARCH RESULTS ---')
for label, pattern in needles.items():
    pat = re.compile(pattern, re.I)
    print(f'\n[{label}]')
    found = 0
    for table_key, table in d.items():
        for it in table:
            en = (it.get('baslik_loc_English','') or '')
            tr = (it.get('baslik_loc_Turkish','') or '')
            if pat.search(en) or pat.search(tr):
                icon = it.get('icon1', '')
                if icon:
                    print(f"  {table_key} {it.get('id','')}: EN={en[:40]} TR={tr[:40]} icon={icon}")
                    found += 1
                    if found >= 5: break
        if found >= 5: break
