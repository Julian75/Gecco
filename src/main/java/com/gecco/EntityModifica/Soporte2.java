package com.gecco.EntityModifica;

public class Soporte2 {
	Long id;
	String Descripcion;
	Long idUsuario;
	Long id_solicitud_sc;
	Long idHistorial;
	
	
	public Soporte2() {
		super();
	}

	
	public Soporte2(Long id, String descripcion, Long idUsuario, Long id_solicitud_sc, Long idHistorial) {
		super();
		this.id = id;
		Descripcion = descripcion;
		this.idUsuario = idUsuario;
		this.id_solicitud_sc = id_solicitud_sc;
		this.idHistorial = idHistorial;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescripcion() {
		return Descripcion;
	}

	public void setDescripcion(String descripcion) {
		Descripcion = descripcion;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	
	public Long getId_solicitud_sc() {
		return id_solicitud_sc;
	}


	public void setId_solicitud_sc(Long id_solicitud_sc) {
		this.id_solicitud_sc = id_solicitud_sc;
	}


	public Long getIdHistorial() {
		return idHistorial;
	}

	public void setIdHistorial(Long idHistorial) {
		this.idHistorial = idHistorial;
	}
	
	
	
}