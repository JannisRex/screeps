let roleHarvester = require('role.harvester')
let harvesterCount = 0

let roleBuilder = require('role.builder')
let builderCount = 0

let roleUpgrader = require('role.upgrader')
let upgraderCount = 0

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
    let isSpawning = false

    if (harvesters.length < 2 && energyAvailable > 200 && !isSpawning) {
      harvesterCount = harvesterCount + 1
      isSpawning = true
      let newName = 'Harvester' + harvesterCount

      spawnOne.spawnCreep([WORK, CARRY, MOVE], newName,
        { memory: { role: 'harvester' } })

      let creep = null
      while (isSpawning) {
        creep = Game.creeps[newName]
        if (creep) {
          if (creep.memory.role === 'harvester') {
            roleHarvester.run(creep)
            isSpawning = false
          }
        }
      }
    }
  },

  /**  **/
  spawnBuilder: function () {
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder')
    let energyAvailable = spawnOne.store[RESOURCE_ENERGY]
    let isSpawning = false

    if (builders.length < 1 && energyAvailable > 200 && !isSpawning) {
      builderCount = builderCount + 1
      isSpawning = true
      let newName = 'Builder' + builderCount

      spawnOne.spawnCreep([WORK, CARRY, MOVE], newName,
        { memory: { role: 'builder' } })

      let creep = Game.creeps[newName]
      if (creep) {
        if (creep.memory.role === 'builder') {
          roleBuilder.run(creep)
          isSpawning = false
        }
      }
    }
  },

  /**  **/
  spawnUpgrader: function () {
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader')
    let energyAvailable = spawnOne.store[RESOURCE_ENERGY]
    let isSpawning = false

    if (upgraders.length < 1 && energyAvailable > 200 && !isSpawning) {
      upgraderCount = upgraderCount + 1
      isSpawning = true
      let newName = 'Harvester' + upgraderCount

      spawnOne.spawnCreep([WORK, CARRY, MOVE], newName,
        { memory: { role: 'harvester' } })

      let creep = Game.creeps[newName]
      if (creep) {
        if (creep.memory.role === 'upgrader') {
          roleUpgrader.run(creep)
          isSpawning = false
        }
      }
    }
  },

  /**  **/
  checkIfSpawning: function () {
    if (spawnOne.spawning) {
      try {
        let spawningCreep = Game.creeps[spawnOne.spawning.name]
        spawnOne.room.visual.text(
          '🛠️' + spawningCreep.memory.role,
          spawnOne.pos.x + 1,
          spawnOne.pos.y,
          { align: 'left', opacity: 0.8 })
      } catch (e) { /* console.log(e) */ }
    }
  },

  assignRoles: function () {
    for (let name in Game.creeps) {
      if (name && typeof name === 'string') {
        let creep = Game.creeps[name]
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
