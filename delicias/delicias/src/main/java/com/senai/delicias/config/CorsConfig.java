package com.senai.delicias.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig { //Compartilhamento de Recursos entre Origens Diferentes
	@Bean //define um componente que será gerado automaticamente
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*") // Permitir qualquer origem
						.allowedMethods("POST", "GET", "OPTIONS", "PUT", "DELETE", "HEAD"); // Métodos permitidos
			}
		};
	}

}