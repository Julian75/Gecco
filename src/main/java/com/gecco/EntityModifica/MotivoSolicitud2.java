package com.gecco.EntityModifica;

public class MotivoSolicitud2 {
	
	Long id;
	String descripcion;
	Long idArea;
	
	public MotivoSolicitud2() {
		super();
	}
	
	public MotivoSolicitud2(Long id, String descripcion, Long idArea) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.idArea = idArea;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getDescripcion() {
		return descripcion;
	}
	
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Long getIdArea() {
		return idArea;
	}

	public void setIdArea(Long idArea) {
		this.idArea = idArea;
	}
	
}