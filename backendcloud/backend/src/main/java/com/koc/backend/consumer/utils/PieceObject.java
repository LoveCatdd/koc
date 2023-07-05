package com.koc.backend.consumer.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PieceObject {
    private String pieceName;
    private Integer direction;
    private Integer idx;
}
