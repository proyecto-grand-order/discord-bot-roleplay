import { MessageEmbed } from 'discord.js';

export default {
	name: 'ficha',
	description: 'Muestra la ficha de tu personaje',
	aliases: ['ficha', 'personaje', 'character'],
	/**
     * @param {import("discord.js").Message} message Message of the command
     * @param {Array<String>} args Arguments of the command
     * @param {import("../interfaces/RedisPrivder").RedisProviderMethods} db Database
     */
	async execute(message, args, db) {
		/**
		 * @type {import("../interfaces/Character").Character}
		 */
		const fichaObjecto = await db.get(`${message.author.id}.personaje`);

		if (!fichaObjecto) {
			message.channel.send('Lo siento ' + message.author.username + ', no tienes un perfil creado.');
			return;
		}

		// Ficha del personaje 1 (Embed)
		const fp1 = new MessageEmbed();
		fp1.setTitle('─────•◦❪❝˚✧｡˚💫˚｡✧˚❞❫◦•─────');
		fp1.setAuthor(fichaObjecto.nombre, message.author.avatarURL());
		fp1.addFields([
			// Altura
			{
				name: 'Altura',
				value: fichaObjecto.altura,
				inline: true,
			},
			// Peso
			{
				name: 'Peso',
				value: fichaObjecto.peso,
				inline: true,
			},
			// Raza
			{
				name: 'Raza',
				value: fichaObjecto.raza,
				inline: true,
			},
			// Genero
			{
				name: 'Genero',
				value: fichaObjecto.genero,
				inline: true,
			},
			// Sexualidad
			{
				name: 'Sexualidad',
				value: fichaObjecto.sexualidad,
				inline: true,
			},
			// Historia
			{
				name: 'Historia',
				value: fichaObjecto.historia,
				inline: false,
			},
		]);

		fp1.setColor('WHITE');


		const fp2 = new MessageEmbed().setColor('WHITE');
		fp2.setTitle('─────•◦❪❝˚✧｡˚🪐˚｡✧˚❞❫◦•─────');
		fp2.addFields([
			// Alineamiento
			{
				name: 'Alineamiento',
				value: fichaObjecto.alineamiento,
			},
			// Debilidad
			{
				name: 'Debilidad',
				value: fichaObjecto.debilidad,
			},
			// Gustos
			{
				name: 'Gustos',
				value: fichaObjecto.gustos,
			},
			// Equipamiento
			{
				name: 'Equipamiento',
				value: fichaObjecto.equipamiento,
			},
		]);

		const fp3 = new MessageEmbed().setColor('WHITE');
		fp3.setTitle('─────•◦❪❝˚✧｡˚  🌜 ˚｡✧˚❞❫◦•─────');
		fp3.addFields([
			// Extra
			{
				name: 'Extra',
				value: fichaObjecto.extra,
			},
		]);

		const fp4 = new MessageEmbed().setColor('WHITE');
		fp4.setTitle('─────•◦❪❝˚✧｡˚  🔊 ˚｡✧˚❞❫◦•─────');
		fp4.addFields([
			// OTS global
			{
				name: 'OTS global',
				value: fichaObjecto.ostglobal,
			},
			// OTS batalla/tensión
			{
				name: 'OTS batalla/tensión',
				value: fichaObjecto.ostbatalla,
			},
			// OTS sentimental
			{
				name: 'OTS sentimental',
				value: fichaObjecto.ostsentimental,
			},
			// Voz
			{
				name: 'Voz',
				value: fichaObjecto.voz,
			},
		]);

		const fp5 = new MessageEmbed().setColor('WHITE');
		fp5.setTitle('─────•◦❪❝˚✧｡˚  🌞 ˚｡✧˚❞❫◦•─────');
		fp5.setDescription('**Apariencia**');

		const image = fichaObjecto.apariencia.replace(/.gif/g, '');
		fp5.setImage(image + '.gif');

		return message.channel.send({ embeds: [fp1, fp2, fp3, fp4, fp5] });

	},
};