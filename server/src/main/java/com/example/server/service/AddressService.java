package com.example.server.service;

import com.example.server.domain.Address;

import java.util.List;

public interface AddressService {
    public Address findById(int id);
    public Address findByPersonId(int id);
    public List<Address> findAllByPersonId(int id);
    public Address save(Address address);
}
