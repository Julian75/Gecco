package com.gecco.EntityModifica;

public class DetalleSolicitud2 {

	Long id;
	Long idArticulos;
	Long idSolicitud;
	Double valorUnitario;
	Integer cantidad;
	Double valorTotal;
	String observacion;
	Long idEstado;
	
	public DetalleSolicitud2() {
		super();
	}

	public DetalleSolicitud2(Long id, Long idArticulos, Long idSolicitud, Double valorUnitario, Integer cantidad,
			Double valorTotal, String observacion, Long idEstado) {
		super();
		this.id = id;
		this.idArticulos = idArticulos;
		this.idSolicitud = idSolicitud;
		this.valorUnitario = valorUnitario;
		this.cantidad = cantidad;
		this.valorTotal = valorTotal;
		this.observacion = observacion;
		this.idEstado = idEstado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdArticulos() {
		return idArticulos;
	}

	public void setIdArticulos(Long idArticulos) {
		this.idArticulos = idArticulos;
	}

	public Long getIdSolicitud() {
		return idSolicitud;
	}

	public void setIdSolicitud(Long idSolicitud) {
		this.idSolicitud = idSolicitud;
	}

	public Double getValorUnitario() {
		return valorUnitario;
	}

	public void setValorUnitario(Double valorUnitario) {
		this.valorUnitario = valorUnitario;
	}

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	public Double getValorTotal() {
		return valorTotal;
	}

	public void setValorTotal(Double valorTotal) {
		this.valorTotal = valorTotal;
	}

	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}
	
}