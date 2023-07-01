package com.koc.backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Record {

    private Integer id;
    private Integer aId;
    private Integer bId;
    private Integer aDirection;
    private Integer bDirection;
    private String moveRecord;


}
