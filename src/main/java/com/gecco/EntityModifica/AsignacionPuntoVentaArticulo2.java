package com.gecco.EntityModifica;

import javax.persistence.Column;

public class AsignacionPuntoVentaArticulo2 {

	Long id;
	Long idAsignacionesArticulos;
	Integer idOficina;
	Integer idSitioVenta;
	Integer cantidad;
	String nombreOficina;
	String nombreSitioVenta;
	
	public AsignacionPuntoVentaArticulo2() {
		super();
	}

	public AsignacionPuntoVentaArticulo2(Long id, Long idAsignacionesArticulos, Integer idOficina, Integer idSitioVenta,
			Integer cantidad, String nombreOficina, String nombreSitioVenta) {
		super();
		this.id = id;
		this.idAsignacionesArticulos = idAsignacionesArticulos;
		this.idOficina = idOficina;
		this.idSitioVenta = idSitioVenta;
		this.cantidad = cantidad;
		this.nombreOficina = nombreOficina;
		this.nombreSitioVenta = nombreSitioVenta;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdAsignacionesArticulos() {
		return idAsignacionesArticulos;
	}

	public void setIdAsignacionesArticulos(Long idAsignacionesArticulos) {
		this.idAsignacionesArticulos = idAsignacionesArticulos;
	}

	public Integer getIdOficina() {
		return idOficina;
	}

	public void setIdOficina(Integer idOficina) {
		this.idOficina = idOficina;
	}

	public Integer getIdSitioVenta() {
		return idSitioVenta;
	}

	public void setIdSitioVenta(Integer idSitioVenta) {
		this.idSitioVenta = idSitioVenta;
	}

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	public String getNombreOficina() {
		return nombreOficina;
	}

	public void setNombreOficina(String nombreOficina) {
		this.nombreOficina = nombreOficina;
	}

	public String getNombreSitioVenta() {
		return nombreSitioVenta;
	}

	public void setNombreSitioVenta(String nombreSitioVenta) {
		this.nombreSitioVenta = nombreSitioVenta;
	}
	
}