'use strict';

/**
 * n8n router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::n8n.n8n');
