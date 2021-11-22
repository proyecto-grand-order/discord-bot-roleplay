import EventEmitter from 'events';
import Redis from 'ioredis';

export class RedisProvider extends EventEmitter {

	constructor(uri, options) {
		// super EventEmitter
		super();

		// Namespace
		this.namespace = 'bot';

		// Uri is a redis client
		if (uri instanceof Redis || uri instanceof Redis.Cluster) {
			this.redis = uri;
		}
		else {
			options = Object.assign({}, typeof uri === 'string' ? { uri } : uri, options);
			this.redis = new Redis(options.uri, options);
		}

		// Events Of this provider
		this.redis.on('error', error => this.emit('error', error));
		this.redis.on('connect', () => this.emit('connect'));
	}

	_getNamespace() {
		return `namespace:${this.namespace}`;
	}


	async get(key) {
		const value = await this.redis.get(key);
		return value ? JSON.parse(value) : undefined;
	}

	async set(key, value, ttl) {

		value = JSON.stringify(value);

		if (typeof value === 'undefined') return Promise.resolve(undefined);

		if (typeof ttl === 'number') {
			return this.redis.set(key, value, 'PX', ttl);
		}

		await this.redis.set(key, value);

		return await this.redis.sadd(this._getNamespace(), key);
	}


	async delete(key) {
		const items = await this.redis.del(key);
		await this.redis.srem(this._getNamespace(), key);
		return items > 0;
	}


	async clear() {
		const keys = await this.redis.smembers(this._getNamespace());
		await this.redis.del(keys.concat(this._getNamespace()));
		return undefined;
	}


	async keys() {
		return await this.redis.smembers(this._getNamespace());
	}

}

const keyv = new RedisProvider(process.env.redisUri);

keyv.on('error', error => console.error(error));
keyv.on('connect', () => console.log('[!] Redis connected'));

export default keyv;