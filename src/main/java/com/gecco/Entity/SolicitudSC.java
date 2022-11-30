package com.gecco.Entity;

import java.io.Serializable;
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
@Table(name = "solicitud_SC")
public class SolicitudSC implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "fecha", nullable = false)
	private Date fecha;
	
	@Column(name = "vence", nullable = false)
	private Date vence;
	
	@Column(name = "municipio", length = 50, nullable = false)
	private String municipio;
	
	@Column(name = "incidente", length = 100, nullable = false)
	private String incidente;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_motivo_solicitud", nullable = false)
	private MotivoSolicitud idMotivoSolicitud;
	
	@Column(name = "medio_radicacion", length = 100, nullable = false)
	private String medioRadicacion;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_tipo_servicio", nullable = false)
	private TipoServicio idTipoServicio;
	
	@Column(name = "auxiliar_radicacion", length = 200, nullable = false)
	private String auxiliarRadicacion;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_escala", nullable = false)
	private EscalaSolicitudes idEscala;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_estado", nullable = false)
	private Estado idEstado;
	
	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_cliente_sc", nullable = false)
	private ClienteSC idClienteSC;

	@Column(name = "prorroga", length = 50, nullable = false)
	private String prorroga;
	
	@Column(name = "persona_afectada", columnDefinition = "LONGTEXT", nullable = false)
	private String personaAfectada;
	
	@Column(name = "persona_involucrada", columnDefinition = "LONGTEXT", nullable = false)
	private String personaInvolucrada;

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

	public Date getVence() {
		return vence;
	}

	public void setVence(Date vence) {
		this.vence = vence;
	}

	public String getMunicipio() {
		return municipio;
	}

	public void setMunicipio(String municipio) {
		this.municipio = municipio;
	}

	public String getIncidente() {
		return incidente;
	}

	public void setIncidente(String incidente) {
		this.incidente = incidente;
	}

	public MotivoSolicitud getIdMotivoSolicitud() {
		return idMotivoSolicitud;
	}

	public void setIdMotivoSolicitud(MotivoSolicitud idMotivoSolicitud) {
		this.idMotivoSolicitud = idMotivoSolicitud;
	}

	public String getMedioRadicacion() {
		return medioRadicacion;
	}

	public void setMedioRadicacion(String medioRadicacion) {
		this.medioRadicacion = medioRadicacion;
	}

	public TipoServicio getIdTipoServicio() {
		return idTipoServicio;
	}

	public void setIdTipoServicio(TipoServicio idTipoServicio) {
		this.idTipoServicio = idTipoServicio;
	}

	public String getAuxiliarRadicacion() {
		return auxiliarRadicacion;
	}

	public void setAuxiliarRadicacion(String auxiliarRadicacion) {
		this.auxiliarRadicacion = auxiliarRadicacion;
	}

	public EscalaSolicitudes getIdEscala() {
		return idEscala;
	}

	public void setIdEscala(EscalaSolicitudes idEscala) {
		this.idEscala = idEscala;
	}

	public Estado getIdEstado() {
		return idEstado;
	}

	public void setIdEstado(Estado idEstado) {
		this.idEstado = idEstado;
	}

	public ClienteSC getIdClienteSC() {
		return idClienteSC;
	}

	public void setIdClienteSC(ClienteSC idClienteSC) {
		this.idClienteSC = idClienteSC;
	}

	public String getProrroga() {
		return prorroga;
	}

	public void setProrroga(String prorroga) {
		this.prorroga = prorroga;
	}

	public String getPersonaAfectada() {
		return personaAfectada;
	}

	public void setPersonaAfectada(String personaAfectada) {
		this.personaAfectada = personaAfectada;
	}

	public String getPersonaInvolucrada() {
		return personaInvolucrada;
	}

	public void setPersonaInvolucrada(String personaInvolucrada) {
		this.personaInvolucrada = personaInvolucrada;
	}

}