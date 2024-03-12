package com.koc.backend.service.impl.friends;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.FriendMapper;
import com.koc.backend.pojo.Friend;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.friends.DeleteFriends;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DeleteFriendsImpl implements DeleteFriends {
    @Autowired
    private FriendMapper friendMapper;
    @Override
    public JSONObject DeleteFriends(Map<String, Integer> req) {
        Integer Fid =req.get("id");
        JSONObject jsonObject = new JSONObject();
        friendMapper.deleteById(Fid);
        jsonObject.put("error_message", "success");
        return jsonObject;
    }
}
