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
        QueryWrapper<Info> qr = new QueryWrapper<>();
        Info info = infoMapper.selectOne(qr.eq("userid",user.getId()));
        String username = data.get("username");
        String photo = data.get("photo");
        String profile = data.get("profile");
        Map<String, String> map = new HashMap<>();
        if (username == null || username.length() == 0){
            map.put("error_message", "用户名不能为空");
            return map;
        }
        if (photo == null || photo.length() == 0){
            map.put("error_message", "图片路径不能为空");
            return map;
        }
        if (profile == null || profile.length() == 0){
            profile = "这个用户很懒，什么也没留下~";
        }
        else if(profile.length() > 1000){
            map.put("error_message", "代码长度不能超过1000");
            return map;
        }
        if(!info.getUserid().equals(user.getId())){
            map.put("error_message","无权修改");
            return map;
        }
        user.setUsername(username);
        user.setPhoto(photo);
        userMapper.updateById(user);
        map.put("error_message","success");
        return map;
    }
}
