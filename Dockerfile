#Använder Node.js version 20 som bas-image
FROM node:20

#Sätt arbetskatalogen i containern till /app
WORKDIR /app

#Kopierar package.json och package-lock.json till containern
COPY package*.json ./


#Installerar alla Node.js beroenden (npm install körs i /app)
RUN npm install

#Kopierar resten av applikationens filer till containern
COPY . .

#Lyssnar på port 3000
EXPOSE 3000

#Startar applikationen när containern körs
CMD [ "npm", "start" ]


# Skapa en image (bild) från Dockerfile, namnge den till 'alm-app'
#docker build -t alm-app .
# Kör en container från bilden 'alm-app'
# -p 3000:3000 betyder: koppla port 3000 på din dator till port 3000 inne i containern
#docker run -p 3000:3000 alm-app


