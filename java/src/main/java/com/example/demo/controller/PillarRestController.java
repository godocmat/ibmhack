package com.example.demo.controller;

import com.example.demo.model.Image;
import com.example.demo.model.Pillar;
import com.example.demo.services.PillarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping("/pillars/analyze")
    public void analyzePillar(@RequestBody Map<String, String> img_url) {
      pillarService.analyzePillar(img_url);
    }

  @PutMapping("/pillar/pillarId")
  public Pillar updatePillar(@PathVariable Long pillarId, @RequestBody Pillar pillar) {
    return pillarService.updatePillar(pillar,pillarId);
  }
}
