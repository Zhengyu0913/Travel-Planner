package com.travelplanner.backend.dao;

import com.travelplanner.backend.entity.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public User getUser(String email) {
        User user = null;

        try (Session session = sessionFactory.openSession()) {
            user = session.get(User.class, email);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }
}
