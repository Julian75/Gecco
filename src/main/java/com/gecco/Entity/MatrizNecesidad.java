package com.gecco.Entity;

import java.io.Serializable;
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
@Table(name = "matrizNecesidad")
public class MatrizNecesidad implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "detalle", length = 500, nullable = false)
	private String detalle;
	
	@Column(name = "fecha", nullable = false)
	private Date fecha;
	
	@Column(name = "cantidad", nullable = false)
	private int cantidad;

	@Column(name = "cantidad_ejecuciones", nullable = false)
	private int cantidadEjecuciones;
	
	@Column(name = "cum_planeacion", nullable = false)
	private int cumPlaneacion;

	@Column(name = "porcentaje_total", nullable = false)
	private double porcentajeTotal;

	@Column(name = "costo_unitario", nullable = false)
	private double costoUnitario;

	@Column(name = "costo_estimado", nullable = false)
	private double costoEstimado;

	@Column(name = "costo_total", nullable = false)
	private double costoTotal;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_sub_proceso", nullable = false)
	private SubProceso idSubProceso;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_tipo_necesidad", nullable = false)
	private TipoNecesidad idTipoNecesidad;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_tipo_activo", nullable = false)
	private TipoActivo idTipoActivo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDetalle() {
		return detalle;
	}

	public void setDetalle(String detalle) {
		this.detalle = detalle;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public int getCantidadEjecuciones() {
		return cantidadEjecuciones;
	}

	public void setCantidadEjecuciones(int cantidadEjecuciones) {
		this.cantidadEjecuciones = cantidadEjecuciones;
	}

	public double getPorcentajeTotal() {
		return porcentajeTotal;
	}

	public void setPorcentajeTotal(double porcentajeTotal) {
		this.porcentajeTotal = porcentajeTotal;
	}

	public double getCostoUnitario() {
		return costoUnitario;
	}

	public void setCostoUnitario(double costoUnitario) {
		this.costoUnitario = costoUnitario;
	}

	public double getCostoEstimado() {
		return costoEstimado;
	}

	public void setCostoEstimado(double costoEstimado) {
		this.costoEstimado = costoEstimado;
	}

	public double getCostoTotal() {
		return costoTotal;
	}

	public void setCostoTotal(double costoTotal) {
		this.costoTotal = costoTotal;
	}

	public SubProceso getIdSubProceso() {
		return idSubProceso;
	}

	public void setIdSubProceso(SubProceso idSubProceso) {
		this.idSubProceso = idSubProceso;
	}

	public TipoNecesidad getIdTipoNecesidad() {
		return idTipoNecesidad;
	}

	public void setIdTipoNecesidad(TipoNecesidad idTipoNecesidad) {
		this.idTipoNecesidad = idTipoNecesidad;
	}

	public TipoActivo getIdTipoActivo() {
		return idTipoActivo;
	}

	public void setIdTipoActivo(TipoActivo idTipoActivo) {
		this.idTipoActivo = idTipoActivo;
	}

	public int getCumPlaneacion() {
		return cumPlaneacion;
	}

	public void setCumPlaneacion(int cumPlaneacion) {
		this.cumPlaneacion = cumPlaneacion;
	}
	
}
