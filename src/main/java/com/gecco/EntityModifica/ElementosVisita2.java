package com.gecco.EntityModifica;

public class ElementosVisita2 {
	
	Long id;
	String descripcion;
	
	public ElementosVisita2() {
		super();
	}
	
	public ElementosVisita2(Long id, String descripcion) {
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