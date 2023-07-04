package com.koc.backend.controller.Groups;

import com.alibaba.fastjson.JSONObject;
import com.koc.backend.service.user.groups.AddGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddGroupController {
    @Autowired
    AddGroups addGroups;

    @GetMapping("/api/groups")
    public JSONObject AddGroup(String req) {
        return addGroups.AddGroup(req);
    }

}
