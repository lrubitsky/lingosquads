/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("languageGroups", (table) => {
    table.string("placeCategory");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.table("languageGroups", (table) => {
    table.dropColumn("placeCategory");
  });
};
