# Diagramme de cas d'utilisation — Module Fidélité

```mermaid
flowchart LR
    Marchand([Marchand])
    Client([Client])

    subgraph SYS["Module Fidélité"]
        UC1((Définir le taux de conversion))
        UC2((Attribuer des points))
        UC3((Envoyer une notification email))
        UC4((Consulter solde et historique de points))
    end

    Marchand --> UC1
    Marchand --> UC2
    Client --> UC4

    UC2 -.->|<<include>>| UC3
```

`<<include>>` : l'attribution de points déclenche systématiquement l'envoi de la notification email — ce n'est pas une action séparée que l'acteur choisit, elle fait partie du flux de "Attribuer des points".
