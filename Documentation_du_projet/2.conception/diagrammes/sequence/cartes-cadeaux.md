# Diagrammes de séquence — Module Cartes cadeaux

Un diagramme par user story (voir aussi `../../Docs/cahier-des-charges-v2.md`, § 7.3).

## US-CADO-01 — Génération d'une carte cadeau

```mermaid
sequenceDiagram
    actor Marchand
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Marchand->>FE: Remplit le formulaire (montant)
    FE->>API: POST /cartes-cadeaux {montantInitial} (JWT marchand)
    API->>API: Génère un numéro de carte unique
    API->>DB: INSERT carte_cadeau (clientId = null, statutPaiement = EN_ATTENTE)
    DB-->>API: Carte créée (id, numero)
    API-->>FE: 201 Created {numero}
    FE-->>Marchand: Carte disponible à la vente
```

## US-CADO-02 — Achat d'une carte cadeau en payant via Stripe

```mermaid
sequenceDiagram
    actor Client
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant Stripe as Stripe (mode test)
    participant DB as PostgreSQL

    Client->>FE: Sélectionne une carte cadeau à acheter
    FE->>API: POST /cartes-cadeaux/{id}/achat (JWT client)
    API->>Stripe: Crée une session de paiement
    Stripe-->>API: URL de paiement
    API-->>FE: 200 OK {urlPaiement}
    FE-->>Client: Redirection vers Stripe Checkout
    Client->>Stripe: Renseigne ses informations de paiement
    Stripe-->>Client: Paiement confirmé
    Stripe->>API: Webhook paiement validé {carteCadeauId}
    API->>DB: UPDATE carte_cadeau SET clientId, statutPaiement = PAYE
    DB-->>API: OK
    API-->>Client: Confirmation d'achat (via redirection)
```

`<<include>>` : l'achat d'une carte cadeau implique systématiquement un paiement Stripe — c'est une sous-étape obligatoire du flux, matérialisée ici par l'échange avec Stripe et son webhook de confirmation.

## US-CADO-03 — Consultation du solde d'une carte cadeau

```mermaid
sequenceDiagram
    actor Client
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Client->>FE: Ouvre "Mes cartes cadeaux" (Espace Client)
    FE->>API: GET /clients/me/cartes-cadeaux (JWT client)
    API->>DB: SELECT * FROM carte_cadeau WHERE clientId
    DB-->>API: Liste des cartes (numero, solde)
    API-->>FE: 200 OK {cartes[]}
    FE-->>Client: Affiche le solde de chaque carte
```
