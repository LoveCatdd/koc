package com.koc.backend.service.impl.groups;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.koc.backend.mapper.subsetMapper;
import com.koc.backend.pojo.Subset;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.groups.DeleteGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class DeleteServiceImpl implements DeleteGroups {

    @Autowired
    private subsetMapper subsetMapper;

    @Override
    public JSONObject DeleteGroup(Map<String, String> req) {
        int id = Integer.parseInt(req.get("req"));
        System.out.println("delete" + id);
        subsetMapper.deleteById(id);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("error_message", "success");
        return jsonObject;
    }
}
