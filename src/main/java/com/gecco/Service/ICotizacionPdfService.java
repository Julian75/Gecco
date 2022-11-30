package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.CotizacionPdf;

public interface ICotizacionPdfService {

	public List<CotizacionPdf> all();
	
	public Optional<CotizacionPdf> findById(Long id);
	
	public CotizacionPdf save(CotizacionPdf cotizacionPdf);
	
	public void delete(Long id);
}