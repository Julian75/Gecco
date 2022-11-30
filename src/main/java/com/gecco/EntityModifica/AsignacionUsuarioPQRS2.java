package com.gecco.EntityModifica;

public class AsignacionUsuarioPQRS2 {
	
	Long id;
	Long idUsuario;
	Long idArea;
	
	public AsignacionUsuarioPQRS2() {
		super();
	}
	
	public AsignacionUsuarioPQRS2(Long id, Long idUsuario, Long idArea) {
		super();
		this.id = id;
		this.idUsuario = idUsuario;
		this.idArea = idArea;
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

	public Long getIdArea() {
		return idArea;
	}

	public void setIdArea(Long idArea) {
		this.idArea = idArea;
	}
	
}