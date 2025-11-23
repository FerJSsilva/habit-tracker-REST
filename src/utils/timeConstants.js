/**
 * Time constants in milliseconds for usage in caching, ETags and expiration headers
 */

// Base time units in milliseconds
const MILLISECOND = 1;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY; // Aproximação de um mês (30 dias)
const YEAR = 365 * DAY; // Aproximação de um ano (365 dias)

/**
 * Gera uma string de data UTC formatada para uso em cabeçalhos de expiração
 * @param {number} timeInMs - Tempo em milissegundos a partir de agora
 * @returns {string} - Data UTC formatada
 */
const getExpirationDate = (timeInMs) => {
  return new Date(Date.now() + timeInMs).toUTCString();
};

/**
 * Gera um valor de ETag simples baseado na data atual e no tempo de expiração
 * @param {number} timeInMs - Tempo em milissegundos para expiração
 * @returns {string} - Valor de ETag
 */
const generateETag = (timeInMs) => {
  // Um método simples - você pode implementar algo mais robusto conforme necessário
  return `W/"${Date.now()}-${timeInMs}"`;
};

export {
  // Unidades básicas
  MILLISECOND,
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  WEEK,
  MONTH,
  YEAR,
  
  // Funções auxiliares
  getExpirationDate,
  generateETag
};