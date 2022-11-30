package com.gecco.Entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "MatrizNecesidadDetalle")
public class MatrizNecesidadDetalle {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "descripcion", columnDefinition = "LONGTEXT", nullable = false)
	private String descripcion;
	
	@Column(name = "fecha", nullable = false)
	private Date fecha;
	
	@Column(name = "fecha_ejecutada", nullable = false)
	private String fechaEjecutada;
	
	@Column(name = "porcentaje", nullable = false)
	private Double porcentaje;
	
	@Column(name = "cantidad_ejecuciones", nullable = false)
	private int cantidadEjecuciones;
	
	@Column(name = "cantidad_ejecuciones_cumplidas", nullable = false)
	private int cantidadEjecucionesCumplidas;
	
	@Column(name = "cantidad_estimada", nullable = false)
	private int cantidadEstimada;
	
	@Column(name = "cantidad_comprada", nullable = false)
	private int cantidadComprada;
	
	@Column(name = "costo_ejecucion_comprada", nullable = false)
	private Double costoEjecucionComprada;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_matriz_necesidad", nullable = false)
	private MatrizNecesidad idMatrizNecesidad;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_estado", nullable = false)
	private Estado idEstado;
	
	@Column(name = "id_orden_compra", nullable = false)
	private int idOrdenCompra;

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

	public int getCantidadEjecuciones() {
		return cantidadEjecuciones;
	}

	public void setCantidadEjecuciones(int cantidadEjecuciones) {
		this.cantidadEjecuciones = cantidadEjecuciones;
	}

	public int getCantidadEstimada() {
		return cantidadEstimada;
	}

	public void setCantidadEstimada(int cantidadEstimada) {
		this.cantidadEstimada = cantidadEstimada;
	}

	public int getCantidadComprada() {
		return cantidadComprada;
	}

	public void setCantidadComprada(int cantidadComprada) {
		this.cantidadComprada = cantidadComprada;
	}

	public Double getCostoEjecucionComprada() {
		return costoEjecucionComprada;
	}

	public void setCostoEjecucionComprada(Double costoEjecucionComprada) {
		this.costoEjecucionComprada = costoEjecucionComprada;
	}

	public MatrizNecesidad getIdMatrizNecesidad() {
		return idMatrizNecesidad;
	}

	public void setIdMatrizNecesidad(MatrizNecesidad idMatrizNecesidad) {
		this.idMatrizNecesidad = idMatrizNecesidad;
	}

	public int getCantidadEjecucionesCumplidas() {
		return cantidadEjecucionesCumplidas;
	}

	public void setCantidadEjecucionesCumplidas(int cantidadEjecucionesCumplidas) {
		this.cantidadEjecucionesCumplidas = cantidadEjecucionesCumplidas;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public int getIdOrdenCompra() {
		return idOrdenCompra;
	}

	public void setIdOrdenCompra(int idOrdenCompra) {
		this.idOrdenCompra = idOrdenCompra;
	}

	public Estado getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Estado idEstado) {
		this.idEstado = idEstado;
	}

	public String getFechaEjecutada() {
		return fechaEjecutada;
	}

	public void setFechaEjecutada(String fechaEjecutada) {
		this.fechaEjecutada = fechaEjecutada;
	}
	
}
