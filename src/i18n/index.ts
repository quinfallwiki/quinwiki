import i18n, { type Resource } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import {
  DEFAULT_LANGUAGE,
  FALLBACK_LANGUAGE,
  LANGUAGE_CODES,
  type LanguageCode,
} from '@/i18n/languages';

import trCommon from '@/i18n/locales/tr/common.json';
import trHome from '@/i18n/locales/tr/home.json';
import trClasses from '@/i18n/locales/tr/classes.json';
import trMounts from '@/i18n/locales/tr/mounts.json';
import trCrafting from '@/i18n/locales/tr/crafting.json';
import trCraftCalc from '@/i18n/locales/tr/craftCalc.json';
import trGallery from '@/i18n/locales/tr/gallery.json';
import trDungeons from '@/i18n/locales/tr/dungeons.json';
import trCaravan from '@/i18n/locales/tr/caravan.json';
import trSailing from '@/i18n/locales/tr/sailing.json';
import trGuide from '@/i18n/locales/tr/guide.json';
import trItems from '@/i18n/locales/tr/items.json';
import trLeveling from '@/i18n/locales/tr/leveling.json';
import trSystem from '@/i18n/locales/tr/system.json';
import trStudio from '@/i18n/locales/tr/studio.json';
import trContact from '@/i18n/locales/tr/contact.json';
import trUpdates from '@/i18n/locales/tr/updates.json';
import enCommon from '@/i18n/locales/en/common.json';
import enHome from '@/i18n/locales/en/home.json';
import enClasses from '@/i18n/locales/en/classes.json';
import enMounts from '@/i18n/locales/en/mounts.json';
import enCrafting from '@/i18n/locales/en/crafting.json';
import enCraftCalc from '@/i18n/locales/en/craftCalc.json';
import enGallery from '@/i18n/locales/en/gallery.json';
import enDungeons from '@/i18n/locales/en/dungeons.json';
import enCaravan from '@/i18n/locales/en/caravan.json';
import enSailing from '@/i18n/locales/en/sailing.json';
import enGuide from '@/i18n/locales/en/guide.json';
import enItems from '@/i18n/locales/en/items.json';
import enLeveling from '@/i18n/locales/en/leveling.json';
import enSystem from '@/i18n/locales/en/system.json';
import enStudio from '@/i18n/locales/en/studio.json';
import enContact from '@/i18n/locales/en/contact.json';
import enUpdates from '@/i18n/locales/en/updates.json';
import deCommon from '@/i18n/locales/de/common.json';
import deHome from '@/i18n/locales/de/home.json';
import deClasses from '@/i18n/locales/de/classes.json';
import deMounts from '@/i18n/locales/de/mounts.json';
import deCrafting from '@/i18n/locales/de/crafting.json';
import deCraftCalc from '@/i18n/locales/de/craftCalc.json';
import deGallery from '@/i18n/locales/de/gallery.json';
import deDungeons from '@/i18n/locales/de/dungeons.json';
import deCaravan from '@/i18n/locales/de/caravan.json';
import deSailing from '@/i18n/locales/de/sailing.json';
import deGuide from '@/i18n/locales/de/guide.json';
import deItems from '@/i18n/locales/de/items.json';
import deLeveling from '@/i18n/locales/de/leveling.json';
import deSystem from '@/i18n/locales/de/system.json';
import deStudio from '@/i18n/locales/de/studio.json';
import deContact from '@/i18n/locales/de/contact.json';
import deUpdates from '@/i18n/locales/de/updates.json';
import ruCommon from '@/i18n/locales/ru/common.json';
import ruHome from '@/i18n/locales/ru/home.json';
import ruClasses from '@/i18n/locales/ru/classes.json';
import ruMounts from '@/i18n/locales/ru/mounts.json';
import ruCrafting from '@/i18n/locales/ru/crafting.json';
import ruCraftCalc from '@/i18n/locales/ru/craftCalc.json';
import ruGallery from '@/i18n/locales/ru/gallery.json';
import ruDungeons from '@/i18n/locales/ru/dungeons.json';
import ruCaravan from '@/i18n/locales/ru/caravan.json';
import ruSailing from '@/i18n/locales/ru/sailing.json';
import ruGuide from '@/i18n/locales/ru/guide.json';
import ruItems from '@/i18n/locales/ru/items.json';
import ruLeveling from '@/i18n/locales/ru/leveling.json';
import ruSystem from '@/i18n/locales/ru/system.json';
import ruStudio from '@/i18n/locales/ru/studio.json';
import ruContact from '@/i18n/locales/ru/contact.json';
import ruUpdates from '@/i18n/locales/ru/updates.json';

const PRELOADED_NAMESPACES = [
  'common',
  'home',
  'classes',
  'mounts',
  'crafting',
  'craftCalc',
  'gallery',
  'dungeons',
  'caravan',
  'sailing',
  'guide',
  'items',
  'leveling',
  'system',
  'studio',
  'contact',
  'updates',
] as const;

const PRELOADED_RESOURCES: Resource = {
  tr: {
    common: trCommon,
    home: trHome,
    classes: trClasses,
    mounts: trMounts,
    crafting: trCrafting,
    craftCalc: trCraftCalc,
    gallery: trGallery,
    dungeons: trDungeons,
    caravan: trCaravan,
    sailing: trSailing,
    guide: trGuide,
    items: trItems,
    leveling: trLeveling,
    system: trSystem,
    studio: trStudio,
    contact: trContact,
    updates: trUpdates,
  },
  en: {
    common: enCommon,
    home: enHome,
    classes: enClasses,
    mounts: enMounts,
    crafting: enCrafting,
    craftCalc: enCraftCalc,
    gallery: enGallery,
    dungeons: enDungeons,
    caravan: enCaravan,
    sailing: enSailing,
    guide: enGuide,
    items: enItems,
    leveling: enLeveling,
    system: enSystem,
    studio: enStudio,
    contact: enContact,
    updates: enUpdates,
  },
  de: {
    common: deCommon,
    home: deHome,
    classes: deClasses,
    mounts: deMounts,
    crafting: deCrafting,
    craftCalc: deCraftCalc,
    gallery: deGallery,
    dungeons: deDungeons,
    caravan: deCaravan,
    sailing: deSailing,
    guide: deGuide,
    items: deItems,
    leveling: deLeveling,
    system: deSystem,
    studio: deStudio,
    contact: deContact,
    updates: deUpdates,
  },
  ru: {
    common: ruCommon,
    home: ruHome,
    classes: ruClasses,
    mounts: ruMounts,
    crafting: ruCrafting,
    craftCalc: ruCraftCalc,
    gallery: ruGallery,
    dungeons: ruDungeons,
    caravan: ruCaravan,
    sailing: ruSailing,
    guide: ruGuide,
    items: ruItems,
    leveling: ruLeveling,
    system: ruSystem,
    studio: ruStudio,
    contact: ruContact,
    updates: ruUpdates,
  },
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: PRELOADED_RESOURCES,
    fallbackLng: FALLBACK_LANGUAGE,
    supportedLngs: LANGUAGE_CODES,
    defaultNS: 'common',
    ns: PRELOADED_NAMESPACES as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'quinwiki-lang',
    },
    react: { useSuspense: false },
  });

export function ensureLanguage(lang: LanguageCode): void {
  if (i18n.language === lang) return;
  void i18n.changeLanguage(lang);
}

export { DEFAULT_LANGUAGE };
export default i18n;
