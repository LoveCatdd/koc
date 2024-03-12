package com.koc.backend.consumer;

import com.alibaba.fastjson2.JSONObject;
import com.koc.backend.consumer.utils.Game;
import com.koc.backend.consumer.utils.JwtAuthentication;
import com.koc.backend.mapper.RecordMapper;
import com.koc.backend.mapper.UserMapper;
import com.koc.backend.pojo.Record;
import com.koc.backend.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.MultiValueMapAdapter;
import org.springframework.web.client.RestTemplate;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Component
@ServerEndpoint("/websocket/{token}")  // 注意不要以'/'结尾
public class WebSocketServer {

    public final static ConcurrentHashMap<Integer, WebSocketServer> users = new ConcurrentHashMap<>();
    private User user;
    private static UserMapper userMapper;
    public static RecordMapper recordMapper;
    private Session session = null;

    private static RestTemplate restTemplate;

    private static String addPlayerUrl = "http://127.0.0.1:8091/player/add/";
    private static String removePlayerUrl = "http://127.0.0.1:8091/player/remove/";
    private Game game = null;
    @Autowired
    public void setUserMapper(UserMapper userMapper) {
        WebSocketServer.userMapper = userMapper;
    }
    @Autowired
    public void setRecordMapper(RecordMapper recordMapper) {
        WebSocketServer.recordMapper = recordMapper;
    }
    @Autowired
    public void setRestTemplate(RestTemplate restTemplate) {
        WebSocketServer.restTemplate = restTemplate;
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token) {
        System.out.println("connected");
        // 建立连接
        this.session = session;
        Integer userId = JwtAuthentication.getUserId(token);
        this.user = userMapper.selectById(userId);

        if (this.user != null) {
            users.put(userId, this);
        } else {
            try {
                this.session.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    @OnClose
    public void onClose() {
        // 关闭链接
        System.out.println("disconnected");
        if (this.user != null) {
            users.remove(this.user.getId());
        }
    }
    public static void startGame(Integer aId, Integer bId) {
        User a = userMapper.selectById(aId), b = userMapper.selectById(bId);
        Random random = new Random();
        int aDirt = random.nextInt(2) * 2 - 1, bDirt;  // 生成随机的1或-1
        do {
            bDirt = random.nextInt(2) * 2 - 1;
        } while(bDirt == aDirt);

       Game game = new Game(a.getId(), b.getId(), aDirt, bDirt);


        game.createPieces(1, true);
        game.createPieces(-1, false);

        users.get(a.getId()).game = game;
        users.get(b.getId()).game = game;

        game.start();

        JSONObject respGame = new JSONObject();
        respGame.put("a_id", game.getPlayerA().getId());
        respGame.put("b_id", game.getPlayerB().getId());
        respGame.put("a_direction", aDirt);
        respGame.put("b_direction", bDirt);
        respGame.put("pieces_list", game.getPieces());

        System.out.println(game.getPieces());

        JSONObject respA = new JSONObject();
        respA.put("event", "start-matching");
        respA.put("username", b.getUsername());
        respA.put("photo", b.getPhoto());
        respA.put("game", respGame);
        users.get(a.getId()).sendMessage(respA.toJSONString());


        JSONObject respB = new JSONObject();
        respB.put("event", "start-matching");
        respB.put("username", a.getUsername());
        respB.put("photo", a.getPhoto());
        respB.put("game", respGame);
        users.get(b.getId()).sendMessage(respB.toJSONString());
    }
    private void startMatching() {
        System.out.println("start matching");
        MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
        data.add("user_id", this.user.getId().toString());
        data.add("rating", this.user.getRating().toString());
        restTemplate.postForObject(addPlayerUrl,data, String.class);
    }

    public void sendMessage(String message) {
        synchronized (this.session) {
            try {
                System.out.println(message);
                this.session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private void stopMatching() {
        System.out.println("stop matching");
        MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
        data.add("user_id",this.user.getId().toString());
        restTemplate.postForObject(removePlayerUrl, data, String.class);
    }

    private void sendMsg(JSONObject data) {

        int aId = this.game.getPlayerA().getId();
        int bId = this.game.getPlayerB().getId();

        int userId = data.getInteger("id");
        String content = data.getString("content");

        JSONObject respMsg = new JSONObject();
        respMsg.put("event", "send-message");
        respMsg.put("id", userId);
        respMsg.put("render", "u");
        respMsg.put("content", content);

        if (aId == userId) {
            users.get(bId).sendMessage(respMsg.toJSONString());
        } else if (bId == userId) {
            users.get(aId).sendMessage(respMsg.toJSONString());
        }
    }

    private void sendMove(JSONObject data) {

        int aId = this.game.getPlayerA().getId();
        int bId = this.game.getPlayerB().getId();

        String nextStep = data.getString("nextstep");

        if (user.getId().equals(aId) && aId == game.getAction()) {
            game.setMoveRecord(aId, nextStep);
            game.setNextStepA(nextStep);
        } else if ( user.getId().equals(bId) && bId == game.getAction()) {
            game.setMoveRecord(bId, nextStep);
            game.setNextStepB(nextStep);
        }
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        // 从Client接收消息
        JSONObject data = JSONObject.parse(message);
        String event = data.getString("event");
        if ("start-matching".equals(event)) {
            startMatching();
        } else if ("stop-matching".equals(event)) {
            stopMatching();
        } else if ("send-message".equals(event)) {
            sendMsg(data);
        } else if ("send-move".equals(event)) {
            sendMove(data);
        } else if ("finished".equals(event)) {
            sendStatus(data);
        }
    }

    private void sendStatus(JSONObject data) {
        System.out.println("finished" + data);
        int aId = this.game.getPlayerA().getId();
        int bId = this.game.getPlayerB().getId();
        String status = data.getString("status");
        Integer direction = data.getInteger("loser");
        if (direction.equals(game.getPlayerA().getDirection())) {
            users.get(aId).game.setLoser(game.getPlayerA().getId());
            users.get(bId).game.setLoser(game.getPlayerA().getId());
        } else if (direction.equals(game.getPlayerB().getDirection())) {
            users.get(aId).game.setLoser(game.getPlayerB().getId());
            users.get(bId).game.setLoser(game.getPlayerB().getId());
        }
        users.get(aId).game.setStatus(status);
        users.get(bId).game.setStatus(status);
    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }
}