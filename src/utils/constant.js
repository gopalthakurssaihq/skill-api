const i18next = require('../config/i18n');
const path = require('path');

// Function to load module-specific locales (e.g., for "auth" module)
function loadModuleLocales(module, lang = 'en') {
  try {
    const moduleLocalesPath = path.join(__dirname, '..', 'modules', module, 'locales', `${lang}.json`);
    const moduleLocales = require(moduleLocalesPath);
    return (category, key) => {
      return moduleLocales[category][key] || null;
    };
  } catch (err) {
    console.log('Error while load modules locales ', err);
    // If there's an error (e.g., locales file is missing), return null
    return () => null;
  }
}

// Global fallback for categories that don't exist in module-specific locales
const getMessage = (lang, category, key, module = null) => {
  // First, check i18next global translations (common category)
  const globalMsg = i18next.t(`common.${category}.${key}`);

  // If a module is provided, try to load its specific locales
  let moduleMsg = null;
  if (module) {
    const loadModule = loadModuleLocales(module, lang);
    moduleMsg = loadModule(category, key);
  }
  //   console.log("Error while load modules locales ",err)
  // If module-specific message is not found, use the global message
  const finalMessage = moduleMsg || globalMsg;

  // If neither found, return an unknown message
  return finalMessage || { code: 'UNKNOWN', message: 'Message not found', ariaLabel: 'Error: Message not found' };
};

module.exports = { getMessage };
