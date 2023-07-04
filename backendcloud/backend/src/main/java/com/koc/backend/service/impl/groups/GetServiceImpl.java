package com.koc.backend.service.impl.groups;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.subsetMapper;
import com.koc.backend.pojo.Subset;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.groups.GetGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GetServiceImpl implements GetGroups {

    @Autowired
    subsetMapper subsetMapper;
    @Override
    public JSONObject GetGroup() {
        System.out.println("get group run");
        User user = UserUtilImpl.getUser();
        QueryWrapper<Subset> qr = new QueryWrapper<>();
        Subset group = subsetMapper.selectOne(qr.eq("userid",user.getId()));
        JSONObject jsonObject = new JSONObject();
        List<Subset> groups = subsetMapper.selectList(qr.eq("userid",user.getId()));
        jsonObject.put("groupsnum", groups.size());
        System.out.println(jsonObject.toJSONString());
        return jsonObject;
    }
}
