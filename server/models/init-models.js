import Sequelize  from "sequelize";
import config from '../../config/config'

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect : 'postgres',
    pool : {
      max : 5,
      min : 0,
      acquire : 30000,
      idle : 10000
    }
  }
)

const DataTypes = require("sequelize").DataTypes;
const _countries = require("../../schemas/countries");
const _departments = require("../../schemas/departments");
const _dependents = require("../../schemas/dependents");
const _employees = require("../../schemas/employees");
const _jobs = require("../../schemas/jobs");
const _locations = require("../../schemas/locations");
const _regions = require("../../schemas/regions");
const _users = require("../../schemas/users");


function initModels(sequelize) {
  const countries = _countries(sequelize, DataTypes);
  const departments = _departments(sequelize, DataTypes);
  const dependents = _dependents(sequelize, DataTypes);
  const employees = _employees(sequelize, DataTypes);
  const jobs = _jobs(sequelize, DataTypes);
  const locations = _locations(sequelize, DataTypes);
  const regions = _regions(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);


  locations.belongsTo(countries, { as: "country", foreignKey: "country_id"});
  countries.hasMany(locations, { as: "locations", foreignKey: "country_id"});
  employees.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(employees, { as: "employees", foreignKey: "department_id"});
  dependents.belongsTo(employees, { as: "employee", foreignKey: "employee_id"});
  employees.hasMany(dependents, { as: "dependents", foreignKey: "employee_id"});
  employees.belongsTo(jobs, { as: "job", foreignKey: "job_id"});
  jobs.hasMany(employees, { as: "employees", foreignKey: "job_id"});
  departments.belongsTo(locations, { as: "location", foreignKey: "location_id"});
  locations.hasMany(departments, { as: "departments", foreignKey: "location_id"});
  countries.belongsTo(regions, { as: "region", foreignKey: "region_id"});
  regions.hasMany(countries, { as: "countries", foreignKey: "region_id"});

  return {
    countries,
    departments,
    dependents,
    employees,
    jobs,
    locations,
    regions,
    users
  };
}

const models = initModels(sequelize);
export default models
export {sequelize}

// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
