import { cleanExpiredTokens } from '@/utils/database';
import config from 'config';
import ms from 'ms';
import schedule from 'node-schedule';

const scheduleTokenCleanup = () => {
    
    const intervalMs = parseInt(ms(config.get("database.cleanupInterval")));
    if (!intervalMs || intervalMs < 1000) throw new Error("Intervalle de nettoyage invalide. Veuillez configurer un intervalle d'au moins 1 seconde.");
    
    schedule.scheduleJob(new Date(Date.now() + intervalMs), function runTask() {
        console.log('Nettoyage des refresh tokens expirés démarré...');
        cleanExpiredTokens();
        // Replanification de la tâche
        const nextRun = new Date(Date.now() + intervalMs);
        schedule.scheduleJob(nextRun, runTask);
    });

}

export default scheduleTokenCleanup;