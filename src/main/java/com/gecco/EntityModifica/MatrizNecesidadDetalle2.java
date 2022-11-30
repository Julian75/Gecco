package com.gecco.EntityModifica;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.gecco.Entity.MatrizNecesidad;

public class MatrizNecesidadDetalle2 {
	
	Long id;
	Date fecha;
	String fecha_ejecutada;
	Double porcentaje;
	Integer cantidad_ejecuciones;
	Integer cantidad_ejecuciones_cumplidas;
	Integer cantidad_estimada;
	Integer cantidad_comprada;
	Integer id_orden_compra;
	Double costo_ejecucion_comprada;
	Long id_matriz_necesidad;
	Long id_estado;
	String descripcion;
	
	public MatrizNecesidadDetalle2() {
		super();
	}

	public MatrizNecesidadDetalle2(Long id, Date fecha, String fecha_ejecutada, Double porcentaje,
			Integer cantidad_ejecuciones, Integer cantidad_ejecuciones_cumplidas, Integer cantidad_estimada,
			Integer cantidad_comprada, Integer id_orden_compra, Double costo_ejecucion_comprada,
			Long id_matriz_necesidad, Long id_estado, String descripcion) {
		super();
		this.id = id;
		this.fecha = fecha;
		this.fecha_ejecutada = fecha_ejecutada;
		this.porcentaje = porcentaje;
		this.cantidad_ejecuciones = cantidad_ejecuciones;
		this.cantidad_ejecuciones_cumplidas = cantidad_ejecuciones_cumplidas;
		this.cantidad_estimada = cantidad_estimada;
		this.cantidad_comprada = cantidad_comprada;
		this.id_orden_compra = id_orden_compra;
		this.costo_ejecucion_comprada = costo_ejecucion_comprada;
		this.id_matriz_necesidad = id_matriz_necesidad;
		this.id_estado = id_estado;
		this.descripcion = descripcion;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Double getPorcentaje() {
		return porcentaje;
	}

	public void setPorcentaje(Double porcentaje) {
		this.porcentaje = porcentaje;
	}

	public Integer getCantidad_ejecuciones() {
		return cantidad_ejecuciones;
	}

	public void setCantidad_ejecuciones(Integer cantidad_ejecuciones) {
		this.cantidad_ejecuciones = cantidad_ejecuciones;
	}

	public Integer getCantidad_ejecuciones_cumplidas() {
		return cantidad_ejecuciones_cumplidas;
	}

	public void setCantidad_ejecuciones_cumplidas(Integer cantidad_ejecuciones_cumplidas) {
		this.cantidad_ejecuciones_cumplidas = cantidad_ejecuciones_cumplidas;
	}

	public Integer getCantidad_estimada() {
		return cantidad_estimada;
	}

	public void setCantidad_estimada(Integer cantidad_estimada) {
		this.cantidad_estimada = cantidad_estimada;
	}

	public Integer getCantidad_comprada() {
		return cantidad_comprada;
	}

	public void setCantidad_comprada(Integer cantidad_comprada) {
		this.cantidad_comprada = cantidad_comprada;
	}

	public Double getCosto_ejecucion_comprada() {
		return costo_ejecucion_comprada;
	}

	public void setCosto_ejecucion_comprada(Double costo_ejecucion_comprada) {
		this.costo_ejecucion_comprada = costo_ejecucion_comprada;
	}

	public Long getId_matriz_necesidad() {
		return id_matriz_necesidad;
	}

	public void setId_matriz_necesidad(Long id_matriz_necesidad) {
		this.id_matriz_necesidad = id_matriz_necesidad;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Integer getId_orden_compra() {
		return id_orden_compra;
	}

	public void setId_orden_compra(Integer id_orden_compra) {
		this.id_orden_compra = id_orden_compra;
	}

	public Long getId_estado() {
		return id_estado;
	}

	public void setId_estado(Long id_estado) {
		this.id_estado = id_estado;
	}

	public String getFecha_ejecutada() {
		return fecha_ejecutada;
	}

	public void setFecha_ejecutada(String fecha_ejecutada) {
		this.fecha_ejecutada = fecha_ejecutada;
	}

}
