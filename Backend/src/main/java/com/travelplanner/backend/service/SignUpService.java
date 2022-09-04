package com.travelplanner.backend.service;

import com.travelplanner.backend.dao.SignUpDao;
import com.travelplanner.backend.entity.User;
import com.travelplanner.backend.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SignUpService {

    @Autowired
    private SignUpDao signUpDao;

    public boolean signUp(User user) throws IOException {
        user.setPassword(Util.encryptPassword(user.getUserId(), user.getPassword()));
        return signUpDao.signUp(user);
    }
}
