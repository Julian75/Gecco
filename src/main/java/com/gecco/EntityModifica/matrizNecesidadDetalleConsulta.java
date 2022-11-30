package com.gecco.EntityModifica;

public class matrizNecesidadDetalleConsulta {

	Long idMatrizNecesidad;
	String fechaEjecutar;
	String proceso;
	String subproceso;
	String tipoNecesidad;
	String detalle;
	Integer ejecucionesEstimadas;
	Integer ejecucionesCumplidas;
	Integer cantidadEstimada;
	Integer cantidadEjecutada;
	Double costoUnitarioEstimado;
	Double costoUnitarioEjecutado;
	String porcentajeEjecucion;
	Double totalEstimado;
	Double totalEjecutado;
	Integer porcTotal;
	Integer cumPlaneacion;
	
	public matrizNecesidadDetalleConsulta() {
		super();
	}

	public matrizNecesidadDetalleConsulta(Long idMatrizNecesidad, String fechaEjecutar, String proceso,
			String subproceso, String tipoNecesidad, String detalle, Integer ejecucionesEstimadas,
			Integer ejecucionesCumplidas, Integer cantidadEstimada, Integer cantidadEjecutada,
			Double costoUnitarioEstimado, Double costoUnitarioEjecutado, String porcentajeEjecucion,
			Double totalEstimado, Double totalEjecutado, Integer porcTotal, Integer cumPlaneacion) {
		super();
		this.idMatrizNecesidad = idMatrizNecesidad;
		this.fechaEjecutar = fechaEjecutar;
		this.proceso = proceso;
		this.subproceso = subproceso;
		this.tipoNecesidad = tipoNecesidad;
		this.detalle = detalle;
		this.ejecucionesEstimadas = ejecucionesEstimadas;
		this.ejecucionesCumplidas = ejecucionesCumplidas;
		this.cantidadEstimada = cantidadEstimada;
		this.cantidadEjecutada = cantidadEjecutada;
		this.costoUnitarioEstimado = costoUnitarioEstimado;
		this.costoUnitarioEjecutado = costoUnitarioEjecutado;
		this.porcentajeEjecucion = porcentajeEjecucion;
		this.totalEstimado = totalEstimado;
		this.totalEjecutado = totalEjecutado;
		this.porcTotal = porcTotal;
		this.cumPlaneacion = cumPlaneacion;
	}

	public Long getIdMatrizNecesidad() {
		return idMatrizNecesidad;
	}

	public void setIdMatrizNecesidad(Long idMatrizNecesidad) {
		this.idMatrizNecesidad = idMatrizNecesidad;
	}

	public String getProceso() {
		return proceso;
	}

	public void setProceso(String proceso) {
		this.proceso = proceso;
	}

	public String getSubproceso() {
		return subproceso;
	}

	public void setSubproceso(String subproceso) {
		this.subproceso = subproceso;
	}

	public String getTipoNecesidad() {
		return tipoNecesidad;
	}

	public void setTipoNecesidad(String tipoNecesidad) {
		this.tipoNecesidad = tipoNecesidad;
	}

	public String getDetalle() {
		return detalle;
	}

	public void setDetalle(String detalle) {
		this.detalle = detalle;
	}

	public Integer getEjecucionesEstimadas() {
		return ejecucionesEstimadas;
	}

	public void setEjecucionesEstimadas(Integer ejecucionesEstimadas) {
		this.ejecucionesEstimadas = ejecucionesEstimadas;
	}

	public Integer getEjecucionesCumplidas() {
		return ejecucionesCumplidas;
	}

	public void setEjecucionesCumplidas(Integer ejecucionesCumplidas) {
		this.ejecucionesCumplidas = ejecucionesCumplidas;
	}

	public Integer getCantidadEstimada() {
		return cantidadEstimada;
	}

	public void setCantidadEstimada(Integer cantidadEstimada) {
		this.cantidadEstimada = cantidadEstimada;
	}

	public Integer getCantidadEjecutada() {
		return cantidadEjecutada;
	}

	public void setCantidadEjecutada(Integer cantidadEjecutada) {
		this.cantidadEjecutada = cantidadEjecutada;
	}

	public Double getCostoUnitarioEstimado() {
		return costoUnitarioEstimado;
	}

	public void setCostoUnitarioEstimado(Double costoUnitarioEstimado) {
		this.costoUnitarioEstimado = costoUnitarioEstimado;
	}

	public Double getCostoUnitarioEjecutado() {
		return costoUnitarioEjecutado;
	}

	public void setCostoUnitarioEjecutado(Double costoUnitarioEjecutado) {
		this.costoUnitarioEjecutado = costoUnitarioEjecutado;
	}

	public String getPorcentajeEjecucion() {
		return porcentajeEjecucion;
	}

	public void setPorcentajeEjecucion(String porcentajeEjecucion) {
		this.porcentajeEjecucion = porcentajeEjecucion;
	}

	public Double getTotalEstimado() {
		return totalEstimado;
	}

	public void setTotalEstimado(Double totalEstimado) {
		this.totalEstimado = totalEstimado;
	}

	public Double getTotalEjecutado() {
		return totalEjecutado;
	}

	public void setTotalEjecutado(Double totalEjecutado) {
		this.totalEjecutado = totalEjecutado;
	}

	public String getFechaEjecutar() {
		return fechaEjecutar;
	}

	public void setFechaEjecutar(String fechaEjecutar) {
		this.fechaEjecutar = fechaEjecutar;
	}

	public Integer getPorcTotal() {
		return porcTotal;
	}

	public void setPorcTotal(Integer porcTotal) {
		this.porcTotal = porcTotal;
	}

	public Integer getCumPlaneacion() {
		return cumPlaneacion;
	}

	public void setCumPlaneacion(Integer cumPlaneacion) {
		this.cumPlaneacion = cumPlaneacion;
	}
	
}
