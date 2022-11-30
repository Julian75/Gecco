package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.TipoDocumento;
import com.gecco.Repository.ITipoDocumentoRepository;
import com.gecco.Service.ITipoDocumentoService;

@Service
public class TipoDocumentoServiceImplement implements ITipoDocumentoService{
	
	@Autowired
	private ITipoDocumentoRepository repository;
	        
	
	@Override
	public List<TipoDocumento> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<TipoDocumento> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public TipoDocumento save(TipoDocumento tipoDocumento) {
		return this.repository.save(tipoDocumento);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
