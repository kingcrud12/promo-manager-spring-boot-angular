package fr.techcrud.promo_manager_api.user.application.service;

import fr.techcrud.promo_manager_api.user.application.port.in.IRegister;
import fr.techcrud.promo_manager_api.user.application.port.out.IPasswordHasher;
import fr.techcrud.promo_manager_api.user.application.port.out.IUserRepository;
import fr.techcrud.promo_manager_api.user.domain.model.Email;
import fr.techcrud.promo_manager_api.user.domain.model.User;
import org.springframework.stereotype.Service;

@Service
public class RegisterService implements IRegister {
    private final IUserRepository users;
    private final IPasswordHasher hasher;

    @Override
    public User register(String emailsaisi, String password, String firstName, String lastName) {
        Email email = new Email(emailsaisi);


    }

}
