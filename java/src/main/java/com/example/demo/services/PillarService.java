package com.example.demo.services;

import com.example.demo.model.Pillar;
import com.example.demo.repository.PillarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PillarService {

    @Autowired
    private PillarRepository pillarRepository;

    public List<Pillar> getAll() {
        return pillarRepository.findAll();
    }

    public Pillar createPillar(Pillar pillar) {
        return pillarRepository.save(pillar);
    }

    public List<Pillar> createPillars(List<Pillar> pillars) {
        return pillars.stream().map(pillar -> pillarRepository.save(pillar)).collect(Collectors.toList());
    }
}
