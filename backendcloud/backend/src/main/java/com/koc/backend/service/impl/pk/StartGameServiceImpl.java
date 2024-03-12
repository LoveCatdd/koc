package com.koc.backend.service.impl.pk;

import com.koc.backend.consumer.WebSocketServer;
import com.koc.backend.service.pk.StartGameService;
import org.springframework.stereotype.Service;

@Service
public class StartGameServiceImpl implements StartGameService {
    @Override
    public String StartGame(Integer aId, Integer bId) {
        WebSocketServer.startGame(aId, bId);
        return "start game success";
    }
}
