import ms from 'ms';
import schedule from 'node-schedule';

import config from '@config/config';
import { cleanExpiredTokens } from '@/utils/database';

const scheduleTokenCleanup = () => {
    
    const intervalMs = ms(config.database.cleanupInterval);
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