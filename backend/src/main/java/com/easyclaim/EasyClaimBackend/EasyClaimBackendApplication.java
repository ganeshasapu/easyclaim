package com.easyclaim.EasyClaimBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@Configuration
public class EasyClaimBackendApplication {


	public static void main(String[] args) {
		SpringApplication.run(EasyClaimBackendApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").
						allowedOrigins(
								"http://localhost:8080",
								"http://localhost:3000",
								"https://easyclaimapp.greenmushroom-db534783.eastus.azurecontainerapps.io"
						).allowedMethods("GET", "POST", "PUT", "DELETE")
						.allowedHeaders("*")
						.allowCredentials(true);

			}
		};
	}

}
