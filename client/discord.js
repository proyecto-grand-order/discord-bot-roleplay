import { Client, Intents } from 'discord.js';
import EventReady from '../events/onReady.js';
import EventMessage from '../events/onMessage.js';
import CommandLoader from '../handlers/command.js';

export default class Discord extends Client {
	/**
     * Custom Client constructor
     * @param {string} token The bot token
     */
	constructor(token) {
		super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
		this.token = token;
		this.init();
	}

	/**
     * Initialize the client with all events
     * @returns {void}
     */
	async init() {
		await this.loadCommmands();
		await this.onReady();
		await this.onMessage();
		await this.login(this.token);
	}

	/**
     * Wait for the client to be ready
     * @returns {Promise<void>}
     */
	async onReady() {
		return this.once('ready', EventReady);
	}

	/**
     * See all message has been send in the server
     * @returns {Promise<void>}
     */
	async onMessage() {
		return this.on('messageCreate', EventMessage);
	}

	/**
     * Load all commands in the bot and register them in the client.
     * @returns {Promise<void>}
     */
	async loadCommmands() {
		return await CommandLoader();
	}
}