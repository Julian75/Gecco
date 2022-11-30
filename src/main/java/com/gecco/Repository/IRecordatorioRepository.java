package com.gecco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gecco.Entity.Recordatorio;

public interface IRecordatorioRepository extends JpaRepository<Recordatorio, Long>{

}
