package com.koc.backend.consumer.utils;

import com.koc.backend.utils.JwtUtil;
import io.jsonwebtoken.Claims;

import javax.jnlp.UnavailableServiceException;

public class JwtAuthentication {
    public static int getUserId(String token) {
        int userId = -1;
        try {
            Claims claims = JwtUtil.parseJWT(token);
            userId = Integer.parseInt(claims.getSubject());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return userId;
    }
}

