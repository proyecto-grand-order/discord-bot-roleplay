import fs from 'fs';
import { commands as cmdCache } from '../client/cache.js';
import path from 'path';

/**
 * This function handle load all commands in directory and add to cache
 */
export default async function() {
	const root = process.cwd();

	// Rutas
	const commandsPath = path.join(root, 'commands');

	// Leer archivos
	const commands = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	// Cargar comandos
	for (const file of commands) {
		try {
			const commandPath = path.join(commandsPath, file);
			const command = await import(`file:///${commandPath}`).then(m => m.default);
			cmdCache.set(command.name, command);
			console.log(`[!] Command ${command.name} loaded`);
		}
		catch (error) {
			console.log(`[!] Error loading command ${file} ${error.message}`);
		}
	}
}