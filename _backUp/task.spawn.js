/* Gets passed role & Type.
 * Aswell as Spawn & Name to
 * spawn a Creep with passed properties
 */

module.exports = function (proto, spawn, name) {
  let role = proto.role
  let parts = proto.parts

  if (name === undefined) {
    name = role.charAt(0).toUpperCase() + role.substring(1) + Game.time
  }

  let memory = proto.memory || {}
  let defaults = spawn.memory.defaults || {}
  defaults = defaults[role] || {}

  // copies memory from defaults/Spawn to creep,
  // passing prefferedSource etc.
  memory = Object.assign(defaults, memory)

  memory.role = role
  memory.mode = 'mine'

  // just to test if its possible to spawn, prevent CreepUndefined etc.
  let workOrder = spawn.spawnCreep(parts, name, { dryRun: true })

  if (workOrder === OK) {
    workOrder = spawn.spawnCreep(parts, name, { memory: memory })
    return Game.creeps[name]
  }

  // console.log(workOrder);
  return workOrder
}
