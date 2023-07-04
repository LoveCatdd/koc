package com.koc.backend.service.impl.groups;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.koc.backend.mapper.GroupMapper;
import com.koc.backend.pojo.Group;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.groups.DeleteGroups;
import org.springframework.beans.factory.annotation.Autowired;

public class DeleteServiceImpl implements DeleteGroups {

    @Autowired
    GroupMapper groupMapper;

    @Override
    public JSONObject DeleteGroup(String req) {
        User user = UserUtilImpl.getUser();
        JSONObject data = JSON.parseObject(req);

        Integer Fgroup = data.getInteger("id");
        Group group = groupMapper.selectById(Fgroup);

        JSONObject jsonObject = new JSONObject();
        // if (friend == null) {
        //     jsonObject.put("error_message", "Bot不存在");
        //     return jsonObject;
        // }
        groupMapper.deleteById(Fgroup);
        jsonObject.put("error_message", "success");
        return jsonObject;
    }
}
