package com.gecco.EntityModifica;

import java.sql.Date;

public class MatrizNecesidadConsultaCierre {
	
	Long id;
	String detalle;
	Date fecha;
	int cantidad;
	int cantidadEjecuciones;
	double porcentajeTotal;
	double costoUnitario;
	double costoEstimado;
	double costoTotal;
	Long idSubProceso;
	Long idTipoNecesidad;
	Long idTipoActivo;
	Integer cumPlaneacion;
	String subProceso;
	String tipoProceso;
	String TipoNecesidad;
	
	public MatrizNecesidadConsultaCierre() {
		super();
	}

	public MatrizNecesidadConsultaCierre(Long id, String detalle, Date fecha, int cantidad, int cantidadEjecuciones,
			double porcentajeTotal, double costoUnitario, double costoEstimado, double costoTotal, Long idSubProceso,
			Long idTipoNecesidad, Long idTipoActivo, Integer cumPlaneacion, String subProceso, String tipoProceso,
			String tipoNecesidad) {
		super();
		this.id = id;
		this.detalle = detalle;
		this.fecha = fecha;
		this.cantidad = cantidad;
		this.cantidadEjecuciones = cantidadEjecuciones;
		this.porcentajeTotal = porcentajeTotal;
		this.costoUnitario = costoUnitario;
		this.costoEstimado = costoEstimado;
		this.costoTotal = costoTotal;
		this.idSubProceso = idSubProceso;
		this.idTipoNecesidad = idTipoNecesidad;
		this.idTipoActivo = idTipoActivo;
		this.cumPlaneacion = cumPlaneacion;
		this.subProceso = subProceso;
		this.tipoProceso = tipoProceso;
		TipoNecesidad = tipoNecesidad;
	}

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

	public Long getIdSubProceso() {
		return idSubProceso;
	}

	public void setIdSubProceso(Long idSubProceso) {
		this.idSubProceso = idSubProceso;
	}

	public Long getIdTipoNecesidad() {
		return idTipoNecesidad;
	}

	public void setIdTipoNecesidad(Long idTipoNecesidad) {
		this.idTipoNecesidad = idTipoNecesidad;
	}

	public Long getIdTipoActivo() {
		return idTipoActivo;
	}

	public void setIdTipoActivo(Long idTipoActivo) {
		this.idTipoActivo = idTipoActivo;
	}

	public Integer getCumPlaneacion() {
		return cumPlaneacion;
	}

	public void setCumPlaneacion(Integer cumPlaneacion) {
		this.cumPlaneacion = cumPlaneacion;
	}

	public String getSubProceso() {
		return subProceso;
	}

	public void setSubProceso(String subProceso) {
		this.subProceso = subProceso;
	}

	public String getTipoProceso() {
		return tipoProceso;
	}

	public void setTipoProceso(String tipoProceso) {
		this.tipoProceso = tipoProceso;
	}

	public String getTipoNecesidad() {
		return TipoNecesidad;
	}

	public void setTipoNecesidad(String tipoNecesidad) {
		TipoNecesidad = tipoNecesidad;
	}
	
}
