package com.gecco.EntityModifica;

public class Proceso2 {
	
	Long id;
	Long idCategoria;
	Long idUsuario;
	
	public Proceso2() {
		super();
	}
	
	public Proceso2(Long id, Long idCategoria, Long idUsuario) {
		super();
		this.id = id;
		this.idCategoria = idCategoria;
		this.idUsuario = idUsuario;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(Long idCategoria) {
		this.idCategoria = idCategoria;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}
	
}