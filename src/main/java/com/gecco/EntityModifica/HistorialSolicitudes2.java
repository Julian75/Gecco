package com.gecco.EntityModifica;

public class HistorialSolicitudes2 {
	
	Long id;
	String observacion;
	Long idUsuario;
	Long idSolicitudSC;
	Long idEstado;
	
	public HistorialSolicitudes2() {
		super();
	}

	public HistorialSolicitudes2(Long id, String observacion, Long idUsuario, Long idSolicitudSC, Long idEstado) {
		super();
		this.id = id;
		this.observacion = observacion;
		this.idUsuario = idUsuario;
		this.idSolicitudSC = idSolicitudSC;
		this.idEstado = idEstado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Long getIdSolicitudSC() {
		return idSolicitudSC;
	}

	public void setIdSolicitudSC(Long idSolicitudSC) {
		this.idSolicitudSC = idSolicitudSC;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}

}
