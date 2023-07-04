package com.koc.backend.service.impl.groups;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.GroupMapper;
import com.koc.backend.pojo.Group;
import com.koc.backend.pojo.Info;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.friends.GetGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetServiceImpl implements GetGroups {

    @Autowired
    GroupMapper groupMapper;
    @Override
    public JSONObject GetGroup() {
        User user = UserUtilImpl.getUser();
        QueryWrapper<Group> qr = new QueryWrapper<>();
        Group group = groupMapper.selectOne(qr.eq("userid",user.getId()));
        JSONObject jsonObject = new JSONObject();
        // jsonObject.put("userid", group.getUserid());
        // jsonObject.put("groups", group.getGroupnames());
        List<Group> groups = groupMapper.selectList(qr.eq("userid",user.getId()));
        String groupstr = "";
        for(Group g : groups){
            groupstr += g.getGroupid() + " " + g.getGroupnames();
        }
        jsonObject.put("userid", group.getUserid());
        jsonObject.put("groups", groupstr);
        return jsonObject;
    }
}
