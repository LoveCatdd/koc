package com.koc.backend.service.impl.utils;

import com.koc.backend.pojo.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserUtilImpl {
    //从 Spring Security 的安全上下文中获取已认证的用户对象，并返回该用户对象。
    public static User getUser() {
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        //自定义用户信息类，其中封装了用户的详细信息。
        UserDetailsImpl loginUser = (UserDetailsImpl) authentication.getPrincipal();
        return loginUser.getUser();
    }
}
