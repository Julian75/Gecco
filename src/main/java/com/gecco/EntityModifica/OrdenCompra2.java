package com.gecco.EntityModifica;

public class OrdenCompra2 {
	
	Long id;
	Double anticipoPorcentaje;
	Double valorAnticipo;
	Double subtotal;
	Double descuento;
	Long idSolicitud;
	Long idProveedor;
	Long idEstado;
	Long idUsuario;
	
	public OrdenCompra2() {
		super();
	}

	public OrdenCompra2(Long id, Double anticipoPorcentaje, Double valorAnticipo, Double subtotal, Double descuento,
			Long idSolicitud, Long idProveedor, Long idEstado, Long idUsuario) {
		super();
		this.id = id;
		this.anticipoPorcentaje = anticipoPorcentaje;
		this.valorAnticipo = valorAnticipo;
		this.subtotal = subtotal;
		this.descuento = descuento;
		this.idSolicitud = idSolicitud;
		this.idProveedor = idProveedor;
		this.idEstado = idEstado;
		this.idUsuario = idUsuario;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getAnticipoPorcentaje() {
		return anticipoPorcentaje;
	}

	public void setAnticipoPorcentaje(Double anticipoPorcentaje) {
		this.anticipoPorcentaje = anticipoPorcentaje;
	}

	public Double getValorAnticipo() {
		return valorAnticipo;
	}

	public void setValorAnticipo(Double valorAnticipo) {
		this.valorAnticipo = valorAnticipo;
	}

	public Double getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(Double subtotal) {
		this.subtotal = subtotal;
	}

	public Double getDescuento() {
		return descuento;
	}

	public void setDescuento(Double descuento) {
		this.descuento = descuento;
	}

	public Long getIdSolicitud() {
		return idSolicitud;
	}

	public void setIdSolicitud(Long idSolicitud) {
		this.idSolicitud = idSolicitud;
	}

	public Long getIdProveedor() {
		return idProveedor;
	}

	public void setIdProveedor(Long idProveedor) {
		this.idProveedor = idProveedor;
	}

	public Long getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Long idEstado) {
		this.idEstado = idEstado;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}
	
}