package com.gecco.EntityModifica;

import java.util.Date;

public class LibroMayor2 {
	Long id;
	Long idCuenta;
	String valor;
	Date fecha;
	public LibroMayor2() {
		super();
	}
	public LibroMayor2(Long id, Long idCuenta, String valor, Date fecha) {
		super();
		this.id = id;
		this.idCuenta = idCuenta;
		this.valor = valor;
		this.fecha = fecha;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getIdCuenta() {
		return idCuenta;
	}
	public void setIdCuenta(Long idCuenta) {
		this.idCuenta = idCuenta;
	}
	public String getValor() {
		return valor;
	}
	public void setValor(String valor) {
		this.valor = valor;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
}
