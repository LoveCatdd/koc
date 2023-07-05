package com.koc.backend.controller.record;
import com.alibaba.fastjson.JSONObject;
import com.koc.backend.service.user.record.GetRecordListService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;
import java.util.Map;

@RestController
public class GetRecordListController {

    @Resource
    private GetRecordListService getRecordListService;

    @GetMapping("/user/recordlist/getlist/")
    JSONObject getList(@RequestParam Map<String, String> data) {
        Integer page = Integer.parseInt(data.get("page"));
        return getRecordListService.getList(page);
    }
}
