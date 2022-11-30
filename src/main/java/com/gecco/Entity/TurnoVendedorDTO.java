package com.gecco.Entity;

import java.sql.Date;

public class TurnoVendedorDTO {
	
	Integer id_oficina;
	Integer id_sitio_venta;
	Integer id_vendedor;
	String nombre_oficina;
	String nombre_sitio_venta;
	String estado;
	String nombre_vendedor;
	Date fecha_final;
	Date fecha_inicio;
	Integer id_turno;
	Integer ide_subzona;
	
	public TurnoVendedorDTO() {
		super();
	}

	public TurnoVendedorDTO(Integer id_oficina, Integer id_sitio_venta, Integer id_vendedor, String nombre_oficina,
			String nombre_sitio_venta, String estado, String nombre_vendedor, Date fecha_final, Date fecha_inicio,
			Integer id_turno, Integer ide_subzona) {
		super();
		this.id_oficina = id_oficina;
		this.id_sitio_venta = id_sitio_venta;
		this.id_vendedor = id_vendedor;
		this.nombre_oficina = nombre_oficina;
		this.nombre_sitio_venta = nombre_sitio_venta;
		this.estado = estado;
		this.nombre_vendedor = nombre_vendedor;
		this.fecha_final = fecha_final;
		this.fecha_inicio = fecha_inicio;
		this.id_turno = id_turno;
		this.ide_subzona = ide_subzona;
	}


	public Integer getId_oficina() {
		return id_oficina;
	}

	public void setId_oficina(Integer id_oficina) {
		this.id_oficina = id_oficina;
	}

	public Integer getId_sitio_venta() {
		return id_sitio_venta;
	}

	public void setId_sitio_venta(Integer id_sitio_venta) {
		this.id_sitio_venta = id_sitio_venta;
	}

	public Integer getId_vendedor() {
		return id_vendedor;
	}

	public void setId_vendedor(Integer id_vendedor) {
		this.id_vendedor = id_vendedor;
	}

	public String getNombre_oficina() {
		return nombre_oficina;
	}

	public void setNombre_oficina(String nombre_oficina) {
		this.nombre_oficina = nombre_oficina;
	}

	public String getNombre_sitio_venta() {
		return nombre_sitio_venta;
	}

	public void setNombre_sitio_venta(String nombre_sitio_venta) {
		this.nombre_sitio_venta = nombre_sitio_venta;
	}

	public String getNombre_vendedor() {
		return nombre_vendedor;
	}

	public void setNombre_vendedor(String nombre_vendedor) {
		this.nombre_vendedor = nombre_vendedor;
	}

	public Date getFecha_final() {
		return fecha_final;
	}

	public void setFecha_final(Date fecha_final) {
		this.fecha_final = fecha_final;
	}

	public Date getFecha_inicio() {
		return fecha_inicio;
	}

	public void setFecha_inicio(Date fecha_inicio) {
		this.fecha_inicio = fecha_inicio;
	}

	public Integer getId_turno() {
		return id_turno;
	}

	public void setId_turno(Integer id_turno) {
		this.id_turno = id_turno;
	}

	public Integer getIde_subzona() {
		return ide_subzona;
	}

	public void setIde_subzona(Integer ide_subzona) {
		this.ide_subzona = ide_subzona;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
		
}
