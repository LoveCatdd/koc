package com.koc.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.koc.backend.mapper.InfoMapper;
import com.koc.backend.pojo.Info;
import com.koc.backend.pojo.User;
import com.koc.backend.service.impl.utils.UserDetailsImpl;
import com.koc.backend.service.impl.utils.UserUtilImpl;
import com.koc.backend.service.user.account.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class InfoServiceImpl implements InfoService {

    @Autowired
    InfoMapper infoMapper;
    @Override
    public Map<String, String> getinfo() {
        User user = UserUtilImpl.getUser();
        QueryWrapper<Info> qr = new QueryWrapper<>();
        Info info = infoMapper.selectOne(qr.eq("userid",user.getId()));
        Map<String, String> map = new HashMap<>();
        map.put("error_message", "success");
        map.put("id", user.getId().toString());
        map.put("username", user.getUsername());
        map.put("photo", user.getPhoto());
        // map.put("profile",info.getProfile());
        // map.put("rating",info.getRating().toString());
        //map.put("ranking",info.getRanking().toString());
        return map;
    }
}
