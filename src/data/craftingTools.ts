/**
 * Gathering tool tiers — extracted from item_tablosu (Tool entries).
 * Quinfall has 5 tool families × 3 quality tiers (Basic / Sturdy /
 * Advanced). Each tier raises the grade of resource node you can
 * harvest and the chance of rare drops.
 */
export interface ToolTier {
  level: 1 | 25 | 50;
  grade: number;
  /** Pure stable id for icon/translation lookups */
  id: 'basic' | 'sturdy' | 'advanced';
}

export interface ToolFamily {
  id: 'axe' | 'pickaxe' | 'sickle' | 'fishingRod' | 'huntingKnife';
  /** Profession this tool serves */
  feeds: 'logging' | 'mining' | 'harvesting' | 'fishing' | 'hunting';
  /** Lucide icon to use in the card header */
  icon: 'anvil';
  accent: string;
  /** Three quality tiers */
  tiers: ToolTier[];
}

export const TOOL_FAMILIES: ToolFamily[] = [
  {
    id: 'axe',
    feeds: 'logging',
    icon: 'anvil',
    accent: 'border-emerald-400/55 from-emerald-500/15',
    tiers: [
      { level: 1,  grade: 30, id: 'basic'    },
      { level: 25, grade: 50, id: 'sturdy'   },
      { level: 50, grade: 70, id: 'advanced' },
    ],
  },
  {
    id: 'pickaxe',
    feeds: 'mining',
    icon: 'anvil',
    accent: 'border-amber-400/55 from-amber-500/15',
    tiers: [
      { level: 1,  grade: 30, id: 'basic'    },
      { level: 25, grade: 50, id: 'sturdy'   },
      { level: 50, grade: 70, id: 'advanced' },
    ],
  },
  {
    id: 'sickle',
    feeds: 'harvesting',
    icon: 'anvil',
    accent: 'border-lime-400/55 from-lime-500/15',
    tiers: [
      { level: 1,  grade: 30, id: 'basic'    },
      { level: 25, grade: 50, id: 'sturdy'   },
      { level: 50, grade: 70, id: 'advanced' },
    ],
  },
  {
    id: 'fishingRod',
    feeds: 'fishing',
    icon: 'anvil',
    accent: 'border-cyan-400/55 from-cyan-500/15',
    tiers: [
      { level: 1,  grade: 30, id: 'basic'    },
      { level: 25, grade: 50, id: 'sturdy'   },
      { level: 50, grade: 70, id: 'advanced' },
    ],
  },
  {
    id: 'huntingKnife',
    feeds: 'hunting',
    icon: 'anvil',
    accent: 'border-rose-400/55 from-rose-500/15',
    tiers: [
      { level: 1,  grade: 30, id: 'basic'    },
      { level: 25, grade: 50, id: 'sturdy'   },
      { level: 50, grade: 70, id: 'advanced' },
    ],
  },
];

/**
 * Gathering professions that only collect raw nodes (no recipes in
 * craft_tablosu, so they're not in CRAFTING_TIERS). Used by the flow
 * diagram to find an icon + display name for the "gather" step.
 */
export const GATHERING_ICONS: Record<string, string> = {
  mining:     'material_icon1_12303', // Demir Cevheri / Iron Ore
  harvesting: 'material_icon1_11401',
  hunting:    'item_icon1_0_6403',
};

/** Production-flow groups — gather → process → craft chain visualised */
export interface FlowChain {
  id: 'metal' | 'wood' | 'leather' | 'fabric' | 'food' | 'gem' | 'essence';
  steps: { id: string; family: 'gather' | 'process' | 'craft' }[];
  accent: string;
}

export const FLOW_CHAINS: FlowChain[] = [
  { id: 'metal',   accent: 'from-frost-500/15 border-frost-400/45',
    steps: [
      { id: 'mining',        family: 'gather'  },
      { id: 'smelting',      family: 'process' },
      { id: 'blacksmithing', family: 'craft'   },
    ] },
  { id: 'wood',    accent: 'from-emerald-500/15 border-emerald-400/45',
    steps: [
      { id: 'logging',       family: 'gather'  },
      { id: 'logging',       family: 'process' },
      { id: 'carpentry',     family: 'craft'   },
    ] },
  { id: 'leather', accent: 'from-rose-500/15 border-rose-400/45',
    steps: [
      { id: 'hunting',       family: 'gather'  },
      { id: 'tanning',       family: 'process' },
      { id: 'tailoring',     family: 'craft'   },
    ] },
  { id: 'fabric',  accent: 'from-purple-500/15 border-purple-400/45',
    steps: [
      { id: 'harvesting',    family: 'gather'  },
      { id: 'spinning',      family: 'process' },
      { id: 'tailoring',     family: 'craft'   },
    ] },
  { id: 'food',    accent: 'from-amber-500/15 border-amber-400/45',
    steps: [
      { id: 'fishing',       family: 'gather'  },
      { id: 'tanning',       family: 'process' },
      { id: 'cooking',       family: 'craft'   },
    ] },
  { id: 'gem',     accent: 'from-frost-500/20 border-frost-400/55',
    steps: [
      { id: 'mining',        family: 'gather'  },
      { id: 'gemcutting',    family: 'process' },
      { id: 'jewelcrafting', family: 'craft'   },
    ] },
  { id: 'essence', accent: 'from-purple-500/20 border-purple-400/55',
    steps: [
      { id: 'harvesting',    family: 'gather'  },
      { id: 'essence-refining', family: 'process' },
      { id: 'alchemy',       family: 'craft'   },
    ] },
];

/** Major level milestones every player should mark on their profession run */
export const PROF_MILESTONES = [
  { level: 1,  groupId: 't1Open' },
  { level: 9,  groupId: 't2Combat' },
  { level: 15, groupId: 't2Alchemy' },
  { level: 20, groupId: 't2Smelt' },
  { level: 21, groupId: 't3Smith' },
  { level: 30, groupId: 't2Gem' },
  { level: 40, groupId: 't3Cook' },
  { level: 50, groupId: 'sturdyTool' },
  { level: 60, groupId: 't3Cap' },
  { level: 70, groupId: 't3Jewel' },
];
