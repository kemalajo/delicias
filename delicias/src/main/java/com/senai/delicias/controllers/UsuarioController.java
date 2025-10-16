package com.senai.delicias.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UsuarioController {

	    @GetMapping("/")
	    public String home() {
	        // redireciona para o arquivo index.html que está dentro de /static
	        return "redirect:/index.html";
	    }
	}