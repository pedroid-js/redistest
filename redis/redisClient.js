const {
	REDIS: {
		DEFAULT: {
			HOST,
			PORT,
			DEBUG_MODE
		}
	}
} = require('../config.json')

const redis = require('redis')

redis.debug_mode = DEBUG_MODE

const client = redis.createClient({
	host: HOST,
	port: PORT
})

module.exports = client