package fr.techcrud.promo_manager_api.user.domain.exception;

public class EmailInvalidException extends RuntimeException {
    public EmailInvalidException(String email) {
        super("Email invalide : " + email);
    }
}
