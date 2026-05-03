export type PetTier = 'standard' | 'common' | 'uncommon' | 'rare' | 'legendary';

export const PET_TIERS: PetTier[] = ['standard', 'common', 'uncommon', 'rare', 'legendary'];

export interface PetCategory {
  id: string;
  kind: 'collector' | 'profession';
  professionKey?: string;
}

export const PET_CATEGORIES: PetCategory[] = [
  { id: 'collector', kind: 'collector' },
  { id: 'harvesting', kind: 'profession', professionKey: 'harvesting' },
  { id: 'logging', kind: 'profession', professionKey: 'logging' },
  { id: 'mining', kind: 'profession', professionKey: 'mining' },
  { id: 'fishing', kind: 'profession', professionKey: 'fishing' },
  { id: 'hunting', kind: 'profession', professionKey: 'hunting' },
  { id: 'alchemy', kind: 'profession', professionKey: 'alchemy' },
  { id: 'cooking', kind: 'profession', professionKey: 'cooking' },
];
