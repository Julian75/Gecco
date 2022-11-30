package com.gecco.EntityModifica;

public class Cotizacion2 {

	Long id;
	Long idSolicitud;
	Long idEstado;
	Long idUsuario;
	
	public Cotizacion2() {
		super();
	}

	public Cotizacion2(Long id, Long idSolicitud, Long idEstado, Long idUsuario) {
		super();
		this.id = id;
		this.idSolicitud = idSolicitud;
		this.idEstado = idEstado;
		this.idUsuario = idUsuario;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdSolicitud() {
		return idSolicitud;
	}

	public void setIdSolicitud(Long idSolicitud) {
		this.idSolicitud = idSolicitud;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}
	
}