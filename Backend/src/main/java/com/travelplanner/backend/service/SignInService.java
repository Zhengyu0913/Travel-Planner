package com.travelplanner.backend.service;

import com.travelplanner.backend.dao.SignInDao;
import com.travelplanner.backend.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SignInService {

    @Autowired
    private SignInDao signInDao;

    public String verifyLogin(String userId, String password) throws IOException {
        password = Util.encryptPassword(userId, password);
        return signInDao.verifyLogin(userId, password);
    }
}

