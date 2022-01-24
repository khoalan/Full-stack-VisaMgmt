package com.example.server.service.serviceImpl;

import com.example.server.domain.Address;
import com.example.server.repository.AddressRepository;
import com.example.server.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {
    @Autowired
    AddressRepository addressRepository;

    @Override
    public Address findById(int id) {
        Address address = addressRepository.findById(id);
        return address;
    }

    @Override
    public Address findByPersonId(int id) {
        Address address = addressRepository.findByPersonId(id);
        return address;
    }

    @Override
    public List<Address> findAllByPersonId(int id) {
        List<Address> addresses = addressRepository.findAllByPersonId(id);
        return addresses;
    }

    @Override
    public Address save(Address address) {
        Address address_updated = addressRepository.save(address);
        return address_updated;
    }
}
