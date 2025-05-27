## Projektbeskrivning 
Detta projekt är en del av kursen Applikationslivscykelhantering på Nackademin och syftar till att ge praktisk erfarenhet av hela livscykeln för en modern webbapplikation – från utveckling till testning, containerisering och distribution.

## Syften med projektet
- Använda Git och GitHub för versionshantering och samarbete
- Skapa och testa databasscheman med Sequelize
- Skriva automatiska tester med Jest
- Implementera CI/CD-pipelines med GitHub Actions
- Bygga och köra applikationen i Docker-containrar
- Hantera miljövariabler och konfigurationer för flera miljöer
- Lära sig grunderna i infrastruktur som kod med Docker Compose


## Använda teknologier
- **Git**: Versionshantering
- **GitHub + GitHub Actions**: CI/CD och kodgranskning
- **Docker**: Containerisering
- **Docker Compose**: Orkestrering av tjänster
- **Express**: REST API
- **PostgreSQL**: Relationsdatabas
- **Sequelize**: ORM för databasinteraktion
- **Jest**: Testning av modeller och logik

## Obligatoriska uppgifter (G-nivå)
- Tester körs automatiskt via **GitHub Actions**
- Projektet containeriseras via **Dockerfile**
- Accomodation-modell inkluderar:
  - adress
  - stad
  - land
  - postnummer
  - hyra
  - rum
  - userId 
  - User-modell inkluderar:
  - unik e-post
  - unik användarnamn
  - validerad e-postformat
  - profilbilds-URL
  - CASCADE-radering av `Accomodation` när `User` tas bort
  - Enhetstester med **Jest** för båda modeller

## VG-del (finns i branch `vg`)
Utgå från koden som togs fram av er grupp eller gör uppgiften själv. Gör följande ändringar för att uppnå VG:
- Uppdatera databasen till **PostgreSQL**
- Anpassa Sequelize-koden för PostgreSQL
- Skapa en `docker-compose.yml` för att starta applikationen med PostgreSQL
- Starta applikationen lokalt med Docker Compose



