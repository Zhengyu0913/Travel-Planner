package com.laioffer.travelPlanner.util;


import org.apache.commons.codec.digest.DigestUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class Util {
    /**
     *  util function for encrypting the user password before saving to the database
     */
    public static String encryptPassword(String userId, String password) throws IOException {
        return DigestUtils.md5Hex(userId + DigestUtils.md5Hex(password)).toLowerCase();
    }

    /**
     *  util function for generating dates between start date and end date
     */
    public static List<Date> createDateList(Date startDate, Date endDate) {
        List<Date> dateList = new ArrayList<>();
        Date prevDate = startDate;
        dateList.add(prevDate);
        while (!prevDate.equals(endDate)) {
            Date currDate = nextDay(prevDate, 1);
            dateList.add(currDate);
            prevDate = currDate;
        }
        return dateList;
    }

    /**
     *  util function for generating next date from the current date
     */
    private static Date nextDay(Date date, int days) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, days); //minus number would decrement the days
        return cal.getTime();
    }
}
