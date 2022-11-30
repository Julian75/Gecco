package com.gecco.EntityModifica;

import java.sql.Date;

public class DatosFormularioPago2 {
	Long id;
	Date fechaSorteo;
	String seriePreImpresa;
	String serieImpresa;
	String colillaImpresa;
	String colillaPreImpresa;
	Integer serieCodigoVenta;
	String nombreSorteoLoteria;
	String totalFormulario;
	String totalGanadoBruto;
	String cedulaColocador;
	Long idClientesAutorizacionPago;
	public DatosFormularioPago2() {
		super();
	}
	public DatosFormularioPago2(Long id, Date fechaSorteo, String seriePreImpresa, String serieImpresa,
			String colillaImpresa, String colillaPreImpresa, Integer serieCodigoVenta, String nombreSorteoLoteria,
			String totalFormulario, String totalGanadoBruto, String cedulaColocador, Long idClientesAutorizacionPago) {
		super();
		this.id = id;
		this.fechaSorteo = fechaSorteo;
		this.seriePreImpresa = seriePreImpresa;
		this.serieImpresa = serieImpresa;
		this.colillaImpresa = colillaImpresa;
		this.colillaPreImpresa = colillaPreImpresa;
		this.serieCodigoVenta = serieCodigoVenta;
		this.nombreSorteoLoteria = nombreSorteoLoteria;
		this.totalFormulario = totalFormulario;
		this.totalGanadoBruto = totalGanadoBruto;
		this.cedulaColocador = cedulaColocador;
		this.idClientesAutorizacionPago = idClientesAutorizacionPago;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getFechaSorteo() {
		return fechaSorteo;
	}
	public void setFechaSorteo(Date fechaSorteo) {
		this.fechaSorteo = fechaSorteo;
	}
	public String getSeriePreImpresa() {
		return seriePreImpresa;
	}
	public void setSeriePreImpresa(String seriePreImpresa) {
		this.seriePreImpresa = seriePreImpresa;
	}
	public String getSerieImpresa() {
		return serieImpresa;
	}
	public void setSerieImpresa(String serieImpresa) {
		this.serieImpresa = serieImpresa;
	}
	public String getColillaImpresa() {
		return colillaImpresa;
	}
	public void setColillaImpresa(String colillaImpresa) {
		this.colillaImpresa = colillaImpresa;
	}
	public String getColillaPreImpresa() {
		return colillaPreImpresa;
	}
	public void setColillaPreImpresa(String colillaPreImpresa) {
		this.colillaPreImpresa = colillaPreImpresa;
	}
	public Integer getSerieCodigoVenta() {
		return serieCodigoVenta;
	}
	public void setSerieCodigoVenta(Integer serieCodigoVenta) {
		this.serieCodigoVenta = serieCodigoVenta;
	}
	public String getNombreSorteoLoteria() {
		return nombreSorteoLoteria;
	}
	public void setNombreSorteoLoteria(String nombreSorteoLoteria) {
		this.nombreSorteoLoteria = nombreSorteoLoteria;
	}
	public String getTotalFormulario() {
		return totalFormulario;
	}
	public void setTotalFormulario(String totalFormulario) {
		this.totalFormulario = totalFormulario;
	}
	public String getTotalGanadoBruto() {
		return totalGanadoBruto;
	}
	public void setTotalGanadoBruto(String totalGanadoBruto) {
		this.totalGanadoBruto = totalGanadoBruto;
	}
	public String getCedulaColocador() {
		return cedulaColocador;
	}
	public void setCedulaColocador(String cedulaColocador) {
		this.cedulaColocador = cedulaColocador;
	}
	public Long getIdClientesAutorizacionPago() {
		return idClientesAutorizacionPago;
	}
	public void setIdClientesAutorizacionPago(Long idClientesAutorizacionPago) {
		this.idClientesAutorizacionPago = idClientesAutorizacionPago;
	}
	
	
}
