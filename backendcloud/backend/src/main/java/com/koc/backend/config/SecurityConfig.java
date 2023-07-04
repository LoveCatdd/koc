package com.koc.backend.config;
import com.koc.backend.config.filter.JwtAuthenticationTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 *
Spring Boot 安全框架 Spring Security 的SecurityConfig配置

 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
        //密码加密
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
        //处理身份验证
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()//禁用 CSRF (跨站请求伪造) 防护功能。
                //设置会话管理策略为无状态，即不创建会话。
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                //开始配置请求的权限控制
                .authorizeRequests()
                .antMatchers("/user/account/token/", "/user/account/register/").permitAll()
                .antMatchers("/pk/start/game/").hasIpAddress("127.0.0.1")
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                //对于其他所有请求，需要进行身份验证才能访问。
                .anyRequest().authenticated();
        //将自定义的 JWT 认证过滤器添加到 Spring Security 过滤器链中，该过滤器在用户名密码认证过滤器之前执行。
        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/websocket/**");
    }
}
