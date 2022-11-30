package com.gecco.EntityModifica;

import java.sql.Date;

public class Inventario2 {
	Long id;
	Long id_detalle_articulo;
	Long id_usuario;
	Date fecha;
	Integer cantidad;
	Long id_orden_compra;
	
	public Inventario2() {
		super();
	}
	
	public Inventario2(Long id, Long id_detalle_articulo, Long id_usuario, Date fecha, Integer cantidad,
			Long id_orden_compra) {
		super();
		this.id = id;
		this.id_detalle_articulo = id_detalle_articulo;
		this.id_usuario = id_usuario;
		this.fecha = fecha;
		this.cantidad = cantidad;
		this.id_orden_compra = id_orden_compra;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getId_usuario() {
		return id_usuario;
	}
	public void setId_usuario(Long id_usuario) {
		this.id_usuario = id_usuario;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public Integer getCantidad() {
		return cantidad;
	}
	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}
	public Long getId_detalle_articulo() {
		return id_detalle_articulo;
	}
	public void setId_detalle_articulo(Long id_detalle_articulo) {
		this.id_detalle_articulo = id_detalle_articulo;
	}

	public Long getId_orden_compra() {
		return id_orden_compra;
	}

	public void setId_orden_compra(Long id_orden_compra) {
		this.id_orden_compra = id_orden_compra;
	}
	
}
