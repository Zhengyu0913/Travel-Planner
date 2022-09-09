package com.laioffer.travelPlanner.dao;

import com.laioffer.travelPlanner.entity.Trip;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.PersistenceException;

@Repository
public class TripDAO {
    @Autowired
    private SessionFactory sessionFactory;

    public Trip getTripByID(int tripId) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(Trip.class, tripId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void saveTrip(Trip trip) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(trip);
            session.getTransaction().commit();
        } catch (PersistenceException | IllegalStateException ex) {
            // if hibernate throws this exception, it means the user already be signed-up
            ex.printStackTrace();
            session.getTransaction().rollback();
        } finally {
            if (session != null) session.close();
        }
    }
}
