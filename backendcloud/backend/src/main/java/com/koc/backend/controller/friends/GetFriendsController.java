package com.koc.backend.controller.friends;

import com.koc.backend.mapper.FriendMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetFriendsController {
    @Autowired
    FriendMapper friendMapper;
}
