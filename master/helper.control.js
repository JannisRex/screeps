let roleHarvester = require('role.harvester')

let roleBuilder = require('role.builder')

let roleUpgrader = require('role.upgrader')

let isSpawning = false
const spawnOne = Game.spawns.S1

/*  COST
    WORK = 100,
    CARRY = 50,
    MOVE = 50
*/

let helperControl = {

  /**  **/
  spawnHarvester: function () {
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester')
    let energyAvailable = spawnOne.store[RESOURCE_ENERGY]

    if (harvesters.length < 2 && energyAvailable > 200 && !isSpawning) {
      isSpawning = true
      let newName = 'Harvester' + Game.time

      spawnOne.spawnCreep([WORK, CARRY, MOVE], newName,
        { memory: { role: 'harvester' } })
    }

    helperControl.checkIfSpawning()
  },

  /**  **/
  spawnBuilder: function () {
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder')
    let energyAvailable = spawnOne.store[RESOURCE_ENERGY]

    if (builders.length < 1 && energyAvailable > 200 && !isSpawning) {
      isSpawning = true
      let newName = 'Builder' + Game.time

      spawnOne.spawnCreep([WORK, CARRY, MOVE], newName,
        { memory: { role: 'builder' } })
    }

    helperControl.checkIfSpawning()
  },

  /**  **/
  spawnUpgrader: function () {
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader')
    let energyAvailable = spawnOne.store[RESOURCE_ENERGY]

    if (upgraders.length < 1 && energyAvailable > 200 && !isSpawning) {
      isSpawning = true
      let newName = 'Upgrader' + Game.time

      spawnOne.spawnCreep([WORK, CARRY, MOVE], newName,
        { memory: { role: 'upgrader' } })
    }

    helperControl.checkIfSpawning()
  },

  /**  **/
  checkIfSpawning: function () {
    if (spawnOne.spawning) {
      let spawningCreep = Game.creeps[spawnOne.spawning.name]
      spawnOne.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        spawnOne.pos.x + 1,
        spawnOne.pos.y,
        { align: 'left', opacity: 0.8 })
    } else {
      isSpawning = false
    }
  },

  assignRoles: function () {
    for (let name in Game.creeps) {
      if (name && typeof name === 'string') {
        let creep = Game.creeps[name] ? Game.creeps[name] : null
        if (creep) {
          if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep)
          }
          if (creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep)
          }
          if (creep.memory.role === 'builder') {
            roleBuilder.run(creep)
          }
        }
      }
    }
  },

  clearDeadMemory: function () {
    for (let name in Memory.creeps) {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name]
        console.log('Clearing non-existing creep memory:', name)
      }
    }
  }

}

module.exports = helperControl
