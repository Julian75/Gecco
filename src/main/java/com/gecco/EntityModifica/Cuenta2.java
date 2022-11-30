package com.gecco.EntityModifica;

public class Cuenta2 {
	Long id;
	String descripcion;
	Integer codigo;
	Long idJerarquiaCuentas;
	public Cuenta2() {
		super();
	}
	
	public Cuenta2(Long id, String descripcion, Integer codigo, Long idJerarquiaCuentas) {
		super();
		this.id = id;
		this.descripcion = descripcion;
		this.codigo = codigo;
		this.idJerarquiaCuentas = idJerarquiaCuentas;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public Integer getCodigo() {
		return codigo;
	}
	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}
	public Long getIdJerarquiaCuentas() {
		return idJerarquiaCuentas;
	}
	public void setIdJerarquiaCuentas(Long idJerarquiaCuentas) {
		this.idJerarquiaCuentas = idJerarquiaCuentas;
	}
	
	
}
