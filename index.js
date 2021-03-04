'use strict';

const { doScanAsync, doScan, doInsert, doDbsizeAsync } = require('./redis/redisFunctions.js')

/**
 * static void main args[]
 */

async function scan(pageSize = '25') {
  try {
    const { found, count, elapsed_time, success } = await doScanAsync("*jE4XJ0d4V8v6-10944ab6*", 1, pageSize)
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
  const dbsize = await doDbsizeAsync(1)
  const scanc25 = await scan()
  const scanc1000 = await scan('1000')
  const scanc10000 = await scan('10000')

  return {
    dbsize,
    scanc25,
    scanc1000,
    scanc10000
  }
}

main().then((data) => {
  console.log(data)
})

/**
 * Output:
 * 
 * COUNT = 25
 * 
 {
    dbsize: 12129529,
    scanc25: {
      found: [
        'testKey-4286-jE4XJ0d4V8v6-10944ab6-9522-4cf9-8db4-ef6b1c73d0fb'
      ],
      count: 1,
      elapsed_time: '298 s, 534.397 ms - doScanAsync'
    }
 }
 * 
 * COUNT = 1000
 * 
 {
    dbsize: 12129529,
    scanc1000: {
      found: [
        'testKey-4286-jE4XJ0d4V8v6-10944ab6-9522-4cf9-8db4-ef6b1c73d0fb'
      ],
      count: 1,
      elapsed_time: '65 s, 226.738 ms - doScanAsync'
    }
  }

 * COUNT = 10000
 * 
  {
    dbsize: 12129529,
    scanc10000: {
      found: [
        'testKey-4286-jE4XJ0d4V8v6-10944ab6-9522-4cf9-8db4-ef6b1c73d0fb'
      ],
      count: 1,
      elapsed_time: '34 s, 835.139 ms - doScanAsync'
    }
  }
 */

//console.log(doScan("*-*"))
//doScan("*DClmedSJQcqZ*")
//doInsert()
// client.set('key', 'value', redis.print())
// client.get('key', redis.print)
