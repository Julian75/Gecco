package com.gecco.EntityModifica;

public class TipoNovedades2 {
	
	Long id;
	String descripcion;
	String observacion;
	
	public TipoNovedades2() {
		super();
	}
	
	public TipoNovedades2(Long id, String descripcion, String observacion) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.observacion = observacion;
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
	
	public String getObservacion() {
		return observacion;
	}
	
	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}
	
	
}