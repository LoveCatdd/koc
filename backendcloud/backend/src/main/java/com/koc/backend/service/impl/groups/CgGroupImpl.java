package com.koc.backend.service.impl.groups;

import com.alibaba.fastjson.JSONObject;
import com.koc.backend.mapper.subsetMapper;
import com.koc.backend.pojo.Subset;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.groups.CgGroups;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CgGroupImpl implements CgGroups {

    @Autowired
    private subsetMapper subsetMapper;

    @Override
    public JSONObject changeGroup(Integer id, String nam) {
        System.out.println(id);
        System.out.println(nam);
        Subset subset = subsetMapper.selectById(id);
        subset.setSubsetname(nam);
        subsetMapper.updateById(subset);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("error_message", "success");
        return jsonObject;
    }
}
