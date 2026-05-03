import json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
with open(r'C:/Users/tr/Desktop/QuinWiki/public/data/items.json', encoding='utf-8') as f:
    d = json.load(f)

print(f'binek_tablosu: {len(d["binek_tablosu"])} entries\n')
for it in d['binek_tablosu']:
    en = it.get('baslik_loc_English','') or ''
    tr = it.get('baslik_loc_Turkish','') or ''
    icon = it.get('icon1','')
    print(f'  id={it.get("id",""):<8} EN={en:<32} TR={tr:<32} icon={icon}')
