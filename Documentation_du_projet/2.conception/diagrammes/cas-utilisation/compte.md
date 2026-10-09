# Diagramme de cas d'utilisation — Module Compte

Hypothèse retenue : le Marchand crée son propre compte (self-service). Le compte Client, lui, est **provisionné par le Marchand** (ex. lors d'une première attribution de points) ; le Client active ensuite son accès et se connecte.

```mermaid
flowchart LR
    Marchand([Marchand])
    Client([Client])

    subgraph SYS["Module Compte"]
        UC1((Créer un compte marchand))
        UC2((Se connecter au Dashboard))
        UC3((Provisionner un compte client))
        UC4((Activer son compte))
        UC5((Se connecter à l'Espace Client))
    end

    Marchand --> UC1
    Marchand --> UC2
    Marchand --> UC3
    Client --> UC4
    Client --> UC5
    UC3 -.->|<<include>>| UC4
```
