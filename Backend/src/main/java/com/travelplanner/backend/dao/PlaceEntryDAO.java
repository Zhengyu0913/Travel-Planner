package com.travelplanner.backend.dao;

import com.travelplanner.backend.entity.DailyPlan;
import com.travelplanner.backend.entity.PlaceEntry;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

@Repository
public class PlaceEntryDAO {
    @Autowired
    private SessionFactory sessionFactory;

    public void save(PlaceEntry placeEntry) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(placeEntry);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            if (session != null) {
                session.getTransaction().rollback();
            }
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }

    public void deletePlaceEntry(int placeEntryId) {
        Session session = null;

        try {
            session = sessionFactory.openSession();
            PlaceEntry placeEntry = session.get(PlaceEntry.class, placeEntryId);
            DailyPlan dailyPlan = placeEntry.getDailyPlan();
            dailyPlan.getPlaceEntrySet().remove(placeEntry);

            session.beginTransaction();
            session.delete(placeEntry);
            session.getTransaction().commit();

        } catch (Exception e) {
            e.printStackTrace();
            if (session != null) {
                session.getTransaction().rollback();
            }
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
}
