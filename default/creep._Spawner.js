module.exports =
{
  __constructor: function () {
    if (Memory.spawnQue === undefined) {
      Memory.spawnQue = [ ]
    }
  },

  // just takes creep and a boolean, wether
  // to unshift or push
  addElement: function (creep, unshift) {
    this.__constructor()

    if (unshift !== undefined && unshift === true) {
      // put in front
      Memory.spawnQue.unshift(creep)
    } else {
      // put at back
      Memory.spawnQue.push(creep)
    }
  },

  spawnCost: function (role) {
    let creepManager = require('creep._Manager')
    let parts = creepManager.getRoleBodyParts(role)

    let cost = 0
    for (let i in parts) {
      if (parts[i]) {
        let part = parts[i]
        switch (part) {
        case WORK:
          cost = cost + 100
          break

        case MOVE:
          cost = cost + 50
          break

        case CARRY:
          cost = cost + 50
          break

        case ATTACK:
          cost = cost + 80
          break

        case RANGED_ATTACK:
          cost = cost + 150
          break

        case HEAL:
          cost = cost + 250
          break

        case TOUGH:
          cost = cost + 10
          break

        case CLAIM:
          cost = cost + 600
          break

        default:
          break
        }
      }
    }

    return cost
  },

  canSpawn: function (spawnPoint, role) {
    // when only passing role and not spawn
    if (typeof spawnPoint === 'string' && role === undefined) {
      role = spawnPoint
      spawnPoint = Game.spawns.S1
    }

    return spawnPoint.room.energyAvailable >= this.spawnCost(role)
      && (spawnPoint.spawning === null
        || spawnPoint.spawning === undefined)
  },

  spawn: function (role, memory, spawnPoint) {
    if (!spawnPoint) {
      spawnPoint = Game.spawns.S1
    }

    let creepManager = require('creep._Manager')

    if (!creepManager.roleExists(role)) {
      return
    }

    if (!this.canSpawn(spawnPoint, role)) {
      return
    }

    if (memory === undefined) {
      memory = { }
    }

    memory.role = role

    let nameCount = 0
    let name = null
    while (name === null) {
      nameCount = nameCount + 1
      let plsDontExist = role + nameCount
      if (Game.creeps[plsDontExist] === undefined) {
        name = plsDontExist
      }
    }

    console.log('Spawning ' + name || role)
    spawnPoint.spawnCreep(creepManager.getRoleBodyParts(role), name, memory)
  },

  spawnQue: function () {
    this.__constructor()

    // if que is empty
    if (!Memory.spawnQue.length) {
      return
    }

    let room = Game.rooms[Game.spawns.S1.room.name]
    let spawns = room.find(FIND_MY_SPAWNS, {
      filter: function (spawn) {
        return spawn.spawning === undefined || spawn.spawning === null
      }
    })

    // no spawns available
    if (!spawns.length) {
      return
    }

    let role = Memory.spawnQue[0]

    if (typeof role === 'string') {
      role = { type: role, memory: { } }
    }


    // Need to rebind this in order to not
    // have missing reference wheb calling
    // => 'this' references SpawnerClass not each spawn
    let that = this

    // checks if any of ym spawns can spawn this cerep
    let toSpawnAt = spawns.filter(function (spawn) {
      return that.canSpawn(spawn, role.type)
    })

    // nowhere to spawn
    if (!toSpawnAt.length) {
      return
    }

    toSpawnAt = toSpawnAt[0]

    this.spawn(role.type, role.memory, toSpawnAt)

    Memory.spawnQue.shift()
  },

  // either kill all of specific role
  // or kill all if no role is passed
  killCreeps: function (role) {
    for (let i in Game.creeps) {
      if (role === undefined || Game.creeps[i].memory.role === role) {
        Game.creeps[i].suicide()
      }
    }
  }
}
