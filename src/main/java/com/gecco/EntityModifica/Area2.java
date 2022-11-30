package com.gecco.EntityModifica;

public class Area2 {
	
	Long id;
	String descripcion;
	
	public Area2() {
		super();
	}

	public Area2(Long id, String descripcion) {
		super();
		this.id = id;
		this.descripcion = descripcion;
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
	
}
