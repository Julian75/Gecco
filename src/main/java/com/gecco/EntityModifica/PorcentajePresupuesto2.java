package com.gecco.EntityModifica;

import java.sql.Date;

public class PorcentajePresupuesto2 {

	Long id;
	Date fecha;
	Long idCuenta;
	double porcentaje;
	
	public PorcentajePresupuesto2() {
		super();
	}

	public PorcentajePresupuesto2(Long id, Date fecha, Long idCuenta, double porcentaje) {
		super();
		this.id = id;
		this.fecha = fecha;
		this.idCuenta = idCuenta;
		this.porcentaje = porcentaje;
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

	public Long getIdCuenta() {
		return idCuenta;
	}

	public void setIdCuenta(Long idCuenta) {
		this.idCuenta = idCuenta;
	}

	public double getPorcentaje() {
		return porcentaje;
	}

	public void setPorcentaje(double porcentaje) {
		this.porcentaje = porcentaje;
	}
	
}
