package com.koc.backend.controller.user.account;

import com.koc.backend.service.user.account.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class UpdateController {

    @Autowired
    UpdateService updateService;

    @PostMapping("/user/account/info/update/")
    public Map<String, String> updateInfoController(@RequestParam Map<String, String> map){
        return updateService.updateService(map);
    }
}
