# PromoManager

## Objectif du projet

PromoManager est un moteur de promotions B2B destiné aux commerces (e-commerce et boutiques physiques). Il permet à un marchand de piloter depuis un dashboard unique trois leviers de fidélisation client :

- **Programme de fidélité** (points, taux de conversion personnalisable)
- **Codes promo** (pourcentage, montant fixe, BOGO)
- **Cartes cadeaux** (émission, vente via Stripe, consultation de solde)

Les clients finaux disposent d'un **Espace Client** sécurisé pour consulter leur solde de points, l'historique de leurs transactions et le solde de leurs cartes cadeaux.

Ce projet est réalisé dans le cadre de l'évaluation RNCP 35419 - Niveau 7 (Expert en Ingénierie du Logiciel), bloc de compétences "Intégration, industrialisation et déploiement du logiciel".

## Stack technique

| Composant | Technologie |
|---|---|
| Backend | Java + Spring Boot |
| Frontend | Angular |
| Base de données | PostgreSQL |
| Paiement | Stripe (mode test) |
| CI/CD | GitHub Actions |
| Conteneurisation | Docker / docker-compose |

## Modules fonctionnels

- `fidélité` — attribution et suivi des points
- `codes-promo` — création et application des codes de réduction
- `cartes-cadeaux` — émission, achat, consultation de solde
- `dashboard` — configuration marchand
- `espace-client` — connexion et consultation côté client

## Organisation du projet

### Suivi des tâches

Chaque user story est suivie via une **Issue GitHub**, décomposée en sous-tâches (checklist Markdown dans le corps de l'issue, ou sub-issues pour les stories les plus complexes comme l'intégration Stripe).

Labels utilisés :
- **Type** : `feature`, `bug`, `chore`, `docs`
- **Module** : `fidélité`, `codes-promo`, `cartes-cadeaux`, `dashboard`, `espace-client`
- **Priorité** : `P1`, `P2`, `P3`

L'avancement est visualisé sur un **GitHub Project (Kanban)** : `Backlog → À faire → En cours → Review → Terminé`.

### Workflow Git retenu : GitHub Flow

- `main` est toujours déployable.
- Une branche par ticket, nommée `feature/<numero-issue>-<slug>` (ex. `feature/6-creation-code-promo`).
- Chaque commit référence son issue : `feat(promo): ajoute mécanique BOGO (#6)`.
- Le développement se termine par une Pull Request vers `main`, dont le titre contient `Closes #<numero>` pour fermer automatiquement l'issue au merge.
- La CI (build + tests) doit être verte avant tout merge.

Convention de commits : [Conventional Commits](https://www.conventionalcommits.org/) (`feat`, `fix`, `test`, `chore`, `docs`, `refactor`).

## Structure du repository

```
/ -- API/promo_manager_api/     (backend Spring Boot)
/ -- bdd/schema base de données.pdf
/ -- bdd/script.sql
/ -- frontend/
/ -- couverture/rapport-backend/
/ -- couverture/rapport-frontend/
/ -- Dockerfile.backend
/ -- Dockerfile.frontend
/ -- docker-compose.yml
/ -- .env.example
/ -- readme.md
```

## Lancer l'application

### Backend seul, en local (sans conteneur)

Nécessite un JDK 17 et, si vous voulez une vraie connexion à la base, un PostgreSQL accessible en `localhost:5432` (profil `dev`, actif par défaut).

`application-dev.yml` et `application-docker.yml` (contiennent les identifiants de connexion DB) ne sont **pas versionnés**. Avant le premier lancement, les créer à partir des exemples fournis :

```bash
cd API/promo_manager_api/src/main/resources
cp application-dev.yml.example application-dev.yml
cp application-docker.yml.example application-docker.yml
```

Puis :

```bash
cd API/promo_manager_api
./mvnw spring-boot:run
```

Sans PostgreSQL démarré, l'application démarre quand même (pas de crash) et `GET http://localhost:8080/actuator/health` renvoie `DOWN` tant que la base n'est pas joignable.

### Stack complète (API + PostgreSQL) via Docker

```bash
cp .env.example .env   # première fois seulement
docker compose up --build
```

Démarre un conteneur PostgreSQL (healthcheck `pg_isready`) puis l'API une fois la base prête (profil `docker`, connexion via les variables d'environnement définies dans `docker-compose.yml`). Vérifier avec :

```bash
curl http://localhost:8080/actuator/health
# {"groups":["liveness","readiness"],"status":"UP"}
```

Pour tout arrêter : `docker compose down` (ajouter `-v` pour supprimer aussi le volume de données Postgres).

## Procédure de déploiement

_À compléter en Q5 (pipeline CI/CD, publication des images sur DockerHub)._
