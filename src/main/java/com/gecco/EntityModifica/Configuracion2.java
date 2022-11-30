package com.gecco.EntityModifica;

public class Configuracion2 {
	
	Long id;
	String descripcion;
	String nombre;
	String valor;
	
	public Configuracion2() {
		super();
	}
	
	public Configuracion2(Long id, String descripcion, String nombre, String valor) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.nombre = nombre;
		this.valor = valor;
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
	
	public String getNombre() {
		return nombre;
	}
	
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public String getValor() {
		return valor;
	}
	
	public void setValor(String valor) {
		this.valor = valor;
	}
	
	
}