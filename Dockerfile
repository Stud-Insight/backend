# Étape 1: Construire l'application
# Utiliser une image de base Node.js
FROM node:23 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Variables d'environnements
ARG PORT
ARG DATABASE_URI
ARG HOST
ARG ACCESS_TOKEN_SECRET
ARG REFRESH_TOKEN_SECRET
ARG ACTIVATION_TOKEN_SECET
ARG PASSWORD_RESET_TOKEN_SECRET
ARG SMTP_PASS
ARG SMTP_USER
ARG MAIL_CONTACT
ARG ADMIN_USER
ARG ADMIN_PASSWORD

# Définir les variables d'environnement
ENV PORT=$PORT
ENV DATABASE_URI=$DATABASE_URI
ENV HOST=$HOST
ENV ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET
ENV REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET
ENV ACTIVATION_TOKEN_SECET=$ACTIVATION_TOKEN_SECET
ENV PASSWORD_RESET_TOKEN_SECRET=$PASSWORD_RESET_TOKEN_SECRET
ENV SMTP_PASS=$SMTP_PASS
ENV SMTP_USER=$SMTP_USER
ENV MAIL_CONTACT=$MAIL_CONTACT
ENV ADMIN_USER=$ADMIN_USER
ENV ADMIN_PASSWORD=$ADMIN_PASSWORD

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source dans le conteneur
COPY . .

# Compiler le code TypeScript en JavaScript
RUN npm run build

# Étape 2: Exécuter l'application
# Utiliser une image de base plus légère pour l'exécution de l'application
FROM node:23

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier uniquement le dossier dist (le code compilé) et le dossier node_modules depuis l'étape précédente
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Définir la variable d'environnement pour Node.js
ENV NODE_ENV=production

# Exposer le port sur lequel l'application écoute
EXPOSE 8080

# Lancer l'application
CMD ["node", "dist/src/index.js"]