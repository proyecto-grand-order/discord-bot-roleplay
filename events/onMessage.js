import { CommandClient, commands } from '../client/cache.js';
import Database from '../database/redis.js';
import layoutText from '../helper/layout.js';
import { MessageEmbed } from 'discord.js';

const cacheCommands = [];
const cacheSkills = [];

/**
 * This function is called when recive a message
 * @param {import("discord.js").Message} message
 */
export default async function(message) {
	// If the message is from a bot, ignore it
	if (message.author.bot) return;

	if (!message.content.startsWith(process.env.prefix || '!')) return;


	// Skill Section
	const skillCall = message.content.slice(1).toLowerCase();

	if (cacheSkills.length > 0) {
		const skillFromCache = cacheSkills.find(sk => sk.command === skillCall);
		if (skillFromCache) return layoutText(skillFromCache, message);
	}

	const skill = await Database.get(skillCall);

	if (skill) {
		cacheSkills.push(skill);
		return layoutText(skill, message);
	}

	// Command Section
	const args = message.content.slice(1).split(/ +/);
	const command = args.shift().toLowerCase();
	const hasCached = cacheCommands.length === commands.size;
	const allCommands = hasCached ? cacheCommands : CommandClient.allCommands;

	if (!hasCached) cacheCommands.push(...allCommands);

	console.log(`[!] Command ${command}`);

	const cmd = allCommands.find(c => c.name === command || c.aliases.includes(command));

	if (!cmd) return;

	if (cmd.guildOnly && message.channel.type !== 'text') {
		const embed = new MessageEmbed()
			.setColor('#ff0000')
			.setDescription('Este comando solo se puede usar en canales de texto.');

		return message.reply({ embeds: [embed] });
	}

	// If dont has permission, return
	if (!message.member.permissions.has(cmd.permissions)) {
		const embed = new MessageEmbed()
			.setColor('#ff0000')
			.setDescription('No tienes permisos suficientes para usar este comando.');

		return message.reply({ embeds: [embed] });
	}

	// Run the command
	cmd.execute(message, args, Database);
}