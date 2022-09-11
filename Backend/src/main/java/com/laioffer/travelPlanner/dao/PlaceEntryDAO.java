package com.laioffer.travelPlanner.dao;

import com.laioffer.travelPlanner.entity.DailyPlan;
import com.laioffer.travelPlanner.entity.PlaceEntry;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PlaceEntryDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public PlaceEntry getPlaceEntryByID(int placeEntryId) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(PlaceEntry.class, placeEntryId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void savePlaceEntry(PlaceEntry placeEntry) {
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

    public void deletePlaceEntry(PlaceEntry placeEntry) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
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
