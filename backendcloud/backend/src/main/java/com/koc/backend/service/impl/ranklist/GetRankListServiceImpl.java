package com.koc.backend.service.impl.ranklist;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.koc.backend.pojo.User;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.UserMapper;
import com.koc.backend.service.ranklist.GetRankListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetRankListServiceImpl implements GetRankListService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public JSONObject getList(Integer page) {

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();

        IPage<User> userIPage = new Page<>(page, 10);
        queryWrapper.orderByDesc("rating");
        List<User> users = userMapper.selectPage(userIPage, queryWrapper).getRecords();
        JSONObject resp = new JSONObject();
        for (User user : users){
            user.setPassword("");
        }
        resp.put("users", users);
        //用于查询用户表中记录的数量。
        resp.put("users_count", userMapper.selectCount(null));
        return resp;
    }
}
