export const LEVEL_REWARDS = {
  1: { talent: 1, classBase: 1, origin: 1 },
  2: { choice: 1 },
  3: { choice: 1 },
  4: { choice: 1, attributePoints: 2 },
  5: { armor: 2, skills: 1 },
  6: { choice: 1 },
  7: { choice: 1 },
  8: { choice: 1, attributePoints: 2 },
  9: { choice: 1 },
  10: { armor: 3, skills: 1 },
  11: { choice: 1 },
  12: { choice: 1, attributePoints: 2 },
  13: { choice: 1 },
  14: { choice: 1 },
  15: { armor: 4, skills: 1 },
  16: { choice: 1, attributePoints: 3 },
  17: { choice: 1 },
  18: { choice: 1 },
  19: { choice: 1 },
  20: { armor: 4, attributePoints: 3, skills: 1 }
};

export const ORIGINS = {
  "Usuário de Tributo": {
    description: "Pessoas com habilidades especiais. Recebe +2 quando for usar o tributo.",
    bonuses: { skills: { "Tributo": 2 } }
  },
  "Pessoa Mundana": {
    description: "67% da população. Recebe 4 pontos extras para gastar nos atributos.",
    bonuses: { attributePoints: 4 }
  },
  "Caçador": {
    description: "Agem por conta própria ou organizações criminosas. Recebe +2 em ataques contra alvos propostos.",
    bonuses: { attackBonusVsTarget: 2 }
  },
  "Caçador do Governo": {
    description: "Selecionados para prender usuários de tributo. Recebe +2 nos testes durante o combate.",
    bonuses: { combatTests: 2 }
  },
  "Recompensas": {
    description: "Pessoas caçadas que vivem escondidas. Recebe +2 em testes de furtividade.",
    bonuses: { skills: { "Furtividade": 2 } }
  }
};

export const CLASSES_DATA = {
  "Lutador": {
    hp: { cabeca: 12, tronco: 20, costas: 20, braçoD: 16, braçoE: 16, pernaD: 18, pernaE: 18 },
    pt: 4,
    baseSkills: ["Corpo de Lutador", "Golpe Rápido"]
  },
  "Assassino": {
    hp: { cabeca: 12, tronco: 18, costas: 18, braçoD: 14, braçoE: 14, pernaD: 16, pernaE: 16 },
    pt: 5,
    baseSkills: ["Impressão de Primeira", "Andar Furtivo", "Treino Assassino"]
  },
  "Agente Especial": {
    hp: { cabeca: 12, tronco: 20, costas: 20, braçoD: 14, braçoE: 14, pernaD: 18, pernaE: 18 },
    pt: 3,
    baseSkills: ["Balística", "Perito", "Movimento Tático"]
  },
  "Suporte": {
    hp: { cabeca: 12, tronco: 18, costas: 18, braçoD: 16, braçoE: 16, pernaD: 18, pernaE: 18 },
    pt: 5,
    baseSkills: ["Flanco", "Medicina", "Análise"]
  },
  "Caçador de Recompensa": {
    hp: { cabeca: 12, tronco: 20, costas: 20, braçoD: 14, braçoE: 14, pernaD: 18, pernaE: 18 },
    pt: 3,
    baseSkills: ["Saque Rápido", "Perito", "Movimento Tático"]
  }
};

export const CLASS_ABILITIES = {
  "Lutador": [
    { name: "Esquiva Rápida", description: "Ação bônus: teste de reflexos vs percepção do inimigo. Sucesso = desvantagem para o inimigo." },
    { name: "Finta", description: "Teste de físico vs oponente. Sucesso = +3 no próximo ataque." },
    { name: "Imobilizar", description: "Teste de força para impedir movimentos do oponente." },
    { name: "Mata Leão", description: "Gasta 3 PT. Se imobilizar por 5 rodadas, apaga o oponente." },
    { name: "Interromper Ação", description: "Crítico: gasta 2 PT para fazer oponente perder ação (você perde a mesma)." },
    { name: "Corpo Calejado", description: "Adiciona atributo Físico na redução de danos." },
    { name: "Ataque Extra", description: "Gasta 3 PT para atacar duas vezes." },
    { name: "Combate Defensivo", description: "-2 no ataque para +2 na redução de danos corpo a corpo." },
    { name: "Sentido Tático", description: "Vantagens estratégicas escolhidas pelo mestre." },
    { name: "Golpe Atordoador", description: "Gasta 1 PT no crítico: oponente fica atordoado (-1 em ações)." },
    { name: "Golpe em Área", description: "Soco atinge até 2m. 1 PT ataca dois ao mesmo tempo." }
  ],
  "Assassino": [
    { name: "Dano Furtivo", description: "+1d6 no dano quando estiver em furtividade." },
    { name: "Ataque Furtivo", description: "+2 no ataque quando estiver em furtividade." },
    { name: "Ação Rápida (Furtividade)", description: "Ficar furtivo como ação bônus em vez de completa." },
    { name: "Esquiva Aprimorada", description: "+2 no reflexo." },
    { name: "Evasão", description: "Capacidade de esquivar de golpes em área." },
    { name: "Sentido Aprimorado", description: "Percebe inimigos invisíveis com testes." },
    { name: "Alvo não Localizado", description: "Gasta 2 PT: ataque não revela sua localização." },
    { name: "Ataque Rápido", description: "Gasta 1 PT: +2 no ataque mesmo sem furtividade." },
    { name: "Impostor", description: "Gasta 1 PT: se passar por outra pessoa (requer alter ego)." },
    { name: "Golpe Fatal", description: "3 armaduras zeradas + 3 PT = neutraliza oponente." }
  ],
  "Agente Especial": [
    { name: "Artista Marcial", description: "Dano do soco sobe de 1d4 para 1d6." },
    { name: "Conhecimento Aplicado", description: "Bônus de Mental no dano com armas de arremesso ou fogo." },
    { name: "Estratégia", description: "Gasta 3 PT: aliados recebem +2 no dano ou ataque contra alvo." },
    { name: "Tiro de Cobertura", description: "Gasta 1 PT para ignorar cobertura parcial." },
    { name: "Mira Especial", description: "+2 no ataque com armas de fogo/arremesso." },
    { name: "Ação de Mirar", description: "3 PT: vantagem com armas de médio/longo alcance." },
    { name: "Ninja Urbano", description: "Espaço de armas de fogo reduzido em uma categoria." },
    { name: "Balística Explosiva", description: "Munições explosivas garantem +1d6 de dano." },
    { name: "Área de Posicionamento", description: "4 PT: Escolhe vantagem em corpo a corpo ou pontaria no turno." }
  ],
  "Suporte": [
    { name: "Ajuda em Campo", description: "2 PT: Aliado em 9m recebe +2 no ataque." },
    { name: "Cura Aprimorada", description: "2 PT: Cura 1d12 + Mental." },
    { name: "Medicina de Ataque", description: "2 PT: Conhece pontos vitais, +1d6 de dano." },
    { name: "Deixar os Outros Fazer", description: "2 PT: Dá uma de suas ações para um aliado." },
    { name: "Golpe Envenenado", description: "2 PT: Oponente recebe 1d4 de dano por 1d6 rodadas." },
    { name: "Cura Rápida", description: "3 PT: Curar-se como ação bônus." },
    { name: "Leitura de Oponente", description: "1 PT: Vantagem na próxima esquiva ou bloqueio." },
    { name: "Mestre de Cura", description: "5 PT: Multiplica o resultado da cura por 2." },
    { name: "Melhorar Estado", description: "3 PT: Retira uma condição mental sua ou de aliado." }
  ],
  "Caçador de Recompensa": [
    { name: "Ataque Especial", description: "3 PT: +5 de dano no próximo ataque." },
    { name: "Golpe Demolidor", description: "2 PT: Tenta derrubar o oponente ao atingir." },
    { name: "Ataque Surpresa", description: "3 PT: Vantagem no ataque com Katana." },
    { name: "Espada Leve", description: "Armas de lâmina têm peso reduzido em uma categoria." },
    { name: "Ataque Duplo", description: "3 PT: Ataca duas vezes em uma rodada." },
    { name: "Katana Dupla", description: "Segurar duas lâminas dá +1 no reflexo." },
    { name: "Ataque Destruidor", description: "4 PT: Crítico sobe de 2x para 3x." },
    { name: "Golpe Sanguinário", description: "Golpes com lâmina causam sangramento por 3 rodadas." }
  ]
};

export const TALENTS = [
  { name: "Ataque Infalível", description: "Ao rolar o dano de um ataque com arma, quando rolar 1 ou 2, você pode rolar novamente." },
  { name: "Atenção Infalível", description: "Você não pode ser surpreendido e recebe +2 em percepção." },
  { name: "Incremento de Atributo", description: "Aumenta o valor de um atributo em 1." },
  { name: "Defensivo", description: "Aumenta a Força ou Constituição em 1." },
  { name: "Técnicas de Arremesso", description: "+2 quando arremessar armas." },
  { name: "Reação Rápida", description: "Se não for o primeiro na iniciativa, pode rolar novamente e escolher o melhor." },
  { name: "Brutamonte", description: "Adiciona modificador de físico aos testes de Intimidação." },
  { name: "Credibilidade", description: "Adiciona modificador de mental nas rolagens de enganação." },
  { name: "Corpo de Ferro", description: "Ao bloquear, devolve metade do dano recebido. (Req: Nível 5)", minLevel: 5 },
  { name: "Analisar", description: "Ao observar um oponente recebe vantagem sobre ele. (Req: Nível 3)", minLevel: 3 },
  { name: "Utopia", description: "Gasta 3 PT para que tudo o que disser pareça verdade. (Req: +3 Mental)", minMental: 13 },
  // Habilidades de Origem Únicas
  { name: "Atributo Treinado", origin: "Pessoa Mundana", description: "Recebe 4 pontos extras de atributos." },
  { name: "Conhecimento Aplicado", origin: "Pessoa Mundana", description: "+2 em testes contra oponente após descobrir seu tributo." },
  { name: "Avanço Tecnológico", origin: "Caçador do Governo", description: "Vantagem para localizar alvo com equipamento correto." }
];

export const SKILLS = {
  Físico: [
    "Atletismo",
    "Acrobacia",
    "Constituição",
    "Corrida",
    "Natação",
    "Levantamento de Peso"
  ],
  Mental: [
    "Crime",
    "Dirigir",
    "Idiomas",
    "Percepção",
    "Profissão",
    "Tecnologia",
    "Medicina",
    "Pontaria",
    "Intuição",
    "Investigação",
    "Atualidade",
    "História",
    "Intimidação",
    "Enganação",
    "Programação"
  ],
  Oculto: [
    "Fé",
    "Religião",
    "Sorte"
  ],
  Luta: [
    "Corpo a Corpo",
    "Esquiva",
    "Bloqueio",
    "Foco",
    "Briga"
  ]
};

export const SUB_ATTRIBUTES_MAP = {
  fisico: ["forca", "agilidade", "resistencia"],
  mental: ["inteligencia", "sabedoria", "interpessoal"],
  luta: ["foco", "briga"]
};

