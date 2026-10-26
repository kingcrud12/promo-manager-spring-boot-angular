package fr.techcrud.promo_manager_api.domain.model;

import java.time.Instant;
import java.util.UUID;

public class Merchant {
    UUID id;
    String socialReason;
    String siret;
    String email;
    String hashedPassword;
    String contactFirstName;
    String contactLastName;
    String colorTheme ;
    UUID stripeAccountId;
    Instant creationDate;

    public Merchant(UUID id, String socialReason,  String siret, String email, String hashedPassword, String contactFirstName, String contactLastName, String colorTheme,  UUID stripeAccountId, Instant creationDate) {
        this.id = id;
        this.socialReason = socialReason;
        this.siret = siret;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.contactFirstName = contactFirstName;
        this.contactLastName = contactLastName;
        this.colorTheme = colorTheme;
        this.stripeAccountId = stripeAccountId;
        this.creationDate = creationDate;
    }

    public static Merchant createMerchant(String socialReason, String siret, String email, String hashedPassword,  String contactFirstName, String contactLastName, String colorTheme, UUID stripeAccountId) {
        return new Merchant(
                UUID.randomUUID(),
                socialReason,
                siret,
                email,
                hashedPassword,
                contactFirstName,
                contactLastName,
                colorTheme,
                stripeAccountId,
                Instant.now()
                );

    }

}
