package com.gecco.Entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ingresoPersonalEmpresa")
public class IngresoPersonalEmpresa {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nombre", length = 50, nullable = false)
	private String nombre;

	@Column(name = "apellido", length = 50, nullable = false)
	private String apellido;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_tipo_documento", nullable = false)
	private TipoDocumento idTipoDocumento;
	
	@Column(name = "documento", length = 15, nullable = false)
	private String documento;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_area", nullable = false)
	private Area idArea;
	
	@Column(name = "horaIngreso", length= 20, nullable = false)
	private String horaIngreso;

	@Column(name = "horaSalida", length = 20, nullable = false)
	private String horaSalida;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_estado", nullable = false)
	private Estado idEstado;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_sedes", nullable = false)
	private Sedes idSedes;
	
	@Column(name = "fecha", nullable = false)
	private Date fecha;
	
	@Column(name = "ideOficina", nullable = false)
	private int ideOficina;
	
	@Column(name = "nombre_imagen", length = 250, nullable = false)
	private String nombreImagen;
	
	@Column(name = "rh", length = 10, nullable = false)
	private String Rh;
	
	@Column(name = "telefono", length = 250, nullable = false)
	private String telefono;
	
	@Column(name = "eps", length = 100, nullable = false)
	private String eps;
	
	@Column(name = "arl", length = 100, nullable = false)
	private String arl;
	

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

	public TipoDocumento getIdTipoDocumento() {
		return idTipoDocumento;
	}

	public void setIdTipoDocumento(TipoDocumento idTipoDocumento) {
		this.idTipoDocumento = idTipoDocumento;
	}

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public Area getIdArea() {
		return idArea;
	}

	public void setIdArea(Area idArea) {
		this.idArea = idArea;
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

	public Estado getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Estado idEstado) {
		this.idEstado = idEstado;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public int getIdeOficina() {
		return ideOficina;
	}

	public void setIdeOficina(int ideOficina) {
		this.ideOficina = ideOficina;
	}

	public Sedes getIdSedes() {
		return idSedes;
	}

	public void setIdSedes(Sedes idSedes) {
		this.idSedes = idSedes;
	}

	public String getNombreImagen() {
		return nombreImagen;
	}

	public void setNombreImagen(String nombreImagen) {
		this.nombreImagen = nombreImagen;
	}

	public String getRh() {
		return Rh;
	}

	public void setRh(String rh) {
		Rh = rh;
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