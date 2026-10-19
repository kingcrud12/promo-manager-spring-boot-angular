package fr.techcrud.promo_manager_api.user.domain.model;

import lombok.Getter;

import java.util.UUID;

public class User {
    @Getter
    private UUID id;
    @Getter
    private Email email;
    private Role role;
    private String password;
    private String firstName;
    private String lastName;

    private User(UUID id, Email email, String password, Role role, String firstName, String lastName) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public static User createUser(Email email, String password, String firstName, String lastName) {
        return new User(UUID.randomUUID(), email, password, Role.USER, firstName, lastName );
    }

}
