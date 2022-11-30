package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.CotizacionPdf;
import com.gecco.Repository.ICotizacionPdfRepository;
import com.gecco.Service.ICotizacionPdfService;

@Service
public class CotizacionPdfServiceImplement implements ICotizacionPdfService{

	@Autowired
	private ICotizacionPdfRepository repository;
	        
	
	@Override
	public List<CotizacionPdf> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<CotizacionPdf> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public CotizacionPdf save(CotizacionPdf cotizacionPdf) {
		return this.repository.save(cotizacionPdf);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}