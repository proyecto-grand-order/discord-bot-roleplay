import {RedisProvider} from "../database/redis.js"

/**
 * Todos los metodos que se pueden usar en la interfaz de redis
 * @interface RedisProvider
 */
export interface RedisProviderMethods {
    
    /**
	 * Get a value from redis
	 * @param {string} key
	 * @returns {Promise<any>}
	 * @memberof RedisProvider
	 * @example
	 * const value = await provider.get('key');
	 * console.log(value);
	 * // => 'value'
	 */
    get(key: string): Promise<string>;

    /**
	 * Set a value in redis
	 * @param {string} key - Key
	 * @param {any} value - Value
	 * @param {number} [expire=0] - Expire time in seconds
	 * @returns {Promise<void>}
	 * @memberof RedisProvider
	 * @example
	 * await provider.set('key', 'value');
	 * await provider.set('key', 'value', 60);
	 */
    set(key: string, value: string): Promise<void>;

    /**
	 * Delete a value from redis
	 * @param {string} key - Key
	 * @returns {Promise<void>}
	 * @memberof RedisProvider
	 * @example
	 * await provider.delete('key');
	 */
    delete(key: string): Promise<void>;

	/**
	 * Delete all values from redis
	 * @returns {Promise<void>}
	 */
    clear(): Promise<void>;
    
    /**
	 * Get all keys from redis
	 * @returns {Promise<string[]>}
	 * @memberof RedisProvider
	 * @example
	 * const keys = await provider.keys();
	 * console.log(keys);
	 * // => ['key1', 'key2', 'key3']
	 */
    keys(): Promise<string[]>;
}