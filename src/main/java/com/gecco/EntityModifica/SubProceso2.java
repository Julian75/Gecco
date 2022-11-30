package com.gecco.EntityModifica;

public class SubProceso2 {

	Long id;
	String descripcion;
	Long idTipoProceso;
	Long idEstado;
	
	public SubProceso2() {
		super();
	}

	public SubProceso2(Long id, String descripcion, Long idTipoProceso, Long idEstado) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.idTipoProceso = idTipoProceso;
		this.idEstado = idEstado;
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

	public Long getIdTipoProceso() {
		return idTipoProceso;
	}

	public void setIdTipoProceso(Long idTipoProceso) {
		this.idTipoProceso = idTipoProceso;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}

	
	
}
