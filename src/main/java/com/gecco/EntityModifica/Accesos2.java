package com.gecco.EntityModifica;

public class Accesos2 {

	Long id;
	Long idRol;
	Long idModulo;
	
	public Accesos2() {
		super();
	}

	public Accesos2(Long id, Long idRol, Long idModulo) {
		super();
		this.id = id;
		this.idRol = idRol;
		this.idModulo = idModulo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdRol() {
		return idRol;
	}

	public void setIdRol(Long idRol) {
		this.idRol = idRol;
	}

	public Long getIdModulo() {
		return idModulo;
	}

	public void setIdModulo(Long idModulo) {
		this.idModulo = idModulo;
	}

}
