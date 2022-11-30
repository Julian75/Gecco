package com.gecco.EntityModifica;

import java.sql.Date;

public class HistorialArticulo2 {
	
	Long id;
	Long idDetalleArticulo;
	Date fecha;
	String observacion;
	Long idUsuario;
	
	public HistorialArticulo2() {
		super();
	}

	public HistorialArticulo2(Long id, Long idDetalleArticulo, Date fecha, String observacion, Long idUsuario) {
		super();
		this.id = id;
		this.idDetalleArticulo = idDetalleArticulo;
		this.fecha = fecha;
		this.observacion = observacion;
		this.idUsuario = idUsuario;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Long getIdDetalleArticulo() {
		return idDetalleArticulo;
	}

	public void setIdDetalleArticulo(Long idDetalleArticulo) {
		this.idDetalleArticulo = idDetalleArticulo;
	}
	
}
