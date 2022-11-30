package com.gecco.EntityModifica;

import java.sql.Date;

public class Solicitud2 {
	
	Long id;
	Date fecha;
	Long idUsuario;
	Long idEstado;
	
	public Solicitud2() {
		super();
	}

	public Solicitud2(Long id, Date fecha, Long idUsuario, Long idEstado) {
		super();
		this.id = id;
		this.fecha = fecha;
		this.idUsuario = idUsuario;
		this.idEstado = idEstado;
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

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}
	
}
