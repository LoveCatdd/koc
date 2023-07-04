package com.koc.backend.controller.Groups;

import com.alibaba.fastjson.JSONObject;
import com.koc.backend.service.user.groups.GetGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetGroupController {

    @Autowired
    GetGroups getGroups;

    @GetMapping("/user/group/getgroups/")
    public JSONObject GetGroup(){
        return getGroups.GetGroup();
    }
}
