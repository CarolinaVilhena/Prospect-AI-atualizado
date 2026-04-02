export type Locale = "pt" | "es" | "en";

export interface Translations {
  // Header
  header: {
    geminiActive: string;
    breadcrumb: {
      search: string;
      leads: string;
    };
  };
  // Hero section
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    subtitle: string;
    pills: {
      leads: string;
      painScore: string;
      report: string;
    };
    mockLeads: Array<{ name: string; type: string; city: string }>;
  };
  // Search form
  form: {
    title: string;
    aiActive: string;
    icp: {
      label: string;
      hint: string;
    };
    service: {
      label: string;
      hint: string;
    };
    location: string;
    country: string;
    stateRegion: string;
    city: string;
    allCountry: string;
    searching: string;
    searchingHint: string;
    searchBtn: string;
    footer: string;
    searchPlaceholder: string;
  };
  // Results
  results: {
    title: string;
    subtitle: string;
    newSearch: string;
    sortBy: string;
    sortScore: string;
    sortRating: string;
    sortName: string;
    viewList: string;
    viewGrid: string;
    viewCards: string;
    viewTable: string;
    noPhone: string;
    noWebsite: string;
    viewOnMaps: string;
    viewDetails: string;
    viewReport: string;
    noResults: string;
    noResultsHint: string;
    digitalPain: string;
    rating: string;
    reviews: string;
    localBusiness: string;
    scoreHigh: string;
    scoreMid: string;
    scoreLow: string;
    tableCompany: string;
    tableLocation: string;
    tableRating: string;
    tableScore: string;
    tableContact: string;
    tableAction: string;
  };
  // Lead detail
  detail: {
    backToResults: string;
    aiReport: string;
    generating: string;
    generateReport: string;
    generateHint: string;
    reportTitle: string;
    contact: string;
    phone: string;
    website: string;
    maps: string;
    location: string;
    score: string;
    scoreLabel: string;
    ratingLabel: string;
    copyEmail: string;
    emailSubject: string;
    scoreHigh: string;
    scoreMid: string;
    scoreLow: string;
    scoreHighDesc: string;
    scoreMidDesc: string;
    scoreLowDesc: string;
    copied: string;
    copyFailed: string;
    emailCopied: string;
    noAddress: string;
    reportError: string;
    retry: string;
  };
  // Error
  error: {
    unexpected: string;
    close: string;
  };
  // Language switcher
  lang: {
    label: string;
  };
}

const pt: Translations = {
  header: {
    geminiActive: "Gemini AI ativo",
    breadcrumb: {
      search: "Busca",
      leads: "Leads",
    },
  },
  hero: {
    badge: "Powered by Gemini AI + Google Maps",
    headline1: "Encontre seus",
    headline2: "próximos clientes",
    subtitle:
      "A IA qualifica leads B2B pelo Digital Pain Score — os piores na presença digital são os melhores de se abordar.",
    pills: {
      leads: "10–15 leads por busca",
      painScore: "Pain Score digital",
      report: "Relatório IA completo",
    },
    mockLeads: [
      { name: "Clínica Dr. Silva", type: "Clínica", city: "São Paulo, SP" },
      { name: "Pet Shop Amigos", type: "Pet Shop", city: "Curitiba, PR" },
      { name: "ForceGym Academy", type: "Academia", city: "Belo Horizonte, MG" },
    ],
  },
  form: {
    title: "Configure sua busca",
    aiActive: "IA ativa",
    icp: {
      label: "Perfil de Cliente Ideal (ICP)",
      hint: "Tipo de negócio, porte, tempo de mercado, características.",
    },
    service: {
      label: "Serviço que você oferece",
      hint: "Descreva o valor que você entrega e como resolve o problema do cliente.",
    },
    location: "Localização",
    country: "País",
    stateRegion: "Estado / Região",
    city: "Cidade",
    allCountry: "Todo o país",
    searching: "Buscando leads com IA...",
    searchingHint: "Pode levar até 30 segundos — consultando Google Maps e Gemini AI.",
    searchBtn: "Buscar Leads Agora",
    footer: "100% gratuito · Gemini AI + Google Maps · Sem cadastro",
    searchPlaceholder: "Buscar...",
  },
  results: {
    title: "Leads encontrados",
    subtitle: "resultados ordenados por Digital Pain Score",
    newSearch: "Nova Busca",
    sortBy: "Ordenar por",
    sortScore: "Pain Score",
    sortRating: "Avaliação",
    sortName: "Nome",
    viewList: "Lista",
    viewGrid: "Grade",
    viewCards: "Cards",
    viewTable: "Tabela",
    noPhone: "Sem telefone",
    noWebsite: "Sem website",
    viewOnMaps: "Ver no Maps",
    viewDetails: "Ver detalhes",
    viewReport: "Relatório",
    noResults: "Nenhum lead encontrado",
    noResultsHint: "Tente ajustar os filtros de busca.",
    digitalPain: "Digital Pain",
    rating: "avaliação",
    reviews: "avaliações",
    localBusiness: "Negócio Local",
    scoreHigh: "Alta oportunidade",
    scoreMid: "Oportunidade média",
    scoreLow: "Baixa oportunidade",
    tableCompany: "Empresa",
    tableLocation: "Local",
    tableRating: "Avaliação",
    tableScore: "Pain Score",
    tableContact: "Contato",
    tableAction: "Ação",
  },
  detail: {
    backToResults: "Voltar aos resultados",
    aiReport: "Relatório de Oportunidade IA",
    generating: "Gerando relatório...",
    generateReport: "Gerar Relatório de Prospecção",
    generateHint: "A IA irá analisar este lead e criar um relatório completo de prospecção personalizado.",
    reportTitle: "Relatório completo gerado pela IA",
    contact: "Contato",
    phone: "Telefone",
    website: "Website",
    maps: "Google Maps",
    location: "Localização",
    score: "Score",
    scoreLabel: "Digital Pain Score",
    ratingLabel: "Avaliação",
    copyEmail: "Copiar e-mail de prospecção",
    emailSubject: "Proposta de parceria",
    scoreHigh: "Alta Oportunidade",
    scoreMid: "Média Oportunidade",
    scoreLow: "Baixa Oportunidade",
    scoreHighDesc: "Presença digital fraca. Alta probabilidade de conversão — aborde com urgência.",
    scoreMidDesc: "Lacunas digitais identificadas. Há espaço para melhorias e uma abordagem consultiva funciona bem.",
    scoreLowDesc: "Presença digital razoável. Destaque diferenciais específicos para justificar a mudança.",
    copied: "Copiado!",
    copyFailed: "Falha ao copiar",
    emailCopied: "E-mail copiado!",
    noAddress: "Endereço não disponível",
    reportError: "Não foi possível gerar o relatório.",
    retry: "Tentar novamente",
  },
  error: {
    unexpected: "Ocorreu um erro inesperado.",
    close: "×",
  },
  lang: {
    label: "Idioma",
  },
};

const es: Translations = {
  header: {
    geminiActive: "Gemini AI activo",
    breadcrumb: {
      search: "Búsqueda",
      leads: "Leads",
    },
  },
  hero: {
    badge: "Powered by Gemini AI + Google Maps",
    headline1: "Encuentra tus",
    headline2: "próximos clientes",
    subtitle:
      "La IA califica leads B2B con el Digital Pain Score — los que tienen peor presencia digital son los mejores para contactar.",
    pills: {
      leads: "10–15 leads por búsqueda",
      painScore: "Pain Score digital",
      report: "Informe IA completo",
    },
    mockLeads: [
      { name: "Clínica Dr. García", type: "Clínica", city: "Madrid, ESP" },
      { name: "Pet Shop Amigos", type: "Pet Shop", city: "Barcelona, ESP" },
      { name: "ForceGym Academy", type: "Gimnasio", city: "Sevilla, ESP" },
    ],
  },
  form: {
    title: "Configura tu búsqueda",
    aiActive: "IA activa",
    icp: {
      label: "Perfil de Cliente Ideal (ICP)",
      hint: "Tipo de negocio, tamaño, tiempo en el mercado, características.",
    },
    service: {
      label: "Servicio que ofreces",
      hint: "Describe el valor que entregas y cómo resuelves el problema del cliente.",
    },
    location: "Ubicación",
    country: "País",
    stateRegion: "Estado / Región",
    city: "Ciudad",
    allCountry: "Todo el país",
    searching: "Buscando leads con IA...",
    searchingHint: "Puede tardar hasta 30 segundos — consultando Google Maps y Gemini AI.",
    searchBtn: "Buscar Leads Ahora",
    footer: "100% gratuito · Gemini AI + Google Maps · Sin registro",
    searchPlaceholder: "Buscar...",
  },
  results: {
    title: "Leads encontrados",
    subtitle: "resultados ordenados por Digital Pain Score",
    newSearch: "Nueva Búsqueda",
    sortBy: "Ordenar por",
    sortScore: "Pain Score",
    sortRating: "Valoración",
    sortName: "Nombre",
    viewList: "Lista",
    viewGrid: "Cuadrícula",
    viewCards: "Tarjetas",
    viewTable: "Tabla",
    noPhone: "Sin teléfono",
    noWebsite: "Sin sitio web",
    viewOnMaps: "Ver en Maps",
    viewDetails: "Ver detalles",
    viewReport: "Informe",
    noResults: "No se encontraron leads",
    noResultsHint: "Intenta ajustar los filtros de búsqueda.",
    digitalPain: "Digital Pain",
    rating: "valoración",
    reviews: "valoraciones",
    localBusiness: "Negocio Local",
    scoreHigh: "Alta oportunidad",
    scoreMid: "Oportunidad media",
    scoreLow: "Baja oportunidad",
    tableCompany: "Empresa",
    tableLocation: "Ubicación",
    tableRating: "Valoración",
    tableScore: "Pain Score",
    tableContact: "Contacto",
    tableAction: "Acción",
  },
  detail: {
    backToResults: "Volver a los resultados",
    aiReport: "Informe de Oportunidad IA",
    generating: "Generando informe...",
    generateReport: "Generar Informe de Prospección",
    generateHint: "La IA analizará este lead y creará un informe completo de prospección personalizado.",
    reportTitle: "Informe completo generado por la IA",
    contact: "Contacto",
    phone: "Teléfono",
    website: "Sitio web",
    maps: "Google Maps",
    location: "Ubicación",
    score: "Score",
    scoreLabel: "Digital Pain Score",
    ratingLabel: "Valoración",
    copyEmail: "Copiar correo de prospección",
    emailSubject: "Propuesta de colaboración",
    scoreHigh: "Alta Oportunidad",
    scoreMid: "Oportunidad Media",
    scoreLow: "Baja Oportunidad",
    scoreHighDesc: "Presencia digital débil. Alta probabilidad de conversión — contacta con urgencia.",
    scoreMidDesc: "Brechas digitales identificadas. Hay margen de mejora y un enfoque consultivo funciona bien.",
    scoreLowDesc: "Presencia digital aceptable. Destaca diferenciadores específicos para justificar el cambio.",
    copied: "¡Copiado!",
    copyFailed: "Error al copiar",
    emailCopied: "¡Correo copiado!",
    noAddress: "Dirección no disponible",
    reportError: "No se pudo generar el informe.",
    retry: "Intentar de nuevo",
  },
  error: {
    unexpected: "Ocurrió un error inesperado.",
    close: "×",
  },
  lang: {
    label: "Idioma",
  },
};

const en: Translations = {
  header: {
    geminiActive: "Gemini AI active",
    breadcrumb: {
      search: "Search",
      leads: "Leads",
    },
  },
  hero: {
    badge: "Powered by Gemini AI + Google Maps",
    headline1: "Find your",
    headline2: "next clients",
    subtitle:
      "AI qualifies B2B leads with the Digital Pain Score — those with the worst digital presence are the best to approach.",
    pills: {
      leads: "10–15 leads per search",
      painScore: "Digital Pain Score",
      report: "Full AI report",
    },
    mockLeads: [
      { name: "Dr. Smith Clinic", type: "Clinic", city: "New York, NY" },
      { name: "Friends Pet Shop", type: "Pet Shop", city: "Los Angeles, CA" },
      { name: "ForceGym Academy", type: "Gym", city: "Chicago, IL" },
    ],
  },
  form: {
    title: "Configure your search",
    aiActive: "AI active",
    icp: {
      label: "Ideal Customer Profile (ICP)",
      hint: "Business type, size, time in market, characteristics.",
    },
    service: {
      label: "Service you offer",
      hint: "Describe the value you deliver and how you solve the client's problem.",
    },
    location: "Location",
    country: "Country",
    stateRegion: "State / Region",
    city: "City",
    allCountry: "Entire country",
    searching: "Searching leads with AI...",
    searchingHint: "May take up to 30 seconds — querying Google Maps and Gemini AI.",
    searchBtn: "Search Leads Now",
    footer: "100% free · Gemini AI + Google Maps · No signup",
    searchPlaceholder: "Search...",
  },
  results: {
    title: "Leads found",
    subtitle: "results sorted by Digital Pain Score",
    newSearch: "New Search",
    sortBy: "Sort by",
    sortScore: "Pain Score",
    sortRating: "Rating",
    sortName: "Name",
    viewList: "List",
    viewGrid: "Grid",
    viewCards: "Cards",
    viewTable: "Table",
    noPhone: "No phone",
    noWebsite: "No website",
    viewOnMaps: "View on Maps",
    viewDetails: "View details",
    viewReport: "Report",
    noResults: "No leads found",
    noResultsHint: "Try adjusting the search filters.",
    digitalPain: "Digital Pain",
    rating: "rating",
    reviews: "reviews",
    localBusiness: "Local Business",
    scoreHigh: "High opportunity",
    scoreMid: "Medium opportunity",
    scoreLow: "Low opportunity",
    tableCompany: "Company",
    tableLocation: "Location",
    tableRating: "Rating",
    tableScore: "Pain Score",
    tableContact: "Contact",
    tableAction: "Action",
  },
  detail: {
    backToResults: "Back to results",
    aiReport: "AI Opportunity Report",
    generating: "Generating report...",
    generateReport: "Generate Prospecting Report",
    generateHint: "AI will analyze this lead and create a complete personalized prospecting report.",
    reportTitle: "Full report generated by AI",
    contact: "Contact",
    phone: "Phone",
    website: "Website",
    maps: "Google Maps",
    location: "Location",
    score: "Score",
    scoreLabel: "Digital Pain Score",
    ratingLabel: "Rating",
    copyEmail: "Copy prospecting email",
    emailSubject: "Partnership proposal",
    scoreHigh: "High Opportunity",
    scoreMid: "Medium Opportunity",
    scoreLow: "Low Opportunity",
    scoreHighDesc: "Weak digital presence. High conversion likelihood — reach out with urgency.",
    scoreMidDesc: "Digital gaps identified. Room for improvement and a consultative approach works well.",
    scoreLowDesc: "Decent digital presence. Highlight specific differentiators to justify the switch.",
    copied: "Copied!",
    copyFailed: "Failed to copy",
    emailCopied: "Email copied!",
    noAddress: "Address not available",
    reportError: "Could not generate the report.",
    retry: "Try again",
  },
  error: {
    unexpected: "An unexpected error occurred.",
    close: "×",
  },
  lang: {
    label: "Language",
  },
};

export const translations: Record<Locale, Translations> = { pt, es, en };
