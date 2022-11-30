package com.gecco.EntityModifica;

import java.util.Date;

public class PresupuestoContable2 {
	
	Long id;
	Date fecha;
	String presupuesto;
	Long idCuenta;
	
	public PresupuestoContable2() {
		super();
	}

	public PresupuestoContable2(Long id, Date fecha, String presupuesto, Long idCuenta) {
		super();
		this.id = id;
		this.fecha = fecha;
		this.presupuesto = presupuesto;
		this.idCuenta = idCuenta;
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

	public String getPresupuesto() {
		return presupuesto;
	}

	public void setPresupuesto(String presupuesto) {
		this.presupuesto = presupuesto;
	}

	public Long getIdCuenta() {
		return idCuenta;
	}

	public void setIdCuenta(Long idCuenta) {
		this.idCuenta = idCuenta;
	}

}
