# Diagramme de cas d'utilisation — Vue globale (synthèse)

Vue de synthèse reliant les acteurs aux modules. Chaque module est détaillé dans son propre diagramme (`compte.md`, `fidelite.md`, `codes-promo.md`, `cartes-cadeaux.md`).

```mermaid
flowchart LR
    Marchand([Marchand])
    Client([Client])

    subgraph SYS["PromoManager"]
        M1[[Module Compte]]
        M2[[Module Fidélité]]
        M3[[Module Codes promo]]
        M4[[Module Cartes cadeaux]]
    end

    Marchand --> M1
    Marchand --> M2
    Marchand --> M3
    Marchand --> M4

    Client --> M1
    Client --> M2
    Client --> M3
    Client --> M4
```

Nouvelle forme utilisée ici : `[[Texte]]` (sous-routine) pour représenter un module entier comme un bloc fonctionnel, plutôt qu'un cas d'utilisation unitaire (`((Texte))`).
