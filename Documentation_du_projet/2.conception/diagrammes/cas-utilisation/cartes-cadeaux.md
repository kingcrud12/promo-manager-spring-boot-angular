# Diagramme de cas d'utilisation — Module Cartes cadeaux

```mermaid
flowchart LR
    Marchand([Marchand])
    Client([Client])

    subgraph SYS["Module Cartes cadeaux"]
        UC1((Générer une carte cadeau))
        UC2((Acheter une carte cadeau))
        UC3((Payer via Stripe))
        UC4((Consulter le solde d'une carte cadeau))
    end

    Marchand --> UC1
    Client --> UC2
    Client --> UC4

    UC2 -.->|<<include>>| UC3
```

`<<include>>` : acheter une carte cadeau implique systématiquement un paiement Stripe — c'est une sous-étape obligatoire du flux, pas une action séparée.
