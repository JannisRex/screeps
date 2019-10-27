// BUILDINGS
module.exports.buildings = {
  tower: require('./buildings/defence.tower')
}

// CREEPS
module.exports.creeps = {
  builder: require('./creeps/role.builder'),
  harvester: require('./creeps/role.harvester'),
  upgrader: require('./creeps/role.upgrader')
}
// LIB
module.exports.lib = {
  constants: require('./lib/helper.constants'),
  control: require('./lib/helper.control')
}
