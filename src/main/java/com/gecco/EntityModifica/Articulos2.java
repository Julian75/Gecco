package com.gecco.EntityModifica;

public class Articulos2 {
	
	Long id;
	String descripcion;
	Long idEstado;
	Long idCategoria;
	
	public Articulos2() {
		super();
	}

	public Articulos2(Long id, String descripcion, Long idEstado, Long idCategoria) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.idEstado = idEstado;
		this.idCategoria = idCategoria;
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

	public Long getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Long idCategoria) {
		this.idCategoria = idCategoria;
	}
	
}