'use strict';

const { doScanAsync, doScan, doInsert } = require('./redis/redisFunctions.js')

/**
 * static void main args[]
 */
async function main() {
  try {
    const { found, count, success } = await doScanAsync('0',"*bfed*")
    if (success) {
      return {
        found,
        count
      }
    } else {
      return {
        "msg": `found ${count} keys for this pattern`
      }
    }
  } catch(e) {
    console.error(e)
  }
}


main().then((data) => {
  console.log(data)
})



//console.log(doScan("*-*"))
//doScan("*DClmedSJQcqZ*")
//massiveInsert()
// client.set('key', 'value', redis.print())
// client.get('key', redis.print)