package com.koc.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.InfoMapper;
import com.koc.backend.mapper.UserMapper;
import com.koc.backend.pojo.Info;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.account.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class updateServiceImpl implements UpdateService {
    @Autowired
    UserMapper userMapper;

    @Autowired
    InfoMapper infoMapper;
    @Override
    public Map<String, String> updateService(Map<String, String> data) {
        User user = UserUtilImpl.getUser();

        System.out.println(data.toString());

        String username = data.get("username");
        String photo = data.get("photo");
        String event = data.get("event");
        Map<String, String> map = new HashMap<>();
        if ("send-username".equals(event)) {
            if (username == null || username.length() == 0) {
                map.put("error_message", "用户名不能为空");
                return map;
            } else {
                user.setUsername(username);
            }
        }
        if ("send-photo".equals(event)) {
            if ((photo == null || photo.length() == 0)) {
                map.put("error_message", "图片路径不能为空");
                return map;
            } else {
                user.setPhoto(photo);
            }
        }
        userMapper.updateById(user);
        map.put("error_message","success");
        return map;
    }
}
