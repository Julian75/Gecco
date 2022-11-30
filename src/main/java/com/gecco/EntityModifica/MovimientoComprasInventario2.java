package com.gecco.EntityModifica;

public class MovimientoComprasInventario2 {
	Long id;
	Long id_articulo;
	Integer cantidad;
	Long idOrdenCompra;
	
	public MovimientoComprasInventario2() {
		super();
	}
	
	public MovimientoComprasInventario2(Long id, Long id_articulo, Integer cantidad, Long idOrdenCompra) {
		super();
		this.id = id;
		this.id_articulo = id_articulo;
		this.cantidad = cantidad;
		this.idOrdenCompra = idOrdenCompra;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getId_articulo() {
		return id_articulo;
	}
	public void setId_articulo(Long id_articulo) {
		this.id_articulo = id_articulo;
	}
	public Integer getCantidad() {
		return cantidad;
	}
	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	public Long getIdOrdenCompra() {
		return idOrdenCompra;
	}

	public void setIdOrdenCompra(Long idOrdenCompra) {
		this.idOrdenCompra = idOrdenCompra;
	}
	
}
