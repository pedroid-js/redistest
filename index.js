'use strict';

const { doScanAsync, doScan, doInsert } = require('./redis/redisFunctions.js')

/**
 * static void main args[]
 */

async function scan(pageSize = '25') {
  try {
    const { found, count, elapsed_time, success } = await doScanAsync("*DAJcUm*", 1, pageSize)
    if (success) {
      return {
        found,
        count,
        elapsed_time
      }
    } else {
      return {
        "msg": `found ${count} keys for this pattern`,
        count,
        elapsed_time
      }
    }
  } catch(e) {
    console.error(e)
  }
}

async function main() {
  const scanc25 = await scan()
  const scanc1000 = await scan('1000')
  const scanc10000 = await scan('10000')

  return {
    scanc25,
    scanc1000,
    scanc10000
  }
}

main().then((data) => {
  console.log(data)
})

//console.log(doScan("*-*"))
//doScan("*DClmedSJQcqZ*")
//doInsert()
// client.set('key', 'value', redis.print())
// client.get('key', redis.print)
