package com.koc.backend.service.impl.friends;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.FriendMapper;
import com.koc.backend.mapper.UserMapper;
import com.koc.backend.pojo.Friend;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.friends.GetFriends;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GetFriendsImpl implements GetFriends {

    @Autowired
    private FriendMapper friendMapper;
    @Autowired
    private UserMapper userMapper;
    @Override
    public JSONObject getFriends() {
        User user = UserUtilImpl.getUser();
        QueryWrapper<Friend> qr = new QueryWrapper<>();
        JSONObject jsonObject = new JSONObject();
        List<JSONObject> jsonlist = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        // friendMapper.selectByMap()
        List<Friend> friends = friendMapper.selectList(qr.eq("userid",user.getId()));
        for (Friend f: friends) {
            JSONObject jsont =new JSONObject();
            jsont.put("id", f.getId());
            jsont.put("groupid", f.getGroupid());
            User u = userMapper.selectById(f.getId());
            jsont.put("friendname",u.getUsername());
            jsont.put("photo",u.getPhoto());
            jsonlist.add(jsont);
        }
        jsonObject.put("flist", jsonlist);
        jsonObject.put("fnum", friends.size());
        // System.out.println(jsonObject);
        return jsonObject;
    }
}
