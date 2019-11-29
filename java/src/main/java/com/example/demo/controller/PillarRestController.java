package com.example.demo.controller;

import com.example.demo.model.Pillar;
import com.example.demo.services.PillarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PillarRestController {

    @Autowired
    private PillarService pillarService;

    @PostMapping("/pillar")
    public Pillar createPillar(@RequestBody Pillar pillar) {
        return pillarService.createPillar(pillar);
    }

    @GetMapping("/pillar")
    public List<Pillar> getAllPillars() {
        return pillarService.getAll();
    }

    @PostMapping("/pillars")
    public List<Pillar> createPillars(@RequestBody List<Pillar> pillars) {
        return pillarService.createPillars(pillars);
    }
}
