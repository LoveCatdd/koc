package com.koc.backend.service.impl.friends;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.koc.backend.mapper.FriendMapper;
import com.koc.backend.pojo.Friend;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.friends.AddFriends;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddFriendsImpl implements AddFriends {


    @Autowired
    private FriendMapper friendMapper;
    @Override
    public JSONObject AddFriends(String req) {
        User user = UserUtilImpl.getUser();
        JSONObject data = JSON.parseObject(req);
        Integer Fid = data.getInteger("friendid");
        Integer Uid = user.getId();
        Integer Gid = data.getInteger("groupid");
        Friend friend = new Friend(Uid,Gid,Fid);
        friendMapper.insert(friend);
        JSONObject res = new JSONObject();
        res.put("error_message","success");
        return res;
    }
}
