package com.koc.backend.controller.Groups;

import com.alibaba.fastjson.JSONObject;
import com.koc.backend.service.user.groups.CgGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
@RestController
public class CgGroupController {
    @Autowired
    private CgGroups cgGroups;
    @GetMapping("/user/account/cggroup/")
    public JSONObject CgGroup(@RequestParam Integer id, @RequestParam String nam){
        return cgGroups.changeGroup(id,nam);
    }
}
