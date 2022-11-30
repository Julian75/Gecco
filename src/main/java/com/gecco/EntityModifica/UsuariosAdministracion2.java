package com.gecco.EntityModifica;

public class UsuariosAdministracion2 {

	Long id;
	Long idSolicitud;
	Long idUsuario;
	
	public UsuariosAdministracion2() {
		super();
	}

	public UsuariosAdministracion2(Long id, Long idSolicitud, Long idUsuario) {
		super();
		this.id = id;
		this.idSolicitud = idSolicitud;
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

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}
	
}
