package com.koc.matchingsystem.service;

public interface MatchingService {
    public String addPlayer(Integer userId, Integer rating);
    public String removePlayer(Integer userId);
}
