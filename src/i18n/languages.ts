export type LanguageCode = 'tr' | 'en' | 'de' | 'ru';

export interface LanguageDefinition {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
  itemDbField: 'Turkish' | 'English' | 'German' | 'Russian';
}

export const LANGUAGES: readonly LanguageDefinition[] = [
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe',  flag: 'TR', itemDbField: 'Turkish' },
  { code: 'en', label: 'English', nativeLabel: 'English', flag: 'GB', itemDbField: 'English' },
  { code: 'de', label: 'German',  nativeLabel: 'Deutsch', flag: 'DE', itemDbField: 'German' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский', flag: 'RU', itemDbField: 'Russian' },
] as const;

export const DEFAULT_LANGUAGE: LanguageCode = 'tr';
export const FALLBACK_LANGUAGE: LanguageCode = 'en';

export const LANGUAGE_CODES = LANGUAGES.map((l) => l.code);

export function isLanguageCode(value: string): value is LanguageCode {
  return (LANGUAGE_CODES as string[]).includes(value);
}

export function getLanguage(code: LanguageCode): LanguageDefinition {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}
