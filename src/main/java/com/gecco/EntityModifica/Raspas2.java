package com.gecco.EntityModifica;

import java.sql.Date;

public class Raspas2 {
	
	Long id;
	Date fecVenta;
	Date fecPago;
	Date fecha;
	Integer estado;
	Integer ideOficina;
	String raspa;
	String emision_raspa;
	String nombres;
	String apellido1;
	
	public Raspas2() {
		super();
	}

	public Raspas2(Long id, Date fecVenta, Date fecPago, Date fecha, Integer estado, Integer ideOficina, String raspa,
			String emision_raspa, String nombres, String apellido1) {
		super();
		this.id = id;
		this.fecVenta = fecVenta;
		this.fecPago = fecPago;
		this.fecha = fecha;
		this.estado = estado;
		this.ideOficina = ideOficina;
		this.raspa = raspa;
		this.emision_raspa = emision_raspa;
		this.nombres = nombres;
		this.apellido1 = apellido1;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getFecVenta() {
		return fecVenta;
	}

	public void setFecVenta(Date fecVenta) {
		this.fecVenta = fecVenta;
	}

	public Date getFecPago() {
		return fecPago;
	}

	public void setFecPago(Date fecPago) {
		this.fecPago = fecPago;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Integer getEstado() {
		return estado;
	}

	public void setEstado(Integer estado) {
		this.estado = estado;
	}

	public Integer getIdeOficina() {
		return ideOficina;
	}

	public void setIdeOficina(Integer ideOficina) {
		this.ideOficina = ideOficina;
	}

	public String getRaspa() {
		return raspa;
	}

	public void setRaspa(String raspa) {
		this.raspa = raspa;
	}

	public String getEmision_raspa() {
		return emision_raspa;
	}

	public void setEmision_raspa(String emision_raspa) {
		this.emision_raspa = emision_raspa;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public String getApellido1() {
		return apellido1;
	}

	public void setApellido1(String apellido1) {
		this.apellido1 = apellido1;
	}

}
