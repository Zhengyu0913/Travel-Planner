package com.travelplanner.backend.dao;

import com.travelplanner.backend.entity.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.PersistenceException;

@Repository
public class SignUpDao {

    @Autowired
    private SessionFactory sessionFactory;

    public boolean signUp(User user) {
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

