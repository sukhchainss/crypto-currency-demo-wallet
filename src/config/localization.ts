import { Language } from '../types/enums';

interface Translations {
  currencyActions: {
    title: string;
    buttons: {
      clear: string;
      insertData: string;
      loading: string;
      crypto: string;
      fiat: string;
      all: string;
    };
    statusText: string;
    selectedCurrency: string;
    selectCurrency: string;
  };
  currencyList: {
    headers: {
      crypto: string;
      fiat: string;
      all: string;
      default: string;
    };
    search: {
      placeholder: string;
    };
    loading: string;
    emptyState: {
      title: string;
      noResults: string;
      noDataInList: string;
      selectList: string;
    };
    footer: {
      showing: string;
      currency: string;
      currencies: string;
      matching: string;
    };
    badges: {
      crypto: string;
      fiat: string;
    };
  };
  errors: {
    fetchFailed: string;
    apiServerDown: string;
    noData: string;
    insertDataFirst: string;
  };
  success: {
    dataInserted: string;
    dataCleared: string;
  };
  common: {
    cancel: string;
    ok: string;
    confirm: string;
  };
}

const en: Translations = {
  currencyActions: {
    title: 'Currency Actions',
    buttons: {
      clear: 'Clear',
      insertData: 'Load Currencies',
      loading: 'Loading...',
      crypto: 'Crypto',
      fiat: 'Fiat',
      all: 'All',
    },
    statusText: 'Cached: {{crypto}} crypto, {{fiat}} fiat',
    selectedCurrency: 'Selected Currency',
    selectCurrency: 'Select Currency',
  },
  currencyList: {
    headers: {
      crypto: 'Cryptocurrencies',
      fiat: 'Fiat Currencies',
      all: 'All Currencies',
      default: 'Currency List',
    },
    search: {
      placeholder: 'Search currencies...',
    },
    loading: 'Loading currencies...',
    emptyState: {
      title: 'No Currencies Found',
      noResults: 'Try ETH',
      noDataInList: 'No currencies available in this list',
      selectList: 'Select a currency list to get started',
    },
    footer: {
      showing: 'Showing',
      currency: 'currency',
      currencies: 'currencies',
      matching: 'matching',
    },
    badges: {
      crypto: 'CRYPTO',
      fiat: 'FIAT',
    },
  },
  errors: {
    fetchFailed: 'Failed to fetch currency data',
    apiServerDown: 'Failed to fetch currency data. Make sure the API server is running on port 3000.',
    noData: 'No Data',
    insertDataFirst: 'Please insert data first by clicking the "Insert Data" button.',
  },
  success: {
    dataInserted: 'Inserted {{crypto}} crypto and {{fiat}} fiat currencies.',
    dataCleared: 'All currency data has been cleared.',
  },
  common: {
    cancel: 'Cancel',
    ok: 'OK',
    confirm: 'Confirm',
  },
};

// Spanish translations (example for future)
const es: Translations = {
  currencyActions: {
    title: 'Acciones de Monedas',
    buttons: {
      clear: 'Limpiar',
      insertData: 'Cargar Monedas',
      loading: 'Cargando...',
      crypto: 'Cripto',
      fiat: 'Fiat',
      all: 'Todas',
    },
    statusText: 'En caché: {{crypto}} cripto, {{fiat}} fiat',
    selectedCurrency: 'Moneda Seleccionada',
    selectCurrency: 'Seleccionar Moneda',
  },
  currencyList: {
    headers: {
      crypto: 'Criptomonedas',
      fiat: 'Monedas Fiat',
      all: 'Todas las Monedas',
      default: 'Lista de Monedas',
    },
    search: {
      placeholder: 'Buscar monedas...',
    },
    loading: 'Cargando monedas...',
    emptyState: {
      title: 'No se Encontraron Monedas',
      noResults: 'Prueba ETH',
      noDataInList: 'No hay monedas disponibles en esta lista',
      selectList: 'Selecciona una lista de monedas para comenzar',
    },
    footer: {
      showing: 'Mostrando',
      currency: 'moneda',
      currencies: 'monedas',
      matching: 'coincidiendo',
    },
    badges: {
      crypto: 'CRIPTO',
      fiat: 'FIAT',
    },
  },
  errors: {
    fetchFailed: 'Error al obtener datos de monedas',
    apiServerDown: 'Error al obtener datos. Asegúrate de que el servidor API esté ejecutándose en el puerto 3000.',
    noData: 'Sin Datos',
    insertDataFirst: 'Por favor, inserta datos primero haciendo clic en el botón "Insertar Datos".',
  },
  success: {
    dataInserted: 'Se insertaron {{crypto}} cripto y {{fiat}} monedas fiat.',
    dataCleared: 'Todos los datos de monedas han sido eliminados.',
  },
  common: {
    cancel: 'Cancelar',
    ok: 'OK',
    confirm: 'Confirmar',
  },
};

// French translations
const fr: Translations = {
  currencyActions: {
    title: 'Actions sur les Devises',
    buttons: {
      clear: 'Effacer',
      insertData: 'Charger les Devises',
      loading: 'Chargement...',
      crypto: 'Crypto',
      fiat: 'Fiat',
      all: 'Toutes',
    },
    statusText: 'En cache: {{crypto}} crypto, {{fiat}} fiat',
    selectedCurrency: 'Devise Sélectionnée',
    selectCurrency: 'Sélectionner une Devise',
  },
  currencyList: {
    headers: {
      crypto: 'Cryptomonnaies',
      fiat: 'Devises Fiat',
      all: 'Toutes les Devises',
      default: 'Liste des Devises',
    },
    search: {
      placeholder: 'Rechercher des devises...',
    },
    loading: 'Chargement des devises...',
    emptyState: {
      title: 'Aucune Devise Trouvée',
      noResults: 'Essayez ETH',
      noDataInList: 'Aucune devise disponible dans cette liste',
      selectList: 'Sélectionnez une liste de devises pour commencer',
    },
    footer: {
      showing: 'Affichage de',
      currency: 'devise',
      currencies: 'devises',
      matching: 'correspondant à',
    },
    badges: {
      crypto: 'CRYPTO',
      fiat: 'FIAT',
    },
  },
  errors: {
    fetchFailed: 'Échec de la récupération des données',
    apiServerDown: 'Échec de la récupération des données. Assurez-vous que le serveur API est en cours d\'exécution sur le port 3000.',
    noData: 'Aucune donnée disponible',
    insertDataFirst: 'Veuillez d\'abord insérer des données',
  },
  success: {
    dataInserted: 'Données insérées avec succès',
    dataCleared: 'Données effacées avec succès',
  },
  common: {
    ok: 'OK',
    cancel: 'Annuler',
    confirm: 'Confirmer',
  },
};

let currentLanguage: Language = Language.ENGLISH;

const getTranslations = (): Translations => {
  switch (currentLanguage) {
    case Language.SPANISH:
      return es;
    case Language.FRENCH:
      return fr;
    case Language.ENGLISH:
    default:
      return en;
  }
};

export const setLanguage = (lang: Language): void => {
  currentLanguage = lang;
};

export const getLanguage = (): Language => currentLanguage;

const interpolate = (template: string, values: Record<string, string | number>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(values[key] || ''));
};

export const i18n = {
  t: getTranslations,
  setLanguage,
  getLanguage,
  interpolate,
};

export default i18n;
