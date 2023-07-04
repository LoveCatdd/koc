package com.koc.backend.service.impl.groups;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.GroupMapper;
import com.koc.backend.pojo.Group;
import com.koc.backend.service.user.friends.AddGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddServiceImpl implements AddGroups {

    @Autowired
    GroupMapper groupMapper;
    @Override
    public JSONObject AddGroup(String req) {
        JSONObject data = JSON.parseObject(req);
        Integer Gid = data.getInteger("groupid");
        Integer Uid = data.getInteger("userid");
        JSONArray GNamesArray = data.getJSONArray("groupname");
        String gnames =GNamesArray.toJSONString();

        Group group = new Group(Gid,Uid,gnames);
        groupMapper.insert(group);
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
