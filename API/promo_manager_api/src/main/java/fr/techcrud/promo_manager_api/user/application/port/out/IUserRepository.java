package fr.techcrud.promo_manager_api.user.application.port.out;

import fr.techcrud.promo_manager_api.user.domain.model.User;

public interface IUserRepository {
    User findUserByEmail(String email);
    User findUserById(String id);
    User saveUser(User user);

}
