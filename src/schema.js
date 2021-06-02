exports.schema = {
  type: 'object',
  properties: {
    datetime: {
      type: 'string',
      format: 'date-time',
    },
    eco2: {
      type: 'integer',
    },
    tvoc: {
      type: 'integer',
    },
  },
  required: ['datetime', 'eco2', 'tvoc'],
  additionalProperties: false,
};
