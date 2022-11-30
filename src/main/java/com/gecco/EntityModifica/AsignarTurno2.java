package com.gecco.EntityModifica;

import java.sql.Date;

public class AsignarTurno2 {
	
	Long id;
	Long idTurnos;
	Long idEstado;
	Integer idOficina;
	String nombreOficina;
	Integer idSitioVenta;
	Integer porcentaje;
	String nombreSitioVenta;
	
	public AsignarTurno2() {
		super();
	}

	public AsignarTurno2(Long id, Long idTurnos, Long idEstado, Integer idOficina, String nombreOficina,
			Integer idSitioVenta, Integer porcentaje, String nombreSitioVenta) {
		super();
		this.id = id;
		this.idTurnos = idTurnos;
		this.idEstado = idEstado;
		this.idOficina = idOficina;
		this.nombreOficina = nombreOficina;
		this.idSitioVenta = idSitioVenta;
		this.porcentaje = porcentaje;
		this.nombreSitioVenta = nombreSitioVenta;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdTurnos() {
		return idTurnos;
	}

	public void setIdTurnos(Long idTurnos) {
		this.idTurnos = idTurnos;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}

	public Integer getIdOficina() {
		return idOficina;
	}

	public void setIdOficina(Integer idOficina) {
		this.idOficina = idOficina;
	}

	public String getNombreOficina() {
		return nombreOficina;
	}

	public void setNombreOficina(String nombreOficina) {
		this.nombreOficina = nombreOficina;
	}

	public Integer getIdSitioVenta() {
		return idSitioVenta;
	}

	public void setIdSitioVenta(Integer idSitioVenta) {
		this.idSitioVenta = idSitioVenta;
	}

	public Integer getPorcentaje() {
		return porcentaje;
	}

	public void setPorcentaje(Integer porcentaje) {
		this.porcentaje = porcentaje;
	}

	public String getNombreSitioVenta() {
		return nombreSitioVenta;
	}

	public void setNombreSitioVenta(String nombreSitioVenta) {
		this.nombreSitioVenta = nombreSitioVenta;
	}

}
