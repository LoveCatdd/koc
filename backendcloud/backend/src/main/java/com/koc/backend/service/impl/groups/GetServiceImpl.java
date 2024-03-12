package com.koc.backend.service.impl.groups;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.subsetMapper;
import com.koc.backend.pojo.Friend;
import com.koc.backend.pojo.Subset;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.groups.GetGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;


@Service
public class GetServiceImpl implements GetGroups {

    @Autowired
    private subsetMapper subsetMapper;
    @Override
    public JSONObject GetGroup() {
        User user = UserUtilImpl.getUser();
        QueryWrapper<Subset> qr = new QueryWrapper<>();
        JSONObject jsonObject = new JSONObject();
        List<JSONObject> jsonlist = new ArrayList<>();
        List<Subset> groups = subsetMapper.selectList(qr.eq("userid",user.getId()));
        for (Subset g: groups) {
            JSONObject jsont =new JSONObject();
            jsont.put("id", g.getId());
            jsont.put("name", g.getSubsetname());
            jsonlist.add(jsont);
        }
        jsonObject.put("grouplist", jsonlist);
        jsonObject.put("groupsnum", groups.size());
        jsonObject.put("photo",user.getPhoto());
        jsonObject.put("name",user.getUsername());
        return jsonObject;
    }
}
