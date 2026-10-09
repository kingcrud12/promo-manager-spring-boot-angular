# Diagramme de cas d'utilisation — Module Codes promo

```mermaid
flowchart LR
    Marchand([Marchand])
    Client([Client])

    subgraph SYS["Module Codes promo"]
        UC1((Créer un code promo))
        UC2((Suivre les conversions en temps réel))
        UC3((Désactiver un code promo))
        UC4((Appliquer un code promo))
    end

    Marchand --> UC1
    Marchand --> UC2
    Marchand --> UC3
    Client --> UC4
```

Pas de relation `<<include>>`/`<<extend>>` forcée ici : les 4 cas sont indépendants (créer, suivre, désactiver sont des actions marchand autonomes ; appliquer est une action client autonome, simplement contrainte par l'état du code au moment de la vérification).
