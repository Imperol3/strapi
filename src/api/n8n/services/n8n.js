'use strict';

/**
 * n8n service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::n8n.n8n');
