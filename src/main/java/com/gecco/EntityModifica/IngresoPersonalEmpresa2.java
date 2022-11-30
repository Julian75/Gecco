package com.gecco.EntityModifica;

import java.sql.Date;

public class IngresoPersonalEmpresa2 {
	Long id;
	String nombre;
	String apellido;
	Long idTipoDocumento;
	String documento;
	Long id_area;
	String horaIngreso;
	String horaSalida;
	Long id_estado;
	Date fecha;
	Integer ide_oficina;
	Long id_sede;
	String nombreImagen;
	String rh;
	String telefono;
	String eps;
	String arl;
	
	public IngresoPersonalEmpresa2() {
		super();
	}
	
	public IngresoPersonalEmpresa2(Long id, String nombre, String apellido, Long idTipoDocumento, String documento,
			Long id_area, String horaIngreso, String horaSalida, Long id_estado, Date fecha, Integer ide_oficina,
			Long id_sede, String nombreImagen, String rh, String telefono, String eps, String arl) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.idTipoDocumento = idTipoDocumento;
		this.documento = documento;
		this.id_area = id_area;
		this.horaIngreso = horaIngreso;
		this.horaSalida = horaSalida;
		this.id_estado = id_estado;
		this.fecha = fecha;
		this.ide_oficina = ide_oficina;
		this.id_sede = id_sede;
		this.nombreImagen = nombreImagen;
		this.rh = rh;
		this.telefono = telefono;
		this.eps = eps;
		this.arl = arl;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	public Long getIdTipoDocumento() {
		return idTipoDocumento;
	}
	public void setIdTipoDocumento(Long idTipoDocumento) {
		this.idTipoDocumento = idTipoDocumento;
	}
	public String getDocumento() {
		return documento;
	}
	public void setDocumento(String documento) {
		this.documento = documento;
	}
	public Long getId_area() {
		return id_area;
	}
	public void setId_area(Long id_area) {
		this.id_area = id_area;
	}
	public String getHoraIngreso() {
		return horaIngreso;
	}
	public void setHoraIngreso(String horaIngreso) {
		this.horaIngreso = horaIngreso;
	}
	public String getHoraSalida() {
		return horaSalida;
	}
	public void setHoraSalida(String horaSalida) {
		this.horaSalida = horaSalida;
	}
	public Long getId_estado() {
		return id_estado;
	}
	public void setId_estado(Long id_estado) {
		this.id_estado = id_estado;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public Integer getIde_oficina() {
		return ide_oficina;
	}
	public void setIde_oficina(Integer ide_oficina) {
		this.ide_oficina = ide_oficina;
	}
	public Long getId_sede() {
		return id_sede;
	}
	public void setId_sede(Long id_sede) {
		this.id_sede = id_sede;
	}

	public String getNombreImagen() {
		return nombreImagen;
	}

	public void setNombreImagen(String nombreImagen) {
		this.nombreImagen = nombreImagen;
	}

	public String getRh() {
		return rh;
	}

	public void setRh(String rh) {
		this.rh = rh;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getEps() {
		return eps;
	}

	public void setEps(String eps) {
		this.eps = eps;
	}

	public String getArl() {
		return arl;
	}

	public void setArl(String arl) {
		this.arl = arl;
	}
	
}