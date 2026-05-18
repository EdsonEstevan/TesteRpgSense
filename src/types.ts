export interface MemberHP {
  current: number;
  max: number;
}

export interface Attributes {
  fisico: number;
  mental: number;
  oculto: number;
  luta: number;
}

export interface SubAttributes {
  // Fisico
  agilidade: number;
  resistencia: number;
  forca: number;
  // Mental
  interpessoal: number;
  inteligencia: number;
  sabedoria: number;
  // Luta
  briga: number;
  foco: number;
}

export interface Character {
  name: string;
  gender: string;
  characterClass: string;
  age: string;
  origin: string;
  tributo: string;
  profession: string;
  level: number;
  height: string;
  pt: number;
  rankGeral: string;
  rankTributo: string;
  
  memberHP: {
    cabeca: MemberHP;
    tronco: MemberHP;
    costas: MemberHP;
    braçoD: MemberHP;
    braçoE: MemberHP;
    pernaD: MemberHP;
    pernaE: MemberHP;
  };
  
  attributes: Attributes;
  subAttributes: SubAttributes;
  
  skills: { [key: string]: number };
  inventory: string[];
  equipment: {
    weapons: { name: string; damage: string; critical: string; weight: string }[];
    armor: { name: string; protection: string; penalty: string; cost: string }[];
  };
  talents: string[];
  classSkills: string[];
  history: string;
}

export const INITIAL_CHARACTER: Character = {
  name: "",
  gender: "",
  characterClass: "",
  age: "",
  origin: "",
  tributo: "",
  profession: "",
  level: 1,
  height: "",
  pt: 0,
  rankGeral: "E",
  rankTributo: "E",
  memberHP: {
    cabeca: { current: 12, max: 12 },
    tronco: { current: 20, max: 20 },
    costas: { current: 20, max: 20 },
    braçoD: { current: 16, max: 16 },
    braçoE: { current: 16, max: 16 },
    pernaD: { current: 18, max: 18 },
    pernaE: { current: 18, max: 18 },
  },
  attributes: {
    fisico: 10,
    mental: 10,
    oculto: 10,
    luta: 10,
  },
  subAttributes: {
    agilidade: 0,
    resistencia: 0,
    forca: 0,
    interpessoal: 0,
    inteligencia: 0,
    sabedoria: 0,
    briga: 0,
    foco: 0,
  },
  skills: {},
  inventory: [],
  equipment: {
    weapons: [],
    armor: [],
  },
  talents: [],
  classSkills: [],
  history: "",
};
