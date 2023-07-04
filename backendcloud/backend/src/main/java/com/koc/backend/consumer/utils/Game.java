package com.koc.backend.consumer.utils;

import com.alibaba.fastjson2.JSONObject;
import com.koc.backend.consumer.WebSocketServer;
import com.koc.backend.pojo.Record;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.concurrent.locks.ReentrantLock;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class Game extends Thread{
    private ArrayList<PieceObject> pieces ;
    private Player playerA;
    private Player playerB;
    private ReentrantLock lock = new ReentrantLock();

    private String nextStepA = null;
    private String nextStepB = null;

    private String status = "playing";

    private Integer wait = null; // 当前等待玩家
    private Integer action = null;

    private Integer loser ;
    private String moveRecord = "";

    public Game(Integer aId, Integer bId, Integer aDirt, Integer bDirt) {
       this.pieces = new ArrayList<>();
       this.playerA = new Player(aId, aDirt);
       this.playerB = new Player(bId, bDirt);
    }

    public void setNextStepA(String nextStepA) {
        lock.lock();
        try {
            this.nextStepA = nextStepA;
        } finally {
            lock.unlock();
        }
    }

    public void setMoveRecord(Integer id, String step) {
        moveRecord += id + "-" + step + "&";
    }

    public void setNextStepB(String nextStepB) {
        lock.lock();
        try {
            this.nextStepB = nextStepB;
        } finally {
            lock.unlock();
        }
    }

    public void createPieces(int direction, boolean isWhite) {
        if (isWhite) {
            int idx = 48;
            for (int i = 0; i < 8; ++i) {
                pieces.add(new PieceObject("pawn", direction, idx));
                idx++;
            }
            pieces.add(new PieceObject("rook", direction,idx));
            idx++;
            pieces.add(new PieceObject("knight", direction,idx));
            idx++;
            pieces.add(new PieceObject("bishop", direction,idx));
            idx++;
            pieces.add(new PieceObject("queen", direction,idx));
            idx++;
            pieces.add(new PieceObject("king", direction,idx));
            idx++;
            pieces.add(new PieceObject("bishop", direction,idx));
            idx++;
            pieces.add( new PieceObject("knight", direction,idx));
            idx++;
            pieces.add( new PieceObject("rook", direction,idx));
            idx++;
        } else {
            int idx = 0;
            pieces.add(new PieceObject("rook", direction,idx));
            idx++;
            pieces.add(new PieceObject("knight", direction,idx));
            idx++;
            pieces.add(new PieceObject("bishop", direction,idx));
            idx++;
            pieces.add(new PieceObject("queen", direction,idx));
            idx++;
            pieces.add(new PieceObject("king", direction,idx));
            idx++;
            pieces.add(new PieceObject("bishop", direction,idx));
            idx++;
            pieces.add(new PieceObject("knight", direction,idx));
            idx++;
            pieces.add(new PieceObject("rook", direction,idx));
            idx++;
            for (int i = 0; i < 8; ++i) {
                pieces.add(new PieceObject("pawn", direction, idx));
                idx++;
            }
        }
    }

//    public void updateIdx(Integer preIdx, Integer newIdx) {
//
//        for (int i = 0; i < pieces.size(); ++ i) {
//            PieceObject piece = pieces.get(i);
//            if (piece.getIdx().equals(preIdx)) {
//                piece.setIdx(newIdx);
//                pieces.add(piece);
//                pieces.remove(i);
//                break;
//            }
//        }
//        System.out.println(pieces);
//    }

    private void startAction() { // 开始行动判断

        JSONObject respAction = new JSONObject();
        respAction.put("event", "action");
        respAction.put("action", "action");

        JSONObject respWait = new JSONObject();
        respWait.put("event", "wait");
        respWait.put("action", "wait");
        int aDirection = playerA.getDirection();
        int bDirection = playerB.getDirection();

        if (aDirection == 1) {
            wait = playerB.getId();
            action = playerA.getId();
            WebSocketServer.users.get(playerA.getId()).sendMessage(respAction.toJSONString());
            WebSocketServer.users.get(playerB.getId()).sendMessage(respWait.toJSONString());
        } else if (bDirection == 1) {
            wait = playerA.getId();
            action = playerB.getId();
            WebSocketServer.users.get(playerB.getId()).sendMessage(respAction.toJSONString());
            WebSocketServer.users.get(playerA.getId()).sendMessage(respWait.toJSONString());
        }
    }
    private void playingAction(int actionId, int waitId) {

        this.action = actionId;
        this.wait = waitId;

        JSONObject respAction = new JSONObject();
        respAction.put("event", "action");
        respAction.put("action", "action");

        JSONObject respWait = new JSONObject();
        respWait.put("event", "wait");
        respWait.put("action", "wait");

        WebSocketServer.users.get(actionId).sendMessage(respAction.toJSONString());
        WebSocketServer.users.get(waitId).sendMessage(respWait.toJSONString());

    }
    private boolean nextStep() {
        if (nextStepA == null && nextStepB == null)
            return false;
        return true;
    }

    private  boolean judge() {
        return true;
    }


    private void sendMove() {
        try {
            Thread.sleep(200);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        int aId = playerA.getId();
        int bId = playerB.getId();

        JSONObject respMove = new JSONObject();
        respMove.put("event", "move");

        if (wait == aId) {
            lock.lock();
            try {
                respMove.put("step", nextStepB);
            } finally {
                lock.unlock();
            }
        } else if (wait == bId) {
            lock.lock();
            try {
                respMove.put("step", nextStepA);
            } finally {
                lock.unlock();
            }
        }
        nextStepB = null;
        nextStepA = null;
        sendSomeMessage(wait, respMove.toJSONString());
    }

    private void saveToDatabase() {
        Record record = new Record(
                null,
                playerA.getId(),
                playerB.getId(),
                playerA.getDirection(),
                playerB.getDirection(),
                moveRecord,
                loser,
                new Date()
        );

        WebSocketServer.recordMapper.insert(record);
    }

    private void senResult() {
        JSONObject respA = new JSONObject();
        respA.put("event", "result");
        respA.put("game_status","end");
        JSONObject respB = new JSONObject();
        respB.put("event", "result");
        respB.put("game_status", "end");

        if (playerA.getId().equals(loser)) {
            respB.put("result", "win");
            respA.put("result", "lose");

        } else if (playerB.getId().equals(loser)) {
            respA.put("result", "win");
            respB.put("result", "lose");
        }
        saveToDatabase();
        sendSomeMessage(playerA.getId(), respA.toJSONString());
        sendSomeMessage(playerB.getId(), respB.toJSONString());
    }

    private void sendSomeMessage(int user_id, String message) {
        WebSocketServer.users.get(user_id).sendMessage(message);
    }

    @Override
    public void run() {
        startAction();

        while (true) {
            if (nextStep()) {
                if ("playing".equals(status)) {
                    sendMove();
                    playingAction(wait, action); // 切换
                } else if ("finished".equals(status)){
                    senResult();
                    break;
                }
            }
        }
    }
}
