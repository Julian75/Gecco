package com.gecco.Entity;

import java.sql.Date;

public class ConsultaRaspa {

	Integer id;
	Integer estado;
	Date fec_pago;
	Date fec_venta;
	Integer ide_oficina;
	String raspa;
	String emision_raspa;
	String nombres;
	String apellido1;
	
	public ConsultaRaspa() {
		super();
	}

	public ConsultaRaspa(Integer id, Integer estado, Date fec_pago, Date fec_venta, Integer ide_oficina, String raspa,
			String emision_raspa, String nombres, String apellido1) {
		super();
		this.id = id;
		this.estado = estado;
		this.fec_pago = fec_pago;
		this.fec_venta = fec_venta;
		this.ide_oficina = ide_oficina;
		this.raspa = raspa;
		this.emision_raspa = emision_raspa;
		this.nombres = nombres;
		this.apellido1 = apellido1;
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getEstado() {
		return estado;
	}

	public void setEstado(Integer estado) {
		this.estado = estado;
	}

	public Date getFec_pago() {
		return fec_pago;
	}

	public void setFec_pago(Date fec_pago) {
		this.fec_pago = fec_pago;
	}

	public Date getFec_venta() {
		return fec_venta;
	}

	public void setFec_venta(Date fec_venta) {
		this.fec_venta = fec_venta;
	}

	public Integer getIde_oficina() {
		return ide_oficina;
	}

	public void setIde_oficina(Integer ide_oficina) {
		this.ide_oficina = ide_oficina;
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
