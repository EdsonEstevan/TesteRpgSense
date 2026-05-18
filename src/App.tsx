/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Shield, 
  Sword, 
  Zap, 
  BookOpen, 
  Backpack, 
  Scroll, 
  Heart, 
  Plus, 
  Trash2, 
  Save,
  RotateCcw,
  Target,
  Brain,
  Ghost,
  Activity,
  Upload,
  Download,
  Skull
} from 'lucide-react';
import { INITIAL_CHARACTER, Character } from './types';

import { SKILLS, SUB_ATTRIBUTES_MAP, ORIGINS, CLASSES_DATA, TALENTS, LEVEL_REWARDS, CLASS_ABILITIES } from './constants';

// Tab components
const TabButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all duration-200 border-b-2 ${
      active 
        ? 'border-brand text-brand bg-brand/10' 
        : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
    }`}
  >
    <Icon size={18} />
    <span className="hidden md:inline font-medium uppercase tracking-wider text-xs">{label}</span>
  </button>
);

const SectionTitle = ({ title, icon: Icon }: { title: string, icon?: any }) => (
  <div className="flex items-center gap-2 mb-4 border-l-4 border-brand pl-3">
    {Icon && <Icon size={20} className="text-brand" />}
    <h2 className="text-xl font-display font-bold uppercase italic">{title}</h2>
  </div>
);

export default function App() {
  const [char, setChar] = useState<Character>(() => {
    const saved = localStorage.getItem('sense-life-char');
    return saved ? JSON.parse(saved) : INITIAL_CHARACTER;
  });

  const [activeTab, setActiveTab] = useState('geral');

  useEffect(() => {
    localStorage.setItem('sense-life-char', JSON.stringify(char));
  }, [char]);

  const handleOriginChange = (origin: string) => {
    const originData = ORIGINS[origin as keyof typeof ORIGINS];
    if (!originData) return;
    
    let newChar = { ...char, origin };
    
    // Auto-apply skills from origin if any
    if (originData.bonuses && (originData.bonuses as any).skills) {
      const skills = (originData.bonuses as any).skills;
      Object.entries(skills).forEach(([skill, bonus]) => {
        newChar.skills = { ...newChar.skills, [skill]: (bonus as number) };
      });
    }

    setChar(newChar);
  };

  const handleClassChange = (className: string) => {
    const classData = CLASSES_DATA[className as keyof typeof CLASSES_DATA];
    if (!classData) return;

    let newChar = { ...char, characterClass: className, pt: classData.pt, classSkills: [] };
    
    // Auto-apply HP
    const hp = classData.hp;
    Object.entries(hp).forEach(([member, max]) => {
      (newChar.memberHP as any)[member] = { current: max, max };
    });

    setChar(newChar);
  };

  const getChoiceSlotPool = () => {
    let pool = 0;
    for (let i = 1; i <= char.level; i++) {
        const reward: any = (LEVEL_REWARDS as any)[i];
        if (reward?.choice) {
            const val: number = reward.choice;
            pool += val;
        }
        if (reward?.talent) {
            const val: number = reward.talent;
            pool += val;
        }
    }
    return pool;
  };

  const getChoiceSlotsSpent = () => {
    return char.talents.length + char.classSkills.length;
  };

  const exportCharacter = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(char));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `ficha_${char.name || 'personagem'}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importCharacter = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        setChar(json);
        alert('Ficha importada com sucesso!');
      } catch (err) {
        alert('Erro ao importar arquivo. Verifique se o formato está correto.');
      }
    };
    reader.readAsText(file);
  };

  const updateField = (path: string, value: any) => {
    const newChar = { ...char };
    const parts = path.split('.');
    let current: any = newChar;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    setChar(newChar);
  };

  const updateMemberHP = (member: string, field: 'current' | 'max', value: number) => {
    setChar(prev => ({
      ...prev,
      memberHP: {
        ...prev.memberHP,
        [member]: {
          ...prev.memberHP[member as keyof typeof prev.memberHP],
          [field]: value
        }
      }
    }));
  };

  const addWeapon = () => {
    setChar(prev => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        weapons: [...prev.equipment.weapons, { name: '', damage: '', critical: '', weight: '' }]
      }
    }));
  };

  const removeWeapon = (index: number) => {
    setChar(prev => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        weapons: prev.equipment.weapons.filter((_, i) => i !== index)
      }
    }));
  };

  const addItem = () => {
    setChar(prev => ({
      ...prev,
      inventory: [...prev.inventory, '']
    }));
  };

  const removeItem = (index: number) => {
    setChar(prev => ({
      ...prev,
      inventory: prev.inventory.filter((_, i) => i !== index)
    }));
  };

  const resetCharacter = () => {
    if (confirm('Tem certeza que deseja resetar a ficha? Todos os dados serão perdidos.')) {
      setChar(INITIAL_CHARACTER);
    }
  };

  const attributeLabels: Record<string, string> = {
    fisico: 'Físico',
    mental: 'Mental',
    oculto: 'Oculto',
    luta: 'Luta'
  };

  const subAttributeLabels: Record<string, string> = {
    agilidade: 'Agilidade',
    resistencia: 'Resistência',
    forca: 'Força',
    interpessoal: 'Interpessoal',
    inteligencia: 'Inteligência',
    sabedoria: 'Sabedoria',
    briga: 'Briga',
    foco: 'Foco'
  };

  const getModifier = (value: number) => {
    return value - 10;
  };

  const getSubAttributePool = (parentAttr: string) => {
    const parentValue = char.attributes[parentAttr as keyof typeof char.attributes] || 0;
    const subAttrs = SUB_ATTRIBUTES_MAP[parentAttr as keyof typeof SUB_ATTRIBUTES_MAP] || [];
    const spent = subAttrs.reduce((sum, key) => sum + (char.subAttributes[key as keyof typeof char.subAttributes] || 0), 0);
    return parentValue - spent;
  };

  const getAttributePointPool = () => {
    let pool = 10;
    
    // Origin bonus
    if (char.origin === "Pessoa Mundana") {
      pool += 4;
    }

    // Level rewards
    for (let i = 1; i <= char.level; i++) {
        const reward: any = (LEVEL_REWARDS as any)[i];
        if (reward?.attributePoints) {
            const val: number = reward.attributePoints;
            pool += val;
        }
    }

    return pool;
  };

  const getAttributePointsSpent = () => {
    return Object.values(char.attributes).reduce((sum: number, val: number) => sum + (val - 10), 0);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto mb-20">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-black/40 p-6 rounded-lg border border-white/10">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <Skull className="text-brand h-5 w-5" />
             <h1 className="text-2xl font-display font-bold italic uppercase tracking-tighter text-white">SENSE LIFE <span className="text-brand">v.0.1</span></h1>
           </div>
           <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Ficha de Jogador • RPG de Mesa Digital</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded border border-white/10 cursor-pointer transition-all text-[10px] font-bold uppercase text-gray-400 group">
            <Upload size={14} className="group-hover:text-brand" />
            IMPORTAR
            <input type="file" className="hidden" accept=".json" onChange={importCharacter} />
          </label>
          <button 
            onClick={exportCharacter}
            className="flex items-center gap-2 bg-brand/10 hover:bg-brand/20 px-4 py-2 rounded border border-brand/30 transition-all text-[10px] font-bold uppercase text-brand shadow-lg shadow-brand/10"
          >
            <Download size={14} />
            EXPORTAR
          </button>
          <div className="h-6 w-[1px] bg-white/10 mx-1" />
          <button onClick={() => {
            if(confirm("Deseja realmente limpar a ficha?")) setChar(INITIAL_CHARACTER);
          }} className="p-2 text-gray-600 hover:text-red-500 transition-colors" title="Resetar ficha">
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10 mb-6 overflow-x-auto scrollbar-hide">
        <TabButton active={activeTab === 'geral'} onClick={() => setActiveTab('geral')} icon={User} label="Geral" />
        <TabButton active={activeTab === 'atributos'} onClick={() => setActiveTab('atributos')} icon={Shield} label="Atributos" />
        <TabButton active={activeTab === 'pericias'} onClick={() => setActiveTab('pericias')} icon={Zap} label="Perícias" />
        <TabButton active={activeTab === 'habilidades'} onClick={() => setActiveTab('habilidades')} icon={Sword} label="Habilidades" />
        <TabButton active={activeTab === 'inventario'} onClick={() => setActiveTab('inventario')} icon={Backpack} label="Item & Equip" />
        <TabButton active={activeTab === 'historia'} onClick={() => setActiveTab('historia')} icon={Scroll} label="História" />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'geral' && (
          <motion.div
            key="geral"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Basic Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-card p-6 rounded-lg border border-white/5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nome</label>
                  <input value={char.name} onChange={e => updateField('name', e.target.value)} placeholder="Nome do Personagem" className="w-full" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Classe</label>
                  <select 
                    value={char.characterClass} 
                    onChange={e => handleClassChange(e.target.value)} 
                    className="w-full text-sm"
                  >
                    <option value="">Selecione uma Classe...</option>
                    {Object.keys(CLASSES_DATA).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Origem</label>
                  <select 
                    value={char.origin} 
                    onChange={e => handleOriginChange(e.target.value)} 
                    className="w-full text-sm"
                  >
                    <option value="">Selecione uma Origem...</option>
                    {Object.keys(ORIGINS).map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {char.origin && (
                    <p className="text-[10px] text-brand/70 italic mt-1">{ORIGINS[char.origin as keyof typeof ORIGINS].description}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Profissão</label>
                  <input value={char.profession} onChange={e => updateField('profession', e.target.value)} className="w-full" />
                </div>
                <div className="grid grid-cols-3 gap-2 sm:col-span-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nível</label>
                    <input type="number" value={char.level} onChange={e => updateField('level', parseInt(e.target.value))} className="w-full text-center" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Idade</label>
                    <input value={char.age} onChange={e => updateField('age', e.target.value)} className="w-full text-center" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Altura</label>
                    <input value={char.height} onChange={e => updateField('height', e.target.value)} className="w-full text-center" />
                  </div>
                </div>
              </div>

              {/* Level Rewards Display */}
              <div className="bg-card p-6 rounded-lg border border-white/5">
                <SectionTitle title="Recompensas Acumuladas" icon={BookOpen} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(LEVEL_REWARDS).map(([lvl, reward]) => {
                        const level = parseInt(lvl);
                        if (level > char.level) return null;
                        return (
                            <div key={lvl} className="text-[10px] flex items-center gap-2 p-2 bg-black/20 rounded border border-white/5 opacity-80">
                                <span className="font-bold text-brand w-8">Lvl {lvl}</span>
                                <span className="text-gray-400 italic">
                                    {(reward as any).attributePoints ? `+${(reward as any).attributePoints} Atrib. ` : ''}
                                    {(reward as any).choice ? `+${(reward as any).choice} Perícia/Talento ` : ''}
                                    {(reward as any).armor ? `+${(reward as any).armor} Armadura ` : ''}
                                    {(reward as any).skills ? `+${(reward as any).skills} Perícia ` : ''}
                                    {(reward as any).talent ? `+1 Talento ` : ''}
                                </span>
                            </div>
                        );
                    })}
                </div>
              </div>
            </div>

            {/* Ranks & HP Summary */}
            <div className="flex flex-col gap-6">
              <div className="bg-card p-6 rounded-lg border border-white/5 space-y-4">
                <SectionTitle title="Status" icon={Activity} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 p-3 rounded border border-brand/20 text-center">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Rank Geral</label>
                    <span className="text-3xl font-display font-black text-brand italic">{char.rankGeral}</span>
                  </div>
                  <div className="bg-black/20 p-3 rounded border border-brand/20 text-center">
                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Rank Tributo</label>
                    <span className="text-3xl font-display font-black text-white italic">{char.rankTributo}</span>
                  </div>
                </div>
                <div className="bg-brand/5 p-4 rounded border border-brand/30 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                      <Zap size={24} className="text-brand" />
                      <div>
                        <div className="text-[10px] font-bold text-brand uppercase">Pontos Tributo</div>
                        <div className="text-xl font-display font-bold">PT: {char.pt}</div>
                      </div>
                   </div>
                   <input type="number" value={char.pt} onChange={e => updateField('pt', parseInt(e.target.value))} className="w-16 text-center bg-black/40 border-none" />
                </div>
              </div>

              {/* Member Health */}
              <div className="bg-card p-6 rounded-lg border border-white/5">
                <SectionTitle title="Integridade" icon={Heart} />
                <div className="space-y-3">
                  {(Object.entries(char.memberHP) as [string, any][]).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between gap-4">
                      <span className="text-[10px] font-bold uppercase text-gray-400 w-20">{key.replace('braço', 'Braço ').replace('perna', 'Perna ').replace('cabeca', 'Cabeça')}</span>
                      <div className="flex items-center gap-2 flex-grow">
                        <div className="h-2 bg-black/50 flex-grow rounded-full overflow-hidden border border-white/5">
                          <div 
                            className="h-full bg-brand transition-all duration-500" 
                            style={{ width: `${Math.min(100, (value.current / value.max) * 100)}%` }} 
                          />
                        </div>
                        <input 
                          type="number" 
                          value={value.current} 
                          onChange={e => updateMemberHP(key, 'current', parseInt(e.target.value))}
                          className="w-12 p-1 text-center text-xs border-none bg-black/40"
                        />
                        <span className="text-xs text-gray-500">/</span>
                        <input 
                          type="number" 
                          value={value.max} 
                          onChange={e => updateMemberHP(key, 'max', parseInt(e.target.value))}
                          className="w-12 p-1 text-center text-xs border-none bg-black/40"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'atributos' && (
          <motion.div
            key="atributos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="bg-card p-6 rounded-lg border border-white/5 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="bg-brand/10 p-3 rounded-full border border-brand/30">
                        <Shield className="text-brand" size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-display font-bold uppercase italic leading-none">Pool de Atributos</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Pontos ganhos por nível e origem</p>
                    </div>
                </div>
                <div className="flex gap-6">
                    <div className="text-center">
                        <label className="text-[9px] font-bold text-gray-500 uppercase block mb-1">Total Disponível</label>
                        <span className="text-2xl font-display font-black text-white">{getAttributePointPool()}</span>
                    </div>
                    <div className="text-center">
                        <label className="text-[9px] font-bold text-gray-500 uppercase block mb-1">Gasto</label>
                        <span className="text-2xl font-display font-black text-brand">{getAttributePointsSpent()}</span>
                    </div>
                    <div className="text-center border-l border-white/10 pl-6">
                        <label className="text-[9px] font-bold text-gray-500 uppercase block mb-1">Saldo</label>
                        <span className={`text-2xl font-display font-black ${(getAttributePointPool() as number) - (getAttributePointsSpent() as number) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {(getAttributePointPool() as number) - (getAttributePointsSpent() as number)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-card p-8 rounded-lg border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <SectionTitle title="Atributos Primários" icon={Shield} />
                  <div className="grid grid-cols-2 gap-4">
                    {(Object.entries(char.attributes) as [string, number][]).map(([key, value]) => (
                      <div key={key} className="bg-black/30 p-4 rounded border border-white/10 flex flex-col items-center gap-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-brand">{(attributeLabels as any)[key]}</label>
                         <div className="flex items-center gap-2">
                            <input 
                              type="number" 
                              value={value} 
                              onChange={e => updateField(`attributes.${key}`, parseInt(e.target.value))}
                              className="text-4xl font-display font-black text-white bg-transparent border-none w-20 text-center"
                            />
                            <div className={`text-xl font-black ${getModifier(value) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {getModifier(value) >= 0 ? `+${getModifier(value)}` : getModifier(value)}
                            </div>
                         </div>
                         <div className="text-[10px] text-gray-500">MODIFICADOR</div>
                      </div>
                    ))}
                  </div>
                </div>

              <div className="space-y-8">
                <SectionTitle title="Sub-Atributos" icon={Target} />
                <div className="grid grid-cols-1 gap-6">
                  {(Object.entries(SUB_ATTRIBUTES_MAP) as [string, string[]][]).map(([parent, subs]) => (
                    <div key={parent} className="space-y-3 bg-black/20 p-4 rounded border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-[10px] font-bold uppercase text-brand">Sub-Atributos de {(attributeLabels as any)[parent]}</h4>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded ${getSubAttributePool(parent) < 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                          Pontos: {getSubAttributePool(parent)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {subs.map(subKey => (
                          <div key={subKey} className="flex flex-col gap-1 p-2 border-b border-white/5">
                            <label className="text-[10px] font-bold uppercase text-gray-400">{(subAttributeLabels as any)[subKey]}</label>
                            <div className="flex items-center gap-2">
                               <span className="text-gray-500">10 +</span>
                               <input 
                                type="number" 
                                value={(char.subAttributes as any)[subKey] || 0} 
                                onChange={e => updateField(`subAttributes.${subKey}`, parseInt(e.target.value))}
                                className="bg-transparent border-none text-xl font-bold w-16"
                              />
                              <span className="text-white font-bold">= {10 + ((char.subAttributes as any)[subKey] || 0)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-brand/5 p-6 rounded-lg border border-brand/20">
               <div className="flex items-center gap-4 mb-4">
                 <Brain className="text-brand" />
                 <h3 className="font-display font-bold uppercase">Regras de Atributos</h3>
               </div>
               <p className="text-sm text-gray-400 leading-relaxed italic">
                 "O valor base de cada atributo é 10. O modificador é calculado subtraindo 10 do valor total. 
                 Cada ponto no atributo principal concede 1 ponto para distribuir nos seus respectivos sub-atributos."
               </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'pericias' && (
           <motion.div
            key="pericias"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-card p-6 rounded-lg border border-white/5 h-fit">
              <SectionTitle title="Gerenciar Perícias" icon={Zap} />
              <div className="space-y-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Selecione suas perícias treinadas e seus bônus:</p>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(SKILLS).map(([category, skills]) => (
                      <div key={category} className="space-y-1">
                        <label className="text-[10px] font-bold text-brand uppercase">{category}</label>
                        <select 
                          className="w-full text-sm"
                          onChange={(e) => {
                            if (e.target.value) {
                              const newSkills = { ...char.skills, [e.target.value]: (char.skills[e.target.value] || 0) };
                              updateField('skills', newSkills);
                              e.target.value = '';
                            }
                          }}
                        >
                          <option value="">Adicionar de {category}...</option>
                          {skills.map(s => (
                            <option key={s} value={s} disabled={!!char.skills[s]}>{s}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input id="skill-custom-name" placeholder="Outra Perícia..." className="flex-grow text-sm" />
                    <button 
                      onClick={() => {
                        const nameEl = document.getElementById('skill-custom-name') as HTMLInputElement;
                        if (nameEl.value) {
                          const newSkills = { ...char.skills, [nameEl.value]: 0 };
                          updateField('skills', newSkills);
                          nameEl.value = '';
                        }
                      }}
                      className="bg-brand hover:bg-red-600 p-2 rounded transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 mt-8">
                   {Object.entries(char.skills).map(([name, bonus]) => (
                     <div key={name} className="flex justify-between items-center p-3 border border-white/5 rounded bg-black/20 group">
                        <div className="flex items-center gap-3">
                           <span className="font-bold text-white uppercase text-sm">{name}</span>
                           <div className="flex items-center bg-black/40 rounded px-2">
                             <span className="text-[10px] text-gray-500 mr-2">BÔNUS:</span>
                             <input 
                              type="number" 
                              value={bonus} 
                              onChange={e => {
                                const newSkills = { ...char.skills, [name]: parseInt(e.target.value) || 0 };
                                updateField('skills', newSkills);
                              }}
                              className="w-12 bg-transparent border-none text-brand font-black text-center p-1"
                             />
                           </div>
                        </div>
                        <button 
                          onClick={() => {
                             const newSkills = { ...char.skills };
                             delete newSkills[name];
                             updateField('skills', newSkills);
                          }}
                          className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border border-white/5">
                <SectionTitle title="Talentos" icon={Target} />
                
                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-gray-500 uppercase italic">Slots de Escolha Gastos: {getChoiceSlotsSpent()} / {getChoiceSlotPool()}</label>
                  </div>
                  <select 
                    className="w-full text-sm"
                    value=""
                    disabled={getChoiceSlotsSpent() >= getChoiceSlotPool()}
                    onChange={(e) => {
                      if (e.target.value && !char.talents.includes(e.target.value)) {
                        updateField('talents', [...char.talents, e.target.value]);
                      }
                    }}
                  >
                    <option value="">{getChoiceSlotsSpent() >= getChoiceSlotPool() ? 'Pool de Escolha Esgotado' : 'Adquirir Novo Talento...'}</option>
                    {TALENTS.filter(t => !t.origin || t.origin === char.origin).map(t => (
                      <option key={t.name} value={t.name} disabled={char.talents.includes(t.name)}>
                        {t.name} {t.origin ? `(Origem: ${t.origin})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  {char.talents.map((tName, idx) => {
                    const talent = TALENTS.find(t => t.name === tName);
                    return (
                      <div key={idx} className="p-3 bg-black/40 rounded border border-white/10 group">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-brand text-xs uppercase italic">{tName}</h4>
                          <button 
                            onClick={() => updateField('talents', char.talents.filter((_, i) => i !== idx))}
                            className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-tight">{talent?.description || 'Descrição não disponível.'}</p>
                      </div>
                    );
                  })}
                  {char.talents.length === 0 && (
                    <p className="text-center py-4 text-gray-600 text-xs italic">Nenhum talento selecionado.</p>
                  )}
                </div>
              </div>
              <div className="bg-black/40 p-4 rounded border border-white/5 border-dashed">
                 <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2">Resumo das Regras</h4>
                 <ul className="text-[10px] text-gray-500 space-y-1 ml-4 list-disc italic">
                   <li>D10 é a base dos testes.</li>
                   <li>Ataque: 1d20 + Luta + Bônus.</li>
                   <li>Esquiva: 1d20 + Velocidade.</li>
                   <li>Bloqueio: Redução de dano por Físico.</li>
                 </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'habilidades' && (
          <motion.div
            key="habilidades"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-card p-6 rounded-lg border border-white/5 h-fit">
              <SectionTitle title={`Habilidades de ${char.characterClass || 'Classe'}`} icon={Sword} />
              
              {!char.characterClass ? (
                <div className="text-center py-12 text-gray-500 italic text-sm">Selecione uma classe na aba Geral para ver as habilidades.</div>
              ) : (
                <div className="space-y-6">
                   <div className="p-4 bg-brand/5 rounded border border-brand/20">
                      <h4 className="text-[10px] font-bold text-brand uppercase mb-2">Habilidades de Base (Gratuitas)</h4>
                      <ul className="text-xs text-gray-400 space-y-1 ml-4 list-disc italic">
                        {CLASSES_DATA[char.characterClass as keyof typeof CLASSES_DATA]?.baseSkills.map(s => <li key={s}>{s}</li>)}
                      </ul>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <label className="text-[10px] font-bold text-gray-500 uppercase italic">Slots de Escolha Gastos: {getChoiceSlotsSpent()} / {getChoiceSlotPool()}</label>
                      </div>
                      <select 
                        className="w-full text-sm"
                        value=""
                        disabled={getChoiceSlotsSpent() >= getChoiceSlotPool()}
                        onChange={(e) => {
                          if (e.target.value && !char.classSkills.includes(e.target.value)) {
                            updateField('classSkills', [...char.classSkills, e.target.value]);
                          }
                        }}
                      >
                        <option value="">{getChoiceSlotsSpent() >= getChoiceSlotPool() ? 'Pool de Escolha Esgotado' : 'Adquirir Habilidade de Classe...'}</option>
                        {CLASS_ABILITIES[char.characterClass as keyof typeof CLASS_ABILITIES]?.map(a => (
                          <option key={a.name} value={a.name} disabled={char.classSkills.includes(a.name)}>
                            {a.name}
                          </option>
                        ))}
                      </select>
                   </div>

                   <div className="space-y-3">
                      {char.classSkills.map((sName, idx) => {
                         const ability = CLASS_ABILITIES[char.characterClass as keyof typeof CLASS_ABILITIES]?.find(a => a.name === sName);
                         return (
                           <div key={idx} className="p-3 bg-black/40 rounded border border-white/10 group">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-brand text-xs uppercase italic">{sName}</h4>
                                <button 
                                  onClick={() => updateField('classSkills', char.classSkills.filter((_, i) => i !== idx))}
                                  className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <p className="text-[11px] text-gray-400 leading-tight">{ability?.description}</p>
                           </div>
                         );
                      })}
                   </div>
                </div>
              )}
            </div>

            <div className="bg-black/40 p-6 rounded-lg border border-white/5 border-dashed h-fit">
               <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-4 flex items-center gap-2"><Activity size={14} /> Progressão de Habilidades</h4>
               <div className="space-y-4">
                  <div className="flex gap-4">
                     <div className="w-10 h-10 bg-brand/10 border border-brand/20 rounded flex items-center justify-center text-brand font-display font-black italic">1</div>
                     <p className="text-[10px] text-gray-500 italic leading-snug">No Nível 1 você recebe suas habilidades de base da classe escolhida mais um Talento.</p>
                  </div>
                  <div className="flex gap-4 opacity-70">
                     <div className="w-10 h-10 bg-white/5 border border-white/10 rounded flex items-center justify-center text-gray-500 font-display font-black italic">2+</div>
                     <p className="text-[10px] text-gray-500 italic leading-snug">Cada nível marcado com 'Escolha' permite selecionar um novo Talento ou uma Habilidade de Classe.</p>
                  </div>
                  <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-8">Manual Sense Life v.0.1 - Pág 16</p>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'inventario' && (
          <motion.div
            key="inventario"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weapons */}
              <div className="bg-card p-6 rounded-lg border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <SectionTitle title="Armas & Combate" icon={Sword} />
                  <button onClick={addWeapon} className="bg-brand/10 hover:bg-brand text-brand hover:text-white p-1 rounded transition-all">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  {char.equipment.weapons.map((w, i) => (
                    <div key={i} className="p-4 border border-white/10 rounded bg-black/20 space-y-3 relative group">
                      <button onClick={() => removeWeapon(i)} className="absolute top-2 right-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 size={14} />
                      </button>
                      <input 
                        value={w.name} 
                        onChange={e => {
                           const newWeapons = [...char.equipment.weapons];
                           newWeapons[i].name = e.target.value;
                           updateField('equipment.weapons', newWeapons);
                        }}
                        placeholder="Nome da Arma" 
                        className="w-full bg-transparent border-none text-brand font-bold p-0" 
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-[8px] font-bold text-gray-500 uppercase">Dano</label>
                          <input 
                            value={w.damage} 
                            onChange={e => {
                              const newWeapons = [...char.equipment.weapons];
                              newWeapons[i].damage = e.target.value;
                              updateField('equipment.weapons', newWeapons);
                            }}
                            className="bg-black/40 border-none text-[10px] p-1 rounded" 
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[8px] font-bold text-gray-500 uppercase">Crítico</label>
                          <input 
                            value={w.critical} 
                            onChange={e => {
                              const newWeapons = [...char.equipment.weapons];
                              newWeapons[i].critical = e.target.value;
                              updateField('equipment.weapons', newWeapons);
                            }}
                            className="bg-black/40 border-none text-[10px] p-1 rounded" 
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[8px] font-bold text-gray-500 uppercase">Peso</label>
                          <input 
                            value={w.weight} 
                            onChange={e => {
                              const newWeapons = [...char.equipment.weapons];
                              newWeapons[i].weight = e.target.value;
                              updateField('equipment.weapons', newWeapons);
                            }}
                            className="bg-black/40 border-none text-[10px] p-1 rounded" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {char.equipment.weapons.length === 0 && (
                    <div className="text-center py-8 text-gray-600 italic text-sm">Nenhuma arma equipada.</div>
                  )}
                </div>
              </div>

              {/* General Inventory */}
              <div className="bg-card p-6 rounded-lg border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <SectionTitle title="Mochila & Itens" icon={Backpack} />
                  <button onClick={addItem} className="bg-brand/10 hover:bg-brand text-brand hover:text-white p-1 rounded transition-all">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-2">
                  {char.inventory.map((item, i) => (
                    <div key={i} className="flex gap-2 group">
                      <input 
                        value={item} 
                        onChange={e => {
                          const newInv = [...char.inventory];
                          newInv[i] = e.target.value;
                          updateField('inventory', newInv);
                        }}
                        className="flex-grow bg-black/20 border-white/5 text-sm" 
                        placeholder="Novo item..."
                      />
                      <button onClick={() => removeItem(i)} className="text-gray-700 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {char.inventory.length === 0 && (
                    <div className="text-center py-8 text-gray-600 italic text-sm">A mochila está vazia.</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'historia' && (
          <motion.div
            key="historia"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-card p-8 rounded-lg border border-white/5"
          >
            <SectionTitle title="Histórico do Personagem" icon={Scroll} />
            <textarea 
              value={char.history}
              onChange={e => updateField('history', e.target.value)}
              placeholder="Conte como seu personagem chegou a ser quem é hoje... Sua jornada, seus medos e seus sonhos."
              className="w-full h-96 bg-black/20 border border-white/10 rounded-lg p-6 focus:ring-1 focus:ring-brand leading-relaxed text-gray-300"
            />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4 rounded border border-white/5 bg-black/10">
                  <h4 className="font-display font-bold uppercase text-[10px] text-brand mb-2">Conexões & Inimigos</h4>
                  <p className="text-[11px] text-gray-500 italic">"O mundo de Sense Life é perigoso. Seus caçadores, corporações e o governo estão sempre de olho."</p>
               </div>
               <div className="flex items-center gap-4 justify-end">
                  <div className="text-right">
                     <div className="text-xs text-gray-500 uppercase font-black italic">Sense Life v.0.1</div>
                     <div className="text-[10px] text-gray-600">Manual de Sobrevivência do Jogador</div>
                  </div>
                  <Ghost className="text-gray-800" size={32} />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-50" />
    </div>
  );
}
