package com.gecco.EntityModifica;

public class AsignacionesProcesos2 {

	Long id;
	Long idUsuario;
	Long idTiposProcesos;
	
	public AsignacionesProcesos2() {
		super();
	}

	public AsignacionesProcesos2(Long id, Long idUsuario, Long idTiposProcesos) {
		super();
		this.id = id;
		this.idUsuario = idUsuario;
		this.idTiposProcesos = idTiposProcesos;
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

	public Long getIdTiposProcesos() {
		return idTiposProcesos;
	}

	public void setIdTiposProcesos(Long idTiposProcesos) {
		this.idTiposProcesos = idTiposProcesos;
	}
	
}
