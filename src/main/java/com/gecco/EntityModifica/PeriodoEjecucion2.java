package com.gecco.EntityModifica;

public class PeriodoEjecucion2 {
	
	Long id;
	String descripcion;
	int cantidad;
	
	public PeriodoEjecucion2() {
		super();
	}

	public PeriodoEjecucion2(Long id, String descripcion, int cantidad) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.cantidad = cantidad;
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

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
	
}
