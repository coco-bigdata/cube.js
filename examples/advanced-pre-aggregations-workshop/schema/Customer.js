cube(`Customer`, {
  sql: `SELECT * FROM tpc_h.customer`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [cName]
    }
  },
  
  dimensions: {
    /**
     * Step 3.
     * Introducing joins for large queries and dedicated pre-aggregations
     */
    cCustKey: {
      sql: `${CUBE}.\`C_CUSTKEY\``,
      type: `number`,
      primaryKey: true
    },

    cName: {
      sql: `${CUBE}.\`C_NAME\``,
      type: `string`
    },
    
    cAddress: {
      sql: `${CUBE}.\`C_ADDRESS\``,
      type: `string`
    },
    
    cPhone: {
      sql: `${CUBE}.\`C_PHONE\``,
      type: `string`
    },
    
    cAcctbal: {
      sql: `${CUBE}.\`C_ACCTBAL\``,
      type: `string`
    },
    
    cMktsegment: {
      sql: `${CUBE}.\`C_MKTSEGMENT\``,
      type: `string`
    },
    
    cComment: {
      sql: `${CUBE}.\`C_COMMENT\``,
      type: `string`
    }
  }
});
