package com.gecco.EntityModifica;

public class Rol2 {
	
	Long id;
	String descripcion;
	Long idEstado;
	Long idJerarquia;
	
	public Rol2() {
		super();
	}
	
	public Rol2(Long id, String descripcion, Long idEstado, Long idJerarquia) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.idEstado = idEstado;
		this.idJerarquia = idJerarquia;
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
	
	public Long getIdEstado() {
		return idEstado;
	}
	
	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}
	
	public Long getIdJerarquia() {
		return idJerarquia;
	}
	
	public void setIdJerarquia(Long idJerarquia) {
		this.idJerarquia = idJerarquia;
	}
	
	
}	