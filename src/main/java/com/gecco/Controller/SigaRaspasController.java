package com.gecco.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.gecco.Entity.SigaRaspas;
import com.gecco.Service.ISigaRaspasService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/SigaRaspas")
public class SigaRaspasController {

	@Autowired ISigaRaspasService service;
	
	@PostMapping("/Guardar")
	@ResponseStatus(code = HttpStatus.CREATED)
	@ResponseBody
	public List<SigaRaspas> saveAll(@RequestBody List<SigaRaspas> sigaRaspa){
		List<SigaRaspas> respuesta = (List<SigaRaspas>)
		service.saveAll(sigaRaspa);
		return respuesta;
	}
//	public SigaRaspas save(@RequestBody SigaRaspas sigaRaspas) {
//		return service.save(sigaRaspas);
//	}
	
	@DeleteMapping("/Eliminar")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete() {
		service.delete();
	}
}
