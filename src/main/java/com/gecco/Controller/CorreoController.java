package com.gecco.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gecco.Entity.Correo;
import com.gecco.Entity.Correo2;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/Correos")
public class CorreoController {
	
	@PostMapping("/EnviarCorreo")
	private void enviarCorreo(@RequestBody Correo2 emailMessage){
		String asunto = emailMessage.getSubject();
		String mensaje = emailMessage.getMessaje();
		String correo = emailMessage.getCorreo();
		String contrasena = emailMessage.getContrasena();
		Correo.enviarCorreo(correo, contrasena, emailMessage.getTo(), asunto, mensaje);
	}
}
