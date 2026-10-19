package fr.techcrud.promo_manager_api.user.domain.model;

import fr.techcrud.promo_manager_api.user.domain.exception.EmailInvalidException;

public record Email(String value) {
    private static final String FORMAT = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$";

    public Email {
        if (value == null || !value.trim().matches(FORMAT)) {
            throw new EmailInvalidException(value);
        }
        value = value.trim().toLowerCase();
    }
}
