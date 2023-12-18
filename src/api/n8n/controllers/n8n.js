'use strict';

/**
 * n8n controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::n8n.n8n');
