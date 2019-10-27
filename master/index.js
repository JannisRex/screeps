// BUILDINGS
module.exports.buildings = {
  tower: require('defence.tower')
}

// CREEPS
module.exports.creeps = {
  builder: require('role.builder'),
  harvester: require('role.harvester'),
  upgrader: require('role.upgrader')
}
// LIB
module.exports.lib = {
  constants: require('helper.constants'),
  control: require('helper.control')
}
