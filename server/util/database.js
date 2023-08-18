require("dotenv").config();
const Sequelize = require("sequelize");
const { supabase } = require("../config/supabaseClient");

const sequelize = new Sequelize(supabase, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  sequelize,
};
