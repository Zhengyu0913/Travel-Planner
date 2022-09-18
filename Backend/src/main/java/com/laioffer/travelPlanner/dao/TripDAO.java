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

    public Trip getTripByID(String tripId) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(Trip.class, tripId);
        } catch (Exception ex) {
            ex.printStackTrace();
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
        } catch (Exception ex) {
            ex.printStackTrace();
            if (session != null) {
                session.getTransaction().rollback();
            }
        } finally {
            if (session != null) session.close();
        }
    }

    public void deleteTrip(Trip trip) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.delete(trip);
            session.getTransaction().commit();
        } catch (Exception ex) {
            ex.printStackTrace();
            if (session != null) {
                session.getTransaction().rollback();
            }
        } finally {
            if (session != null) session.close();
        }
    }
}
