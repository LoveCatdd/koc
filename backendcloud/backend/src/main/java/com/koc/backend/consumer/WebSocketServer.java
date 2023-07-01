package com.koc.backend.consumer;

import com.alibaba.fastjson2.JSONObject;
import com.koc.backend.consumer.utils.Game;
import com.koc.backend.consumer.utils.JwtAuthentication;
import com.koc.backend.mapper.UserMapper;
import com.koc.backend.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Iterator;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@ServerEndpoint("/websocket/{token}")  // 注意不要以'/'结尾
public class WebSocketServer {

    public final static ConcurrentHashMap<Integer, WebSocketServer> users = new ConcurrentHashMap<>();
    private final static CopyOnWriteArraySet<User> matchpool = new CopyOnWriteArraySet<>();
    private User user;
    private static UserMapper userMapper;
    private Session session = null;
    private Game game;
    @Autowired
    public void setUserMapper(UserMapper userMapper) {
        WebSocketServer.userMapper = userMapper;
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
        System.out.println(users.toString());
    }

    @OnClose
    public void onClose() {
        // 关闭链接
        System.out.println("disconnected");
        if (this.user != null) {
            users.remove(this.user.getId());
            matchpool.remove(this.user);
        }
    }

    private void startMatching() {
        System.out.println("start matching");
        matchpool.add(this.user);

        while(matchpool.size() >= 2) {
            Iterator<User> it = matchpool.iterator();

            User a = it.next(), b = it.next();
            matchpool.remove(a);
            matchpool.remove(b);

            Random random = new Random();
            int aDirt = random.nextInt(2) * 2 - 1, bDirt;  // 生成随机的1或-1
            do {
                bDirt = random.nextInt(2) * 2 - 1;
            } while(bDirt == aDirt);

            game = new Game(a.getId(), b.getId(), aDirt, bDirt);


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
    }

    public void sendMessage(String message) {
        synchronized (this.session) {
            try {
                this.session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private void stopMatching() {
        System.out.println("stop matching");
        matchpool.remove(this.user);
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
            game.setNextStepA(nextStep);
        } else if ( user.getId().equals(bId) && bId == game.getAction()) {
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
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }
}