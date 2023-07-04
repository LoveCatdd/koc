package com.koc.backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Manual {
    private Integer id;
    private Integer userid;
    private char piece;
    private Integer x;
    private Integer y;
}
