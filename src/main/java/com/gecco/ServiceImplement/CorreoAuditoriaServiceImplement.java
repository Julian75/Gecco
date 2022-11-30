package com.gecco.ServiceImplement;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gecco.Entity.CorreoAuditoria;
import com.gecco.Repository.ICorreoAuditoriaRepository;
import com.gecco.Service.ICorreoAuditoriaService;

@Service
public class CorreoAuditoriaServiceImplement implements ICorreoAuditoriaService {
	@Autowired
	private ICorreoAuditoriaRepository repository;
	        
	
	@Override
	public List<CorreoAuditoria> all() {		
		return this.repository.findAll();
	}

	@Override
	public Optional<CorreoAuditoria> findById(Long id) {
		return this.repository.findById(id);
	}

	@Override
	public CorreoAuditoria save(CorreoAuditoria correoAuditoria) {
		return this.repository.save(correoAuditoria);
	}

	@Override
	public void delete(Long id) {
		this.repository.deleteById(id);		
	}
}
