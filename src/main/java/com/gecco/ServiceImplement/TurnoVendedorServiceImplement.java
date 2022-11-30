package com.gecco.ServiceImplement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.gecco.Entity.TurnoVendedorDTO;
import com.gecco.Service.ITurnoVendedorService;

@Repository
public class TurnoVendedorServiceImplement implements ITurnoVendedorService{

	private String consulta = "SELECT * FROM asignar_turno_vendedor";
	
	@Autowired
	private NamedParameterJdbcTemplate jdbcTemplate;
	
	@Override
	public List<TurnoVendedorDTO> findAll() {
		List<TurnoVendedorDTO> lista = new ArrayList<TurnoVendedorDTO>();
		try {
			lista = jdbcTemplate.query(consulta, BeanPropertyRowMapper.newInstance(TurnoVendedorDTO.class));
			lista.stream().forEach(System.out::println);
			return lista;
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return lista;
	}
	
	@Override
	public List<TurnoVendedorDTO> findByIdes(Integer idVendedor) {
		List<TurnoVendedorDTO> lista = new ArrayList<TurnoVendedorDTO>();
		try {
			String consultaId = "SELECT * FROM asignar_turno_vendedor WHERE id_vendedor ="+idVendedor;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(TurnoVendedorDTO.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
}
