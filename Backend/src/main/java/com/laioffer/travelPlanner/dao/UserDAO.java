package com.laioffer.travelPlanner.dao;

import com.laioffer.travelPlanner.entity.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.PersistenceException;

@Repository
public class UserDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public User getUserByEmail(String email) {
        User user = null;

        try (Session session = sessionFactory.openSession()) {
            user = session.get(User.class, email);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    public boolean saveUser(User user) {
        Session session = null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(user);
            session.getTransaction().commit();
        } catch (PersistenceException | IllegalStateException ex) {
            // if hibernate throws this exception, it means the user already be signed-up
            ex.printStackTrace();
            session.getTransaction().rollback();
            return false;
        } finally {
            if (session != null) session.close();
        }
        return true;
    }
}
