package com.gecco.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gecco.Entity.NovedadesConsultaDTO;
import com.gecco.Service.INovedadConsultaService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/NovedadesConsulta")
public class NovedadesConsultaController {

	@Autowired INovedadConsultaService novedadesService;

	@GetMapping("/Obtener")
	public ResponseEntity<List<NovedadesConsultaDTO>> getAllDatos(@RequestParam(required = false) String fecha) {
	    try {
	      List<NovedadesConsultaDTO> datos = new ArrayList<NovedadesConsultaDTO>();
	      if (fecha == null)
	    	  novedadesService.findAll().forEach(datos::add);
	      else
	    	  novedadesService.findByIdes(fecha).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
}
