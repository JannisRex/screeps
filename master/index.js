// index.js
module.exports = {
  // BUILDINGS
  Tower: require('./buildings/Tower'),

  // CREEPS
  builder: require('./creeps/role.builder'),
  harvester: require('./creeps/role.harvester'),
  upgrader: require('./creeps/role.upgrader'),

  // LIB
  constants: require('./lib/helper.constants'),
  control: require('./lib/helper.control')
}
