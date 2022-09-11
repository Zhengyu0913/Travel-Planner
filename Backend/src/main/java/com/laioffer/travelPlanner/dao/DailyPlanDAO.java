package com.laioffer.travelPlanner.dao;

import com.laioffer.travelPlanner.entity.DailyPlan;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public class DailyPlanDAO {

    @Autowired
    SessionFactory sessionFactory;

    public DailyPlan getDailyPlanById(int planId) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(DailyPlan.class, planId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public DailyPlan getDailyPlanByTripIDAndDate(int tripId, Date date) {
        try(Session session = sessionFactory.openSession()) {
            String hql = "FROM DailyPlan p WHERE p.trip.id = :trip_id AND p.date = :date";
            Query query = session.createQuery(hql);
            query.setParameter("trip_id", tripId);
            query.setParameter("date", date);
            return (DailyPlan) query.getSingleResult();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void deleteDailyPlan(DailyPlan dailyPlan) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.delete(dailyPlan);
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

    public void saveDailyPlan(DailyPlan dailyPlan) {
        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(dailyPlan);
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
