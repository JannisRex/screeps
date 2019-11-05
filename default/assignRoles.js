module.exports = function (creeps) {
  let creepManager = require('creep._Manager')
  let role = { }

  // iterate throuhg all creeps and
  // let them do what theyre supposed to
  for (let name in creeps) {
    if (creeps[name]) {
      let creep = creeps[name]
      // basically if the creep is not responsible
      if (creep.spawning || creep.memory.role === undefined || (creep.memory.active !== undefined && !creep.memory.active)) {
        continue
      }

      role = creep.memory.role

      if (creepManager.roleExists(role)) {
        role = creepManager.getRole(role)
      }

      role = Object.create(role)
      role.setCreep(creep)
      try {
        role.run()
      } catch (e) {
        console.log('CREEP ERROR: ', e)
      }
    }
  }
}
