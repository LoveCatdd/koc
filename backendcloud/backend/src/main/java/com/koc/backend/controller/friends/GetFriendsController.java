package com.koc.backend.controller.friends;

import com.alibaba.fastjson.JSONObject;
import com.koc.backend.mapper.FriendMapper;
import com.koc.backend.service.user.friends.GetFriends;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetFriendsController {
    @Autowired
    GetFriends getFriends;

    @GetMapping("/user/friend/getfriends/")
    public JSONObject getFriends(){
        return getFriends.getFriends();
    }
}
