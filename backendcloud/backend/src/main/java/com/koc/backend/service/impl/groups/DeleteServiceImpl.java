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

@Service
public class DeleteServiceImpl implements DeleteGroups {

    @Autowired
    private subsetMapper subsetMapper;

    @Override
    public JSONObject DeleteGroup(Integer req) {
        System.out.println(req);
        // Integer Fgroup = data.getInteger("id");
        subsetMapper.deleteById(req);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("error_message", "success");
        return jsonObject;
    }
}
