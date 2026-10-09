# Diagrammes de séquence — Module Codes promo

Un diagramme par user story (voir aussi `../../Docs/cahier-des-charges-v2.md`, § 7.3).

## US-PROMO-01 — Création d'un code promo

```mermaid
sequenceDiagram
    actor Marchand
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Marchand->>FE: Remplit le formulaire (code, mécanique, valeur, limite, expiration)
    FE->>API: POST /codes-promo {...} (JWT marchand)
    API->>DB: Vérifie unicité du code
    DB-->>API: OK
    API->>DB: INSERT code_promo (statut = ACTIF)
    DB-->>API: Code créé (id)
    API-->>FE: 201 Created
    FE-->>Marchand: Code promo ajouté à la liste
```

## US-PROMO-02 — Suivi des conversions en temps réel

```mermaid
sequenceDiagram
    actor Marchand
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Marchand->>FE: Ouvre le détail d'un code promo
    FE->>API: GET /codes-promo/{id}/statistiques (JWT marchand)
    API->>DB: SELECT COUNT(*), SUM(montantReduction) FROM utilisation_code_promo WHERE codePromoId
    DB-->>API: Nombre d'utilisations, montant total
    API-->>FE: 200 OK {utilisations, montantTotal}
    FE-->>Marchand: Affiche les statistiques en temps réel
```

## US-PROMO-03 — Désactivation d'un code promo

```mermaid
sequenceDiagram
    actor Marchand
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Marchand->>FE: Clique sur "désactiver" pour un code
    FE->>API: PATCH /codes-promo/{id} {statut: DESACTIVE} (JWT marchand)
    API->>API: Vérifie que le code appartient au marchand authentifié
    API->>DB: UPDATE code_promo SET statut = DESACTIVE
    DB-->>API: OK
    API-->>FE: 200 OK
    FE-->>Marchand: Code marqué comme désactivé
```

## US-PROMO-04 — Application d'un code promo

```mermaid
sequenceDiagram
    actor Client
    participant FE as Frontend (Angular) / Caisse
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Client->>FE: Saisit un code promo au moment du paiement
    FE->>API: POST /codes-promo/{code}/application {clientId, montantAchat}
    API->>DB: SELECT code_promo WHERE code = ?
    DB-->>API: Code (statut, mécanique, limite, utilisationsActuelles, expiration)
    alt code invalide, expiré ou limite atteinte
        API-->>FE: 400/409 Erreur
        FE-->>Client: Message d'erreur
    else code valide
        API->>API: Calcule le montant de réduction selon la mécanique
        API->>DB: INSERT utilisation_code_promo
        API->>DB: UPDATE code_promo.utilisationsActuelles += 1
        DB-->>API: OK
        API-->>FE: 200 OK {montantReduction}
        FE-->>Client: Réduction appliquée
    end
```
