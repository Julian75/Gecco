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

import com.gecco.Entity.TurnoVendedorDTO;
import com.gecco.Service.ITurnoVendedorService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/TurnoVendedorDTO")
public class TurnoVendedorController {

	@Autowired ITurnoVendedorService vendedorService;

	@GetMapping("/Obtener")
	public ResponseEntity<List<TurnoVendedorDTO>> getAllDatos(@RequestParam(required = false) Integer idVendedor) {
	    try {
	      List<TurnoVendedorDTO> datos = new ArrayList<TurnoVendedorDTO>();
	      if (idVendedor == null)
	    	  vendedorService.findAll().forEach(datos::add);
	      else
	    	  vendedorService.findByIdes(idVendedor).forEach(datos::add);
	      if (datos.isEmpty()) {
	        return new ResponseEntity<>(datos, HttpStatus.OK);
	      }
	      return new ResponseEntity<>(datos, HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	 }
}
