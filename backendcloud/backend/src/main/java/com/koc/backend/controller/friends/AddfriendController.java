package com.koc.backend.controller.friends;

import com.alibaba.fastjson.JSONObject;
import com.koc.backend.service.user.friends.AddFriends;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddfriendController {
    @Autowired
    AddFriends addFriends;
    @GetMapping("http://127.0.0.1:8090/user/account/info/addfriends")
    public JSONObject addFriends(String req){
        return addFriends.AddFriends(req);
    }
}
