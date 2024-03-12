package com.koc.backend.service.user.groups;

import com.alibaba.fastjson.JSONObject;

import java.util.Map;

public interface DeleteGroups {
    public JSONObject DeleteGroup(Map<String, String> req);

}
