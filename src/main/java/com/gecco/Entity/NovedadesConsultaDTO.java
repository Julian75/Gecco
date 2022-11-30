package com.gecco.Entity;

import java.sql.Date;

public class NovedadesConsultaDTO {

	Integer id;
	String observacion;
	String tipo_malla;
	Date fecha;
	Integer id_asignar_turno_vendedor;
	Integer id_tipo_novedad;
	Integer id_usuario;
	
	public NovedadesConsultaDTO() {
	}

	public NovedadesConsultaDTO(Integer id, String observacion, Date fecha, Integer id_asignar_turno_vendedor,
			Integer id_tipo_novedad, Integer id_usuario, String tipo_malla) {
		super();
		this.id = id;
		this.observacion = observacion;
		this.fecha = fecha;
		this.id_asignar_turno_vendedor = id_asignar_turno_vendedor;
		this.id_tipo_novedad = id_tipo_novedad;
		this.id_usuario = id_usuario;
		this.tipo_malla = tipo_malla;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Integer getId_asignar_turno_vendedor() {
		return id_asignar_turno_vendedor;
	}

	public void setId_asignar_turno_vendedor(Integer id_asignar_turno_vendedor) {
		this.id_asignar_turno_vendedor = id_asignar_turno_vendedor;
	}

	public Integer getId_tipo_novedad() {
		return id_tipo_novedad;
	}

	public void setId_tipo_novedad(Integer id_tipo_novedad) {
		this.id_tipo_novedad = id_tipo_novedad;
	}

	public Integer getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(Integer id_usuario) {
		this.id_usuario = id_usuario;
	}

	public String getTipo_malla() {
		return tipo_malla;
	}

	public void setTipo_malla(String tipo_malla) {
		this.tipo_malla = tipo_malla;
	}
	
	
	
	
}
