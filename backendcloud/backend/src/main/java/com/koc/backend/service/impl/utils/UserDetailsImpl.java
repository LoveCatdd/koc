package com.koc.backend.service.impl.utils;

import com.koc.backend.pojo.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collection;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsImpl implements UserDetails {

    private User user;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }
    //账号是否过期
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    //账号是否锁定
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    //密码是否过期
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    //用户是否可用
    @Override
    public boolean isEnabled() {
        return true;
    }
}
