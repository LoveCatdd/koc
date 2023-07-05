package com.koc.backend.controller.friends;

import com.alibaba.fastjson.JSONObject;
import com.koc.backend.service.user.friends.Getinfomes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class GetinfomesController {
    @Autowired
    private Getinfomes getinfomes;
    @GetMapping("/user/account/getinfomes/")
    public JSONObject Getinfomes(@RequestParam Map<String, Integer> id){
        return getinfomes.Getinfomes(id);
    }
}
