package com.example.server.repository;

import com.example.server.domain.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    Address findById(int id);

    Address findByPersonId(int id);

    List<Address> findAllByPersonId(int id);

    Address save(Address address);
}
