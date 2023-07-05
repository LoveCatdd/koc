package com.koc.backend.controller.Groups;

import com.alibaba.fastjson.JSONObject;
import com.koc.backend.service.user.groups.DeleteGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
@RestController
public class DeleteGroupController {
    @Autowired
    private DeleteGroups deleteGroups;

    @GetMapping("/user/account/deletegroup/")
    public JSONObject DeleteGroup(@RequestParam Map<String, Integer> req){
       return deleteGroups.DeleteGroup(req.get("req"));
    }
}
