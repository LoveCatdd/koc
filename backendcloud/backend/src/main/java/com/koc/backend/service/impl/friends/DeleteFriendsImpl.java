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

@Service
public class DeleteFriendsImpl implements DeleteFriends {
    @Autowired
    FriendMapper friendMapper;
    @Override
    public JSONObject DeleteFriends(String req) {
        User user = UserUtilImpl.getUser();
        JSONObject data = JSON.parseObject(req);
        Integer Fid = data.getInteger("id");
        Friend friend = friendMapper.selectById(Fid);

        JSONObject jsonObject = new JSONObject();
        // if (friend == null) {
        //     jsonObject.put("error_message", "Bot不存在");
        //     return jsonObject;
        // }
        friendMapper.deleteById(Fid);
        jsonObject.put("error_message", "success");
        return jsonObject;
    }
}
