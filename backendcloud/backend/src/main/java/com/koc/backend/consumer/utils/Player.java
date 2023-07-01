package com.koc.backend.consumer.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Player {
    private Integer id;
    private Integer direction;
    private List<String> steps;

    public Player(Integer id, Integer direction) {
        this.id = id;
        this.direction = direction;
    }
}
