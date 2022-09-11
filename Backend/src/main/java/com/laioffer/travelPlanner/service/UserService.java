package com.laioffer.travelPlanner.service;

import com.laioffer.travelPlanner.dao.UserDAO;
import com.laioffer.travelPlanner.entity.User;
import com.laioffer.travelPlanner.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class UserService {

    @Autowired
    private UserDAO userDAO;

    public User getUserByEmail(String email) {
        return userDAO.getUserByEmail(email);
    }

    //
//    public User getUserFromContext() {
//        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
//        String email = loggedInUser.getName();
//        User user = getUserByEmail(email);
//        return user;
//    }

    public boolean saveUser(User user) throws IOException {
        user.setPassword(Util.encryptPassword(user.getEmail(), user.getPassword()));
        return userDAO.saveUser(user);
    }

    // Verify if the given user email and password are correct. Returns the user's first name when it passes
    public String verifyUser(String email, String password) throws IOException {
        password = Util.encryptPassword(email, password);
        User user = userDAO.getUserByEmail(email);
        if (user != null && user.getPassword().equals((password))) {
            return user.getFirstName();
        }
        return new String();
    }
}
