package com.gecco.EntityModifica;

import java.sql.Date;

public class AsignarTurnoVendedor2 {
	
	String estado;
	Date fechaFinal;
	Date fechaInicio;
	Long id;
	Integer idOficina;
	Integer idSitioVenta;
	Long idTurno;
	Integer idVendedor;
	Integer ideSubzona;
	String nombreOficina;
	String nombreSitioVenta;
	String nombreVendedor;
	
	public AsignarTurnoVendedor2() {
		super();
	}

	public AsignarTurnoVendedor2(String estado, Date fechaFinal, Date fechaInicio, Long id, Integer idOficina,
			Integer idSitioVenta, Long idTurno, Integer idVendedor, Integer ideSubzona, String nombreOficina,
			String nombreSitioVenta, String nombreVendedor) {
		super();
		this.estado = estado;
		this.fechaFinal = fechaFinal;
		this.fechaInicio = fechaInicio;
		this.id = id;
		this.idOficina = idOficina;
		this.idSitioVenta = idSitioVenta;
		this.idTurno = idTurno;
		this.idVendedor = idVendedor;
		this.ideSubzona = ideSubzona;
		this.nombreOficina = nombreOficina;
		this.nombreSitioVenta = nombreSitioVenta;
		this.nombreVendedor = nombreVendedor;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Date getFechaFinal() {
		return fechaFinal;
	}

	public void setFechaFinal(Date fechaFinal) {
		this.fechaFinal = fechaFinal;
	}

	public Date getFechaInicio() {
		return fechaInicio;
	}

	public void setFechaInicio(Date fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Long getIdTurno() {
		return idTurno;
	}

	public void setIdTurno(Long idTurno) {
		this.idTurno = idTurno;
	}

	public Integer getIdVendedor() {
		return idVendedor;
	}

	public void setIdVendedor(Integer idVendedor) {
		this.idVendedor = idVendedor;
	}

	public Integer getIdeSubzona() {
		return ideSubzona;
	}

	public void setIdeSubzona(Integer ideSubzona) {
		this.ideSubzona = ideSubzona;
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

	public String getNombreVendedor() {
		return nombreVendedor;
	}

	public void setNombreVendedor(String nombreVendedor) {
		this.nombreVendedor = nombreVendedor;
	}
	
}
