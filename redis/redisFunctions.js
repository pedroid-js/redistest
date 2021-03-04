'use strict';

const client = require('./redisClient.js')
const csv = require('csv-parser')
const fs = require('fs')
const { v4 } = require('uuid')
const { promisify } = require('util')
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)
const scanAsync = promisify(client.scan).bind(client)
const selectAsync = promisify(client.select).bind(client)
const dbsizeAsync = promisify(client.dbsize).bind(client)
const { gchar, elapsed_time } = require('../assets/js/utils')

let interval = null

function doInsert(maxReg = 12000000, db = 1, k = "t") {
	if (!interval) {
		interval = setInterval(() => {
			maxReg = maxReg - 10000
			doInsert(maxReg, 1, gchar(12))
		}, 2500)
	}
	for (let i = 0; i < 10000; i++) {
		insertReg(db, `testKey-${i}-${k}-${v4()}`, `testValue-${i}-${k}-${v4()}`)
	}
	if (maxReg <= 0) {
		clearInterval(interval)
		client.quit()
	}
}

async function doDbsizeAsync(db) {
	let size = 0
	try {
		await selectAsync(db)
		size = await dbsizeAsync()
	} catch (e) {
		console.error(e)
	}
	return size
}

async function doScanAsync(pattern, db = 1, count = '10000') {
	const found = []
	let cursor = '0'
	let start = process.hrtime()
	do {
		try {
			await selectAsync(db)
			const reply = await scanAsync(cursor, 'MATCH', pattern, 'COUNT', count)
			cursor = reply[0]
			found.push(...reply[1])
		} catch(e) {
			console.error(e)
		}
	} while(cursor !== '0')
	client.quit()
	return {
		found: found,
		count: found.length,
		elapsed_time: elapsed_time(start, "doScanAsync"),
		success: found.length > 0 ? true : false
	}
}

function doScan(pattern, db = 1, count = '50') {
	let cursor = '0'
	try {
		client
			.multi()
			.select(db)
			.scan(cursor, 'MATCH', pattern, 'COUNT', count)
			.exec((err, data) => {
				if (err) throw err

				cursor = data[0]

				const keys = data[1]

				if (keys.length > 0) {
					console.log('Array of matching keys', keys);
					return keys
				}

				if (cursor === '0') {
					console.log('Iteration complete');
				}
			})
	} catch (e) {
		console.error(e)
	}
}

async function insertReg(db, key, value) {
	try {
		await selectAsync(db)
		setAsync(key, value)
	} catch(e) {
		console.error(e)
	}
}

function bulkCSV(file) {
	fs.createReadStream(file)
		.pipe(csv())
		.on('data', (data) => {
			try {
				setAsync('key:' + data.key, JSON.stringify(data))
			} catch (e) {
				console.error(e)
			}
		})
		.on('end', () => {

		})
}

module.exports = {
	doInsert,
	doScan,
	doScanAsync,
	doDbsizeAsync,
	bulkCSV
}
