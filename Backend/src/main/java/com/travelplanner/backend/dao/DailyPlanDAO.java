package com.travelplanner.backend.dao;

import com.travelplanner.backend.entity.DailyPlan;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DailyPlanDAO {

    @Autowired
    SessionFactory sessionFactory;

    public DailyPlan getDailyPlan(int dailyplanId) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(DailyPlan.class, dailyplanId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
