cube(`Order`, {
  sql: `SELECT * FROM tpc_h.order`,

  preAggregations: {
    /**
     * Step 1.
     * Using non-additive vs additive measures
     */

    /** Non-additive */
    // totalPriceAvgClerkCountDist: {
    //   measures: [
    //     Order.totalPriceAvg,
    //     Order.clerkCountDistinct
    //   ],
    //   dimensions: [
    //     Order.oOrderpriority
    //   ]
    // },

    /** Additive */
    // totalPriceAvgClerkCountDist: {
    //   measures: [
    //     Order.totalPriceSum,
    //     Order.count,
    //     Order.clerkCountDistinct
    //   ],
    //   dimensions: [
    //     Order.oOrderpriority
    //   ]
    // }

    /**
     * Step 2.
     * Using non-additive measures with dedicated pre-aggregations
     */
    /** With a dimension */
    // totalPriceAvgClerkCountDist1: {
    //   measures: [
    //     Order.totalPriceAvg,
    //     Order.clerkCountDistinct
    //   ],
    //   dimensions: [
    //     Order.oOrderpriority
    //   ]
    // },
    /** Without a dimension */
    // totalPriceAvgClerkCountDist2: {
    //   measures: [
    //     Order.totalPriceAvg,
    //     Order.clerkCountDistinct
    //   ]
    // },


    /**
     * Step 3.
     * Using dedicated pre-aggregations for large and complex queries
     */
    dailyOrdersPerCustomer: {
      measures: [
        Order.count,
        Order.totalPriceSum
      ],
      dimensions: [
        Customer.cName
      ],
      timeDimension: Order.oOrderdate,
      granularity: `day`
    }
  },

  joins: {
    /**
     * Step 3.
     * Introducing joins for large queries and dedicated pre-aggregations
     */
    Customer: {
      relationship: `belongsTo`,
      sql: `${CUBE.oCustkey} = ${Customer.cCustKey}`,
    },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [oOrderdate]
    },

    /**
     * Step 1.
     * Using non-additive vs additive measures
     */ 

    /** Non-Additive */
    // totalPriceAvg: {
    //   sql: `${CUBE}.O_TOTALPRICE`,
    //   type: `avg`
    // },
    // clerkCountDistinct: {
    //   sql: `${CUBE}.O_CLERK`,
    //   type: `countDistinct`
    // },
    
    /** Additive */
    // totalPriceAvg: {
    //   sql: `${CUBE.totalPriceSum} / ${CUBE.count}`,
    //   type: `number`,
    // },
    // totalPriceSum: {
    //   sql: `${CUBE}.O_TOTALPRICE`,
    //   type: `sum`,
    // },
    // clerkCountDistinct: {
    //   sql: `${CUBE}.O_CLERK`,
    //   type: `countDistinctApprox`
    // },

    /**
     * Step 2.
     * Using non-additive measures with dedicated pre-aggregations
     */
    // totalPriceAvg: {
    //   sql: `${CUBE}.O_TOTALPRICE`,
    //   type: `avg`
    // },
    // clerkCountDistinct: {
    //   sql: `${CUBE}.O_CLERK`,
    //   type: `countDistinct`
    // },

    /**
     * Step 3.
     * Using dedicated pre-aggregations for large and complex queries
     */
    totalPriceAvg: {
      sql: `${CUBE.totalPriceSum} / ${CUBE.count}`,
      type: `number`,
    },
    totalPriceSum: {
      sql: `${CUBE}.O_TOTALPRICE`,
      type: `sum`,
    },
  },

  dimensions: {
    /**
     * Step 3.
     * Introducing joins for large queries and dedicated pre-aggregations
     */
    oCustkey: {
      sql: `${CUBE}.O_CUSTKEY`,
      type: `number`,
      primaryKey: true
    },

    oOrderstatus: {
      sql: `${CUBE}.O_ORDERSTATUS`,
      type: `string`
    },
    
    oTotalprice: {
      sql: `${CUBE}.O_TOTALPRICE`,
      type: `string`
    },
    
    oOrderpriority: {
      sql: `${CUBE}.O_ORDERPRIORITY`,
      type: `string`
    },
    
    oClerk: {
      sql: `${CUBE}.O_CLERK`,
      type: `string`
    },
    
    oComment: {
      sql: `${CUBE}.O_COMMENT`,
      type: `string`
    },
    
    oOrderdate: {
      sql: `CAST(${CUBE}.\`O_ORDERDATE\` AS TIMESTAMP)`,
      type: `time`
    }
  }
});