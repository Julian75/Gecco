package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.Proveedor;

public interface IProveedorRepository extends JpaRepository<Proveedor, Long>{

}