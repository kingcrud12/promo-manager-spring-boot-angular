package fr.techcrud.promo_manager_api.user.application.port.in;

import fr.techcrud.promo_manager_api.user.domain.model.User;

public interface IRegister {
    User register(String email, String password, String firstName, String lastName);
}
