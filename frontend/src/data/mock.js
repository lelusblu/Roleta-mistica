// Mock data para cartas de tarot e interpretaciones en español
export const tarotCards = [
  {
    id: 1,
    name: "El Loco",
    nameEn: "The Fool",
    arcana: "Arcano Mayor",
    image: "🌟",
    meanings: {
      upright: "Nuevos comienzos, espontaneidad, fe en el universo",
      reversed: "Imprudencia, negligencia, falta de dirección"
    },
    interpretation: "El Loco representa el inicio de un viaje espiritual. Es hora de confiar en el universo y dar el primer paso hacia lo desconocido. Tu energía joven y optimista te guiará."
  },
  {
    id: 2,
    name: "El Mago",
    nameEn: "The Magician", 
    arcana: "Arcano Mayor",
    image: "🔮",
    meanings: {
      upright: "Manifestación, poder personal, acción",
      reversed: "Manipulación, mala intención, falta de energía"
    },
    interpretation: "El Mago indica que tienes todas las herramientas necesarias para manifestar tus deseos. Es momento de actuar con confianza y transformar tus visiones en realidad."
  },
  {
    id: 3,
    name: "La Sacerdotisa",
    nameEn: "The High Priestess",
    arcana: "Arcano Mayor", 
    image: "🌙",
    meanings: {
      upright: "Intuición, misterio, sabiduría interior",
      reversed: "Secretos ocultos, falta de intuición"
    },
    interpretation: "La Sacerdotisa te invita a confiar en tu intuición. Las respuestas que buscas están dentro de ti. Es tiempo de silenciar la mente y escuchar la voz del alma."
  },
  {
    id: 4,
    name: "La Emperatriz",
    nameEn: "The Empress",
    arcana: "Arcano Mayor",
    image: "🌺",
    meanings: {
      upright: "Feminidad, creatividad, abundancia",
      reversed: "Dependencia, negligencia creativa"
    },
    interpretation: "La Emperatriz trae abundancia y creatividad a tu vida. Es momento de nutrir tus proyectos y relaciones con amor y paciencia."
  },
  {
    id: 5,
    name: "El Emperador",
    nameEn: "The Emperor",
    arcana: "Arcano Mayor",
    image: "👑",
    meanings: {
      upright: "Autoridad, estructura, control",
      reversed: "Tiranía, rigidez excesiva"
    },
    interpretation: "El Emperador representa liderazgo y estabilidad. Es hora de asumir el control de tu vida y crear estructuras sólidas para tus objetivos."
  },
  {
    id: 6,
    name: "El Hierofante",
    nameEn: "The Hierophant",
    arcana: "Arcano Mayor",
    image: "📿",
    meanings: {
      upright: "Tradición, educación, conformidad",
      reversed: "Rebelión, subversión, nuevos enfoques"
    },
    interpretation: "El Hierofante sugiere buscar conocimiento a través de maestros o tradiciones. A veces, seguir el camino convencional puede traer las respuestas que buscas."
  },
  {
    id: 7,
    name: "Los Enamorados",
    nameEn: "The Lovers",
    arcana: "Arcano Mayor",
    image: "💕",
    meanings: {
      upright: "Amor, armonía, relaciones",
      reversed: "Desarmonía, mala elección amorosa"
    },
    interpretation: "Los Enamorados hablan de conexiones profundas y elecciones importantes en el amor. Una decisión significativa sobre una relación está por venir."
  },
  {
    id: 8,
    name: "La Carroza",
    nameEn: "The Chariot",
    arcana: "Arcano Mayor",
    image: "🏛️",
    meanings: {
      upright: "Determinación, control, victoria",
      reversed: "Falta de control, derrota"
    },
    interpretation: "La Carroza indica victoria a través de la determinación. Mantén el enfoque en tus objetivos y superarás todos los obstáculos en tu camino."
  }
];

export const getMockReadingHistory = () => [
  {
    id: 1,
    date: "2024-01-15T10:30:00Z",
    card: tarotCards[0],
    question: "¿Qué energía debo enfocar hoy?",
    timestamp: "Hoy a las 10:30"
  },
  {
    id: 2, 
    date: "2024-01-14T15:45:00Z",
    card: tarotCards[2],
    question: "¿Cómo puedo mejorar mi relación?",
    timestamp: "Ayer a las 15:45"
  },
  {
    id: 3,
    date: "2024-01-13T09:15:00Z", 
    card: tarotCards[1],
    question: "¿Qué camino seguir en mi carrera?",
    timestamp: "Hace 2 días a las 09:15"
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
    timestamp: "Ahora mismo"
  };
  
  // En una app real, esto sería guardado en el backend
  console.log("Nueva lectura agregada:", newReading);
  return newReading;
};