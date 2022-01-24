package com.example.server.config;



import com.example.server.security.filter.AdminFilter;
import com.example.server.security.filter.JwtFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;

@Configuration
public class JwtConfig {
    @Value("http://localhost:4200/hr")
    private String loginUrl;

//    @Value("http://localhost:8081/hr")
//    private String mainPage;

    @Bean
    public FilterRegistrationBean<JwtFilter> jwtFilter() {
        final FilterRegistrationBean<JwtFilter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
        filterFilterRegistrationBean.setFilter(new JwtFilter());
        filterFilterRegistrationBean.setInitParameters(Collections.singletonMap("loginUrl", loginUrl));
        filterFilterRegistrationBean.addUrlPatterns("/**");
        filterFilterRegistrationBean.setOrder(1);
        return filterFilterRegistrationBean;
    }

//    @Bean
//    public FilterRegistrationBean<AdminFilter> adminFilter(){
//        final FilterRegistrationBean<AdminFilter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
//        filterFilterRegistrationBean.setFilter(new AdminFilter());
//        filterFilterRegistrationBean.setInitParameters(Collections.singletonMap("loginUrl", loginUrl));
//        filterFilterRegistrationBean.addUrlPatterns("/hr/**");
//        filterFilterRegistrationBean.setOrder(2);
//        return filterFilterRegistrationBean;
//    }
}
