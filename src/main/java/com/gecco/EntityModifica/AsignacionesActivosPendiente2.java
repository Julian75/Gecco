package com.gecco.EntityModifica;

public class AsignacionesActivosPendiente2 {
	
	Long id;
	Long idUsuario;
	Long idUsuarioAsignacionPendiente;
	Long idDetalleActivo;
	
	public AsignacionesActivosPendiente2() {
		super();
	}

	public AsignacionesActivosPendiente2(Long id, Long idUsuario, Long idUsuarioAsignacionPendiente,
			Long idDetalleActivo) {
		super();
		this.id = id;
		this.idUsuario = idUsuario;
		this.idUsuarioAsignacionPendiente = idUsuarioAsignacionPendiente;
		this.idDetalleActivo = idDetalleActivo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Long getIdUsuarioAsignacionPendiente() {
		return idUsuarioAsignacionPendiente;
	}

	public void setIdUsuarioAsignacionPendiente(Long idUsuarioAsignacionPendiente) {
		this.idUsuarioAsignacionPendiente = idUsuarioAsignacionPendiente;
	}

	public Long getIdDetalleActivo() {
		return idDetalleActivo;
	}

	public void setIdDetalleActivo(Long idDetalleActivo) {
		this.idDetalleActivo = idDetalleActivo;
	}

}
