package com.example.server.security.filter;


import com.example.server.constant.JwtConstant;
import com.example.server.security.CookieUtil;
import com.example.server.security.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AdminFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException {
        String token = CookieUtil.getValue(req, JwtConstant.JWT_COOKIE_NAME);
        String path = req.getRequestURI();
        Claims claims = JwtUtil.getClaimsFromJwt(token);
        Integer role = Integer.valueOf((Integer) claims.get("isHr"));
        if (role == 1) {
            filterChain.doFilter(req, res);
        } else {
            String authLoginUrl = getFilterConfig().getInitParameter("loginUrl");
            res.sendRedirect(authLoginUrl + "?redirect=" + req.getRequestURL());
        }
    }

}