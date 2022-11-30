package com.gecco.Service;

import java.util.List;

import com.gecco.Entity.NovedadesConsultaDTO;

public interface INovedadConsultaService {

	List<NovedadesConsultaDTO> findAll();
	List<NovedadesConsultaDTO> findByIdes(String fecha);
}
