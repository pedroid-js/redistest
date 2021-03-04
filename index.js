'use strict';

const { doScanAsync, doScan, doInsert } = require('./redis/redisFunctions.js')

/**
 * static void main args[]
 */


async function main() {
  let response = null
  try {
    response = await doScanAsync('0',"*bfed*")
  } catch(e) {
    console.error(e)
  }
  return response
}


main().then((data) => {
  console.log(data)
})



//console.log(doScan("*-*"))
//doScan("*DClmedSJQcqZ*")
//massiveInsert()
// client.set('key', 'value', redis.print())
// client.get('key', redis.print)