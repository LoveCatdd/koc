package com.koc.backend.controller.pk;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
/**
 * 对战主界面
 * */
@Controller
@RequestMapping("/pk/")
public class IndexController {
    @RequestMapping("/index")
    public String index() {
        return null;
        //return "pk/index.html";
    }
}
