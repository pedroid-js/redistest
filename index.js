'use strict';

const { doScanAsync, doScan, doInsert } = require('./redis/redisFunctions.js')

/**
 * static void main args[]
 */


async function main() {
  return doScanAsync('0',"*bfed*")
}


main().then((data) => {
  console.log(data)
})



//console.log(doScan("*-*"))
//doScan("*DClmedSJQcqZ*")
//massiveInsert()
// client.set('key', 'value', redis.print())
// client.get('key', redis.print)