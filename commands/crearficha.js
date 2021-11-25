import { MessageEmbed } from 'discord.js';

const userWithYesAll = new Set();

/**
 * @param {import("discord.js").Message} message - Message of the command
 * @param {boolean} hasConfirm - If the command has a confirm
 */
const confirm = async (message, again) => {

	if (userWithYesAll.has(message.author.id)) return again = false;

	// Embed
	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Esta seguro')
		.setDescription(
			'\n**si** para seguir con el procedimiento\n**editar** para editar el ultimo campo rellenado\n**cancelar** para cancelar todo el comando\n**Si todo** para continuar si este aviso!');

	message.edit({ embeds: [embed] });

	// Filtro de await message para que solo acepte si, editar o cancelar
	const filter = (m) => ['si', 'editar', 'cancelar', 'si todo'].includes(m.content.toLowerCase());

	const confirmacion = await message.channel.awaitMessages({ filter, max: 1, time: 120000, errors: ['time'] });


	if (confirmacion.first().content.toLowerCase() === 'si todo') {
		userWithYesAll.add(message.author.id);
		return false;
	}

	// Si se cancela el comando
	if (confirmacion.first().content.toLowerCase() === 'cancelar') {
		message.delete();
		return false;
	}

	// Si se edita el ultimo campo
	if (confirmacion.first().content.toLowerCase() === 'editar') again = true;

	// Si se confirma el comando
	if (confirmacion.first().content.toLowerCase() === 'si') again = false;

	// Si no se ha rellenado ningun campo
	if (!message.content) {
		return again;
	}
};

export default {
	name: 'crearficha',
	description: 'Crea una ficha de personaje',
	aliases: ['cf'],
	onlyGuild: false,
	/**
	 * @param {import("discord.js").Message} message - Message of the command
	 * @param {import('../interfaces/RedisPrivder').RedisProviderMethods} db - Database
	 */
	async execute(message, 	_, db) {

		try {
			const time = 120000;
			const embed = new MessageEmbed();
			let filter = m => m.content;

			// Variables

			const again = {
				nombre: false,
				apodo: false,
				altura: false,
				peso: false,
				edad: false,
				raza: false,
				genero: false,
				sexualidad: false,
				historia: false,
				debilidad: false,
				gustos: false,
				alineamiento: false,
				equipamiento: false,
				poderes: false,
				extra: false,
				ostglobal: false,
			};

			const documento = {
				nombre: '',
				apodo: '',
				altura: '',
				peso: '',
				edad: '',
				raza: '',
				genero: '',
				sexualidad: '',
				historia: '',
				debilidad: '',
				gustos: '',
				alineamiento: '',
				poderes: '',
				equipamiento: '',
				extra: '',
				ostglobal: '',
			};

			// Funciones
			const setData = async (key, EmbedEdit) => {
				EmbedEdit();

				await msg.edit({ embeds: [embed] });
				documento[key] = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
				again[key] = await confirm(msg, again.nombre);

				while (again.nombre) {
					EmbedEdit();
					await msg.edit({ embeds: [embed] });
					documento[key] = await msg.channel.awaitMessages({ filter, max: 1, time, errors: ['time'] }).then(async (m) => m.first().content);
					again[key] = await confirm(msg, again.nombre);
				}
			};

			// Preguntas

			embed.setColor('#0099ff');
			embed.setFooter('Tienes dos minutos para responder cada pregunta tomate tu tiempo amigo!');
			const msg = await message.author.send({ embeds: [embed] });

			// Nombre y Apellidos
			await setData('nombre', () => {
				embed.setTitle('Nombre y Apellidos');
				embed.setDescription('Escribe tu nombre y apellidos');
			});

			// Apodo
			await setData('apodo', () => {
				embed.setTitle('Apodo');
				embed.setDescription('Escribe tu apodo');
			});

			// Altura
			await setData('altura', () => {
				embed.setTitle('Altura');
				embed.setDescription('Escribe tu altura');
			});

			// Peso (Aviso 300kg maximo)
			await setData('peso', () => {
				embed.setTitle('Peso');
				embed.setDescription('Escribe tu peso\n*Maximo 300kg*');
			});

			// Edad
			await setData('edad', () => {
				embed.setTitle('Edad');
				embed.setDescription('Escribe tu edad');
			});

			// Raza
			await setData('raza', () => {
				embed.setTitle('Raza');
				embed.setDescription('Escribe tu raza');
			});

			// Genero
			await setData('genero', () => {
				embed.setTitle('Genero');
				embed.setDescription('Escribe tu genero');
			});

			// Sexualidad
			await setData('sexualidad', () => {
				embed.setTitle('Sexualidad');
				embed.setDescription('Escribe tu sexualidad\n*Orientación sexual*');
			});

			// Historia
			await setData('historia', () => {
				embed.setTitle('Historia');
				embed.setDescription('Escribe tu historia\n*Si es larga se envia al canal de lore-personaje*');
			});

			// Alineamiento
			filter = (m) => ['bueno', 'malo', 'neutral', 'pacifico'].includes(m.content.toLowerCase());

			await setData('alineamiento', () => {
				embed.setTitle('Alineamiento');
				embed.setDescription('Escribe tu alineamiento\n*Bueno, Malo, Neutral, Pacifico*');
			});

			filter = (m) => m.content;

			// Debilidad
			await setData('debilidad', () => {
				embed.setTitle('Debilidad');
				embed.setDescription('Escribe tu debilidad\n*Mínimo una Debilidad Física lógica*');
			});

			// Gustos
			await setData('gustos', () => {
				embed.setTitle('Gustos');
				embed.setDescription('Escribe tus gustos\n*Mínimo un gusto*');
			});

			// Equipamiento
			await setData('equipamiento', () => {
				embed.setTitle('Equipamiento');
				embed.setDescription('Escribe tu equipamiento\n*Si se trajo algo del mundo real, nada de armas de fuego ni objetos que no se puedan cargar*');
			});

			// Podedes
			await setData('poderes', () => {
				embed.setTitle('Poderes');
				embed.setDescription('Escribe tus poderes\n*Solo se permite poderes del canal <#868247854060290099>*\n*Maximo dos poderes*');
			});

			// Extra
			await setData('extra', () => {
				embed.setTitle('Extra');
				embed.setDescription('Escribe tu extra');
			});

			// Apariencia
			await setData('apariencia', () => {
				embed.setTitle('Apariencia');
				embed.setDescription('Escribe tu apariencia\n*En caso de no ser una foto puede ser una descripción*');
			});

			// OTS global
			await setData('ostglobal', () => {
				embed.setTitle('OTS Global');
				embed.setDescription('Escribe tu OTS global');
			});

			// OTS batalla/tensión
			await setData('ostbatalla', () => {
				embed.setTitle('OTS Batalla/Tensión');
				embed.setDescription('Escribe tu OTS batalla/tensión');
			});

			// OTS sentimental
			await setData('ostsentimental', () => {
				embed.setTitle('OTS Sentimental');
				embed.setDescription('Escribe tu OTS sentimental');
			});

			// Voz
			await setData('voz', () => {
				embed.setTitle('Voz');
				embed.setDescription('Escribe un link, video o archivo, puede ser de cualquier PJ/Personaje');
			});

			// Guardad personaje en la base de datos
			db.set(`${message.author.id}.personaje`, documento);
			userWithYesAll.delete(message.author.id);

			// Mensaje de confirmación
			embed.setTitle('Personaje creado');
			embed.setDescription('Personaje creado con éxito');
			embed.setColor('#00ff00');
			embed.setFooter('Personaje creado');
			embed.setTimestamp();

			msg.edit({ embeds: [embed] });
		}


		catch (error) {
			if (error.message !== 'DiscordAPIError: Unknown Message') {
				console.log(error);
			}

			userWithYesAll.delete(message.author.id);
		}


	},
};