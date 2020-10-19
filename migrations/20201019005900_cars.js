
exports.up = async function(knex) {
  await knex.schema.createTable("cars", (table)=>{
      table.integer("ID").notNull().unique().primary()
      table.integer("VIN").notNull().unique()
      table.text("Make").notNull()
      table.text("Model").notNull()
      table.float("Mileage").notNull()
      table.text("Transmission").defaultTo("Automatic")
      table.text("Status").defaultTo("Clean")
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("cars")
};
