package com.gecco.EntityModifica;

public class Compras2 {
	Long id;
	Long id_articulo;
	Long id_usuario;
	Integer cantidad;
	Long id_orden_compra;
	
	public Compras2() {
		super();
	}
	
	public Compras2(Long id, Long id_articulo, Long id_usuario, Integer cantidad, Long id_orden_compra) {
		super();
		this.id = id;
		this.id_articulo = id_articulo;
		this.id_usuario = id_usuario;
		this.cantidad = cantidad;
		this.id_orden_compra = id_orden_compra;
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
	public Long getId_usuario() {
		return id_usuario;
	}
	public void setId_usuario(Long id_usuario) {
		this.id_usuario = id_usuario;
	}
	public Integer getCantidad() {
		return cantidad;
	}
	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	public Long getId_orden_compra() {
		return id_orden_compra;
	}

	public void setId_orden_compra(Long id_orden_compra) {
		this.id_orden_compra = id_orden_compra;
	}
	
}
