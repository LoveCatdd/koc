package com.koc.backend.service.impl.groups;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.koc.backend.mapper.subsetMapper;
import com.koc.backend.pojo.Subset;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.groups.AddGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddServiceImpl implements AddGroups {

    @Autowired
    subsetMapper subsetMapper;
    @Override
    public JSONObject AddGroup(String req) {
        User user = UserUtilImpl.getUser();
        JSONObject data = JSON.parseObject(req);
        // Integer Gid = data.getInteger("groupid");
        Integer Uid = user.getId();
        JSONArray GNamesArray = data.getJSONArray("groupname");
        String gnames =GNamesArray.toJSONString();

        Subset subset = new Subset(null,Uid,gnames);
        subsetMapper.insert(subset);
        JSONObject res = new JSONObject();
        res.put("error","success");

        // QueryWrapper queryWrapper = new QueryWrapper();
        //
        // List<Group> groupList = groupMapper.selectList(queryWrapper.eq("userid", userId));
        //
        //
        // JSONObject respGroup = new JSONObject();
        // for (Group group : groupList) {
        //     String group_ = group.getGroupid() + " " + group.getGroupnames();
        //     respGroup.put("groupid", group.getGroupid());
        //     respGroup.put("groupname",group.getGroupnames());
        // }
        //
        // JSONObject resp = new JSONObject();
        // resp.put("userid", userid);
        // resp.put("groups", respGroup);
        //


        return res;
    }
}
