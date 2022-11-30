package com.gecco.EntityModifica;

public class EliminacionTurnVen2 {

	Long id;
	String observacion;
	Long idAsignarTurnoVendedor;
	Long idUsuario;
	String estado;
	
	public EliminacionTurnVen2() {
		super();
	}

	public EliminacionTurnVen2(Long id, String observacion, Long idAsignarTurnoVendedor, Long idUsuario,
			String estado) {
		super();
		this.id = id;
		this.observacion = observacion;
		this.idAsignarTurnoVendedor = idAsignarTurnoVendedor;
		this.idUsuario = idUsuario;
		this.estado = estado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public Long getIdAsignarTurnoVendedor() {
		return idAsignarTurnoVendedor;
	}

	public void setIdAsignarTurnoVendedor(Long idAsignarTurnoVendedor) {
		this.idAsignarTurnoVendedor = idAsignarTurnoVendedor;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
}
