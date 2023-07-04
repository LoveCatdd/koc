package com.koc.backend.controller.user.Groups;

import com.alibaba.fastjson.JSONObject;
import com.koc.backend.service.user.groups.GetGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetGroupController {

    @Autowired
    GetGroups getGroups;

    @GetMapping("http://127.0.0.1:8090/user/account/info/getgroups")
    public JSONObject GetGroup(){
        return getGroups.GetGroup();
    }
}
