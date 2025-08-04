// Mock data para cartas de tarot e interpretações
export const tarotCards = [
  {
    id: 1,
    name: "O Louco",
    nameEn: "The Fool",
    arcana: "Arcano Maior",
    image: "🌟",
    meanings: {
      upright: "Novos começos, espontaneidade, fé no universo",
      reversed: "Imprudência, negligência, falta de direção"
    },
    interpretation: "O Louco representa o início de uma jornada espiritual. É hora de confiar no universo e dar o primeiro passo em direção ao desconhecido. Sua energia jovem e otimista o guiará."
  },
  {
    id: 2,
    name: "O Mago",
    nameEn: "The Magician", 
    arcana: "Arcano Maior",
    image: "🔮",
    meanings: {
      upright: "Manifestação, poder pessoal, ação",
      reversed: "Manipulação, má intenção, falta de energia"
    },
    interpretation: "O Mago indica que você tem todas as ferramentas necessárias para manifestar seus desejos. É momento de agir com confiança e transformar suas visões em realidade."
  },
  {
    id: 3,
    name: "A Sacerdotisa",
    nameEn: "The High Priestess",
    arcana: "Arcano Maior", 
    image: "🌙",
    meanings: {
      upright: "Intuição, mistério, sabedoria interior",
      reversed: "Segredos ocultos, falta de intuição"
    },
    interpretation: "A Sacerdotisa convida você a confiar em sua intuição. As respostas que busca estão dentro de você. É tempo de silenciar a mente e ouvir a voz da alma."
  },
  {
    id: 4,
    name: "A Imperatriz",
    nameEn: "The Empress",
    arcana: "Arcano Maior",
    image: "🌺",
    meanings: {
      upright: "Feminilidade, criatividade, abundância",
      reversed: "Dependência, negligência criativa"
    },
    interpretation: "A Imperatriz traz abundância e criatividade para sua vida. É momento de nutrir seus projetos e relacionamentos com amor e paciência."
  },
  {
    id: 5,
    name: "O Imperador",
    nameEn: "The Emperor",
    arcana: "Arcano Maior",
    image: "👑",
    meanings: {
      upright: "Autoridade, estrutura, controle",
      reversed: "Tirania, rigidez excessiva"
    },
    interpretation: "O Imperador representa liderança e estabilidade. É hora de assumir o controle de sua vida e criar estruturas sólidas para seus objetivos."
  },
  {
    id: 6,
    name: "O Hierofante",
    nameEn: "The Hierophant",
    arcana: "Arcano Maior",
    image: "📿",
    meanings: {
      upright: "Tradição, educação, conformidade",
      reversed: "Rebelião, subversão, novas abordagens"
    },
    interpretation: "O Hierofante sugere buscar conhecimento através de mestres ou tradições. Às vezes, seguir o caminho convencional pode trazer as respostas que procura."
  },
  {
    id: 7,
    name: "Os Enamorados",
    nameEn: "The Lovers",
    arcana: "Arcano Maior",
    image: "💕",
    meanings: {
      upright: "Amor, harmonia, relacionamentos",
      reversed: "Desarmonia, má escolha amorosa"
    },
    interpretation: "Os Enamorados falam de conexões profundas e escolhas importantes no amor. Uma decisão significativa sobre um relacionamento está por vir."
  },
  {
    id: 8,
    name: "A Carruagem",
    nameEn: "The Chariot",
    arcana: "Arcano Maior",
    image: "🏛️",
    meanings: {
      upright: "Determinação, controle, vitória",
      reversed: "Falta de controle, derrota"
    },
    interpretation: "A Carruagem indica vitória através da determinação. Mantenha o foco em seus objetivos e você superará todos os obstáculos em seu caminho."
  }
];

export const getMockReadingHistory = () => [
  {
    id: 1,
    date: "2024-01-15T10:30:00Z",
    card: tarotCards[0],
    question: "Que energia devo focar hoje?",
    timestamp: "Hoje às 10:30"
  },
  {
    id: 2, 
    date: "2024-01-14T15:45:00Z",
    card: tarotCards[2],
    question: "Como posso melhorar meu relacionamento?",
    timestamp: "Ontem às 15:45"
  },
  {
    id: 3,
    date: "2024-01-13T09:15:00Z", 
    card: tarotCards[1],
    question: "Qual caminho seguir na carreira?",
    timestamp: "2 dias atrás às 09:15"
  }
];

export const getRandomCard = () => {
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  return tarotCards[randomIndex];
};

export const addToHistory = (card, question) => {
  const newReading = {
    id: Date.now(),
    date: new Date().toISOString(),
    card,
    question,
    timestamp: "Agora mesmo"
  };
  
  // Em um app real, isso seria salvo no backend
  console.log("Nova leitura adicionada:", newReading);
  return newReading;
};