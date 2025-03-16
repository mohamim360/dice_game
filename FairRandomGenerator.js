const crypto = require('crypto');

class FairRandomGenerator {
	static generateFairRandom(range) {
			const key = crypto.randomBytes(32).toString('hex');
			const x = crypto.randomInt(range);
			const hmac = crypto.createHmac('sha3-256', key).update(x.toString()).digest('hex');
			return { key, x, hmac };
	}

	static calculateResult(x, y, range) {
			return (x + y) % range;
	}
}
module.exports = FairRandomGenerator;