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
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("req:" + req.getRequestURL().toString());
        String token = CookieUtil.getValue(req, JwtConstant.JWT_COOKIE_NAME);

        Map<String, String> map = new HashMap<String, String>();

        Enumeration headerNames = req.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = (String) headerNames.nextElement();
            String value = req.getHeader(key);
            map.put(key, value);
        }

        System.out.println("Headers: " + map);

        System.out.println("Filter: "+token);
        if (token!=null) {
            String userName = JwtUtil.getSubjectFromJwt(token);
            System.out.println(userName);
            Claims claims = JwtUtil.getClaimsFromJwt(token);
            if(claims!=null){
                if (userName!=null) {
                    filterChain.doFilter(req, res);
                } else {
                    String authLoginUrl = getFilterConfig().getInitParameter("loginUrl");
                    res.sendRedirect(authLoginUrl + "?redirect=" + req.getRequestURL());
                }
            }

        } else {
            String authLoginUrl = getFilterConfig().getInitParameter("loginUrl");
            res.sendRedirect(authLoginUrl + "?redirect=" + req.getRequestURL());
        }
    }

}