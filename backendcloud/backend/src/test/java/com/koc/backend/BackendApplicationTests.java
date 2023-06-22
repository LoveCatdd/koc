package com.koc.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
class BackendApplicationTests {

    @Test
    void contextLoads() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        //密码密文eg
        System.out.println(passwordEncoder.encode("111111"));
        System.out.println(passwordEncoder.encode("222222"));
        System.out.println(passwordEncoder.encode("333333"));
        System.out.println(passwordEncoder.encode("1111"));

    }

}
