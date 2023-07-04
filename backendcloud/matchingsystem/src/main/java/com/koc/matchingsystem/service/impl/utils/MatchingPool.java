package com.koc.matchingsystem.service.impl.utils;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

@Component
public class MatchingPool extends Thread{

    private static List<Player>  players  = new ArrayList<>();
    private ReentrantLock lock = new ReentrantLock();
    private static RestTemplate restTemplate;
    private final static String startGameUrl = "http://127.0.0.1:8090/pk/start/game/";
    @Autowired
    public void setRestTemplate(RestTemplate restTemplate) {
        MatchingPool.restTemplate = restTemplate;
    }
    public void addPlayer(Integer userId, Integer rating) {
        lock.lock();
        try {
            players.add(new Player(userId, rating, 0));
        }  finally {
           lock.unlock();
        }
    }

    public void removePlayer(Integer userId) {
        lock.lock();
        try {
            List<Player> newPlayers = new ArrayList<>();
            for (Player player : players) {
                if (!userId.equals(player.getId())) {
                    newPlayers.add(player);
                }
            }
            players = newPlayers;
        } finally {
            lock.unlock();
        }
    }

    private void increaseWaitingTime() {
        for (Player player : players) {
            player.setWatingTime(player.getWatingTime() + 1);
        }
    }
    private boolean checkMatched(Player a, Player b) {
        int ratingDelta = Math.abs(a.getRating() - b.getRating());
        int waitingTime = Math.min(a.getWatingTime(), b.getWatingTime());
        return ratingDelta <= waitingTime * 10;
    }

    public void sendResult(Player a, Player b) {
        MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
        data.add("a_id",a.getId().toString());
        data.add("b_id",b.getId().toString());
        restTemplate.postForObject(startGameUrl,data,String.class);
    }
    private void MatchPlayers() {
        boolean[] used = new boolean[players.size()];
        for (int i = 0; i < players.size(); ++ i){
            if (used[i])
                continue;
            for (int j = i + 1; j < players.size(); ++ j) {
                if (used[j])
                    continue;
                Player a =players.get(i), b = players.get(j);
                if (checkMatched(a, b)) {
                    used[i] = used[j] = true;
                    sendResult(a, b);
                    break;
                }
            }
        }

        List<Player> newPlayers = new ArrayList<>();
        for (int i = 0; i < players.size(); ++ i) {
            if (used[i])
                continue;
            newPlayers.add(players.get(i));
        }
        players = newPlayers;
    }
    @Override
    public void run() {
       while (true) {
           try {
               Thread.sleep(1000);
               lock.lock();
               try {
                   increaseWaitingTime();
                   MatchPlayers();
               } finally {
                   lock.unlock();
               }

           } catch (InterruptedException e) {
               e.printStackTrace();
               break;
           }
       }
    }
}
