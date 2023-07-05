package com.koc.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.subsetMapper;
import com.koc.backend.mapper.InfoMapper;
import com.koc.backend.mapper.UserMapper;
import com.koc.backend.pojo.Subset;
import com.koc.backend.pojo.Info;
import com.koc.backend.pojo.User;
import com.koc.backend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private InfoMapper infoMapper;

    @Autowired
    subsetMapper subsetMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> register(String username, String password, String confirmedPassword) {
    Map<String, String> map = new HashMap<>();
        if (username == null) {
        map.put("error_message", "用户名不能为空");
        return map;
    }
        if (password == null || confirmedPassword == null) {
        map.put("error_message", "密码不能为空");
        return map;
    }

    username = username.trim();
        if (username.length() == 0) {
        map.put("error_message", "用户名不能为空");
        return map;
    }

        if (password.length() == 0 || confirmedPassword.length() == 0) {
        map.put("error_message", "密码不能为空");
        return map;
    }

        if (username.length() > 100) {
        map.put("error_message", "用户名长度不能大于100");
        return map;
    }

        if (password.length() > 100 || confirmedPassword.length() > 100) {
        map.put("error_message", "密码长度不能大于100");
        return map;
    }

        if (!password.equals(confirmedPassword)) {
        map.put("error_message", "两次输入的密码不一致");
        return map;
    }

    QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
    List<User> users = userMapper.selectList(queryWrapper);
        if (!users.isEmpty()) {
        map.put("error_message", "用户名已存在");
        return map;
    }

    String encodedPassword = passwordEncoder.encode(password);//加密
    String photo = "https://www.miyoushe.com/mainPage/sr-logo-v2.png";
    User user = new User(null, username, encodedPassword, photo,1500);
    userMapper.insert(user);
    user = userMapper.selectOne(queryWrapper.eq("username", user.getUsername()));
    Info info = new Info(null,user.getId());
    infoMapper.insert(info);
    Subset subset = new Subset(null,user.getId(),"默认分组");
    subsetMapper.insert(subset);
    map.put("error_message", "success");
    return map;
}
}

