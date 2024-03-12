package com.koc.backend.service.impl.groups;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.subsetMapper;
import com.koc.backend.pojo.Subset;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.groups.AddGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.Query;
import java.util.List;

@Service
public class AddServiceImpl implements AddGroups {

    @Autowired
    private subsetMapper subsetMapper;
    @Override
    public JSONObject AddGroup(String req) {
        User user = UserUtilImpl.getUser();
        QueryWrapper<Subset> queryWrapper = new QueryWrapper<>();
        Integer Uid = user.getId();
        Subset subset = new Subset(null,Uid,req);
        subsetMapper.insert(subset);
        JSONObject res = new JSONObject();
        List<Subset> uid = subsetMapper.selectList(queryWrapper.eq("userid", Uid));
        for (Subset s: uid) {
           if(s.getSubsetname() == req)
               res.put("id",s.getId());
            System.out.println(res);
            break;
        }
        res.put("error","success");
        return res;
    }
}
