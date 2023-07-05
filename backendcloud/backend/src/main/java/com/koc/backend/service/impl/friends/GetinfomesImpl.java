package com.koc.backend.service.impl.friends;

import com.alibaba.fastjson.JSONObject;
import com.koc.backend.mapper.UserMapper;
import com.koc.backend.pojo.User;
import com.koc.backend.service.user.friends.Getinfomes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class GetinfomesImpl implements Getinfomes {
    @Autowired
    private UserMapper userMapper;
    @Override
    public JSONObject Getinfomes(Map<String, Integer> id) {
        User user = userMapper.selectById(id.get("fid"));
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("name",user.getUsername());
        jsonObject.put("photo",user.getPhoto());
        jsonObject.put("rating",user.getRating());
        return jsonObject;
    }
}
