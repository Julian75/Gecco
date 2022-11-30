package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.CorreoAuditoria;

public interface ICorreoAuditoriaService {
	
	public List<CorreoAuditoria> all();
	
	public Optional<CorreoAuditoria> findById(Long id);
	
	public CorreoAuditoria save(CorreoAuditoria correoAuditoria);
	
	public void delete(Long id);

}
