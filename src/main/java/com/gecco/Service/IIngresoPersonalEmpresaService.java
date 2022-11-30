
package com.gecco.Service;

import java.util.List;
import java.util.Optional;

import com.gecco.Entity.IngresoPersonalEmpresa;

public interface IIngresoPersonalEmpresaService {
public List<IngresoPersonalEmpresa> all();
	
	public Optional<IngresoPersonalEmpresa> findById(Long id);
	
	public IngresoPersonalEmpresa save(IngresoPersonalEmpresa ingresoPersonalEmpresa);
	
	public void delete(Long id);
}