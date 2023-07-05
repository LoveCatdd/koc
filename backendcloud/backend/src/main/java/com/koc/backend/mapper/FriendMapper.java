package com.koc.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.koc.backend.pojo.Friend;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FriendMapper extends BaseMapper<Friend> {
}
