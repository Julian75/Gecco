package com.gecco.ServiceImplement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.gecco.Entity.NovedadesConsultaDTO;
import com.gecco.Service.INovedadConsultaService;

@Repository
public class NovedadesConsultaServiceImplement implements INovedadConsultaService{

	private String consulta = "SELECT * FROM Novedades";
	
	@Autowired
	private NamedParameterJdbcTemplate jdbcTemplate;
	
	@Override
	public List<NovedadesConsultaDTO> findAll() {
		List<NovedadesConsultaDTO> lista = new ArrayList<NovedadesConsultaDTO>();
		try {
			lista = jdbcTemplate.query(consulta, BeanPropertyRowMapper.newInstance(NovedadesConsultaDTO.class));
			lista.stream().forEach(System.out::println);
			return lista;
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return lista;
	}
	
	@Override
	public List<NovedadesConsultaDTO> findByIdes(String fecha) {
		List<NovedadesConsultaDTO> lista = new ArrayList<NovedadesConsultaDTO>();
		try {
			String consultaId = "SELECT * FROM Novedades WHERE FECHA BETWEEN "+fecha+" AND "+fecha;
			lista = jdbcTemplate.query(consultaId, BeanPropertyRowMapper.newInstance(NovedadesConsultaDTO.class));
			lista.stream().forEach(System.out::println);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return lista;
	}
	
}
