package com.koc.backend.service.impl.friends;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.FriendMapper;
import com.koc.backend.pojo.Friend;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.friends.GetFriends;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GetFriendsImpl implements GetFriends {

    @Autowired
    FriendMapper friendMapper;
    @Override
    public JSONObject getFriends() {
        User user = UserUtilImpl.getUser();
        QueryWrapper<Friend> qr = new QueryWrapper<>();
        Friend friend = friendMapper.selectOne(qr.eq("userid",user.getId()));
        JSONObject jsonObject = new JSONObject();
        // jsonObject.put("userid", group.getUserid());
        // jsonObject.put("groups", group.getGroupnames());
        List<Friend> friends = friendMapper.selectList(qr.eq("userid",user.getId()));
        String friendstr = "";
        for(Friend f : friends){
            friendstr += f.getId() + " " + f.getFriendname();
        }
        jsonObject.put("id", friend.getGroupid());
        jsonObject.put("groups", friendstr);
        return jsonObject;
    }
}
