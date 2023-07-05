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
    subsetMapper subsetMapper;

    @Override
    public JSONObject DeleteGroup(String req) {
        User user = UserUtilImpl.getUser();
        JSONObject data = JSON.parseObject(req);

        Integer Fgroup = data.getInteger("id");
        Subset subset = subsetMapper.selectById(Fgroup);

        JSONObject jsonObject = new JSONObject();
        // if (friend == null) {
        //     jsonObject.put("error_message", "Bot不存在");
        //     return jsonObject;
        // }
        subsetMapper.deleteById(Fgroup);
        jsonObject.put("error_message", "success");
        return jsonObject;
    }
}
