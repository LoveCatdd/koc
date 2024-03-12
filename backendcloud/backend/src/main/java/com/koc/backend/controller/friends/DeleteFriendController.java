package com.koc.backend.controller.friends;

import com.alibaba.fastjson.JSONObject;
import com.koc.backend.service.user.friends.DeleteFriends;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class DeleteFriendController {
    @Autowired
    DeleteFriends deleteFriends;

    @GetMapping("/user/account/deletefriend/")
    public JSONObject deleteFriends(@RequestParam Map<String, Integer> req){
        return deleteFriends.DeleteFriends(req);
    }

}
