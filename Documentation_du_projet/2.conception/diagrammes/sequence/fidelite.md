# Diagrammes de séquence — Module Fidélité

Un diagramme par user story (voir aussi `../../Docs/cahier-des-charges-v2.md`, § 7.3).

## US-FID-01 — Définition du taux de conversion

```mermaid
sequenceDiagram
    actor Marchand
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Marchand->>FE: Modifie le taux de conversion depuis le Dashboard
    FE->>API: PATCH /marchands/{id}/reglages {tauxConversionPoints} (JWT)
    API->>API: Vérifie que le JWT correspond à {id}
    API->>DB: UPDATE programme_fidelite SET tauxConversionPoints
    DB-->>API: OK
    API-->>FE: 200 OK
    FE-->>Marchand: Confirmation de mise à jour
```

## US-FID-02 — Attribution de points (manuelle ou via API)

```mermaid
sequenceDiagram
    actor Marchand
    participant Caisse as Caisse / Site e-commerce
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL
    participant Mail as Service Email

    alt attribution manuelle (Dashboard)
        Marchand->>FE: Sélectionne un client + montant d'achat
        FE->>API: POST /clients/{id}/points {montantAchat} (JWT marchand)
    else attribution via API (caisse / site e-commerce)
        Caisse->>API: POST /clients/{id}/points {montantAchat} (clé API marchand)
    end
    API->>DB: Récupère tauxConversionPoints (programme_fidelite du marchand)
    API->>API: Calcule le nombre de points (montantAchat × taux)
    API->>DB: INSERT transaction_points (type = GAIN)
    API->>DB: UPDATE client.soldePoints += points
    DB-->>API: OK
    API->>Mail: Déclenche l'envoi de la notification (US-FID-03)
    API-->>FE: 200 OK {nouveauSolde}
```

`<<include>>` : l'attribution déclenche systématiquement l'envoi de la notification email (US-FID-03), reprise séparément ci-dessous pour la lisibilité du flux d'envoi.

## US-FID-03 — Notification email automatique

```mermaid
sequenceDiagram
    participant API as API (Spring Boot)
    participant Mail as Service Email
    actor Client

    API->>Mail: Envoie "vous avez gagné N points" (email, points, nouveauSolde)
    Mail-->>Client: Email reçu
```

## US-FID-04 — Consultation solde et historique de points

```mermaid
sequenceDiagram
    actor Client
    participant FE as Frontend (Angular)
    participant API as API (Spring Boot)
    participant DB as PostgreSQL

    Client->>FE: Ouvre la page "Mes points" (Espace Client)
    FE->>API: GET /clients/me/points (JWT client)
    API->>API: Vérifie le JWT, extrait clientId
    API->>DB: SELECT soldePoints, transactions WHERE clientId
    DB-->>API: Solde + historique
    API-->>FE: 200 OK {soldePoints, transactions[]}
    FE-->>Client: Affiche le solde et l'historique
```
