# Diagrammes de séquence — Module Compte

Un diagramme par user story (voir aussi `../../Docs/cahier-des-charges-v2.md`, § 7.3).

## US-CPT-01 — Création de compte marchand + réglages globaux

```mermaid
sequenceDiagram
    actor Marchand
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Marchand->>FE: Remplit le formulaire d'inscription
    FE->>API: POST /marchands {raisonSociale, siret, email, motDePasse, contact...}
    API->>DB: Vérifie unicité email / siret
    DB-->>API: OK (aucun doublon)
    API->>API: Hash du mot de passe (BCrypt)
    API->>DB: INSERT marchand
    DB-->>API: Marchand créé (id)
    API-->>FE: 201 Created {id}
    FE-->>Marchand: Redirection vers l'écran de réglages

    Marchand->>FE: Saisit couleur du thème + taux de conversion
    FE->>API: PATCH /marchands/{id}/reglages {couleurTheme, tauxConversionPoints}
    API->>DB: UPSERT programme_fidelite (marchandId)
    API->>DB: UPDATE marchand.couleurTheme
    DB-->>API: OK
    API-->>FE: 200 OK
    FE-->>Marchand: Confirmation, redirection vers la connexion
```

## US-CPT-02 — Connexion au Dashboard

```mermaid
sequenceDiagram
    actor Marchand
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Marchand->>FE: Saisit email + mot de passe
    FE->>API: POST /auth/login {email, motDePasse}
    API->>DB: SELECT marchand WHERE email = ?
    DB-->>API: Marchand (motDePasseHash)
    API->>API: Vérifie le mot de passe (BCrypt)
    alt identifiants valides
        API->>API: Génère un JWT (id, email)
        API-->>FE: 200 OK {token}
        FE->>FE: Stocke le token
        FE-->>Marchand: Redirection vers /dashboard
    else identifiants invalides
        API-->>FE: 401 Unauthorized
        FE-->>Marchand: Message d'erreur générique
    end
```

## US-CPT-03 — Provisionnement de compte client

```mermaid
sequenceDiagram
    actor Marchand
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Marchand->>FE: Remplit le formulaire "ajouter un client" (nom, prénom, email)
    FE->>API: POST /clients {nom, prenom, email} (JWT marchand)
    API->>API: Valide le JWT, extrait marchandId
    API->>DB: Vérifie unicité email client
    DB-->>API: OK (aucun doublon)
    API->>DB: INSERT client (marchandId, statutCompte = EN_ATTENTE)
    DB-->>API: Client créé (id)
    API->>API: Génère un token d'activation
    API-->>FE: 201 Created {id, statut: EN_ATTENTE}
    FE-->>Marchand: Client ajouté à la liste
```

## US-CPT-04 — Activation de compte client

```mermaid
sequenceDiagram
    actor Client
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Client->>FE: Ouvre le lien d'activation reçu
    FE-->>Client: Affiche le formulaire de définition du mot de passe
    Client->>FE: Saisit son mot de passe
    FE->>API: POST /clients/activation {token, motDePasse}
    API->>DB: Vérifie le token d'activation (validité, expiration)
    alt token valide et compte EN_ATTENTE
        API->>API: Hash du mot de passe (BCrypt)
        API->>DB: UPDATE client SET motDePasseHash, statutCompte = ACTIF
        DB-->>API: OK
        API-->>FE: 200 OK
        FE-->>Client: Redirection vers la connexion Espace Client
    else token invalide/expiré ou compte déjà actif
        API-->>FE: 400/409 Erreur
        FE-->>Client: Message d'erreur
    end
```

## US-CPT-05 — Connexion à l'Espace Client

```mermaid
sequenceDiagram
    actor Client
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Client->>FE: Saisit email + mot de passe
    FE->>API: POST /auth/login {email, motDePasse}
    API->>DB: SELECT client WHERE email = ?
    DB-->>API: Client (statutCompte, motDePasseHash)
    alt statutCompte = EN_ATTENTE
        API-->>FE: 403 Compte non activé
        FE-->>Client: Invite à activer son compte
    else mot de passe invalide
        API-->>FE: 401 Unauthorized
        FE-->>Client: Message d'erreur générique
    else connexion valide
        API->>API: Génère un JWT (id, email)
        API-->>FE: 200 OK {token}
        FE->>FE: Stocke le token
        FE-->>Client: Redirection vers /espace-client
    end
```
