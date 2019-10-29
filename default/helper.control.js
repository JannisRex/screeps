let constants = require('helper.constants')
let roleMiner = require('role.miner')
let roleBuilder = require('role.builder')
let roleUpgrader = require('role.upgrader')

const maxCreepParts = constants.maxCreepParts
const spawnOne = Game.spawns.S1

/*  COST
    WORK = 100,
    CARRY = 50,
    MOVE = 50
*/

let helperControl = {
  /**  **/
  spawnMiner: function () {
    let miners = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner')

    if (miners.length < 2) {
      let newName = 'Miner' + Game.time
      let energyAvailable = spawnOne.room.energyCapacityAvailable
      let availableParts = maxCreepParts
      let creepParts = []

      // if theres still 'room' to make 2xWork + 1xCarry + 1xMove
      // and enough energy in storage
      while (availableParts >= 4 && energyAvailable >= 300) {
        // pushing parts to array, which will be used to spawn creep
        creepParts.push(WORK)
        creepParts.push(WORK)
        creepParts.push(CARRY)
        creepParts.push(MOVE)

        availableParts = availableParts - 4
        energyAvailable = energyAvailable - 300
      }

      spawnOne.spawnCreep(creepParts, newName,
        { memory: { role: 'miner' } })
    }

    helperControl.checkIfSpawning()
  },

  /**  **/
  spawnBuilder: function () {
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder')

    if (builders.length < 1) {
      let newName = 'Builder' + Game.time
      let energyAvailable = spawnOne.room.energyCapacityAvailable
      let availableParts = maxCreepParts
      let creepParts = []

      // if theres still 'room' to make 2xWork + 1xCarry + 1xMove
      // and enough energy in storage
      while (availableParts >= 4 && energyAvailable >= 300) {
        // pushing parts to array, which will be used to spawn creep
        creepParts.push(WORK)
        creepParts.push(WORK)
        creepParts.push(CARRY)
        creepParts.push(MOVE)

        availableParts = availableParts - 4
        energyAvailable = energyAvailable - 300
      }

      spawnOne.spawnCreep(creepParts, newName,
        { memory: { role: 'builder' } })
    }

    helperControl.checkIfSpawning()
  },

  /**  **/
  spawnUpgrader: function () {
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader')

    if (upgraders.length < 1) {
      let newName = 'Upgrader' + Game.time
      let energyAvailable = spawnOne.room.energyCapacityAvailable
      let availableParts = maxCreepParts
      let creepParts = []

      // if theres still 'room' to make 2xWork + 1xCarry + 1xMove
      // and enough energy in storage
      while (availableParts >= 4 && energyAvailable >= 300) {
        // pushing parts to array, which will be used to spawn creep
        creepParts.push(WORK) // 100
        creepParts.push(CARRY) // 50
        creepParts.push(CARRY) // 50
        creepParts.push(CARRY) // 50
        creepParts.push(MOVE) // 50

        availableParts = availableParts - 4
        energyAvailable = energyAvailable - 300
      }

      spawnOne.spawnCreep(creepParts, newName,
        { memory: { role: 'upgrader' } })
    }

    helperControl.checkIfSpawning()
  },

  /**  **/
  checkIfSpawning: function () {
    if (spawnOne.spawning) {
      let spawningCreep = Game.creeps[spawnOne.spawning.name]

      if (spawningCreep) {
      // gets Emote according to creepRole
        let roleEmote = '👀👀👀'
        if (spawningCreep.memory.role === 'miner') {
          roleEmote = '⛏'
        }

        if (spawningCreep.memory.role === 'builder') {
          roleEmote = '🛠'
        }

        if (spawningCreep.memory.role === 'upgrader') {
          roleEmote = '⚙'
        }

        spawnOne.room.visual.text(
          roleEmote + spawningCreep.memory.role,
          spawnOne.pos.x + 1,
          spawnOne.pos.y,
          { align: 'left', opacity: 0.8 })
      }
    } else {
      isSpawning = false
    }
  },

  assignRoles: function () {
    for (let name in Game.creeps) {
      if (name && typeof name === 'string') {
        let creep = Game.creeps[name] ? Game.creeps[name] : null
        if (creep) {
          if (creep.memory.role === 'miner') {
            roleMiner.run(creep)
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
